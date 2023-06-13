import logo from '../../appfire logo.png';
import './navigation.css'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import userManager from '../../model/UserManager';



export default function Navigation({ setLoggedUser, loggedUser, setType }) {

    const location = useLocation();
    const isOnLetstartPage = location.pathname === '/letsstart';
    const [buttonInnerText, setButtonInnerText] = useState('')

    useEffect(() => {
        const buttonElement = document.querySelector('.button');

        if (buttonElement) {
            setButtonInnerText(buttonElement.innerText.trim());
           }
    }, []);


    const navigationStyle = {
        position: isOnLetstartPage ? 'absolute' : 'static',
        backgroundColor: isOnLetstartPage ? '#3636361c' : '#00000017',
        top: isOnLetstartPage ? 0 : null
    };

    return (
            <nav style={navigationStyle}>
            <a href='/' >
                <img className='logo' src={logo} />
            </a>
            {!loggedUser ? <button onClick={() => {
                setType(buttonInnerText)

                if (buttonInnerText === "Login") {
                    setButtonInnerText("Register")
                } else if (buttonInnerText === "Register") {
                    setButtonInnerText("Login")
                }

            }} className='button'>{buttonInnerText ? buttonInnerText : "Login"}
            </button> :
                <button onClick={() => {
                    userManager.logout()
                    setLoggedUser(null)


                }} className='button'>Logout
                </button>
            }
        </nav>
    )
}