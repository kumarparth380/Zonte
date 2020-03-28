import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, TextInput, View, ImageBackground, KeyboardAvoidingView, Image, Text, Dimensions, Platform } from 'react-native';
import { ActionCreators } from '@actions';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { signup } from '../../Actions/auth';
import Styles from './styles';
import commonCss from '../../Common/styles';
import ActivityIndicator from '../../Common/activityIndicator';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Common/colors';
import Button from '../../Common/button';
import Images from '../../Images';
const { height, width } = Dimensions.get("window");
import { validateFName, validateLName, validateMobileNo, validateEmail, validatePassword } from "../../Common/validation";
import EndPoint from '../../Endpoint';
import ActionTypes from '../../Actions/ActionTypes';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            contactNo: "",
            email: "",
            password: "",
            is_fnameFocus: false,
            is_lnameFocus: false,
            is_contactFocus: false,
            is_emailFocus: false,
            is_passwordFocus: false,
            ispassHidden: true,
            animating: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        //console.log('nextProps signup', nextProps);
        if (nextProps.type === ActionTypes.SIGN_UP_SUCCESS) {
            this.setState({ animating: false });
            //this.props.navigation.navigate("Login")
            setTimeout(() => { alert(nextProps.signedUp.message) }, 1000)
            this.props.navigation.goBack();
        } else {
            console.log('signup errororor', nextProps.error)
            this.setState({ animating: false });
            setTimeout(() => { alert(nextProps.error) }, 1000)
        }
    }

    signup = async () => {
        if (!validateFName(this.state.fName).status) {
            alert(validateFName(this.state.fName).error)
            this.refs.firstName.focus();
        } else if (!validateLName(this.state.lName).status) {
            alert(validateLName(this.state.lName).error)
            this.refs.lastName.focus();
        } else if (!validateMobileNo(this.state.contactNo).status) {
            alert(validateMobileNo(this.state.contactNo).error)
            this.refs.contactNo.focus();
        } else if (!validateEmail(this.state.email).status) {
            alert(validateEmail(this.state.email).error)
            this.refs.emailId.focus();
        } else if (!validatePassword(this.state.password).status) {
            alert(validatePassword(this.state.password).error)
            this.refs.password.focus();
        } else {
            const formData = new FormData();
            formData.append('first_name', this.state.fName);
            formData.append('last_name', this.state.lName);
            formData.append('contact_number', this.state.contactNo);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            await this.setState({ animating: true })
            this.props.signup(EndPoint.REGISTER, formData);
            //this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={commonCss.safeAreaStyle}>
                <KeyboardAvoidingView style={commonCss.KeyboardAvoidingView} behavior={Platform.OS == "ios" ? "padding" : null} >
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <ScrollView contentContainerStyle={commonCss.ScrollView} showsVerticalScrollIndicator={false}>
                            <Image style={[commonCss.logo, { marginTop: 70 }]} source={Images.LOGO} resizeMode="contain" />
                            <Text style={commonCss.topLbl}>Crea tu cuenta</Text>
                            <Text style={commonCss.secondTopLbl}>Ingresa tus datos</Text>
                            <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_fnameFocus ? Colors.themeColor : Colors.lineColor }]}>
                                <Text style={{ marginLeft: 30, marginTop: -9, width: 70, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                    Nombre<Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, width: width - 90 }}
                                    ref='firstName'
                                    onFocus={() => this.setState({ is_fnameFocus: true })}
                                    onBlur={() => this.setState({ is_fnameFocus: false })}
                                    onChangeText={(val) => this.setState({ fName: val })}
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.lastName.focus()}
                                />
                            </View>
                            <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_lnameFocus ? Colors.themeColor : Colors.lineColor }]}>
                                <Text style={{ marginLeft: 30, marginTop: -9, width: 70, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                    Apellido<Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, width: width - 90 }}
                                    ref='lastName'
                                    onFocus={() => this.setState({ is_lnameFocus: true })}
                                    onBlur={() => this.setState({ is_lnameFocus: false })}
                                    onChangeText={(val) => this.setState({ lName: val })}
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.contactNo.focus()}
                                />
                            </View>
                            <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_contactFocus ? Colors.themeColor : Colors.lineColor }]}>
                                <Text style={{ marginLeft: 30, marginTop: -9, width: 85, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                    Teléfono<Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, width: width - 90 }}
                                    ref='contactNo'
                                    onFocus={() => this.setState({ is_contactFocus: true })}
                                    onBlur={() => this.setState({ is_contactFocus: false })}
                                    onChangeText={(val) => this.setState({ contactNo: val })}
                                    keyboardType="phone-pad"
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.emailId.focus()}
                                />
                            </View>
                            <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { borderColor: this.state.is_emailFocus ? Colors.themeColor : Colors.lineColor }]}>
                                <Text style={{ marginLeft: 30, marginTop: -9, width: 55, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                    Email<Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, width: width - 90 }}
                                    ref='emailId'
                                    onFocus={() => this.setState({ is_emailFocus: true })}
                                    onBlur={() => this.setState({ is_emailFocus: false })}
                                    onChangeText={(val) => this.setState({ email: val })}
                                    keyboardType="email-address"
                                    returnKeyType='next'
                                    onSubmitEditing={() => this.refs.password.focus()}
                                />
                            </View>
                            <View style={[commonCss.tfWrapper, commonCss.wrapperTopMargin, { marginTop: 30, borderColor: this.state.is_passwordFocus ? Colors.themeColor : Colors.lineColor }]}>
                                <Text style={{ marginLeft: 30, marginTop: -9, width: 70, height: 20, textAlign: "center", backgroundColor: "#fff", fontSize: 11, fontWeight: "300" }}>
                                    Contraseña<Text style={{ color: "red" }}>*</Text>
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TextInput style={{ marginTop: -10, marginLeft: 30, height: 40, flex: 1 }}
                                        ref='password'
                                        onFocus={() => this.setState({ is_passwordFocus: true })}
                                        onBlur={() => this.setState({ is_passwordFocus: false })}
                                        onChangeText={(val) => this.setState({ password: val })}
                                        secureTextEntry={this.state.ispassHidden}
                                        returnKeyType='done'
                                        onSubmitEditing={() => this.signup()}
                                    />
                                    <TouchableOpacity style={commonCss.lockWrapper} onPress={() => this.setState({
                                        ispassHidden: !this.state.ispassHidden
                                    })}>
                                        <Image style={commonCss.lockIcon} source={Images.LOCK} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Button title="SIGNUP" onPress={() => this.signup()} />
                            <Text style={commonCss.bottomLbl}>¿Ya tienes cuenta?<Text> </Text>
                                <Text style={commonCss.hyperLink} onPress={() => this.props.navigation.goBack()}>Inicia sesión</Text>
                            </Text>
                            <View style={{ height: 70 }}>
                            </View>
                        </ScrollView>
                        <ActivityIndicator animating={this.state.animating} />
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    console.log('state signup', state)
    return {
        type: state.SignUpReducer.type,
        signedUp: state.SignUpReducer.signedUp,
        error: state.SignUpReducer.error
        //signedUp: state.AuthReducer.type === ActionTypes.SIGN_UP_SUCCESS ? state.AuthReducer.signedUp : state.AuthReducer.error,
    }
    // return {
    //     type: state.authReducers.signedUp,
    //     message: state.authReducers.message,
    //     loginData: state.authReducers.loginData,
    //     carts: state.cartsReducers.carts,
    // }
}

//   function mapDispatchToProps(dispatch) {
//     return bindActionCreators(ActionCreators, dispatch)
//   }

export default connect(mapStateToProps, { signup })(SignUpScreen)

