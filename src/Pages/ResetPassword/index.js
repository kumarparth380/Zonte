
import React, { Component } from 'react';
import {
    SafeAreaView, TouchableOpacity, View, TextInput, ImageBackground, KeyboardAvoidingView, Image, Text, Dimensions
} from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import ActivityIndicator from '../../Common/activityIndicator'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Common/colors';
import Button from '../../Common/button';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")

export default class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_newpassFocus: false,
            is_confirmPassFocus: false,
            ispassHidden: true,
            isConpassHidden: true,
            newpass: "",
            confirmPass: ""
        };
    }

    render() {
        return (
            <View style={commonCss.safeAreaStyle}>
                <KeyboardAvoidingView
                    style={commonCss.KeyboardAvoidingView}
                >
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <ScrollView contentContainerStyle={commonCss.ScrollView} showsVerticalScrollIndicator={false}>
                            <Image style={[commonCss.logo, { marginTop: 70 }]} source={Images.LOGO} resizeMode="contain" />
                            <Text style={commonCss.topLbl}>Restablece tu contraseña</Text>
                            <Text style={commonCss.secondTopLbl}>Por favor ingresa la siguiente información</Text>
                            <View style={{ height: 150 }}>
                                <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_newpassFocus ? Colors.themeColor : Colors.lineColor }]}>
                                    <Text style={{ marginLeft: 30, marginTop: -9, width: 95, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                        NEW PASSWORD
                                </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput style={{ marginTop: -5, marginLeft: 30, height: 30, flex: 1 }}
                                            onFocus={() => this.setState({ is_newpassFocus: true })}
                                            onBlur={() => this.setState({ is_newpassFocus: false })}
                                            onChangeText={(val) => this.setState({ newpass: val })}
                                            secureTextEntry={this.state.ispassHidden}
                                        >
                                        </TextInput>
                                        <TouchableOpacity style={commonCss.lockWrapper} onPress={() => this.setState({ ispassHidden: !this.state.ispassHidden })}>
                                            <Image style={commonCss.lockIcon} source={Images.LOCK} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_confirmPassFocus ? Colors.themeColor : Colors.lineColor }]}>
                                    <Text style={{ marginLeft: 30, marginTop: -9, width: 118, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                        Confirma la contraseña
                                </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput style={{ marginTop: -5, marginLeft: 30, height: 30, flex: 1 }}
                                            onFocus={() => this.setState({ is_confirmPassFocus: true })}
                                            onBlur={() => this.setState({ is_confirmPassFocus: false })}
                                            onChangeText={(val) => this.setState({ confirmPass: val })}
                                            secureTextEntry={this.state.isConpassHidden}

                                        >
                                        </TextInput>
                                        <TouchableOpacity style={commonCss.lockWrapper} onPress={() => this.setState({ isConpassHidden: !this.state.isConpassHidden })}>
                                            <Image style={commonCss.lockIcon} source={lockIcon} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <Button />
                        </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>

            </View>
        );
    }
}



