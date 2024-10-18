import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../themes/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/SearchIcon.png';
import TodoItem from './../components/TodoItem';
import CustomBotton from '../components/CustomBotton';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskListScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([
    {id: 1, title: 'Task 1', userId: 1, status: 'closed'},
    {id: 2, title: 'Task 2', userId: 2, status: 'open'},
    {id: 3, title: 'Task 3', userId: 3, status: 'done'},
    {id: 4, title: 'Task 4', userId: 4, status: 'closed'},
    {id: 5, title: 'Task 5', userId: 5, status: 'closed'},
    {id: 6, title: 'Task 6', userId: 6, status: 'open'},
    {id: 7, title: 'Task 7', userId: 7, status: 'done'},
    {id: 8, title: 'Task 8', userId: 8, status: 'closed'},
  ]);

  // const clearAll = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   clearAll();
  // }, []);
  const loadTask = async () => {
    try {
      // AsyncStorage da taskları al
      const existingTask = await AsyncStorage.getItem('tasks');
      // tasks varsa bunu json çevir yoksa boş dizi ver
      const tasks = existingTask ? JSON.parse(existingTask) : {};
      // state'i güncelle
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };
  loadTask();
  return (
    <View style={styles.container}>
      <View style={styles.mainContentContainer}>
        <SafeAreaView style={[styles.container, {marginBottom: 20}]}>
          <CustomTextInput
            value={searchText}
            onChangeText={setSearchText}
            imageSource={SearchIcon}
            style={{marginHorizontal: 0}}
            placeholderTextColor={'gray'}
            placeholder="Task Ara"
          />
          <FlatList
            keyExtractor={item => item?.id.toString()}
            showsVerticalScrollIndicator={false}
            data={tasks}
            renderItem={({item}) => <TodoItem data={item} />}
          />
        </SafeAreaView>
        <CustomBotton
          label={'Add Task'}
          onPress={() => navigation.navigate(ScreenName.addTask)}
        />
      </View>
    </View>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  mainContentContainer: {
    height: '100%',
    padding: 20,
    width: Dimensions.get('screen').width,
  },
});
