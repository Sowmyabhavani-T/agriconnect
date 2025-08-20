import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  contactNumber: "",
  address: "",
  userType: "",
  image: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const { _id, firstName, lastName, email, contactNumber, address, userType, image } = action.payload.data;
      Object.assign(state, { _id, firstName, lastName, email, contactNumber, address, userType, image });
    },
    logoutRedux: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;
export default userSlice.reducer;




