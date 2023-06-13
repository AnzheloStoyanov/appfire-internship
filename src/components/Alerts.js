import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function AlertDismissibleExample({setErrorMessage,errorMessage}) {
  const [show, setShow] = useState(errorMessage);

  if (errorMessage) {
    return (
      <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
       <p>{errorMessage}</p>
       
      </Alert>
    );
  }
}

export default AlertDismissibleExample;