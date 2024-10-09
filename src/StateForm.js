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

  const [list, setList] = useState({
    animal: ['猫', '犬', 'うさぎ', 'リス'],
  });

  const handleFormList = e => {
    const data = [];
    const opts = e.target.options;
    for (const opt of opts) {
      if (opt.selected) {
        data.push(opt.value);
      }
    }

    setList(f => ({
      ...f,
      [e.target.name]: data
    }));
  };

  const showList = () => {
    console.log(`選択した動物は${list.animal.join('、')}です。`);
  };

  const divStyle = {
    margin: '2em 0',
  };

  return (
    <form>
      <div style={divStyle}>
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
      </div>

      <div style={divStyle}>
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
      </div>

      <div style={divStyle}>
        <label>あなたが好きな動物：</label><br/>
        <select name='animal' size='4' multiple value={list.animal} onChange={handleFormList}>
          <option value='cat'>猫</option>
          <option value='dog'>犬</option>
          <option value='rabbit'>うさぎ</option>
          <option value='squirrel'>リス</option>
        </select>
        <button type="button" onClick={showList}>送信</button>
      </div>
    </form>
  );
}
