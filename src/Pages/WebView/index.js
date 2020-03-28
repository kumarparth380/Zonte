import React, { Component, Fragment } from 'react';
import { WebView, SafeAreaView, StatusBar, BackHandler } from 'react-native';
import Header from '../../Common/header';
import Colors from '../../Common/colors';
import ActivityIndicator from '../../Common/activityIndicator';

export default class WebViews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.props.navigation.goBack();
        return true;
    }

    render() {
        const { item } = this.props.navigation.state.params;
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <Header title={item.uni_short_name} is_left={true} onLeftPress={() => this.props.navigation.goBack()} />
                    <WebView
                        source={{ uri: item.degree }}
                        useWebKit={true}
                        onLoadStart={() => { this.setState({ animating: true }) }}
                        onLoadEnd={() => { this.setState({ animating: false }) }}
                    />
                    <ActivityIndicator animating={this.state.animating} />
                </SafeAreaView>
            </Fragment>
        );
    }
}