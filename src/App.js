import logo from './logo.svg';
import './App.css';

const currentDateTime = () => {
  const datetime = (new Date()).toLocaleString();
  console.log(datetime);
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={currentDateTime}>ログに時刻をだすからね</button>
    </div>
  );
}
