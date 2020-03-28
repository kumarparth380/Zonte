
import React, { Component, Fragment } from 'react';
import {
    SafeAreaView, ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Text, Dimensions
} from 'react-native';
import Styles from './styles';
import commonCss from '../../Common/styles'
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';

export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <View style={commonCss.safeAreaStyle}>
                    <View style={{ flex: 1 }}>
                        <Header title="Sobre Zönte" is_left={true} onLeftPress={() => this.props.navigation.goBack()} />
                    </View>
                </View>
            </Fragment>
        );
    }
}



