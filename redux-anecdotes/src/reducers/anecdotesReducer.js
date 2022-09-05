import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      return state
        .map((anecdote) => {
          if (action.payload === anecdote.id) {
            return { ...anecdote, votes: anecdote.votes + 1 };
          }
          return anecdote;
        })
        .sort((prev, next) => next.votes - prev.votes);
    },
    addAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    setAnecdotes: (state, action) => action.payload,
  },
});

export const { vote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
