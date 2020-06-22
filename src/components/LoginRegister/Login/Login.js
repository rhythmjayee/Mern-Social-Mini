import React from 'react';
import Radium from 'radium';


import {Card,Button,Container,Row,Col,Form} from "react-bootstrap"

import {Link} from "react-router-dom"

const Login=()=>{

    const styles={
        lightgreenColor:{
            color:"#29ff00"
        },
        col:{
            padding:"150px",
            borderRadius:"50px",
            
        },
        header:{
            backgroundColor:"#0c0c0C",
            color:"#29ff00",
            
        },
        button:{
            color:"#29ff00",
            fontWeight:"bold",
            backgroundColor:"#0c0c0C",
            border:"2px solid #0c0c0C"
        },
        card:{
            boxShadow: ' 3px 3px #7bff56'
        },
        cbody:{
            backgroundColor:"#333333",
            color:"#29ff00",

        },
        FormControl:{
            backgroundColor:"#3333",
            color:"#29ff00"
        }

    }

    return(
    <Container >
        <Row>
            <Col style={styles.col}>
            <Card style={styles.card} className="text-center">
            <Card.Header style={styles.header}>Login</Card.Header>
            <Card.Body style={styles.cbody}>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control style={styles.FormControl} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control style={styles.FormControl} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" style={styles.button} >Submit</Button>

                </Form>
        </Card.Body>
    <Card.Footer style={styles.header} className="text-muted" >don't have an account? <Link to="/signup" style={styles.lightgreenColor}>SignUp</Link></Card.Footer>
        </Card>
            </Col>
        </Row>
    </Container>
        
    )
}


export default Radium(Login);