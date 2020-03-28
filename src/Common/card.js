import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, Animated, Easing, UIManager, LayoutAnimation, Platform } from 'react-native';
import Colors from '../Common/colors';
import Images from '../Images';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: props.expanded,
        }
        this.spinValue = props.expanded ? new Animated.Value(1) : new Animated.Value(0)
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
        this.props.navigation.addListener('willBlur', this.willBlur)
    }

    willBlur = () => {
        if (!this.props.expanded) {
            this.setState({ expanded: false })
            this.spinValue = new Animated.Value(0)
        }
    }

    toggle = () => {
        Animated.timing(this.spinValue, {
            toValue: this.state.expanded ? 0 : 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true
        }).start();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg']
        });

        return (
            <View style={styles.titleContainer} >
                <TouchableOpacity style={styles.title} onPress={() => { !this.props.expanded && this.toggle }} activeOpacity={0.8}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor:'transparent' }}>
                        <Image style={{ height: 35, width: 35 }} resizeMode='contain' source={this.props.icon} />
                        <Text style={styles.headerText}>{this.props.title}</Text>
                    </View>
                    <Animated.Image style={{ height: 20, width: 20, tintColor: Colors.white, transform: [{ rotate: spin }] }} source={Images.RIGHT} />
                </TouchableOpacity>
                {
                    this.state.expanded && this.props.children
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    titleContainer: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 1
    },
    title: {
        backgroundColor: Colors.degreeHeader,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    headerText: {
        marginLeft: 20,
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
});