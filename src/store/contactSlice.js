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

const addContact = createAsyncThunk('contact/addContact', async (contact) => {
  try {
    const response = await axios.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error('addContact icerisinde hata meydana geldi.', error);
    throw error;
  }
});

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // addContact: (state, action) => {
    //   state.push(action.payload);
    // },
    deleteContact: (state, action) => {
      return state.filter((contact) => contact.id !== action.payload);
    },
    searchContact: (state, action) => {
      const searchTerm = action.payload ? action.payload.toLowerCase() : '';
      // if (searchTerm === '') {
      //   // return initialState;
      // }
      // return state.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
      state.data = state.data.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
    },
    searchContactDelete: () => {
      // return initialState;
      return { data: [], status: 'idle', error: null };
    },
  },
  extraReducers: (builder) => {
    //getContact.fulfilled
    //getContact.rejected
    //getContact.pending
    builder
      // getContact
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
      })
      // addContact
      .addCase(addContact.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { deleteContact, searchContact, searchContactDelete } = contactSlice.actions;
export { getContact, addContact };
export default contactSlice.reducer;
