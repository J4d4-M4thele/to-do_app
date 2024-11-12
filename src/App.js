import React from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const user = true;
  return (
    <div>
      {!user ? <LoginPage /> : <HomePage />}
    </div>
  );
}

export default App;
