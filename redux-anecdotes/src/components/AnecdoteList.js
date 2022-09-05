import Notification from './Notification';
import AnecdoteFilter from './AnecdoteFilter';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdotesReducer';
import anecdotesServices from '../services/anecdotes';
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return filter === ''
      ? anecdotes
      : anecdotes.filter(({ content }) => content.includes(filter));
  });

  const handleVote = async (anecdote) => {
    console.log(anecdote);
    const returnedAnecdote = await anecdotesServices.update({...anecdote, votes: anecdote.votes + 1});
    console.log(returnedAnecdote);
    dispatch(vote(returnedAnecdote.id));
    dispatch(setNotification(`you voted for '${returnedAnecdote.content}'`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
