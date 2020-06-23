import React from "react";
import Radium from 'radium';

import {Accordion,Card,Button,Container,Row,Col,Form} from "react-bootstrap"


const Post=()=>{
return(
    <Container>
    <Row>
        <Col>
        <Accordion defaultActiveKey="1">
        <Card>
        <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
        With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        {/* <Button variant="primary">Like</Button>
        <Button variant="primary">Comments</Button> */}

    </Card.Body>
            <Accordion.Toggle as={Card.Header} eventKey="0">View Comments            
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Card.Body>
                Hello! I'm the body
                <Form>
                <Row>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="type here...." />
                    </Col>
                    <Col sm>
                    <Button>ll</Button>                    
                    </Col>
                </Row>
                </Form>
            </Card.Body>
            </Accordion.Collapse>
        </Card>
        </Accordion>
        </Col>
    </Row>
</Container>
)
}




export default Post;