import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native'
import Colors from '../../Common/colors'
const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
    fbButtonWrapper: {
        marginTop: 25,
        height: 32,
        width: width - 40,
        backgroundColor: Colors.fbColor,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    fbIcon: {
        height: 30,
        width: 30,
    },
    fbLbl: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.white
    },
    orWrapper: {
        height: 50,
        width: width - 40,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center"
    },
    col: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.lineColor
    },
    line: {
        height: 1,
        width: "100%"
    },
    lbl: {
        marginTop: 40,
        lineHeight: 20,
        textAlign: "center",
        width: width - 40,
        fontSize: 13,
        fontWeight: "600",
        opacity: 0.8,
        color: Colors.lightBlack
    },
    link: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: "600",
        opacity: 0.8,
        color: Colors.btnColor
    }
})