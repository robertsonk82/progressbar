import React, {useState, useEffect} from 'react';
import './App.scss';
import axios from "axios";
import ProgressController from "./components/ProgressController"



const App: React.FC = () => {
  let [apiData, setApiData]=useState();
  useEffect(()=>{
    axios.get("http://pb-api.herokuapp.com/bars").then(response =>setApiData(response.data))
  },[]);

  return (
    <div className="App">
      <h1>Pragress Bar Demo</h1>
      {apiData && <ProgressController data={apiData}/>}
    </div>
  )
}

export default App;
