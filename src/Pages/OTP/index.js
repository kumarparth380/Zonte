
import React, { Component, Fragment } from 'react';
import { SafeAreaView, TouchableOpacity, View, KeyboardAvoidingView, Image, Text, Dimensions, TextInput, ImageBackground } from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Common/colors';
import Button from '../../Common/button';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")

export default class OTP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAffairFocus: false,
            isDescFocus: false
        };
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    //To set indicator
    hideIndicator() {
        this.setState({
            animating: false,
        });
    }

    moveCursor = (val, ref) => {
        switch (ref) {
            case 'first':
                if (val.length > 0) {
                    this.refs.second.focus()
                } else {
                    this.refs.first.focus()
                }
                break;
            case 'second':
                if (val.length > 0) {
                    this.refs.third.focus()
                } else {
                    this.refs.first.focus()
                }
                break;
            case 'third':
                if (val.length > 0) {
                    this.refs.fourth.focus()
                } else {
                    this.refs.second.focus()
                }
                break;
            case 'fourth':
                if (val.length > 0) {
                    this.verify()
                } else {
                    this.refs.third.focus()
                }
                break;
            default:
                console.log('default action')
        }
    }

    verify = () => {
        alert("OTP has been verified successfully")
    }

    render() {
        return (
            <View style={commonCss.safeAreaStyle}>
                <KeyboardAvoidingView style={commonCss.KeyboardAvoidingView} behavior="padding" enabled>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <ScrollView contentContainerStyle={commonCss.ScrollView} showsVerticalScrollIndicator={false}>
                            <Image style={[commonCss.logo, { marginTop: 100 }]} source={Images.LOGO} resizeMode="contain" />
                            <Text style={commonCss.topLbl}>Ingresa el código</Text>
                            <Text style={commonCss.secondTopLbl}>Se ha enviado un código a tu celular</Text>
                            <Text style={[commonCss.topLbl, { color: Colors.themeColor, fontWeight: "500", marginTop: 0 }]}>208-892-1801</Text>
                            <View style={{ marginTop: 40, height: 50, width: 220, flexDirection: "row", justifyContent: "space-between" }}>
                                <TextInput
                                    ref='first'
                                    style={Styles.tf}
                                    maxLength={1}
                                    onChangeText={(val) => { this.moveCursor(val, 'first') }}
                                />
                                <TextInput
                                    ref='second'
                                    style={Styles.tf}
                                    maxLength={1}
                                    onChangeText={(val) => { this.moveCursor(val, 'second') }}
                                />
                                <TextInput
                                    ref='third'
                                    style={Styles.tf}
                                    maxLength={1}
                                    onChangeText={(val) => { this.moveCursor(val, 'third') }}
                                />
                                <TextInput
                                    ref='fourth'
                                    style={Styles.tf}
                                    maxLength={1}
                                    onChangeText={(val) => { this.moveCursor(val, 'fourth') }}
                                />
                            </View>
                            <Button onPress={() => this.verify()} title="VERIFY" />
                            <Text style={commonCss.bottomLbl}>Didn't receive the OTP?<Text> </Text>
                                <Text style={commonCss.hyperLink} onPress={() => {
                                    alert("El código ha sido enviado")
                                }}>Resend Code</Text>
                            </Text>
                        </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        );
    }
}



