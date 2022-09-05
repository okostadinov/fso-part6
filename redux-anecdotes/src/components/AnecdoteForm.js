import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdotesReducer';
import anecdotesServices from '../services/anecdotes';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const anecdote = await anecdotesServices.create(content);
    dispatch(addAnecdote(anecdote));
    dispatch(setNotification(`you created a new anecdote '${anecdote}'`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => handleAnecdoteSubmit(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
