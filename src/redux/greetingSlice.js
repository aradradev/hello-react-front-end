import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3000/api/greetings/random_greeting';

export const fetchRandomGreeting = createAsyncThunk('greeting/fetchRandomGreeting', async () => {
  try {
    const resp = await fetch(BASE_URL);
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }
    const data = await resp.json();
    return data.greeting;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
});
const greetingSlice = createSlice({
  name: 'greeting',
  initialState: {
    text: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomGreeting.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomGreeting.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.text = action.payload;
      })
      .addCase(fetchRandomGreeting.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { setGreeting } = greetingSlice.actions;
export default greetingSlice.reducer;
