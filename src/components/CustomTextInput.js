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
  ...rest
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <Image source={imageSource} style={styles.image} />
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
        />
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
});
