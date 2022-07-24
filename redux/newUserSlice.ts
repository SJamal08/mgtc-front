import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../../app/store';
import {User} from '../model/User';
import AsyncStorage from '@react-native-community/async-storage';

// Define a type for the slice state
interface UserState {
  value: User | null;
}

// Define the initial state using that type
const initialState: UserState = {
  value: AsyncStorage.getItem('user'),
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
