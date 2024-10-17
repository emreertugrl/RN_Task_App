import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomText from '../utils/CustomText';
import colors from './../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageKey from '../constants/AsyncStorageKey';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('screen').width;

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem(AsyncStorageKey.onboardingComplete, 'true');
    navigation.replace('AddTask');
  };
  return (
    <View style={styles.container}>
      <View style={styles.ellipseBackground}>
        <View style={styles.innerContainer}>
          <View style={styles.imgContainer}>
            <Image
              source={require('../assets/images/Task2x.png')}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.footerContainer}>
            <CustomText style={styles.title}>Haydi İşlerini Planla</CustomText>
            <TouchableOpacity
              onPress={handleOnboardingComplete}
              style={styles.buttonContainer}>
              <CustomText style={styles.plus}>+</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  ellipseBackground: {
    width: width,
    backgroundColor: colors.primary,
    height: '70%',
    borderBottomLeftRadius: width / 2,
    borderBottomRightRadius: width / 2,
    transform: [{scaleX: 1.5}],
  },
  innerContainer: {
    width: width,
    height: '100%',
    position: 'absolute',
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 110,
  },
  image: {
    width: 400,
    height: 400,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  title: {
    color: colors.text.secondary,
    marginTop: 40,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    margin: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  plus: {
    color: colors.background.primary,
    fontSize: 50,
    alignSelf: 'center',
  },
});
