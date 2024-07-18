import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {mvs, s, vs} from 'react-native-size-matters';
import Header from '../components/Header';
import {
  Earth,
  Hourglass,
  PersonStanding,
  Phone,
  User,
} from 'lucide-react-native';

const UserDetailScreen = ({route, navigation}) => {
  const {item} = route.params;

  const dob = new Date(item.dob.date);
  // eslint-disable-next-line prettier/prettier
  const formattedDob = `${dob.getDate()}-${dob.getMonth() + 1}-${dob.getFullYear()}`;
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={'Profile'} />

      <View style={styles.profileCon}>
        {/* profile picture */}
        <Image source={{uri: item?.picture?.large}} style={styles.profilePic} />

        <View style={{marginTop: 10}}>
          <Text style={styles.username}>{item?.login?.username}</Text>
          <Text style={styles.username}>{item?.email}</Text>
        </View>

        {/* full name, phone, address */}
        <View style={styles.commonView}>
          <User color="#404040" size={s(18)} />
          <Text style={styles.fullName}>
            {`${item?.name?.first}`} {item?.name?.last}
          </Text>
        </View>

        {/*  phone,  */}
        <View style={styles.commonView}>
          <Phone color="#404040" size={s(18)} />
          <Text style={styles.fullName}>{`${item?.cell}`}</Text>
        </View>

        {/*  age, dob  */}
        <View style={styles.commonView}>
          <Hourglass color="#404040" size={s(18)} />
          <Text style={styles.fullName}>
            {/* {`${item?.dob?.age}`}  */}
            {formattedDob}
          </Text>
        </View>

        {/*  gender,  */}
        <View style={styles.commonView}>
          <PersonStanding color="#404040" size={s(18)} />
          <Text style={styles.fullName}>{`${item?.gender}`}</Text>
        </View>

        {/* address country,  */}
        <View style={styles.commonView}>
          <Earth color="#404040" size={s(18)} />
          <Text
            style={
              styles.fullName
            }>{`${item?.location?.city} , ${item?.location?.country}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileCon: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingVertical: vs(10),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profilePic: {
    width: s(100),
    height: s(100),
    borderRadius: s(50),
  },
  username: {
    color: '#404040',
    fontSize: mvs(14),
    marginTop: 2,
    textAlign: 'center',
  },

  commonView: {
    width: '95%',
    flexDirection: 'row',
    marginTop: vs(10),
    alignItems: 'center',
    gap: s(10),
    // backgroundColor: 'blue',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fullName: {
    flex: 1,
    color: '#404040',
    fontSize: mvs(12),
    fontWeight: '600',
    textAlign: 'left',
  },
});
