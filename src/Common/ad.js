import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '../Images';
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'react-native-admob';

export default class AdScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    async componentDidMount() {
    }

    bannerError = (error) => {
        console.log('ErrorBanner', error)
    }

    render() {
        return (
            <View style={{ width: "100%", height: 50, backgroundColor: "transparent", alignItems: 'center' }}>
                {/* <Image resizeMode='contain' style={{ width: "100%", height: 85 }} source={Images.BANNER} /> */}
                <AdMobBanner
                    adSize="banner"
                    bannerSize="smartBannerPortrait"
                    // adUnitID="ca-app-pub-4722647490840924/3540292555"
                    adUnitID="ca-app-pub-3940256099942544/2934735716"
                    didFailToReceiveAdWithError={this.bannerError} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

})

//2083349125067491  fbid
//ca-app-pub-4722647490840924~2526593787
//https://support.google.com/admob/answer/7311346?hl=en
//ca-app-pub-4703091763520652/9171559983 me
//kl6BssSvMUdmPMN26Pho8JRDIZ0=  debug
//04gM+EAfhnq4ALbhOX8jG5oRuow= not confirm
//CEeNJv17vB3g8zfGgou6q83TLmQ=  release confirm

//KeyAlias: key0
//password: 123456
