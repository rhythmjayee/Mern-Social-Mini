import React, { useState,useEffect } from 'react';
import Radium from 'radium';


import {Card,Button,Container,Row,Col,Form,Alert} from "react-bootstrap"

import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux";

import Loader from 'react-loader-spinner'


import {login} from "../../../actions/authAction"
import {clearErrors} from "../../../actions/errorAction"

const Login=(props)=>{

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
   


    const [input,setInput]=useState({
        email:'',
        password:''
    })

    const [errorM,setError]=useState(null);

    let {error}=props;

    useEffect(()=>{
        // let {error}=props;
        // console.log(error);

        if(error){
            if(error.id==="LOGIN_FAIL"){
                setError(error.msg.message);
                console.log(error.msg.message);

            }
        }
    },[error])


    const handleChangeInput=(e)=>{
        let val=e.target.value;
        let name=e.target.name;
        setInput(prev=>({
            ...prev,
            [name]:val
        }));
    }

    const loginHandler=(e)=>{
        e.preventDefault();

        const User = {
            email:input.email,
            password:input.password
          };

          props.login(User);
          props.clearErrors();
         

    }

    if(props.auth){
        // console.log("login......");
        // props.clearErrors();
        // console.log(error);
        return <Redirect from="/login" to="/"></Redirect>
    }


  

    return(
    <Container >
        <Row>
            <Col sm={12} style={styles.col}>
            <Card style={styles.card} className="text-center">
            <Card.Header style={styles.header}>Login</Card.Header>
            <Card.Body style={styles.cbody}>
            {errorM && <Alert style={{background:"#0c0c0C"}} color="danger">{errorM}</Alert>}

            <Form onSubmit={loginHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control style={styles.FormControl} name="email" onChange={handleChangeInput} value={input.email} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control style={styles.FormControl} type="password" name="password" onChange={handleChangeInput} value={input.password} placeholder="Password" />
                </Form.Group>
          
                <Button type="submit" variant="primary" style={styles.button} >Submit</Button>

                </Form>
        </Card.Body>
    <Card.Footer style={styles.header} className="text-muted" >don't have an account? <Link to="/signup" style={styles.lightgreenColor}>SignUp</Link></Card.Footer>
        </Card>
            </Col>
            <Col>
            {props.loading &&  <Loader
                type="Circles"
                color="#29ff00"
                height={100}
                width={100}
                timeout={2000} //3 secs
                style={{textAlign:"center"}} 
             /> }
            </Col>
        </Row>
    </Container>
        
    )
}



const mapStateToProps=state=>({
    loading:state.auth.isLoading,
    auth:state.auth.isAuthenticated,
    error:state.error
})

export default connect(mapStateToProps,{login,clearErrors})(Radium(Login));