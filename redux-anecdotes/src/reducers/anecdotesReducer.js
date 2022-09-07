import { createSlice } from '@reduxjs/toolkit';
import anecdotesServices from '../services/anecdotes';

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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdotesServices.create(content);
    dispatch(addAnecdote(anecdote));
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const returnedAnecdote = await anecdotesServices.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(vote(returnedAnecdote.id));
  };
};

export default anecdotesSlice.reducer;
