import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  userDetails: {
    name: string;
    email: string;
    role: string;
    ProfilePicture?: string;
    UserId?: number;
  } | null;
  designerDetails: {
    designerId?: number;
    isApproved?: number;
  } | null;
}

const initialState: AuthState = {
  token: null,
  userDetails: null,
  designerDetails: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; userDetails: AuthState['userDetails'] }>
    ) => {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userDetails', JSON.stringify(action.payload.userDetails));
    },
    setDesignerDetails: (
      state,
      action: PayloadAction<{ designerId: number; isApproved: number }>
    ) => {
      state.designerDetails = {
        designerId: action.payload.designerId,
        isApproved: action.payload.isApproved,
      };
      localStorage.setItem('designerDetails', JSON.stringify(state.designerDetails));
      console.log("Local storage updated with designerDetails:", localStorage.getItem('designerDetails'));
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userDetails = null;
      state.designerDetails = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userDetails');
      localStorage.removeItem('designerDetails');
    },
  },
});

export const { setCredentials, clearCredentials, setDesignerDetails } = authSlice.actions;
export default authSlice.reducer;
