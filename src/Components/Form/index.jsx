import { useState } from 'react';
import './Form.scss';

const Form = (props) => {
  const [method, setMethod] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = {
      method,
      url,
      data,
    };
    props.handleApiCall(formData);
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input data-testid="url-input" name='url' type='text' onChange = {(e) => setUrl(e.target.value)}/>
          <button type="submit">GO!</button>
        </label>
        <label>json data (if necessary)
          <textarea rows="4" cols="50" onChange={(e) => setData(e.target.value)}/>
        </label>
        <label className="methods">
          <span data-testid="get-span" onClick={(e) => setMethod(e.target.id)}
            style={{ backgroundColor: method === 'get' ? '#15d04d' : '#ccc' }} id="get">GET</span>
          <span data-testid="post-span" onClick={(e) => setMethod(e.target.id)}
            style={{ backgroundColor: method === 'post' ? '#15d04d' : '#ccc' }} id="post">POST</span>
          <span data-testid="put-span" onClick={(e) => setMethod(e.target.id)}
            style={{ backgroundColor: method === 'put' ? '#15d04d' : '#ccc' }} id="put">PUT</span>
          <span data-testid="delete-span" onClick={(e) => setMethod(e.target.id)}
            style={{ backgroundColor: method === 'delete' ? '#15d04d' : '#ccc' }} id="delete">DELETE</span>
        </label>
      </form>
    </>
  );
};


export default Form;