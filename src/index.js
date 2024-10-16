import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Routes from './navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
const App = () => {
  return (
    <SafeAreaView style={styles.body}>
      <NavigationContainer>
        <Routes />
        <Toast />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
});
