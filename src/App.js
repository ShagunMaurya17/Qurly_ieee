import axios from "axios";
import { createContext, useState } from "react";
import InputForm from "./components/InputForm";
import QrCode from "./components/QrCode";
import './App.css';
import InputShortener from './InputShortener';
import LinkResult from './LinkResult';

// Create context
export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState({
    url: '',
    color: ''
  });
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: { Authorization: 'Bearer a1b380b0-9f27-11ed-92ca-ff9e3698f103' }
  }
  const bodyParameters = {
    "colorDark": inputValue.color,
    "qrCategory": "url",
    "text": inputValue.url
  }
  const getQrCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        'https://qrtiger.com/api/qr/static',
        bodyParameters,
        config
      );
      setResponse(res.data.url);
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    inputValue,
    setInputValue,
    getQrCode,
    response,
    loading,
    error
  }

  return (
  <div>
    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-screen pt-5 md:pt-150 px-6 ">
      <InputShortener setInputValue={setInputValue} />
      <div className="container1 mx-auto max-w-4xl bg-white rounded-md shadow">
        <LinkResult inputValue={inputValue} />
        <div className="md:grid md:grid-cols-3">
          
          <InputContext.Provider value={value}>
            <InputForm />
            <QrCode />
          </InputContext.Provider>
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
