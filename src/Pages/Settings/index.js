
import React, { Component, Fragment } from 'react';
import { SafeAreaView, Switch, TouchableOpacity, StatusBar, View, Image, Text, Dimensions, FlatList, ImageBackground } from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            notificationList: [{
                title: "Notification",
                icons: Images.NOTIFICATION2,
                date: "Yesterday"
            }, {
                title: "Font Size ",
                icons: Images.FONT_SIZE,
                date: "3 hrs ago"
            }, {
                title: "Privacy Policy",
                icons: Images.PRIVACY_POLICY,
                date: "5 Days ago"
            }]
        };
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
            marginTop: 12, borderRadius: 7, height: 50, width: width - 40, flexDirection: "row", alignItems: "center", borderWidth: 0.5, borderColor: Colors.borderColor
        }}>
            <View style={{ marginLeft: 15, alignSelf: "center", height: 20, width: 20 }}>
                <Image style={{ height: 20, width: 20 }} source={item.icons} resizeMode="contain" />
            </View>
            <View style={{ marginLeft: 10, justifyContent: "center", flex: 1 }}>
                <Text style={{ marginLeft: 0, fontSize: 13, fontWeight: "400", color: Colors.black }} numberOfLines={2}>
                    {item.title}
                </Text>
            </View>
            {index != 0 ? <Image style={{ height: 12, width: 12, opacity: 0.8 }} source={this.state.isHelp_selected && index === 3 ? Images.DOWN_ARROW : Images.RIGHT} resizeMode="contain" /> :
                <Switch value={true}></Switch>
            }
            <View style={{ width: 10 }} />
        </View>


    );

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar style={{ backgroundColor: Colors.themeColor }} barStyle="light-content" />
                    <ImageBackground style={{ flex: 1, alignItems: 'center' }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title="Ajustes" is_left={true} onLeftPress={() => this.props.navigation.goBack()} />
                        <FlatList
                            extraData={this.state}
                            ref='flatlist'
                            showsVerticalScrollIndicator={false}
                            data={this.state.notificationList}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ImageBackground>
                </View>
            </Fragment>
        );
    }
}



