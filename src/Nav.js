import React, { useEffect, useState } from 'react'
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll");
        }

    }, []);

    return (
        <div className={`nav ${show && "nav__sticky"}`}>
            <img className='nav_logo' src="/netflix-logo.png" alt="Netflix" />
            <img className='nav_avatar' src="/User.jpg" alt="Avatar" />
        </div>
    )
}

export default Nav
