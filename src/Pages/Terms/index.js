
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Text, Dimensions } from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';
const { height, width } = Dimensions.get("window")

export default class Terms extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <SafeAreaView style={commonCss.safeAreaStyle}>
                <View style={{ flex: 1 }}>
                    <Header title="TÉRMINOS Y CONDICIONES" is_left={true} onLeftPress={() => this.props.navigation.goBack()} />
                </View>
            </SafeAreaView>
        );
    }
}



