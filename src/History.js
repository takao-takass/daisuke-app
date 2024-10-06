import { useEffect, useState } from 'react';


export default function History({histories}) {

  const [aaaaa, setAaaaa] = useState({histories});

  const handleClick = () => {
    setAaaaa({histories: [...aaaaa.histories, (new Date()).toLocaleString()]});
  };

  return (
    <>
      <ul>
        {
          aaaaa.histories.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul>
      <button onClick={handleClick}>履歴を追加する</button>
    </>
  );
}
