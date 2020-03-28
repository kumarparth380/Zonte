import { StyleSheet,Dimensions } from 'react-native'
import Colors from '../Common/colors'
const { height, width } = Dimensions.get("window")

//For common css
export default StyleSheet.create({
    safeAreaStyle: {
        flex: 1,
        backgroundColor: Colors.white

    },
    KeyboardAvoidingView: {
        flex: 1,
    },
    ScrollView: {
        alignItems: "center"
    },
    logo: {
        marginTop: 20,
        height: 60
    },
    topLbl: {
        marginTop: 25,
        fontSize: 18,
        fontWeight: "400",
        color: Colors.black
    },
    secondTopLbl: {
        lineHeight: 20,
        fontSize: 11,
        fontWeight: "400",
        color: Colors.themeColor
    },
    container: {
        flex: 1,
        backgroundColor: "#1A3635",
        justifyContent: 'flex-start',
    },
    headerStyle: {
        width: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        opacity: 0.9,
        backgroundColor: Colors.themeColor,
        flexDirection: "row",
    },
    bottomLbl: {
        marginTop: 30,
        fontSize: 14,
        fontWeight: "600",
        opacity: 0.8,
        color: Colors.lightBlack
    },
    hyperLink: {
        color: Colors.hyperlinkColor,
        fontSize: 16,
        textDecorationLine: "underline"
    },
    tfWrapper: { height: 45, width: width - 40, borderRadius: 22, borderWidth: 0.5 },
    wrapperTopMargin:{marginTop:30},
    lockWrapper:{height:25, width:35,  justifyContent:"center"},
    lockIcon:{height:20, width:20}

})