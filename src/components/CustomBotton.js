import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from '../utils/CustomText';
import colors from '../themes/Colors';

const CustomBotton = ({label, style, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <CustomText style={styles.label}>{label}</CustomText>
    </TouchableOpacity>
  );
};

export default CustomBotton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    padding: 10,
    marginBottom: 5,
  },
  label: {
    color: colors.white,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
