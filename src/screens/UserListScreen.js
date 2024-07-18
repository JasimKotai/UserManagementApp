import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import UserItem from '../components/UserItem';
import {mvs, s, vs} from 'react-native-size-matters';

import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUsers,
  selectUsers,
  selectLoading,
  selectRefreshing,
  selectLoadMore,
  resetUsers,
} from '../redux/userSlice';

const UserListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userList = useSelector(selectUsers);
  const isLoading = useSelector(selectLoading);
  const refreshing = useSelector(selectRefreshing);
  const isLoadMore = useSelector(selectLoadMore);
  const page = useSelector(state => state.users.page);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers({page, source: 'initial'}));
  }, []);

  useEffect(() => {
    if (error != null) {
      Alert.alert(JSON.stringify(error));
    }
  }, [error]);

  const loadMoreData = () => {
    if (!isLoadMore) {
      //   dispatch(fetchUsers('loadMore'));
      dispatch(fetchUsers({page: page + 1, source: 'loadMore'}));
    }
  };
  const onRefresh = () => {
    dispatch(resetUsers());
    // dispatch(fetchUsers('refresh'));
    dispatch(fetchUsers({page: 0, source: 'refresh'}));
  };

  const renderFooterItem = () =>
    isLoadMore ? (
      <View style={{height: 50}}>
        <ActivityIndicator size={30} color={'red'} />
      </View>
    ) : null;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Users</Text>
      </View>
      <FlatList
        data={userList}
        // data={ObjData.results}
        // data={ObjData.results.slice(1, 6)}
        renderItem={({item, index}) => {
          return <UserItem item={item} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooterItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size={50} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: Platform.OS === 'android' ? vs(8) : vs(4),
    paddingHorizontal: s(20),
    marginBottom: vs(4),
    // backgroundColor: 'red',
  },
  headerText: {
    fontSize: mvs(20),
    fontWeight: 'bold',
    color: '#404040',
  },
  loader: {
    flex: 1,
    zIndex: 5,
    height: '100%',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
});
