import { createAsyncThunk } from '@reduxjs/toolkit';
import { logOut, refresh, signIn, signUp } from '../../api/ApiAuthUser';
import { apiUserUpdate, apiUserUpdsateAvatar } from '../../api/ApiUser';

// export const getProfileThunk = createAsyncThunk('get/profile', () =>
//   getProfile()
// );
export const signUpThunk = createAsyncThunk('auth/signUp', (body, thunkApi) => {
  try {
    return signUp(body);
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});

export const thunkSignIn = createAsyncThunk(
  'authUser/login',
  async (body, { rejectWithValue }) => {
    try {
      const data = await signIn(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data ?? 'Login failed');
    }
  }
);

export const thunkRefresh = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const data = await refresh();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (auth.access_token) return true;
      return false;
      // if (auth.isLoggedIn === false) return;
    },
  }
);
export const thunkLogOut = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      return await logOut();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updateUserThunk = createAsyncThunk(
  'auth/update',
  async (body, { rejectWithValue }) => {
    console.log('body', body);
    try {
      return await apiUserUpdate(body);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const addAvatarUserThunk = createAsyncThunk(
  'auth/addAvatarUser',
  async (body, { rejectWithValue }) => {
    console.log('body', body);
    try {
      return await apiUserUpdsateAvatar(body);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
