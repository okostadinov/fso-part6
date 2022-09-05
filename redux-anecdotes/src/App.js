import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import { useEffect } from 'react';
import { setAnecdotes } from './reducers/anecdotesReducer';
import { useDispatch } from 'react-redux';
import anecdotesServices from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotesServices
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
