/* eslint-disable */
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL2 = 'https://tutorback-api.onrender.com/api/v1/reservations';
// const POSTS_URL2 = 'http://localhost:4000/api/v1/reservations';

const initialState = {
  reserves: [],
  status: 'idle',
  error: null,
};

export const setinitial = createAction('reserves/setinitial')

export const addReserveTutor = createAsyncThunk('reserves/addReserveTutor', async (initialTutor) => {
  try {
    const response = await axios.post(POSTS_URL2, initialTutor, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    }); 

    return response.data;

  } catch (err) {
    return err.message;
  }

});

export const deleteReserve = createAsyncThunk('reserves/deleteReserve', async (id) => {
  
  try {
      const response = await axios.delete(`${POSTS_URL2}/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token'),
        },
      })
      if (response?.status === 200) return id;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});

export const fetchAllReserve = createAsyncThunk('reserves/fetchAllReserve', async () => {
  try {
    const response = await axios.get(POSTS_URL2, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
    
    let arr = []
    for (let i=0; i<response.data.data.length; i++){
      let dd = {}
      dd.attr = response.data.data[i].attributes 
      dd.incl = response.data.included[i].attributes
      arr.push(dd)
    }
    return arr;
  } catch (err) {
    return err.message;
  }

})

const reservesSlice = createSlice({
  name: 'reserves',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllReserve.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllReserve.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reserves = action.payload;
      })
      .addCase(fetchAllReserve.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })   
      .addCase(addReserveTutor.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(deleteReserve.fulfilled, (state, action) => {
      state.status = 'idle';
      })
      .addCase(setinitial, (state, action) => {
        state.status = 'idle';
      })      
  },
});

export const selectAllReserves = (state) => state.reserves.reserves;
export const getReservesStatus = (state) => state.reserves.status;
export const getReservesError = (state) => state.reserves.error;
export default reservesSlice.reducer;
