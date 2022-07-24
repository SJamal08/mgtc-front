import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import {User} from '../model/User';
import UserRepository from '../repositories/UserRepository';
import AuthService from '../services/AuthService';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export const signupUser = createAsyncThunk(
  'users/signupUser',
  async ({username, email, password}, thunkAPI) => {
    try {
      const creds: FirebaseAuthTypes.UserCredential =
        await AuthService.firebaseRegistration(email, password);

      const user: User = new User(creds.user.uid, username, creds.user.email);
      const userCreated: User = await UserRepository.createUser(user);

      return userCreated;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/login',
  async ({email, password}, thunkAPI) => {
    try {
      const creds: FirebaseAuthTypes.UserCredential = await AuthService.firebaseLogin(email, password);
      const userLogged: User = await UserRepository.getUser(creds.user.uid);

      console.log(userLogged);

      return userLogged;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

// export const logOut = createAsyncThunk('users/logOut', async () => {
//   AsyncStorage.multiRemove(['accessToken']);
// });

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    clearState: state => {
      state.user = null;
      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, payload) => {
      //   state.user = new User(
      //     payload.id,
      //     payload.uuid,
      //     payload.username,
      //     payload.email,
      //   );
      console.log(payload);
    },
    [loginUser.fulfilled]: (state, payload) => {
      // state.user = new User(
      //   payload.id,
      //   payload.username,
      //   payload.email,
      //   payload.uuid,
      // );
      console.log(payload);
    },
    // [loginUser.rejected]: (state, {payload}) => {
 
    // },
    // [loginUser.pending]: (state, payload) => {},
    // [loadUser.fulfilled]: (state, {payload}) => {
    //   state.user = payload;
    // },
  },
});

export const {clearState} = userSlice.actions;

export const userStore = state => state.user;
