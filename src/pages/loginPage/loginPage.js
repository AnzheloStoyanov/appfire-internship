import './loginPage.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userManager from '../../model/UserManager';
import AlertForm from '../../components/Alerts'

export default function LoginPage({ type, setLoggedUser }) {

  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  function handleRegister(e) {

    e.preventDefault();

    const userNameRegex = /^[a-zA-Z0-9]+$/;;
    if (!userNameRegex.test(userName)) {
      setErrorMessage("Only letters with numbers");
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    userManager.register({ username: userName, password });
    console.log(userName)




  }
  function handleLogin(e) {
    e.preventDefault();

    userManager.login({ username: userName, pass: password })
      .then(response => {

        setLoggedUser(response)

      }).catch(err => {
        console.log("Wrong email or password")
        setErrorMessage("Wrong email or password");

      }

      );
  }
  return (
    <div className='home-page'>
      <div className='logingForm'>
        <form onSubmit={type === 'Register' ? handleRegister : handleLogin}>
          <h3>Create an account</h3>
          {type === 'Register' && <p>Let's get started with your 30-day free trial.</p>}
          <div className='alert'>
            <AlertForm className="message" setErrorMessage={setErrorMessage} errorMessage={errorMessage} />
          </div>
          <input
            onChange={e => setUserName(e.target.value)}
            placeholder='Your username'
            type='name'
            value={userName}
            required
          />

          <input
            onChange={e => setPassword(e.target.value)}
            placeholder='Your password'
            type='password'
            value={password}
            required
          />

          {type === 'Register' && (
            <input
              className='confirmPassword'
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder='Confirm your password'
              type='password'
              value={confirmPassword}
              required
            />
          )}
          <input className='buttonZ' type='submit' value={type} />
        </form>
      </div>
      <div className='phone-container'>
        <div className='phone'></div>
      </div>
    </div>
  )
}