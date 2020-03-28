import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, Modal } from 'react-native';
import colors from "../Common/colors"

export default ActivityIndicatorExample = (props) => {
  return (
    <Modal transparent={true} visible={props.animating}>
      <View style={styles.container}>
        <ActivityIndicator style={styles.activityIndicator} size="large" color={colors.themeColor} />
      </View>
    </Modal>
  );
}

//For ActivityIndicator style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});
