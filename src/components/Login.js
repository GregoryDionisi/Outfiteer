import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Assicurati che il percorso sia corretto
import { Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext); // Usa useContext per ottenere il contesto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Email non registrata. Non ti sei ancora registrato?');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      <p>
        Non ti sei ancora registrato? <Link to="/register">Registrati qui</Link>.
      </p>
    </div>
  );
};

export default Login;
