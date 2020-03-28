import React, { Component } from 'react';
import { TouchableOpacity, View, KeyboardAvoidingView, Image, Text, Dimensions, TextInput, ImageBackground, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { checkNetworkConnection } from "../../utils/utils";
import Styles from './styles';
import commonCss from '../../Common/styles';
import { login } from '../../Actions/auth';
import ActivityIndicator from '../../Common/activityIndicator';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Common/colors';
import Button from '../../Common/button';
import Images from '../../Images';
import { validateEmail, validatePassword } from "../../Common/validation";
import EndPoint from '../../Endpoint';
import ActionTypes from '../../Actions/ActionTypes';
const { width } = Dimensions.get("window");

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_emailFocus: false,
            is_passwordFocus: false,
            email: "",
            isPassHidden: true,
            animating: false,
            password: "",
        };
    }

    componentDidMount() {
        if (this.props.loggedIn && this.props.user != undefined) {
            global.userToken = this.props.user.oauth_token;
            this.props.navigation.navigate("Home")
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        if (nextProps.type === ActionTypes.LOG_IN_FAIL) {
            this.setState({ animating: false });
            setTimeout(() => { alert(nextProps.error) }, 500)
        } else {
            this.setState({ animating: false });
            if (nextProps.loggedIn && nextProps.user != undefined) {
                global.userToken = nextProps.user.oauth_token;
                this.props.navigation.navigate("Home")
            } else {
                setTimeout(() => { alert('Algo salió mal, por favor intenta más tarde') });
            }
        }
    }

    _fbLogin = () => {
        checkNetworkConnection().then(
            networkStatus => {
                if (networkStatus) {
                    LoginManager.logOut();
                    LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
                        if (result.isCancelled) {
                            console.log('Login cancelled');
                        } else {
                            AccessToken.getCurrentAccessToken().then(async (data) => {
                                let accessToken = data.accessToken
                                const infoRequest = new GraphRequest(
                                    '/me',
                                    {
                                        accessToken: accessToken,
                                        parameters: {
                                            fields: {
                                                string: 'name,email,picture.type(large),gender,link,first_name,last_name,birthday,hometown' // what you want to get
                                            },
                                        }
                                    },
                                    this.getUserProfile,
                                );
                                new GraphRequestManager().addRequest(infoRequest).start();
                            })
                        }
                    }, (error) => {
                        console.log('Login fail with error: ' + error);
                    }
                    );
                }
                else {
                    this.setState({ animating: false })
                    if (Platform.OS == 'ios') {
                        setTimeout(() => { alert('Red no disponible. Por favor conéctate a Wi-Fi o a la red de tu celular.') }, 500)
                    } else {
                        alert('Red no disponible. Por favor conéctate a Wi-Fi o a la red de tu celular.')
                    }
                }
            })
    }


    getUserProfile = async (error, result) => {
        if (error) {
            console.log('error', error);
        } else {
            console.log('result', result);
            if (result) {
                let formData = new FormData();
                formData.append('email', result.email);
                formData.append('password', '12345678');
                formData.append('device_type', Platform.OS == 'android' ? 0 : 1);
                formData.append('device_token', '123456');
                formData.append('signup_source', 'facebook');
                formData.append('source_id', '123');
                formData.append('type', 'email');
                await AsyncStorage.setItem('profilePic', result.picture.data.url);
                await AsyncStorage.setItem('emailId', result.email)
                await AsyncStorage.setItem('name', result.name)
                this.setState({ animating: true });
                this.props.login(EndPoint.LOGIN, formData);
            }
        }
    }

    login = async () => {
        if (!validateEmail(this.state.email).status) {
            alert(validateEmail(this.state.email).error);
            this.refs.email.focus();
        } else if (!validatePassword(this.state.password).status) {
            alert(validatePassword(this.state.password).error);
            this.refs.password.focus();
        } else {
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('device_type', Platform.OS == 'android' ? 0 : 1);
            formData.append('device_token', 'xyz123');
            formData.append('signup_source', 'facebook');
            formData.append('source_id', '123');
            formData.append('type', 'email');
            await this.setState({ animating: true });
            this.props.login(EndPoint.LOGIN, formData);
        }
    }

    render() {
        return (
            <View style={commonCss.safeAreaStyle}>
                <KeyboardAvoidingView style={commonCss.KeyboardAvoidingView} behavior={Platform.OS == "ios" ? "padding" : null}>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <ScrollView contentContainerStyle={commonCss.ScrollView} showsVerticalScrollIndicator={false}>
                            <Image style={[commonCss.logo, { marginTop: 70 }]} source={Images.LOGO} resizeMode="contain" />
                            <Text style={commonCss.topLbl}>Inicia sesión</Text>
                            <Text style={commonCss.secondTopLbl}>Ingresa tus datos abajo</Text>
                            <TouchableOpacity style={Styles.fbButtonWrapper} onPress={() => this._fbLogin()}>
                                <Image style={Styles.fbIcon} source={Images.FB} />
                                <Text style={Styles.fbLbl}>  Iniciar sesión con Facebook</Text>
                            </TouchableOpacity>
                            {/* <View style={Styles.orWrapper}>
                                <View style={Styles.col}>
                                    <View style={Styles.line} />
                                </View>
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ fontSize: 13, fontWeight: "400", color: Colors.btnColor }}>OR Login With  </Text>
                                </View>
                                <View style={Styles.col}>
                                    <View style={Styles.line} />
                                </View>
                            </View> */}
                            {/* <View style={{ height: 160 }}>
                                <View style={[commonCss.tfWrapper, { borderColor: this.state.is_emailFocus ? Colors.themeColor : Colors.lineColor }]}>
                                    <Text style={{ marginLeft: 30, marginTop: -9, width: 85, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                        EMAIL/PHONE
                                    </Text>
                                    <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, width: width - 90, fontSize: 14 }}
                                        ref="email"
                                        onFocus={() => this.setState({ is_emailFocus: true })}
                                        onBlur={() => this.setState({ is_emailFocus: false })}
                                        onChangeText={(val) => this.setState({ email: val })}
                                        value={this.state.email}
                                        keyboardType='email-address'
                                        onSubmitEditing={() => { this.refs.password.focus() }}
                                        returnKeyType='next'
                                    />
                                </View>
                                <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_passwordFocus ? Colors.themeColor : Colors.lineColor }]}>
                                    <Text style={{ marginLeft: 30, marginTop: -9, width: 70, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                        PASSWORD
                                    </Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, flex: 1, fontSize: 14 }}
                                            ref="password"
                                            onFocus={() => this.setState({ is_passwordFocus: true })}
                                            onBlur={() => this.setState({ is_passwordFocus: false })}
                                            onChangeText={(val) => this.setState({ password: val })}
                                            secureTextEntry={this.state.isPassHidden}
                                            value={this.state.password}
                                            onSubmitEditing={() => { this.login() }}
                                            returnKeyType='done'
                                        />
                                        <TouchableOpacity style={commonCss.lockWrapper} onPress={() => this.setState({ isPassHidden: !this.state.isPassHidden })}>
                                            <Image style={commonCss.lockIcon} source={Images.LOCK} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginTop: 12, height: 30, width: width - 40, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <TouchableOpacity style={{ height: 30, flex: 1, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                        <Image style={{ height: 25, width: 25 }} source={Images.TICK_GREEN} resizeMode="contain" />
                                        <Text style={{ marginLeft: 7, fontSize: 13, color: Colors.black, opacity: 0.8 }}>Remember me</Text>
                                    </TouchableOpacity>
                                    <Text style={[commonCss.secondTopLbl, { color: Colors.hyperlinkColor }]} onPress={() => this.props.navigation.navigate("ForgotPassword")}>Forgot Password?</Text>
                                </View>
                            </View>
                            <Button onPress={() => this.props.navigation.navigate("Home")
                                // this.login()
                            }
                            />
                            <Text style={commonCss.bottomLbl} onPress={() => this.props.navigation.navigate("About")}>Don't have any Account ? <Text> </Text>
                                <Text style={commonCss.hyperLink} onPress={() => {
                                    this.props.navigation.navigate("SignUp")
                                }}>Sign Up</Text>
                            </Text> */}
                            <Text style={Styles.lbl}>Si inicias sesión con Facebook y no eres un usuario de Zönte, serás registrado y aceptas los términos</Text>
                            <Text style={Styles.link} onPress={() => this.props.navigation.navigate("Terms")}>Términos y Condiciones <Text style={{ color: Colors.black }}>& </Text>
                                <Text onPress={() => this.props.navigation.navigate("Privacy")}>Política de Privacidad</Text>
                            </Text>
                            <View style={{ height: 70 }}></View>
                        </ScrollView>
                        <ActivityIndicator animating={this.state.animating} />
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        type: state.AuthReducer.type,
        user: state.AuthReducer.user,
        error: state.AuthReducer.error,
        loggedIn: state.AuthReducer.loggedIn
    }
}

export default connect(mapStateToProps, { login })(LoginScreen)


