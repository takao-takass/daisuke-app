import logo from './logo.svg';
import './App.css';
import Conversation from './Conversation';

const currentDateTime = () => {
  const datetime = (new Date()).toLocaleString();
  console.log(datetime);
}

export default function App() {
  return (
    <div>
      <Conversation />
    </div>
  );
}
