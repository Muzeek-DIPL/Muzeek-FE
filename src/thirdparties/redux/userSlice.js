import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    username: "",
    email: "",
    password: "",
    full_name: "",
    phone: "",
    about: "",
    location: "",
    img_link: "",
    published: false,
    instrument: "",
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.full_name = action.payload.full_name;
      state.phone = action.payload.phone;
      state.about = action.payload.about;
      state.location = action.payload.location;
      state.img_link = action.payload.img_link;
      state.published = action.payload.published;
      state.instrument = action.payload.instrument;
    },
    logout: (state) => {
      state.id = 0;
      state.username = "";
      state.email = "";
      state.password = "";
      state.full_name = "";
      state.phone = "";
      state.about = "";
      state.location = "";
      state.img_link = "";
      state.published = false;
      state.instrument = "";
    },
    togglePublish: (state) => {
      state.published = !state.published;
    },
  },
});

export const { login, logout, togglePublish } = userSlice.actions;
export default userSlice.reducer;
