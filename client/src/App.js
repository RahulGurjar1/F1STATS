import React, {useEffect, useState} from 'react';
import {OurRoutes} from './routes';
function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api').then(
      response => response.json()
    ).then(data => {
      setBackendData(data);
    });
  }, []);

  return (
    // <div>
    //   <h1>Hello World2</h1>
    //   {(typeof backendData.users === 'undefined') ? (
    //     <p>Loading...</p> ) : (
    //       backendData.users.map((user, index) => (
    //         <p key={index}>{user}</p>
    //       )))
    //   }
    // </div>
    <OurRoutes />
  );
}

export default App;
