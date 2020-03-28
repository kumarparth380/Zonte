import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView, Text, Dimensions, Animated, Easing, UIManager, LayoutAnimation, Platform } from 'react-native';
import Colors from './colors';
import Images from '../Images';

export default class CardWithoutHeader extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
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

    toggle() {
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
            <View>
                <View style={styles.title}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <Text style={styles.headerText}>{this.props.title}</Text>
                    </ScrollView>
                    <TouchableOpacity onPress={!this.props.expanded && this.toggle} activeOpacity={0.8}>
                        <Animated.Image style={{ height: 20, width: 20, transform: [{ rotate: spin }] }} source={Images.RIGHT} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.expanded && this.props.children
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.borderColor
    },
    headerText: {
        fontSize: 20,
    },
});