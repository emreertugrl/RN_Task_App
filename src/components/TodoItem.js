import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from '../utils/CustomText';
import colors from './../themes/Colors';
import StatusButton from './StatusButton';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TodoItem = ({data}) => {
  //
  const navigation = useNavigation();

  // console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.itemHeader}>
        <CustomText
          style={[
            styles.taskTitle,
            {
              textDecorationLine:
                data?.status === 'closed' ? 'line-through' : null,
            },
          ]}>
          {data?.title?.toUpperCase()}
        </CustomText>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  data.status === ('open' || 'progress')
                    ? '#CAF6CB'
                    : '#FECCB1',
              },
            ]}>
            <CustomText
              style={{
                color:
                  data.status === ('open' || 'progress')
                    ? '#72966F'
                    : '#D6825C',
              }}>
              {data?.status?.toUpperCase()}
            </CustomText>
          </View>
          <StatusButton
            iconName="pencil"
            color="black"
            size={20}
            onPress={() => navigation.navigate(ScreenName.addTask)}
          />
          <StatusButton
            iconName="delete"
            color="#c0695e"
            size={20}
            onPress={() => ''}
          />
        </View>
      </View>
      <CustomText style={styles.taskDescription}>
        {data?.description}
      </CustomText>
      <View style={styles.footerContainer}>
        <View>
          <CustomText>Başlangıç Tarihi</CustomText>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" size={15} color={colors.primary} />
            <CustomText style={styles.timeText}>15.10.2024 - 18.59</CustomText>
          </View>
        </View>
        <View>
          <CustomText>Bitiş Tarihi</CustomText>
          <View style={styles.timeContainer}>
            <Icon name="clock-outline" size={15} color={colors.primary} />
            <CustomText style={styles.timeText}>25.10.2024 - 18.59</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  statusContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  taskDescription: {},
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timeText: {
    color: colors.primary,
    fontWeight: '600',
    marginHorizontal: 5,
    fontSize: 12,
  },
});

export default TodoItem;
