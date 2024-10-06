import { useEffect, useState } from 'react';


export default function History({histories}) {

  const [history, setHistory] = useState({histories});

  const handleClick = () => {
    setHistory({histories: [...history.histories, (new Date()).toLocaleString()]});
  };

  return (
    <>
      <ul>
        {
          history.histories.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
      <button onClick={handleClick}>履歴を追加する</button>
    </>
  );
}
