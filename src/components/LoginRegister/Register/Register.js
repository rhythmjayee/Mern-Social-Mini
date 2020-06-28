import React,{useState, useEffect} from 'react';
import Radium from 'radium';
import {connect} from "react-redux";


import {Card,Button,Container,Row,Col,Form,Alert} from "react-bootstrap"

import {Link,Redirect} from "react-router-dom"

import Loader from 'react-loader-spinner'

import {register} from "../../../actions/authAction"
import {clearErrors} from "../../../actions/errorAction"

const Register=(props)=>{

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
        name:'',
        email:'',
        password:''
    });

    const [errorM,setError]=useState(null);


    let {error}=props;
    useEffect(()=>{
        // let {error}=props;
        // console.log(error);

        if(error){
            if(error.id==="REGISTER_FAIL"){
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

    const registerHandler=(e)=>{
        props.clearErrors();
        e.preventDefault();


        const newUser = {
            name:input.name,
            email:input.email,
            password:input.password
          };
          props.register(newUser);
          props.clearErrors();

    }

    if(props.auth){
        // console.log("register......");
        // console.log(error);
        return <Redirect from="/signup" to="/"></Redirect>
    }

    return(
    <Container >
        <Row>
            <Col sm={12} style={styles.col}>
            <Card style={styles.card} className="text-center">
            <Card.Header style={styles.header}>SignUp</Card.Header>
            <Card.Body style={styles.cbody}>
            {errorM && <Alert style={{background:"#0c0c0C"}} color="danger">{errorM}</Alert>}
            <Form onSubmit={registerHandler}>
            <Form.Group controlId="formBasicname">
                    <Form.Label>Name</Form.Label>
                    <Form.Control style={styles.FormControl} type="text" name="name" onChange={handleChangeInput} placeholder="Enter name..." />
                </Form.Group>
                <Form.Group controlId="formBasicemail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control style={styles.FormControl} type="email" name="email" onChange={handleChangeInput} placeholder="Enter email..." />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control style={styles.FormControl} type="password" name="password" onChange={handleChangeInput} placeholder="Password" />
                </Form.Group>
                <Button type="submit" variant="primary" style={styles.button} >Submit</Button>

                </Form>
        </Card.Body>
    <Card.Footer style={styles.header} className="text-muted" >already have an account? <Link to="/login" style={styles.lightgreenColor}>Login</Link></Card.Footer>
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


export default connect(mapStateToProps,{register,clearErrors})(Radium(Register));