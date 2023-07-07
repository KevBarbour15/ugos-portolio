import React from 'react';
import '../styles/Footer.css'; // A CSS file to style your footer

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2023 My Website</p>
            <div>
                <a href="mailto:myemail@example.com">Email</a>
                <a href="https://instagram.com/myinstagram" target="_blank" rel="noopener noreferrer">Instagram</a>
                {/* Add any other social links you want */}
            </div>
        </footer>
    );
}

export default Footer;
