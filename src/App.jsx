import React, { useState } from 'react';
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

// There's no Axios on line 6 ???
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
    };
  }

  callApi = (requestParams) => {
    // mock output
    const data = {
      count: 2,
      results: [
        {name: 'fake thing 1', url: 'http://fakethings.com/1'},
        {name: 'fake thing 2', url: 'http://fakethings.com/2'},
      ],
    };
    this.setState({data, requestParams});
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <Form handleApiCall={this.callApi} />
        <Results data={this.state.data} />
        <Footer />
      </React.Fragment>
    );
  }


function App() {

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = async(requestParams) => {
    try {
      const response = await axios.get(requestParams.url);
      console.log('Response Data: ', response.data);
      const {id, name, abilities} = response.data;
      const pokeData = {id, name, abilities};
      setData(pokeData);
      setRequestParams(requestParams);
      console.log('Pokemon Data: ', pokeData);

    } catch (error) {
      console.log(error.message);

    }
  };

  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </>
  );

}

export default App;