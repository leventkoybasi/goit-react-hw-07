import { createSlice } from '@reduxjs/toolkit';
import { contactData } from '../data/contactData';

const initialState = contactData;

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload);
    },
    deleteContact: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
    searchContact: (state, action) => {
      return state.find((contact) =>
        contact.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addContact, deleteContact, searchContact } = contactSlice.actions;
export default contactSlice.reducer;
