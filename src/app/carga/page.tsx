'use client';

import React, { useState } from 'react';
import { loadData, loadPaises } from '@/server/actions';

export default function Page() {
  const [linkPaises, setLinkPaises] = useState('');
  const [year, setYear] = useState(0);
  const [url, setUrl] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLinkPaisesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkPaises(event.target.value);
  }

  const handlePaisesSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = await loadPaises(linkPaises);
    setErrorMsg(error)
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.target.value));
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleResultadosSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = await loadData({ year, url, pass });
    setErrorMsg(error)
  };

  return (
    <>
      <p>Cargar países:</p>
      <form onSubmit={handlePaisesSubmit}>
        <label>
          Link países:
          <input type="text" value={linkPaises} onChange={handleLinkPaisesChange}></input>
        </label>
        <br/>
        <button type='submit'>Submit</button>
        <br/>
      </form>
      <hr/>
      <p>Cargar resultados:</p>
      <form onSubmit={handleResultadosSubmit}>
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
    </>
  );
}