
import React, { Component, Fragment } from 'react';
import {
    SafeAreaView, TouchableOpacity, View, Image, Text, Dimensions, FlatList, ImageBackground, StyleSheet
} from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")
import AsyncStorage from '@react-native-community/async-storage';

export default class Profile extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Profile'
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            name: '',
            emailId: "",
            profileImage: "",
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


    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <SafeAreaView style={[commonCss.safeAreaStyle, { backgroundColor: "#E6E6E6 " }]}>
                    <ImageBackground style={{ flex: 1, alignItems: "center" }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <View style={{ height: 100, width: "100%", backgroundColor: Colors.themeColor, opacity: 0.9 }}>
                            <Header title="Perfil" openDrawer={() => this.props.navigation.openDrawer()} />
                        </View>
                        <View style={{ marginTop: -50, height: 130, width: width - 40, backgroundColor: "#fff", borderRadius: 5, borderWidth: 0.5, borderColor: Colors.lineColor }}>
                            <TouchableOpacity style={styles.userInfoContainer} onPress={() => this.props.navigation.navigate("Profile")} activeOpacity={0.9}>
                                <View style={styles.userImageContainer}>
                                    {(this.state.profileImage != "" && this.state.profileImage != null) ?
                                        <Image source={{ uri: this.state.profileImage }} style={{ height: 58, width: 58, borderRadius: 29 }} resizeMode="contain" />
                                        :
                                        <Image source={Images.PROFILE} style={{ height: 58, width: 58 }} resizeMode="contain" />
                                    }

                                </View>
                                <View style={styles.labelContainer}>
                                    <Text style={styles.nameLabel}>{this.state.name}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image style={{ height: 15, width: 15 }} source={Images.EMAIL} resizeMode="contain" />
                                        <Text style={[styles.emailLabel, { color: Colors.themeColor, marginLeft: 5 }]}>{this.state.emailId}</Text>
                                    </View>
                                    {/* <View style={{ flexDirection: "row" }}>
                                        <Image style={{ height: 15, width: 15 }} source={Images.LOCATION} resizeMode="contain" />
                                        <Text style={[styles.emailLabel, { color: Colors.black, marginLeft: 5 }]}>Masaccio</Text>
                                    </View> */}
                                </View>
                            </TouchableOpacity>
                            {/* <View style={{ marginTop: 0, height: 40, width: width - 40, backgroundColor: "#fff", borderRadius: 5, flexDirection: "row", justifyContent: "center" }}>
                                <View style={styles.col}>
                                    <Text style={styles.headLbl}>Phone Number</Text>
                                    <Text style={styles.desc}>208-892-1801</Text>

                                </View>
                                <View style={styles.col}>
                                    <Text style={styles.headLbl}>Date of Birth</Text>
                                    <Text style={styles.desc}>25-Jun-1990</Text>

                                </View>
                                <View style={[styles.col, { borderRightWidth: 0 }]}>
                                    <Text style={styles.headLbl}>Gender</Text>
                                    <Text style={styles.desc}>Male</Text>
                                </View>

                            </View> */}
                        </View>
                        {/* <View style={{ marginTop: 15, height: 85, width: width - 40, backgroundColor: "#fff", borderRadius: 5, borderWidth: 0.5, borderColor: Colors.lineColor }}>
                            <View style={{ flexDirection: "row", height: 40, justifyContent: "flex-start", alignItems: "center" }}>
                                <Image style={{ height: 20, width: 20, marginLeft: 15 }} source={Images.EDUCATION} resizeMode="contain" />
                                <Text style={{ color: Colors.themeColor, fontSize: 14, fontWeight: "500" }}> Educational Details</Text>
                            </View>
                            <Text style={[styles.headLbl, { marginLeft: 15 }]}>School Name/ University Name</Text>
                            <Text style={[styles.desc, { marginLeft: 15 }]}>Oxford University</Text>
                        </View> */}

                    </ImageBackground>

                </SafeAreaView>
            </Fragment>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#fff'
    },
    userInfoContainer: {
        height: 80,
        backgroundColor: "#fff",
        flexDirection: 'row',
        opacity: 0.8,
        alignItems: "center"
    },
    userImageContainer: {
        backgroundColor: 'transparent',
        height: 60, width: 60, borderRadius: 30,
        borderColor: Colors.lineColor,
        borderWidth: 3,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    nameLabel: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        color: '#000'

    },
    emailLabel: {
        fontSize: 12,
        fontWeight: '300',
        color: Colors.hyperlinkColor
    },
    headLbl: { fontSize: 10, fontWeight: "400", color: Colors.black, opacity: 0.7 },
    desc: { fontSize: 11, lineHeight: 18, fontWeight: "400", color: Colors.black, opacity: 0.9 },
    col: { flex: 1, height: 40, borderRightColor: Colors.lineColor, borderRightWidth: 0.5, justifyContent: "center", alignItems: "center" }
})
