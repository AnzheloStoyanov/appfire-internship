import Accordion from 'react-bootstrap/Accordion';
import './accordion.css'

function BasicExample() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
        <>Хоме</>
        </Accordion.Body>
      </Accordion.Item>
     
    </Accordion>
  );
}

export default BasicExample;