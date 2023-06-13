import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import LoginPage from './pages/loginPage/loginPage';
import ToDoPage from './pages/toDoPage/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/errorPage/ErrorPage';

function App() {
  const [type, setType] = useState('Register');
  const [success, setSuccess] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("isThereUser"));
    if (token) {
      setLoggedUser(token);
    }
  }, []);

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleSuccess = (newSuccess) => {
    setSuccess(newSuccess);
  };

  return (
    <Router>
      <Navigation setLoggedUser={setLoggedUser} loggedUser={loggedUser} success={success} setType={handleTypeChange} />
      <Routes>
        <Route path="/" element={loggedUser ? <Navigate to="/todo" /> : <Navigate to="/letsstart" />} />
        <Route
          path="/letsstart"
          element={loggedUser ? <Navigate to="/todo" /> : <LoginPage setType={setType} setLoggedUser={setLoggedUser} setSuccess={handleSuccess} type={type} />}
        />
        <Route path="/todo" element={loggedUser ? <ToDoPage /> : <Navigate to="/letsstart" />} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;