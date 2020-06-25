import React,{useState,useEffect} from "react";
import Radium from 'radium';
import {connect} from "react-redux";


import {Card,Button,Container,Row,Col,Form,Alert} from "react-bootstrap"

// import Posts from "./UserPosts/Posts"
import {addPost} from "../../actions/postAction";
import {clearErrors} from "../../actions/errorAction";

import Loader from 'react-loader-spinner'


const Home=(props)=>{

        const [input, setInput] = useState('');

    const styles={
        lightgreenColor:{
            color:"#29ff00"
        },
        col:{
            padding:"50px",
            borderRadius:"50px",
            width:"40%"
            
        },
        header:{
            backgroundColor:"#0c0c0C",
            color:"#29ff00",
            
        },
        button:{
            color:"#29ff00",
            fontWeight:"bold",
            backgroundColor:"#0c0c0C",
            border:"2px solid #0c0c0C",
            borderRadius:"50px"
        },
        card:{
            boxShadow: ' 3px 3px #0c0c0C',
            width:"90%",
            margin: "0 auto",
            border:"2px solid"
        },
        cbody:{
            backgroundColor:"#333333",
            color:"#29ff00",


        },
        FormControl:{
            backgroundColor:"#3333",
            color:"#29ff00",

        }

    }

    const [errorM,setError]=useState(null);

    let {error}=props;

    useEffect(()=>{

        if(error){
            // if(error.id==="LOGIN_FAIL"){
                setError(error.msg.message);
                console.log(error.msg.message);

            // }
        }
    },[error])


    const handleChangeInput=(e)=>{
        setInput(e.target.value);
    }


    const addPostHandler=(e)=>{
        e.preventDefault();
    
            const newPost = {
                body:input,
                creator:props.auth.user._id
              };
              console.log(newPost);
           props.addPost(newPost);
 
        props.clearErrors();

       
    }



    return(
        <>
<Container >
        <Row>
            <Col sm={12} style={styles.col}>
            <Card style={styles.card} className="text-center">
            <Card.Header style={styles.header}>Write a Post</Card.Header>
            <Card.Body style={styles.cbody}>
            {errorM && <Alert style={{background:"#0c0c0C"}} color="danger">{errorM}</Alert>}
            <Form onSubmit={addPostHandler}>
            <Form.Group controlId="formBasicname">
                    <Form.Control style={styles.FormControl} type="text" onChange={handleChangeInput} name="body" placeholder="write here..." autoComplete="off"/>
            </Form.Group>
            <Button type="submit" variant="primary" style={styles.button} >Post</Button>
             </Form>
        </Card.Body>
        </Card>
            </Col>
            <Col>
                {props.post.loading &&
                 <Loader
                type="Circles"
                color="#29ff00"
                height={100}
                width={100}
                timeout={2000} //3 secs
                style={{textAlign:"center"}} 
             />}
            </Col>
        </Row>
    </Container>

    <Container>
        <Row>
            <Col>
            {/* <Posts /> */}
            </Col>
        </Row>
    </Container>
    </>
    )
}


const mapStateToProps=(state)=>({
auth:state.auth,
post:state.post,
error:state.error
})


export default connect(mapStateToProps,{addPost,clearErrors})(Radium(Home));