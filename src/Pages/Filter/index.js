
import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Image, Text, Dimensions, FlatList, ImageBackground, TouchableOpacity, BackHandler } from 'react-native';
import Header from '../../Common/header';
import Colors from '../../Common/colors';
import Images from '../../Images';
import AdView from '../../Common/ad';

const filterData = [
    {
        type: 'Estado',
        icon: Images.STATE
    },
    {
        type: 'Servicio',
        icon: Images.SERVICE
    }
]

class Filter extends Component {
    static navigationOptions = {
        drawerIcon: (<Image source={Images.FB} style={{ height: 30, width: 30 }} />),
        drawerLabel: 'Filter'
    }

    constructor(props) {
        super(props);
        this.state = {
            animating: false,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = async () => {
        //this.props.navigation.navigate('CourseDetails');
        this.props.navigation.goBack();
        return true;
    }

    renderFilter = ({ item, index }) => (
        <TouchableOpacity style={styles.filterList} onPress={() => { this.props.navigation.navigate(item.type) }} activeOpacity={0.8}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ height: 35, width: 35 }} source={item.icon} resizeMode='contain' />
                <Text style={styles.headerText}>{item.type}</Text>
            </View>
            <Image style={{ height: 20, width: 20, tintColor: Colors.black }} source={Images.RIGHT} />
        </TouchableOpacity>
    );

    render() {
        return (
            <Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.themeColor, opacity: 0.9 }} />
                <StatusBar backgroundColor={Colors.themeColor} barStyle="light-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <ImageBackground style={{ flex: 1 }} source={Images.BACKGROUND_JPG} resizeMode="stretch">
                        <Header title='Filtros' is_left={true} is_right={false} onLeftPress={() => this.props.navigation.goBack()} />
                        <View style={{ flex: 1 }}>
                            <View style={styles.filterView}>
                                <FlatList
                                    data={filterData}
                                    renderItem={this.renderFilter}
                                />
                            </View>
                            <AdView />
                        </View>
                    </ImageBackground>
                </SafeAreaView>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    filterView: {
        flex: 1,
        padding: 20,
    },
    filterList: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginBottom: 20
    },
    headerText: {
        marginLeft: 20,
        color: Colors.black,
        fontSize: 20,
        fontWeight: 'bold'
    },
})

export default Filter;


