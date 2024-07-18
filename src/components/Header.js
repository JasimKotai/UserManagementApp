import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ArrowLeft, ChevronLeft} from 'lucide-react-native';
import {mvs, s, vs} from 'react-native-size-matters';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}>
        {Platform.OS === 'android' ? (
          <ArrowLeft color="#404040" size={s(20)} />
        ) : (
          <ChevronLeft color="#404040" size={s(20)} />
        )}
      </Pressable>
      <Text style={styles.profileText}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'android' ? vs(10) : 0,
    paddingBottom: vs(10),
  },
  profileText: {
    color: '#404040',
    fontSize: mvs(20),
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    left: s(8),
    padding: s(5),
    borderRadius: s(10),
    zIndex: 1,
    // backgroundColor: 'red',
  },
});
