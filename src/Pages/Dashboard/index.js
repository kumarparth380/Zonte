import React, { Component, Fragment } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, View, Image, Text, Dimensions, FlatList, ImageBackground, ScrollView } from 'react-native';
import Header from '../../Common/header'
import ActivityIndicator from '../../Common/activityIndicator'
import Colors from '../../Common/colors';
import { connect } from 'react-redux';
import Endpoint from '../../Endpoint';
import ActionTypes from '../../Actions/ActionTypes';
import Images from '../../Images';
const { width } = Dimensions.get("window");
import { postAPI } from '../../utils/Api';
import AdView from '../../Common/ad'

class Dashboard extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Dashboard'
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: null,
            animating: false
        };
    }

    componentDidMount() {
        let formData = new FormData();
        formData.append('user_id', this.props.user.id);
        this.setState({ animating: true })
        postAPI(Endpoint.PROGRAM_LISTING, formData).then((response) => {
            console.log("Careers dashboard===============>>>>",response)
            if (response.status == 1) {
                this.props.getProgramList({ type: ActionTypes.PROGRAMLIST_SUCCESS, payload: response });
            } else {
                this.props.getProgramList({ type: ActionTypes.PROGRAMLIST_FAIL, message: response.message });
            }
        }).catch((errMsg) => {
            this.props.getProgramList({ type: ActionTypes.PROGRAMLIST_FAIL, message: errMsg });
        })
    }

    componentWillReceiveProps(nextProps, nextState) {
        console.log('nextProps dashboard', nextProps);
        if (nextProps.type === ActionTypes.PROGRAMLIST_FAIL) {
            this.setState({ animating: false });
            setTimeout(() => { alert(nextProps.error) }, 500)
        } else {
            this.setState({ animating: false });
        }
    }

    selectOption(index, item, icon) {
        this.setState({
            selectedIndex: index
        })
        this.props.navigation.navigate("Careers", { item: item, icon: icon })
    }

    _renderItem = ({ item, index }) => (
        item.programe_name != null &&
        <TouchableOpacity
            activeOpacity={0.8}
            style={[{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: this.state.selectedIndex == index ? Colors.cartSelecedColor : '#fff',
                // flex: 1,
                width: (width - 44) / 2,
                height: 100,
                borderRadius: 4,
                marginLeft: 6,
                marginRight: 6,
                //marginTop: 15,
                marginBottom: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }]}
            onPress={() => this.selectOption(index, item, this.programImage(item.id))}>
            <Image source={this.programImage(item.id)} style={{ height: 40, width: 40 }} resizeMode="contain" />
            <Text style={{ lineHeight: 25, fontSize: 13, fontWeight: "400", color: Colors.black }}>{item.programe_name}</Text>
            <Text style={{ marginTop: -5, fontSize: 10, fontWeight: "300", opacity: 0.8, color: Colors.black }}>{item.subtitle}</Text>
        </TouchableOpacity>
    );

    programImage = (id) => {
        switch (id) {
            case 1:
                return Images.BACHLOR_DEGREE;
            case 2:
                return Images.ENGINEERING;
            case 3:
                return Images.EXECUTIVES;
            case 4:
                return Images.ONLINE_COURSES;
            case 5:
                return Images.TSU;
            case 6:
                return Images.POPULAR_COURSES;
        }
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title="Carreras" openDrawer={() => this.props.navigation.openDrawer()} />
                        <View style={{ flex: 1, alignItems: "center", }}>
                            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                                <FlatList
                                    extraData={this.state}
                                    contentContainerStyle={{ width: width - 20, flex: 1, marginBottom: 10 }}
                                    data={this.props.programList}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={this._renderItem}
                                />
                            </ScrollView>
                            <AdView />
                        </View>
                    </ImageBackground>
                </SafeAreaView>
                <ActivityIndicator animating={this.state.animating} />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        programList: state.CareerReducer.programList,
        error: state.CareerReducer.error,
        type: state.CareerReducer.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProgramList: (payload) => {
            dispatch(payload)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


//https://i.diawi.com/7EDLT4
