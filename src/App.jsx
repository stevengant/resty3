import { useState, useEffect } from 'react';
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

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if (requestParams.method && requestParams.url) {
        setLoading(true);

        const response = await axios(requestParams);
        const data = response.data;
        setData(data);
        setLoading(false);
      }
    }

    getData();

  }, [requestParams]);

  const requestParamsUpdate = (requestParams) => {
    setRequestParams(requestParams);
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

        setData({
          headers: res.headers,
          body: res.data,
          status: res.status,
        });


      }
      const response = await axios.get(requestParams.url);
      console.log('Response Data: ', response.data);
      const { id, name, abilities } = response.data;
      const pokeData = { id, name, abilities };
      setData(pokeData);
      setRequestParams(requestParams);
      // console.log('Pokemon Data: ', pokeData);

    } catch (error) {
      console.log(error.message);

    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} requestParamsUpdate={requestParamsUpdate} />
      <Results data={data} loading={loading} />
      <Footer />
    </>
  );
}

export default App;