
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Image, Text, FlatList, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import Header from '../../Common/header';
import ActivityIndicator from '../../Common/activityIndicator';
import Card from '../../Common/card';
import Colors from '../../Common/colors';
import Images from '../../Images';
import { postAPI } from '../../utils/Api';
import ActionTypes from '../../Actions/ActionTypes';
import Endpoint from "../../Endpoint";
import { connect } from 'react-redux';
import Button from '../../Common/button';
import AdView from '../../Common/ad';

class Service extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Filters'
    }

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
            selectAll: false,
            serviceFilterList: []
        };
    }

    // componentDidMount() {
    //     this.props.navigation.addListener('willFocus', this.willFocus)
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        this.backPress();
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (this.props.serviceFilterList.length == 0) {
            let formData = new FormData();
            formData.append('user_id', this.props.user.id);
            this.setState({ animating: true })
            postAPI(Endpoint.SERVICE_LIST, formData).then((response) => {
                if (response.status == 1) {
                    this.props.getServiceList({ type: ActionTypes.SERVICELIST_SUCCESS, payload: response });
                } else {
                    this.props.getServiceList({ type: ActionTypes.SERVICELIST_FAIL, message: response.message + '****' + new Date().getTime() });
                }
            }).catch((errMsg) => {
                this.props.getServiceList({ type: ActionTypes.SERVICELIST_FAIL, message: errMsg });
            })
        } else {
            var tempArr = [...this.props.serviceFilterList]
            var count = 0;
            tempArr.map((item, index) => {
                if (item.isSelected) {
                    count += 1;
                }
            });
            this.setState({
                serviceFilterList: this.props.serviceFilterList,
                selectAll: this.props.serviceFilterList.length == count ? true : false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type === ActionTypes.SERVICELIST_FAIL) {
            this.setState({ animating: false });
            setTimeout(() => { alert(nextProps.error.split('****')[0]) }, 500)
        } else {
            if (this.state.serviceFilterList.length == 0) {
                var tempArr = [...nextProps.serviceFilterList]
                tempArr.map((item, index) => item.isSelected = false);
                this.setState({ serviceFilterList: tempArr, animating: false })
            }
        }
    }

    _renderItem = ({ item, index }) => (
        item.service != null &&
        <View style={styles.listItem}>
            <TouchableOpacity style={[styles.checkbox, { borderColor: this.state.selectAll || item.isSelected ? 'transparent' : Colors.borderColor }]} onPress={() => this.selectService(item.service)}>
                {
                    (this.state.selectAll || item.isSelected) && <Image style={{ height: 30, width: 30 }} source={Images.TICK_GREEN} />
                }
            </TouchableOpacity>
            <Text style={{ marginLeft: 0, fontSize: 20, fontWeight: "400", color: Colors.black }}>
                {item.service}
            </Text>
        </View>
    );

    selectAll = () => {
        var tempArr = [...this.state.serviceFilterList]
        if (this.state.selectAll) {
            tempArr.map((item, index) => item.isSelected = false);
        } else {
            tempArr.map((item, index) => item.isSelected = true);
        }
        this.setState({
            serviceFilterList: tempArr,
            selectAll: !this.state.selectAll
        })
    }

    selectService = (service) => {
        const serviceList = [...this.state.serviceFilterList];
        let index = serviceList.findIndex((item) => { return item.service == service })
        serviceList[index].isSelected = !serviceList[index].isSelected;
        this.setState({
            serviceFilterList: serviceList,
            selectAll: false
        })
    }

    setFilterService = () => {
        const filterArr = [];
        this.state.serviceFilterList.map((item) => {
            if (item.isSelected) {
                filterArr.push(item.service)
            }
        })
        return filterArr
    }

    backPress = () => {
        var tempArr = this.props.serviceFilterList
        tempArr.map((item, index) => item.isSelected = false);
        this.setState({ serviceFilterList: tempArr })
        // this.props.navigation.navigate('Filter', { filterService: [] })
        this.props.navigation.goBack();
    }

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title='Filtros' is_left={true} is_right={false} onLeftPress={() => this.backPress()} />
                        <View style={{ flex: 1 }}>
                            <View style={styles.cardView}>
                                <Card title='Servicio' icon={Images.SERVICE} expanded={true} navigation={this.props.navigation}>
                                    <FlatList
                                        extraData={this.state}
                                        ref='flatlist1'
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.serviceFilterList}
                                        ListHeaderComponent={() => {
                                            return (
                                                <View style={styles.listItem}>
                                                    <TouchableOpacity style={[styles.checkbox, { borderColor: this.state.selectAll ? 'transparent' : Colors.degreeHeader }]} onPress={() => this.selectAll()}>
                                                        {
                                                            this.state.selectAll && <Image style={{ height: 30, width: 30 }} source={Images.TICK_ORANGE} />
                                                        }
                                                    </TouchableOpacity>
                                                    <Text style={{ marginLeft: 0, fontSize: 20, fontWeight: "400", color: Colors.black }}>
                                                    Seleccionar Todos
                                                    </Text>
                                                </View>
                                            )
                                        }}
                                        renderItem={this._renderItem}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </Card>
                                <Button title="Aplicar" onPress={() => this.props.navigation.navigate('CourseDetails', { filterService: this.setFilterService() })} />
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
        serviceFilterList: state.FilterReducer.serviceFilterList,
        error: state.FilterReducer.error,
        type: state.FilterReducer.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getServiceList: (payload) => {
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
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 6,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Service);


