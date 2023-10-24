import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomGreeting } from '../redux/greetingSlice';

const Greeting = () => {
  const dispatch = useDispatch();
  const greeting = useSelector((state) => state.greeting.text);
  const status = useSelector((state) => state.greeting.status);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRandomGreeting());
    }
  }, [dispatch, status]);
  return (
    <div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: Something went wrong!</div>}
      {status === 'succeeded' && (
        <div>
          <h1>Random Greeting Api::</h1>
          <p>{greeting}</p>
        </div>
      )}
    </div>
  );
};

export default Greeting;
