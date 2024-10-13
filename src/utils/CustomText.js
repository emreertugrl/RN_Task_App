import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomText = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    // fontSize: 16,
    color: 'black',
  },
});
