import React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../Images';
import Colors from "../Common/colors";
import { logout } from '../Actions/auth';
import { connect } from "react-redux";

class CustomDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            isHelp_selected: false,
            UserId: "",
            AuthToken: '',
            DeviceToken: "",
            selectedIndex: 0,
            FirstName: "",
            LastName: "",
            name: '',
            emailId: "",
            profileImage: "",
            signup_source: "",
            data: [{
                title: "Inicio",
                screen: "Inicio",
                image: Images.HOME,
                items: []
            },
            // {
            //     title: "Favorite Courses",
            //     screen: "Favorite",
            //     image: Images.FAVOURITE_COURSES,
            //     items: []
            // }, {
            //     title: "Notification",
            //     screen: "Notification",
            //     image: Images.NOTIFICATION,
            //     items: []
            // }, 
            // {
            //     title: "Help",
            //     screen: "Help",
            //     image: Images.HELP,
            //     items: [{
            //         title: "Report a Problem",
            //         screen: "Report",
            //     },
            //         // {
            //         //     title: "Account Setting",
            //         //     screen: "Settings",
            //         // },
            //         // {
            //         //     title: "Privacy Policy",
            //         //     screen: "Privacy",
            //         // },
            //         // {
            //         //     title: "About Us",
            //         //     screen: "About",
            //         // }
            //     ]
            // },
            //    {
            //     title: "Popular Courses",
            //     screen: "Popular",
            //     image: Images.BOOK,
            //     items: []
            // },
            // {
            //     title: "Rate Us",
            //     screen: "Rate",
            //     image: Images.RATING,
            //     items: []
            // },
            {
                title: "Cerrar Sesión",
                screen: "Cerrar Sesión",
                image: Images.LOGOUT,
                items: []
            }
            ]
        };
    }

    async componentDidMount() {
        let profilePic = await AsyncStorage.getItem('profilePic');
        let emailId = await AsyncStorage.getItem('emailId');
        let name = await AsyncStorage.getItem('name');
        this.setState({
            name: name,
            emailId: emailId,
            profileImage: profilePic,
        })
    }

    navigateToScreen = (route, index) => () => {
        console.log("INDEX", index, route)
        this.setState({
            selectedIndex: index
        })
        if (index === 1) {
            this.logOut()
        }
        if (index != 1) {
            this.setState({
                isHelp_selected: false
            })
            this.props.navigation.navigate(route, {});
            this.props.navigation.closeDrawer();
        } else if (index == 1 && this.state.isHelp_selected) {
            this.setState({
                isHelp_selected: false
            })
        } else {
            this.setState({
                isHelp_selected: true
            })
        }
    }

    navigateTosubmenuScreen = (route, index) => () => {
        this.props.navigation.navigate(route, {
        });
    }

    logOut() {
        Alert.alert(
            'Cerrar Sesión',
            '¿Quieres cerrar sesión?',
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'Sí', onPress: () => {
                        this.props.logout();
                        this.props.navigation.navigate("Login");
                    }
                },
            ],
            { cancelable: false }
        )
    }

    _renderItem = ({ item, index }) => (
        <View>
            <TouchableOpacity style={{ height: 60, width: "100%", flexDirection: "row", alignItems: "center", borderTopColor: "#E5E3EB", borderTopWidth: 0.6, backgroundColor: this.state.selectedIndex == index && !this.state.isHelp_selected ? "#E5E3EB" : "transparent" }} onPress={this.navigateToScreen(item.screen, index)}>
                <Image style={{ marginLeft: 20, height: 20, width: 20 }} source={item.image} resizeMode="contain" />
                <Text style={{ fontSize: 14, fontWeight: "300", color: "#000", marginLeft: 10, alignSelf: "center", flex: 1 }}>{item.title}</Text>
                {item.title === "Help" ? <Image style={{ height: 12, width: 12, opacity: 0.8, marginRight: 10, }} source={this.state.isHelp_selected && index === 3 ? Images.DOWN_ARROW : Images.RIGHT} resizeMode="contain" /> : null}
            </TouchableOpacity>
            {this.state.isHelp_selected ?
                <FlatList
                    extraData={this.state}
                    ref='flatlist'
                    showsVerticalScrollIndicator={false}
                    data={item.items}
                    scrollEnabled={false}
                    renderItem={this._rendersubItem}
                    keyExtractor={(item, index) => index.toString()}
                /> : null
            }
        </View>
    );

    _rendersubItem = ({ item, index }) => (
        <TouchableOpacity style={{ marginLeft: 25, height: 30, width: "100%", flexDirection: "row", alignItems: "center" }} onPress={this.navigateTosubmenuScreen(item.screen, index)}>
            <View style={{ marginLeft: 20, height: 16, width: 16, borderRadius: 8, borderColor: "gray", borderWidth: 2 }} />
            <Text style={{ fontSize: 12, fontWeight: "300", color: "#000", marginLeft: 10, alignSelf: "center", flex: 1 }}>{item.title}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                    <TouchableOpacity style={styles.userInfoContainer} onPress={() => this.props.navigation.navigate("Profile")} activeOpacity={0.9}>
                        {/* <View style={styles.userImageContainer}>
                            <Image source={Images.PROFILE} style={{ height: 80, width: 80 }} resizeMode="contain" />
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nameLabel} >Benjamin Izaguirre</Text>
                            <Text style={styles.emailLabel}>benizzimo@gmail.com</Text>
                        </View> */}
                        <View style={styles.userImageContainer}>
                            <Image source={{ uri: this.state.profileImage }} style={{ height: 80, width: 80 }} resizeMode="contain" />
                        </View>
                        <View style={styles.labelContainer}>
                            <Text style={styles.nameLabel}>{this.state.name}</Text>
                            <Text style={styles.emailLabel}>{this.state.emailId}</Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        extraData={this.state}
                        ref='flatlist'
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff'
    },
    userInfoContainer: {
        height: 180,
        backgroundColor: Colors.themeColor,
        flexDirection: 'row',
        opacity: 0.8,
        alignItems: "center"
    },
    userImageContainer: {
        backgroundColor: 'transparent',
        height: 80, width: 80, borderRadius: 40,
        borderColor: "#fff",
        borderWidth: 3,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    labelContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    nameLabel: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    emailLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.hyperlinkColor
    }
})

export default connect(() => { return {} }, { logout })(CustomDrawer);