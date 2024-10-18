import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from './../utils/CustomText';
import colors from '../themes/Colors';

const CustomTextInput = ({
  imageSource,
  onChangeText,
  value,
  style,
  label,
  onPressIcon,
  isDate,
  ...rest
}) => {
  return (
    <TouchableOpacity
      disabled={onPressIcon ? false : true}
      onPress={onPressIcon}
      style={[styles.container, style]}>
      <CustomText style={styles.label}>{label}</CustomText>
      <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.image} />
        {!onPressIcon ? (
          <TextInput
            {...rest}
            value={value}
            onChangeText={onChangeText}
            style={styles.textInput}
          />
        ) : (
          <CustomText>{value}</CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 16,
    padding: 0,
  },
  label: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
});
