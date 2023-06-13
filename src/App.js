import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import LoginPage from './pages/LoginPage';
import ToDoPage from './pages/toDoPage/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
        <Route index element={ loggedUser ? <Navigate to="/todo" /> : <Navigate to="/letsstart" />}/>
        {loggedUser ? (
          <Route path="/letsstart" element={<Navigate to="/todo" />} />
        ) : (
          <Route
            path="/letsstart"
            element={<LoginPage setLoggedUser={setLoggedUser} setSuccess={handleSuccess} type={type} />}
          />
        )}

{!loggedUser ? (
          <Route path="/todo" element={<Navigate to="/letsstart" />} />
        ) : (
          <Route
            path="/letsstart"
            element={<LoginPage setSuccess={handleSuccess} type={type} />}
          />
        )}

        <Route path="/todo" element={<ToDoPage />} />
      </Routes>
     
    </Router>
  );
}

export default App;
