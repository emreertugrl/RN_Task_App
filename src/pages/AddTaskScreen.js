import {StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomText from './../utils/CustomText';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../themes/Colors';
import CustomBotton from '../components/CustomBotton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
//
const AddTaskScreen = () => {
  // navigation
  const navigation = useNavigation();
  const route = useRoute();

  //
  const {data} = route.params || {};
  // tarihlerin tutulması
  const [startDate, setStartDate] = useState(data?.startDate || '');
  const [endDate, setEndDate] = useState(data?.endDate || '');
  // inputlarda seçilen değerler
  const [title, setTitle] = useState(data?.title || '');
  // dropdownpicker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(data?.status || null);
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data ? 'Update Task' : 'Add Task',
    });
  }, [navigation, data]);
  // isStartDatePickerVisible
  const [isStartDatePickerVisible, setStartDatePickerVisiblity] =
    useState(false);
  // start date
  useState(false);
  const hideStartDatePicker = () => {
    setStartDatePickerVisiblity(false);
  };
  const showStartDatePicker = () => {
    setStartDatePickerVisiblity(true);
  };
  const handleConfirmStartDate = date => {
    setStartDate(date.toString());
    hideStartDatePicker();
  };
  // end date

  const [isEndDatePickerVisible, setEndDatePickerVisiblity] = useState(false);

  const hideEndDatePicker = () => {
    setEndDatePickerVisiblity(false);
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisiblity(true);
  };
  const handleConfirmEndDate = date => {
    setEndDate(date.toString());
    hideEndDatePicker();
  };

  // addtask ile gönderilecek obje
  const handleAddTask = async () => {
    // eğer title boş ise hata ver
    if (!title || !startDate || !endDate || !value) {
      Toast.show({
        type: 'info',
        text1: 'Bilgi',
        text2: 'Lüften tüm alanları doldurun',
        topOffset: 60,
      });
      return;
    }

    // eğer data var ise update et, yok ise yeni ekleme yap
    // AsyncStorage'daki taskları al
    // eğer task varsa al, yok ise boş bir dizi ver
    // dat varsa taskların idsi ile data id birbirine eşitse yeni objeyi gönder değilse task kalsın
    // dat yoksa yeni oluşturulan veriyi tasks dizisine ekle
    // verileri AsyncStorage string olarak ekledik.
    //
    // yeni eklenen taskın objesi
    const newTask = {
      id: data?.id || uuid.v4(),
      title,
      startDate,
      endDate,
      status: value,
    };
    try {
      // AsyncStorage task verileri varsa al
      const existingTask = await AsyncStorage.getItem('tasks');
      // veri varsa json çevir yoksa da boş bir dizi ver
      let tasks = existingTask ? JSON.parse(existingTask) : [];
      //
      if (data) {
        // dat varsa taskların idsi ile data id birbirine eşitse yeni objeyi gönder değilse task kalsın
        tasks = tasks.map(task => (task.id === data.id ? newTask : task));
      } else {
        // data yoksa yeni oluşturulan veriyi tasks dizisine ekle
        tasks.push(newTask);
      }
      // veriyi AsyncStorage string olarak ekledik.
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      // bildirim
      Toast.show({
        type: 'success',
        text1: data ? 'Task Güncellendi' : 'Task Eklendi',
        topOffset: 60,
      });
      // başarılı bir şekilde eklenmişse taskList'e yönlendir
      navigation.navigate(ScreenName.taskList);
    } catch (error) {
      console.log(error, 'Failed to save task');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <View style={styles.taskImageContainer}>
          <LottieView
            style={{height: 200, width: '100%'}}
            source={require('../assets/animations/pencil.json')}
            autoPlay
            loop
          />
        </View>
        <CustomTextInput
          imageSource={TaskNameIcon}
          label={'Task Adı'}
          onChangeText={setTitle}
          value={title}
        />
        <View style={{flexDirection: 'row'}}>
          <CustomTextInput
            onPressIcon={() => showStartDatePicker()}
            style={{width: '40%'}}
            imageSource={TaskNameIcon}
            label={'Başlangıç Zamanı'}
            value={startDate}
            onChangeText={setStartDate}
            isDate
          />
          <CustomTextInput
            onPressIcon={() => showEndDatePicker()}
            style={{width: '40%'}}
            imageSource={TaskNameIcon}
            label={'Bitiş Zamanı'}
            value={endDate}
            onChangeText={setEndDate}
            isDate // tarih olduğunu belirtmek için mecburi gönderilir.
          />
        </View>
        <View style={styles.dropDownContainer}>
          <View>
            <CustomText style={styles.status}>Status</CustomText>
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              // placeholder={'Select an Item'} özelleştirme için
              containerStyle={{width: '90%'}}
              style={{
                borderWidth: 0,
              }}
              dropDownContainerStyle={{borderWidth: 0}} //açılır yapının stilleri
            />
          </View>
        </View>
      </View>

      <CustomBotton
        onPress={handleAddTask}
        label={data ? 'Update Task' : 'Save Task'}
        style={{width: '90%'}}
      />
      {/* Start */}
      <DateTimePicker
        style={{color: 'black'}}
        isVisible={isStartDatePickerVisible}
        onConfirm={handleConfirmStartDate}
        onCancel={hideStartDatePicker}
        mode="datetime"
      />
      {/* End*/}
      <DateTimePicker
        isVisible={isEndDatePickerVisible}
        onConfirm={handleConfirmEndDate}
        onCancel={hideEndDatePicker}
        mode="datetime"
      />
    </View>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  inlineContainer: {
    width: '100%',
  },
  taskImageContainer: {
    marginTop: 60,
  },
  dropDownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 100,
  },
  status: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: colors.text.primary,
  },
});
