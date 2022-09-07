import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage: (state, action) => action.payload,
    clearNotification: () => '',
  },
});

export const { setMessage, clearNotification } = notificationSlice.actions;

let timeout;
export const setNotification = (message, seconds) => {
  return (dispatch) => {
    clearTimeout(timeout);

    dispatch(setMessage(message));

    timeout = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
