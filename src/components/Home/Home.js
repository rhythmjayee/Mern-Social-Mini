import React from "react";
import Radium from 'radium';
import {connect} from "react-redux";

import {Card,Button,Container,Row,Col,Form} from "react-bootstrap"

import Post from "./Post/Post"
import {getPosts,addPost,deletePost,setPostsLoading} from "../../actions/postAction"

const Home=(props)=>{

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
        },
        card:{
            boxShadow: ' 3px 3px #0c0c0C',
            width:"90%",
            margin: "0 auto"
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

    const {posts}=props.post;

    return(
        <>
<Container >
        <Row>
            <Col style={styles.col}>
            <Card style={styles.card} className="text-center">
            <Card.Header style={styles.header}>Write a Post</Card.Header>
            <Card.Body style={styles.cbody}>
            <Form>
            <Form.Group controlId="formBasicname">
                    <Form.Control style={styles.FormControl} type="text" placeholder="write here..." />
            </Form.Group>
            <Button variant="primary" style={styles.button} >Post</Button>
                </Form>
        </Card.Body>
        </Card>
            </Col>
        </Row>
    </Container>

    <Container>
        <Row>
            <Col>
            <Post/>
            </Col>
        </Row>
    </Container>
    </>
    )
}


const mapStateToProps=(state)=>({
post:state.post
})


export default connect(mapStateToProps,{getPosts})(Radium(Home));