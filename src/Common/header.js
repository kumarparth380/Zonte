import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, UIManager, LayoutAnimation, Platform, ScrollView } from 'react-native';
import CommonCss from './styles';
import Images from '../Images';
import Colors from '../Common/colors';

class CustomHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
        }
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }

    showHideSearch = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ isSearch: !this.state.isSearch })
        this.props.onSearch('')
    }

    render() {
        return (
            <View>
                <View style={CommonCss.headerStyle}>
                    {this.props.is_left ? <TouchableOpacity style={{ height: "100%", width: 50, flexDirection: "row", justifyContent: "center" }} onPress={() => this.props.onLeftPress()}>
                        <Image style={{ height: 20, alignSelf: "center" }} source={Images.BACK} resizeMode="contain" />
                    </TouchableOpacity> : <TouchableOpacity style={{ height: "100%", width: 50, flexDirection: "row", justifyContent: "center" }} onPress={() => this.props.openDrawer()}>
                            <Image style={{ height: 30, width: 30, alignSelf: "center", tintColor: "#fff" }} source={Images.MENU} resizeMode="center" />
                        </TouchableOpacity>
                    }
                    {
                        this.state.isSearch ?
                            <TextInput
                                placeholder='buscar'
                                onChangeText={(val) => { this.props.onSearch(val) }}
                                style={{ flex: 1, backgroundColor: Colors.white, height: '80%', borderRadius: 6, paddingLeft: 5, fontSize: 15, paddingVertical: 0 }}
                            /> :

                            this.props.title.length > 24 ?
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 17, opacity: 1, zIndex: 999, fontWeight: "700", textAlign: 'center', alignSelf: "center", color: "#fff" }}>{this.props.title}</Text>
                                </ScrollView> :
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 17, opacity: 1, zIndex: 999, fontWeight: "700", textAlign: 'center', alignSelf: "center", color: "#fff" }}>{this.props.title}</Text>
                                </View>

                    }
                    {/* {
                        this.props.is_right ?
                            <View style={{ flexDirection: 'row', height: '100%' }}>
                                <TouchableOpacity style={{ height: "100%", width: 50, justifyContent: "center", alignItems: 'center' }} onPress={() => this.props.onSearch()}>
                                    <Image style={{ height: 20, width: 20 }} source={Images.SEARCH} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height: "100%", width: 50, justifyContent: "center", alignItems: 'center' }} onPress={() => this.props.onFilter()}>
                                    <Image style={{ height: 20, width: 20 }} source={Images.FILTER} />
                                </TouchableOpacity>
                            </View> : !this.state.isSearch && <View style={{ width: 50 }} />
                    } */}
                    {
                        this.props.is_search && !this.state.isSearch &&
                        <TouchableOpacity style={{ height: "100%", width: 50, justifyContent: "center", alignItems: 'center' }} onPress={() => this.showHideSearch()}>
                            <Image style={{ height: 20, width: 20 }} source={Images.SEARCH} />
                        </TouchableOpacity>
                    }
                    {
                        this.props.is_search && this.state.isSearch &&
                        <TouchableOpacity style={{ height: "100%", width: 50, justifyContent: "center", alignItems: 'center' }} onPress={() => this.showHideSearch()}>
                            <Image style={{ height: 20, width: 20 }} source={Images.CROSS} />
                        </TouchableOpacity>
                    }
                    {
                        this.props.is_filter &&
                        <TouchableOpacity style={{ height: "100%", width: 50, justifyContent: "center", alignItems: 'center' }} onPress={() => this.props.onFilter()}>
                            <Image style={{ height: 20, width: 20 }} source={Images.FILTER} />
                        </TouchableOpacity>
                    }
                    {
                        !this.props.is_filter && !this.props.is_search && <View style={{ width: 50 }} />
                    }
                </View>
            </View>
        );
    }
}

export default CustomHeader;