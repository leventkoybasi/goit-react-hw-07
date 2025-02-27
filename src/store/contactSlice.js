import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { contactData } from '../data/contactData';
import axios from 'axios';
import { showError } from './errorSlice';

// export const initialState = contactData;
const API_URL = 'https://67b65d0607ba6e5908407ba2.mockapi.io/contacts';
//getContact
const getContact = createAsyncThunk('contact/getContact', async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('GetContact icerisinde hata meydabna geldi.', error);
  }
});
//addContact
const addContact = createAsyncThunk('contact/addContact', async (contact) => {
  try {
    const response = await axios.post(API_URL, contact);
    return response.data;
  } catch (error) {
    console.error('addContact icerisinde hata meydana geldi.', error);
  }
});

//deleteContact
const deleteContact = createAsyncThunk('contact/deleteContact', async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error('deleteContact icerisinde hata meydana geldi.', error);
  }
});
//searchContact
const searchContact = createAsyncThunk(
  'contact/searchContact',
  async (searchTerm, { dispatch }) => {
    if (searchTerm === '') {
      const response = await dispatch(getContact());
      return response.payload;
    }
    try {
      const response = await axios.get(API_URL);
      const filteredData = response.data.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredData.length === 0) {
        dispatch(showError());
      }

      return filteredData;
    } catch (error) {
      console.error('searchContact icerisinde hata meydana geldi.', error);
      return { data: [], status: 'failed', error };
    }
  }
);

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
    // deleteContact: (state, action) => {
    //   return state.filter((contact) => contact.id !== action.payload);
    // },
    // searchContact: (state, action) => {
    //   const searchTerm = action.payload ? action.payload.toLowerCase() : '';
    //   // if (searchTerm === '') {
    //   //   // return initialState;
    //   // }
    //   // return state.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
    //   state.data = state.data.filter((contact) => contact.name.toLowerCase().includes(searchTerm));
    // },
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
      })
      // deleteContact
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.data = state.data.filter((contact) => contact.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // searchContact
      .addCase(searchContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchContact.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(searchContact.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

//selectors
const selectContacts = (state) => state.contact.data;
const selectContactsStatus = (state) => state.contact.status;

//senkron actions'lar
export const { searchContactDelete } = contactSlice.actions;

//asenkron thunk actions'lar
export { getContact, addContact, deleteContact, searchContact };
export { selectContacts, selectContactsStatus };
export default contactSlice.reducer;
