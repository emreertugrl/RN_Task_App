import {StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../utils/CustomText';

const EmptyList = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Icon name="text-box-remove" size={60} color="#900" />
      <CustomText style={styles.emptyText}>Yapılmış Task Yok</CustomText>
    </View>
  );
};
export default EmptyList;

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
