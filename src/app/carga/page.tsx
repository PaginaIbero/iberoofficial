'use client';

import React, { useState } from 'react';
import { loadData } from '@/server/actions';

export default function Page() {
  const [year, setYear] = useState(0);
  const [url, setUrl] = useState('');
  const [pass, setPass] = useState('');

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(parseInt(event.target.value));
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    loadData({ year, url, pass });
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
    </form>
  );
};