import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {mvs, s} from 'react-native-size-matters';

const Splash = ({navigation}) => {
  useEffect(() => {
    console.log('Splash Screen');
    const handleNavigation = setTimeout(() => {
      navigation.replace('UserListScreen');
    }, 1500);

    return () => clearTimeout(handleNavigation);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/hashtechyLogo.jpeg')}
        style={styles.logo}
      />
      <Text style={styles.title}>User Lists</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    gap: 20,
  },
  logo: {
    width: s(90),
    height: s(80),
    resizeMode: 'cover',
  },
  title: {
    color: '#404040',
    fontSize: mvs(20),
    fontWeight: 'bold',
  },
});
