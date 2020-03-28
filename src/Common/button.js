import React, { Component } from 'react';
import {
    View, Image, Text, TouchableOpacity, Dimensions, StyleSheet
} from 'react-native';
const { height, width } = Dimensions.get("window");
import CommonCss from './styles';
import Colors from './colors';

class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={Styles.Btn} onPress={this.props.onPress}>
                <Text style={{ fontSize: 14, fontWeight: "500", color: Colors.white }}>{this.props.title ? this.props.title : "SUBMIT"}</Text>
            </TouchableOpacity>
        );
    }
}

export default Button;
const Styles = StyleSheet.create({
    Btn: {
        marginTop: 25,
        height: 40,
        width: width - 40,
        backgroundColor: Colors.btnColor,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        opacity: 0.9
    }
})