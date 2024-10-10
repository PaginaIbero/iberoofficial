'use client';

import React, { useState } from 'react';
import { loadData } from '@/server/actions';

export default function Page() {
  const [year, setYear] = useState(0);
  const [url, setUrl] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.target.value));
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = await loadData({ year, url, pass });
    setErrorMsg(error)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Año:
        <input type="text" value={year} onChange={handleYearChange} />
      </label>
      <br />
      <label>
        URL al .tsv:
        <input type="text" value={url} onChange={handleUrlChange} />
      </label>
      <br />
      <label>
        Contraseña:
        <input type="password" value={pass} onChange={handlePasswordChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
      <hr/>
      {errorMsg.split('\n').map((line, index) => <p key={index}>{line}</p>)}
    </form>
  );
}