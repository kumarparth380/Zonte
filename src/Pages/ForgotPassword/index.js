
import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, View, TextInput, ImageBackground, KeyboardAvoidingView, Image, Text, Dimensions } from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import ActivityIndicator from '../../Common/activityIndicator'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Common/colors';
import Button from '../../Common/button';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")
import { validateEmail } from "../../Common/validation"

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_emailFocus: false,
            email: ""

        };
    }

    onPress() {
        if (!validateEmail(this.state.email).status) {
            alert(validateEmail(this.state.email).error)
        } else {
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={commonCss.safeAreaStyle}>
                <KeyboardAvoidingView
                    style={commonCss.KeyboardAvoidingView}
                >
                    <ImageBackground style={{ flex: 1 }} source={ Images.BACKGROUND_JPG } resizeMode="stretch">
                        <ScrollView contentContainerStyle={commonCss.ScrollView} showsVerticalScrollIndicator={false}>
                            <Image style={[commonCss.logo, { marginTop: 70 }]} source={ Images.LOGO } resizeMode="contain" />
                            <Text style={commonCss.topLbl}>Forgot Password</Text>
                            <Text style={commonCss.secondTopLbl}>Please Enter the email address to get password</Text>
                            <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_emailFocus ? Colors.themeColor : Colors.lineColor }]}>
                                <Text style={{ marginLeft: 30, marginTop: -9, width: 45, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                    EMAIL
                                </Text>
                                <TextInput style={{ marginTop: -5, marginLeft: 30, height: 30, width: width - 90 }}
                                    onFocus={() => this.setState({ is_emailFocus: true })}
                                    onBlur={() => this.setState({ is_emailFocus: false })}
                                    onChangeText={(val) => this.setState({ email: val })}
                                    keyboardType="email-address"
                                >
                                </TextInput>
                            </View>
                            <Button onPress={() => this.onPress()} />
                        </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>

            </View>
        );
    }
}



