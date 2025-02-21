import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { contactData } from '../data/contactData';
import axios from 'axios';

// export const initialState = contactData;
const API_URL = 'https://67b65d0607ba6e5908407ba2.mockapi.io/contacts';

const getContact = createAsyncThunk('contact/getContact', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('GetContact icerisinde hata meydabna geldi.', error);
  }
});

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: [],
    status: 'dile',
    error: null,
  },
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
        // return initialState;
      }
      return state.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
    },
    searchContactDelete: () => {
      // return initialState;
    },
  },
  extraReducers: (builder) => {
    //getContact.fulfilled
    //getContact.rejected
    //getContact.pending
    builder
      .addCase(getContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addContact, deleteContact, searchContact, searchContactDelete } =
  contactSlice.actions;
export { getContact };
export default contactSlice.reducer;
