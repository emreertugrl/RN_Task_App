import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../utils/CustomText';

const OnboardingScreen = () => {
  return (
    <View style={styles.container}>
      <CustomText>OnboardingScreen</CustomText>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
