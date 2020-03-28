
import React, { Component, Fragment } from 'react';
import {
    SafeAreaView, ScrollView, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView, Image, Text, Dimensions
} from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import { postAPI } from "../../utils/Api";
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';
const { height, width } = Dimensions.get("window")
const bg = require("../../Images/bg.jpg")

export default class Privacy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            policy: "",
            animated: false
        };
    }

    componentDidMount() {
        //this.privacy()
    }
    privacy() {
      
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <View style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1, backgroundColor: "red" }} source={bg} resizeMode="stretch">
                        <Header title="Política de Privacidad" is_left={true} onLeftPress={() => this.props.navigation.goBack()} />

                        <ScrollView>

                        </ScrollView>
                        <ActivityIndicator animating={this.state.animated} />
                    </ImageBackground>
                </View>
            </Fragment>
        );
    }
}



