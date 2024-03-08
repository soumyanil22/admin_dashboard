import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const InsightContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const InsightProvider = ({ children }) => {
  const initialState = {
    data: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://nach-card-tasks.onrender.com/api/get/invoiceInsights'
      );
      dispatch({ type: 'SET_DATA', payload: res.data.data });
    } catch (error) {
      console.error('Error fetching invoice insights:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InsightContext.Provider value={{ state, dispatch }}>
      {children}
    </InsightContext.Provider>
  );
};

export default InsightProvider;
