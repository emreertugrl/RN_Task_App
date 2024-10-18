import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './../utils/CustomText';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../themes/Colors';
import CustomBotton from '../components/CustomBotton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import uuid from 'react-native-uuid';
//
const AddTaskScreen = () => {
  // navigation
  const navigation = useNavigation();

  //
  const {data} = {};
  // tarihlerin tutulması
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // inputlarda seçilen değerler
  const [title, setTitle] = useState('');
  // dropdownpicker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);
  // datetimepicker
  const [isDatePickerVisible, setDatePickerVisiblity] = useState(false);
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
    console.warn(date);
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
    // yeni eklenen taskın objesi
    const newTask = {
      id: uuid.v4(),
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
        tasks = tasks.map(task => (task.id === data.id ? newTask : task));
      } else {
        tasks.push(newTask);
      }
      // veriyi AsyncStorage string olarak ekledik.
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
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
        label={'Save Task'}
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
