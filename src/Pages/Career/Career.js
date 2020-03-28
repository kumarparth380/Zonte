
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Image, Text, FlatList, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../Common/header';
import ActivityIndicator from '../../Common/activityIndicator';
import Card from '../../Common/card';
import CardWithoutHeader from '../../Common/cardWithoutHeader';
import Colors from '../../Common/colors';
import Images from '../../Images';
import { postAPI } from '../../utils/Api';
import ActionTypes from '../../Actions/ActionTypes';
import Endpoint from "../../Endpoint";
import { connect } from 'react-redux';
import AdView from '../../Common/ad';

class Careers extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Profile'
    }

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            filterStream: ''
        };
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', this.willFocus)
    }

    willFocus = () => {
        const item = this.props.navigation.state.params.item;
        let formData = new FormData();
        formData.append('user_id', this.props.user.id);
        formData.append('programe_id', item.id);
        this.setState({ animating: true })
        postAPI(Endpoint.PROGRAM_STREAM, formData).then((response) => {
            console.log("Engineering=========>>>",JSON.stringify(response.resultData.stream_name))
            if (response.status == 1) {
                this.props.getStreamList({ type: ActionTypes.PROGRAMSTREAM_SUCCESS, payload: response });

            } else {
                this.props.getStreamList({ type: ActionTypes.PROGRAMSTREAM_FAIL, message: response.message });
            }
        }).catch((errMsg) => {
            this.props.getStreamList({ type: ActionTypes.PROGRAMSTREAM_FAIL, message: errMsg });
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type === ActionTypes.PROGRAMSTREAM_FAIL) {
            this.setState({ animating: false });
            setTimeout(() => { alert(nextProps.error) }, 500)
        } else {
            this.setState({ animating: false });
        }
    }

    _renderItem = ({ item, index }) => (
        <CardWithoutHeader title={item.stream_name} expanded={false} navigation={this.props.navigation}>
            <FlatList
                extraData={this.state}
                ref='flatlist2'
                showsVerticalScrollIndicator={false}
                data={item.degree_name}
                renderItem={this._renderSubItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </CardWithoutHeader>
    );

    _renderSubItem = ({ item, index }) => (
        <View style={styles.listItem}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <Text style={{ fontSize: 20, fontWeight: "400", color: Colors.black }}>
                    {item.degree_name}
                </Text>
            </ScrollView>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('CourseDetails', { item: item }) }}>
                <Image style={{ height: 20, width: 20 }} source={Images.RIGHT} />
            </TouchableOpacity>
        </View>
    );

    search = (val) => {
        this.setState({ filterStream: val })
    }

    render() {
        const { item, icon } = this.props.navigation.state.params;
        const filteredStream = this.props.streamList.filter((item) => { return item.stream_name.toLowerCase().match(this.state.filterStream.toLowerCase()) });
        console.log("Stream Name=====>>",item.stream_name)
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title='Carreras' is_left={true} is_right={false} is_search={true} onLeftPress={() => this.props.navigation.goBack()} onSearch={(val) => this.search(val)} />
                        <View style={{ flex: 1 }}>
                            <View style={styles.cardView}>
                                <Card title={item.programe_name} icon={icon} expanded={true} navigation={this.props.navigation}>
                                    <FlatList
                                        extraData={this.state}
                                        ref='flatlist1'
                                        showsVerticalScrollIndicator={false}
                                        data={filteredStream}
                                        renderItem={this._renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </Card>
                            </View>
                            <AdView />
                        </View>
                        <ActivityIndicator animating={this.state.animating} />
                    </ImageBackground>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        streamList: state.CareerReducer.streamList,
        error: state.CareerReducer.error,
        type: state.CareerReducer.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStreamList: (payload) => {
            dispatch(payload)
        }
    }
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        padding: 20,
    },
    listItem: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: Colors.borderColor
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Careers);


