import React, {useState, useEffect} from 'react';
import './App.scss';
import axios from "axios";
import ProgressController from "./components/ProgressController"



const App: React.FC = () => {
  let [data, setData]=useState();
  useEffect(()=>{
    axios.get("http://pb-api.herokuapp.com/bars")
    .then(response =>setData(response.data))
    .catch(error=> {
      console.log(error);
    });
  },[]);

  return (
    <div className="App">
      <h1>Pragress Bar Demo</h1>
      {data && <ProgressController data={data}/>}
    </div>
  )
}

export default App;
