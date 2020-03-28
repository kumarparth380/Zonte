
import React, { Component, Fragment } from 'react';
import {
    SafeAreaView, TouchableOpacity, View, KeyboardAvoidingView, Image, Text, Dimensions, TextInput, ImageBackground
} from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../Common/colors';
import Button from '../../Common/button';
import Images from '../../Images';
const { height, width } = Dimensions.get("window")

export default class Report extends Component {

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





    render() {
        return (
            <View style={commonCss.safeAreaStyle}>
                <KeyboardAvoidingView
                    style={commonCss.KeyboardAvoidingView}
                    behavior="padding" enabled
                >
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <ScrollView contentContainerStyle={commonCss.ScrollView} showsVerticalScrollIndicator={false}>
                            <Image style={[commonCss.logo, { marginTop: 70 }]} source={Images.LOGO} resizeMode="contain" />
                            <Text style={commonCss.topLbl}>Reporta un Problema</Text>
                            <Text style={commonCss.secondTopLbl}>¿Cómo te podemos ayudar?</Text>

                            <View style={{ marginTop: 40, height: 180 }}>
                                <View style={{ height: 45, width: width - 40, borderRadius: 22, borderColor: this.state.isAffairFocus ? Colors.themeColor : Colors.lineColor, borderWidth: 0.5 }}>
                                    <TextInput style={{ flex: 1, paddingLeft: 15, }} placeholder="Affair"
                                        onFocus={() => this.setState({
                                            isAffairFocus: true
                                        })}
                                        onBlur={() => this.setState({
                                            isAffairFocus: false
                                        })}
                                    >
                                    </TextInput>
                                </View>
                                <View style={{ marginTop: 30, height: 100, width: width - 40, borderRadius: 22, borderColor: this.state.isDescFocus ? Colors.themeColor : Colors.lineColor, borderWidth: 0.5, justifyContent: 'center' }}>
                                    <TextInput style={{ flex: 1, margin: 15 }} multiline={true} placeholder="Describe tu tema aquí"
                                        onFocus={() => this.setState({
                                            isDescFocus: true
                                        })}
                                        onBlur={() => this.setState({
                                            isDescFocus: false
                                        })}
                                    >
                                    </TextInput>
                                </View>

                            </View>

                            <Button onPress={() => this.props.navigation.navigate("Home")} />

                        </ScrollView>
                    </ImageBackground>
                </KeyboardAvoidingView>
            </View>
        );
    }
}



