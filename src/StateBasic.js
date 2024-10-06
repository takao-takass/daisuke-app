import { useState } from 'react';

export default function StateBasic({ init }) {
  const [count, setCount] = useState(init);
  const handleClick = () => {
    setCount(c => c + 1);
    setCount(c => c + 1);
  };

  return (
    <>
      <button onClick={handleClick}>カウントする</button>
      <p>{count}回クリックしました。</p>
    </>
  )
}
