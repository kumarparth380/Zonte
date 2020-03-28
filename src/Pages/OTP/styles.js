import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native'
import Colors from '../../Common/colors'
const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  tf:{ height: 40, width: 40, borderBottomColor: Colors.black, borderBottomWidth: 0.5, textAlign: "center" }
})