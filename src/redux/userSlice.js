// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   value: 0,
// };

// export const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment: state => {
//       state.value += 1;
//     },
//     decrement: state => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const {increment, decrement, incrementByAmount} = counterSlice.actions;

// export default counterSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async prop => {
  console.log('prop ====>>', prop);
  const {page, source} = prop;
  const response = await fetch(
    `https://randomuser.me/api/?results=15&page=${page}`,
  );
  return response.json();
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: [],
    page: 0,
    loading: false,
    error: null,
    refreshing: false,
    loadMore: false,
  },
  reducers: {
    resetUsers: state => {
      state.userList = [];
      state.page = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        // console.log(
        //   'action.meta.arg >>>>>>>>>>>>>>>>>>>>>>>>>>>',
        //   action.meta.arg.source,
        // );
        if (action.meta.arg.source === 'refresh') {
          state.refreshing = true;
        } else if (action.meta.arg.source === 'loadMore') {
          state.loadMore = true;
        } else {
          state.loading = true;
        }
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.loadMore = false;
        state.userList =
          action.meta.arg.source === 'refresh'
            ? action.payload.results
            : [...state.userList, ...action.payload.results];
        state.page = action.payload.info.page;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.refreshing = false;
        state.loadMore = false;
        state.error = action.error.message;
      });
  },
});

export const {resetUsers} = userSlice.actions;
export const selectUsers = state => state.users.userList;
export const selectLoading = state => state.users.loading;
export const selectRefreshing = state => state.users.refreshing;
export const selectLoadMore = state => state.users.loadMore;

export default userSlice.reducer;
