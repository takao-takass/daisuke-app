import { useState } from 'react';

export default function StateForm() {
  const [form, setForm] = useState({
    name: '山田太郎',
    age: 18,
  });

  const handleForm = e => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  };

  const show = () => {
    console.log(`こんにちは、${form.name} (${form.age}歳)さん！`);
  };


  const [select, setSelect] = useState({
    animal: 'cat',
  });

  const handleSelect = e => {
    setSelect(f => ({
      ...f,
      [e.target.name]: e.target.value
    }));
  }

  const showSelect = () => {
    console.log(`選択した動物は${select.animal}です。`);
  }

  return (
    <form>
      <p>こんにちは、{form.name} ({form.age})さん！</p>
      <div>
        <label>
          お名前：
          <input type="text" name="name" value={form.name} onChange={handleForm} />
        </label>
      </div>
      <div>
        <label>
          年齢：
          <input type="number" name="age" value={form.age} onChange={handleForm} />
        </label>
      </div>
      <button type="button" onClick={show}>表示</button>

      <div>
        <p>あなたが好きなのは、{select.animal}ですね？</p>
        <label htmlFor='animal'>好きな動物：</label>
        <select id='animal' name='animal' value={select.animal} onChange={handleSelect}>
          <option value='cat'>猫</option>
          <option value='dog'>犬</option>
          <option value='rabbit'>うさぎ</option>
          <option value='squirrel'>リス</option> 
        </select>
      </div>
      <button type="button" onClick={showSelect}>表示</button>
    </form>
  );
}
