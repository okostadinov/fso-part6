import Notification from './Notification';
import AnecdoteFilter from './AnecdoteFilter';
import { connect } from 'react-redux';
import { addVote } from '../reducers/anecdotesReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const notifyVote = (anecdote) => {
    props.setNotification(`you voted for '${anecdote}'`, 5);
  };

  const handleVote = async (anecdote) => {
    props.addVote(anecdote);
    notifyVote(anecdote.content);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteFilter />
      {props.anecdotes
        .slice()
        .sort((prev, next) => next.votes - prev.votes)
        .map((anecdote) => (
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

const mapStateToProps = (state) => {
  return state.filter === ''
    ? { anecdotes: state.anecdotes }
    : {
        anecdotes: state.anecdotes.filter(({ content }) =>
          content.includes(state.filter)
        ),
      };
};

const connectedAnecdotesList = connect(mapStateToProps, {
  setNotification,
  addVote,
})(AnecdoteList);
export default connectedAnecdotesList;
