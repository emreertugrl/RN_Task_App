import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import colors from '../themes/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/SearchIcon.png';
import TodoItem from './../components/TodoItem';
import CustomBotton from '../components/CustomBotton';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyList from '../components/EmptyList';
import CustomText from '../utils/CustomText';

const TaskListScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadTask();
    }, []),
  );
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

  const handleDeleteTask = async id => {
    try {
      // bastığımızda elemanın idsine göre task state'ini filtrele ve depşkene aktar
      const updatedTasks = tasks.filter(task => task.id !== id);
      // tasks stateini güncelle
      setTasks(updatedTasks);
      // AsyncStorage'daki taskları güncelle
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.log(error, 'failed to delete task');
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerText}>Task Listesi</CustomText>
      </View>
    );
  };

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
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={EmptyList}
            data={tasks}
            renderItem={({item}) => (
              <TodoItem
                data={item}
                onDelete={() => handleDeleteTask(item.id)}
              />
            )}
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
  headerContainer: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
});
