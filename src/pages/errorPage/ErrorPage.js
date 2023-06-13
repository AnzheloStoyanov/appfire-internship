import React from 'react';
import './ErrorPage.css'; // Import the CSS file

function ErrorPage() {
  return (
    <div className="error-page">
      <div className="container-m">
        <div className="number">404</div>
        <div className="description">Oops! Page not found</div>
        <a href="/" className="back-home">Back to Home</a>
      </div>
    </div>
  );
}

export default ErrorPage;