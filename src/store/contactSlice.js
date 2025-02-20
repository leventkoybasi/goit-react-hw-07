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
      const searchTerm = action.payload ? action.payload.toLowerCase() : '';
      if (searchTerm === '') {
        return initialState;
      }
      return state.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
    },
    searchContactDelete: () => {
      return initialState;
    },
  },
});

export const { addContact, deleteContact, searchContact, searchContactDelete } =
  contactSlice.actions;
export default contactSlice.reducer;
