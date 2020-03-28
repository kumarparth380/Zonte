
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Image, Text, FlatList, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import Header from '../../Common/header';
import ActivityIndicator from '../../Common/activityIndicator';
import Colors from '../../Common/colors';
import Images from '../../Images';
import { postAPI } from '../../utils/Api';
import ActionTypes from '../../Actions/ActionTypes';
import Endpoint from "../../Endpoint";
import { connect } from 'react-redux';
import AdView from '../../Common/ad';

class CourseDetails extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Course Details'
    }

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            courseDetail: [],
            filterState: [],
            filterService: [],
            filterUniv: '',
            selectedUniv: null
        };
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', this.willFocus)
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        this.focusListener.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.backPress()
        return true;
    }

    willFocus = () => {
        const { item, filterState, filterService } = this.props.navigation.state.params;
        console.log('filterState', filterState)
        console.log('filterService', filterService)
        if (filterState == undefined && filterService == undefined) {
            let formData = new FormData();
            formData.append('user_id', this.props.user.id);
            formData.append('degree_id', item.id);
            this.setState({ animating: true })
            postAPI(Endpoint.COURSE_DETAIL, formData).then((response) => {
            console.log("123456789=========>>>",JSON.stringify(response))

                if (response.status == 1) {
                    this.props.getCourseDetail({ type: ActionTypes.COURSEDETAIL_SUCCESS, payload: response });
                } else {
                    this.props.getCourseDetail({ type: ActionTypes.COURSEDETAIL_FAIL, message: response.message });
                }
            }).catch((errMsg) => {
                this.props.getCourseDetail({ type: ActionTypes.COURSEDETAIL_FAIL, message: errMsg });
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type === ActionTypes.COURSEDETAIL_FAIL) {
            this.setState({ animating: false });
            setTimeout(() => { alert(nextProps.error) }, 500)
        } else {
            const { filterState, filterService } = nextProps.navigation.state.params;
            if (filterState != undefined || filterService != undefined) {
                if (filterState != undefined) {
                    this.setState({ filterState: filterState })
                }
                if (filterService != undefined) {
                    this.setState({ filterService: filterService })
                }
            } else {
                this.setState({ animating: false, courseDetail: nextProps.courseDetail });
            }
        }
    }

    _renderItem = ({ item, index }) => (
        <TouchableOpacity style={[styles.universityList, { backgroundColor: this.state.selectedUniv == item.uni_short_name ? Colors.cartSelecedColor : Colors.white }]} activeOpacity={0.9} onPress={() => this.openUrls(item)}>
            <Text style={{ marginLeft: 0, fontSize: 20, fontWeight: "400", color: Colors.universityColor }}>
                {item.uni_short_name}
            </Text>
            <Text style={{ marginLeft: 0, fontSize: 20, fontWeight: "400", color: Colors.lightBlack }}>
                {item.service} University
            </Text>
        </TouchableOpacity>
    );

    openUrls = (item) => {
        this.setState({ selectedUniv: item.uni_short_name })
        this.props.navigation.navigate('WebViews', { item: item })
    }

    search = (val) => {
        this.setState({ filterUniv: val })
    }

    filter = () => {
        this.props.navigation.navigate('Filter');
    }

    backPress = () => {
        this.setState({
            filterState: [],
            filterService: []
        })
        this.props.navigation.setParams({ filterState: undefined, filterService: undefined })
        //this.props.navigation.navigate('Careers');
        this.props.navigation.goBack()
    }

    render() {
        const item = this.props.navigation.state.params.item;
        console.log('item', item)
        const filterData = this.state.courseDetail.filter((items) => {
            return (this.state.filterState.length > 0 ? this.state.filterState.includes(items.state) : items.state)
                && (this.state.filterService.length > 0 ? this.state.filterService.includes(items.service) : items.service)
                && (items.uni_short_name.toLowerCase().match(this.state.filterUniv.toLowerCase()))
        })
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title={item.degree_name} is_left={true} is_search={true} is_filter={true} onLeftPress={() => this.backPress()} onSearch={(val) => this.search(val)} onFilter={() => this.filter()} />
                        <View style={{ flex: 1 }}>
                            <View style={styles.cardView}>
                                <FlatList
                                    extraData={this.state}
                                    ref='flatlist1'
                                    showsVerticalScrollIndicator={false}
                                    data={filterData}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                />
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
        courseDetail: state.CareerReducer.courseDetail,
        error: state.CareerReducer.error,
        type: state.CareerReducer.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCourseDetail: (payload) => {
            dispatch(payload)
        }
    }
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        padding: 20,
    },
    universityList: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetails);


