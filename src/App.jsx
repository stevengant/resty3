import { useEffect, useReducer } from 'react';
import axios from 'axios';

import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  const initialState = {
    requestParams: {},
    data: null,
    loading: false,
  }
  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});
  // const [loading, setLoading] = useState(false);

  const reqReducer = (state = initialState, action) => {
    switch(action.type) {

      case "UPDATE_URL":
        return { ...state, url: action.payload};
        
      case "UPDATE_METHOD":
        return { ...state, method: action.payload};

      case "UPDATE_REQUEST_PARAMS":
        return { ...state, requestParams: action.payload };
      
      case "UPDATE_DATA":
        return { ...state, data: action.payload };

      case "UPDATE_LOADING":
        return { ...state, loading: action.payload };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reqReducer, initialState);

  const { requestParams, data, loading } = state

  useEffect(() => {
    if(requestParams.url) {
      dispatch({ type: "UPDATE_LOADING", payload: true });
      callApi(requestParams);
    }

  }, [requestParams]);

  const requestParamsUpdate = (requestParams) => {
    dispatch({ type: "UPDATE_REQUEST_PARAMS", payload: requestParams });
    // dispatch({ type: "UPDATE_HISTORY", payload: requestParams });
  };

  const callApi = async (requestParams) => {
    const { method, url, body } = requestParams;

    try {
      if (!url) {
        alert("Please enter a valid URL");

      } else {
        const res = await axios({
          method,
          url,
          data: body,
        });

        dispatch({
          type: "UPDATE_DATA",
          payload: {
            headers: res.headers,
            body: res.data,
            status: res.status,
          },
        });

        dispatch({ 
          type: "UPDATE_URL", 
          payload: requestParams 
        });

        dispatch({ 
          type: "UPDATE_METHOD", 
          payload: requestParams 
        });

        dispatch({ 
          type: "UPDATE_LOADING", 
          payload: false 
        });


      }
      const response = await axios.get(requestParams.url);
      console.log('Response Data: ', response.data);
      // const { id, name, abilities } = response.data;
      // const pokeData = { id, name, abilities };
      // setData(pokeData);
      // setRequestParams(requestParams);
      // console.log('Pokemon Data: ', pokeData);

    } catch (error) {
      dispatch({
        type: "UPDATE_DATA",
        payload: {
          headers: error.res.headers,
          body: error.res.data,
          status: error.res.status,
        },
      });

      dispatch({ type: "UPDATE_LOADING", payload: false });
    }
  };

  return (
    <>
      <Header />
      {/* <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div> */}
      <Form handleApiCall={callApi} requestParamsUpdate={requestParamsUpdate} />
      <Results data={data} loading={loading} />
      <Footer />
    </>
  );
}

export default App;