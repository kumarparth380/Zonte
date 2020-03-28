
import React, { Component, Fragment } from 'react';
import {
    SafeAreaView, TouchableOpacity, StatusBar, View, Image, Text, Dimensions, FlatList, ImageBackground
} from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")

export default class Favorite extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Profile'
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            coursesList: [{
                title: "Course 1",
                icons: "",
                type: "Agricultural Administration",
                university: "Public University"
            }, {
                title: "Course 2",
                icons: "",
                type: "Engineering Design Process",
                university: "Public University"
            }, {
                title: "Course 3",
                icons: "",
                type: "Agricultural & Veterinary",
                university: "Private University"
            }, {
                title: "Course 4",
                icons: "",
                type: "Agricultural Administration",
                university: "Public University"
            }, {
                title: "Course 5",
                icons: "",
                type: "Engineering Design Process",
                university: "Private University"
            }]
        };
    }

    removeItem(item, index) {
        this.state.coursesList.splice(index, 1)
        this.setState({
            coursesList: this.state.coursesList
        })
    }

    _renderItem = ({ item, index }) => (
        <View style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
            marginTop: 12, borderRadius: 7, height: 80, width: width - 40, flexDirection: "row", alignItems: "center", borderWidth: 0.5, borderColor: Colors.borderColor
        }}>
            <View style={{ marginLeft: 15, alignSelf: "center", height: 44, width: 44, borderRadius: 22, borderWidth: 1, borderColor: Colors.borderColor }}>
                <Image style={{ height: 42, width: 42 }} source={Images.PROFILE} />
            </View>
            <View style={{ marginLeft: 12, justifyContent: "center", flex: 1 }}>
                <Text style={{ marginLeft: 0, fontSize: 13, fontWeight: "400", color: Colors.black }} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={{ marginLeft: 0, lineHeight: 20, fontSize: 13, fontWeight: "400", color: Colors.hyperlinkColor }} numberOfLines={2}>
                    {item.type}
                </Text>
                <Text style={{ marginLeft: 0, lineHeight: 20, fontSize: 12, fontWeight: "400", color: Colors.black }} numberOfLines={2}>
                    {item.university}
                </Text>
            </View>
            <TouchableOpacity style={{ marginTop: 0, width: 40, height: 80 }} onPress={() => this.removeItem(item, index)}>
                <Image style={{ height: 25, width: 25, marginLeft: 0, marginTop: 15 }} source={Images.CROSS} resizeMode="contain" />
            </TouchableOpacity>
        </View>


    );

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar style={{ backgroundColor: Colors.themeColor }} barStyle="light-content" />
                    <ImageBackground style={{ flex: 1, alignItems: 'center' }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title="Cursos Favoritos" is_left={true} onLeftPress={() => this.props.navigation.goBack()} />
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            data={this.state.coursesList}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ImageBackground>
                </View>
            </Fragment>
        );
    }
}



