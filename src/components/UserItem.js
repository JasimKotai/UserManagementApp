import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {mvs, s, vs} from 'react-native-size-matters';

const UserItem = ({item, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UserDetailScreen', {item: item});
      }}
      activeOpacity={0.8}
      style={styles.container}>
      <Image source={{uri: item.picture.medium}} style={styles.profile} />
      <Text numberOfLines={1} style={styles.userName}>
        {item.name.first} {item.name.last}
      </Text>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: s(20),
    alignItems: 'center',
    gap: s(10),
    marginBottom: vs(15),
    backgroundColor: '#fff',
    borderRadius: s(5),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  profile: {
    width: s(50),
    height: s(50),
    resizeMode: 'cover',
    borderRadius: s(5),
  },
  userName: {
    color: '#404040',
    fontSize: mvs(13),
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    // backgroundColor: 'green',
  },
});
