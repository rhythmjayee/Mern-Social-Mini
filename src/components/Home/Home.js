import React,{useState} from "react";
import Radium from 'radium';
import {connect} from "react-redux";


import {Card,Button,Container,Row,Col,Form} from "react-bootstrap"

import Posts from "./UserPosts/Posts"
import {addPost,setPostsLoading} from "../../actions/postAction"

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
    }



    return(
        <>
<Container >
        <Row>
            <Col style={styles.col}>
            <Card style={styles.card} className="text-center">
            <Card.Header style={styles.header}>Write a Post</Card.Header>
            <Card.Body style={styles.cbody}>
            <Form onSubmit={addPostHandler}>
            <Form.Group controlId="formBasicname">
                    <Form.Control style={styles.FormControl} type="text" onChange={handleChangeInput} placeholder="write here..." autoComplete="off"/>
            </Form.Group>
            <Button type="submit" variant="primary" style={styles.button} >Post</Button>
             </Form>
        </Card.Body>
        </Card>
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
post:state.post
})


export default connect(mapStateToProps,{addPost})(Radium(Home));