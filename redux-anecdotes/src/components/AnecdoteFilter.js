import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const AnecdoteFilter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const connectedAnecdoteFilter = connect(null, { setFilter })(AnecdoteFilter);
export default connectedAnecdoteFilter;
