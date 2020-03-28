
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, View, Image, Text, Dimensions, FlatList, ImageBackground } from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles';
import Header from '../../Common/header';
import Images from '../../Images';
import ActivityIndicator from '../../Common/activityIndicator';
import Colors from '../../Common/colors';
const { height, width } = Dimensions.get("window");

export default class Notification extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Profile'
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            notificationList: [{
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "Yesterday"
            }, {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "3 hrs ago"
            }, {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "5 Days ago"
            }, {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "3 hrs ago"
            }, {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "Today"
            }, {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "Yesterday"
            }, {
                title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ",
                icons: "",
                date: "3 hrs ago"
            }]
        };
    }

    _renderItem = ({ item, index }) => (
        <View style={styles.notificationListItem}>
            <View style={{ marginLeft: 15, alignSelf: "center", height: 40, width: 40, borderRadius: 20, borderWidth: 1, borderColor: Colors.borderColor }}>
                <Image style={{ height: 38, width: 38 }} source={Images.PROFILE} />
            </View>
            <View style={{ marginLeft: 10, justifyContent: "center", flex: 1 }}>
                <Text style={{ marginLeft: 0, fontSize: 13, fontWeight: "400", color: Colors.black }} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={{ marginLeft: 0, lineHeight: 20, fontSize: 13, fontWeight: "400", color: Colors.hyperlinkColor }} numberOfLines={2}>
                    {item.date}
                </Text>
            </View>
            <View style={{ width: 20 }} />
        </View>


    );

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.8 }} />
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar style={{ backgroundColor: Colors.themeColor }} barStyle="light-content" />
                    <ImageBackground style={{ flex: 1, alignItems: 'center' }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title="Notificaciones" is_left={true} onLeftPress={() => this.props.navigation.goBack()} />
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

const styles = StyleSheet.create({
    notificationListItem: {
        shadowColor: "#000",
        marginTop: 12,
        borderRadius: 7,
        height: 80,
        width: width - 40,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: Colors.borderColor
    }
})



