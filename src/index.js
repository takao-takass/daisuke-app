import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StateBasic from './StateBasic';
import History from './History';
import MyHello from './MyHello';
import StateParent from './StateParent';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

/*
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
/*
setInterval(() => {
  root.render(
    <>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <p>Current time : {(new Date()).toLocaleString()}</p>
    </>
  )  
}, 1000);
*/

/*
root.render(
  <React.StrictMode>
    <StateBasic init={0} />
    <History histories={[]} />
  </React.StrictMode>
);
*/

// root.render(
//   <MyHello myName="山田" />
// )

root.render(
  <StateParent />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
