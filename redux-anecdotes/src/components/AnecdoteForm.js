import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdotesReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const notifyCreate = (anecdote) => {
    props.setNotification(`you created a new anecdote '${anecdote}'`, 5);
  };

  const handleAnecdoteSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    props.createAnecdote(content);
    notifyCreate(content);
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

const connectedAnecdoteForm = connect(null, {
  setNotification,
  createAnecdote,
})(AnecdoteForm);
export default connectedAnecdoteForm;
