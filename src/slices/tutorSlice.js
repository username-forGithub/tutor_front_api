/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = 'https://tutorback-api.onrender.com/api/v1/tutors';
// const POSTS_URL = 'http://localhost:4000/api/v1/reservations';

const initialState = {
  tutors: [],
  status: 'idle',
  error: null,
};

export const fetchTutors = createAsyncThunk('tutors/fetchTutors', async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const addNewTutor = createAsyncThunk('tutors/addNewTutor', async (initialTutors) => {
  try {
    const response = await axios.post(POSTS_URL, initialTutors);
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const deleteTutor = createAsyncThunk('tutors/deleteTutor', async (initialTutor) => {
  const { id } = initialTutor;
  try {
      const response = await axios.delete(`${POSTS_URL}/${id}`)
      if (response?.status === 200) return initialTutor;
      return `${response?.status}: ${response?.statusText}`;
  } catch (err) {
      return err.message;
  }
});


const tutorsSlice = createSlice({
  name: 'tutors',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTutors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTutors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tutors = action.payload;
      })
      .addCase(fetchTutors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;       
      })
      .addCase(addNewTutor.fulfilled, (state, action) => {
        state.tutors.push(action.payload);
      })
      .addCase(deleteTutor.fulfilled, (state, action) => {
        if (!action.payload?.id) {          
            return;
        }
        const { id } = action.payload;
        const tutors = state.tutors.filter(tutor => tutor.id !== id);
        state.tutors = tutors;
      })
  },
});

export const selectAllTutors = (state) => state.tutors.tutors;
export const getTutorsStatus = (state) => state.tutors.status;
export const getTutorsError = (state) => state.poTutorerror;
export const selectTutorById = (state, tutorId) =>
    state.tutors.tutors.find(tutor => tutor.id === tutorId);

export default tutorsSlice.reducer;
