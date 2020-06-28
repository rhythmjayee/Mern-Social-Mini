import React, { useState,useEffect } from "react";
import {Card,Button,Container,Row,Col} from "react-bootstrap"
import Radium from 'radium';

import {getPosts} from "../../actions/postAction"
import {loadUser} from "../../actions/authAction"


import {connect} from "react-redux";

import Posts from "./UserPosts/Posts"


const Profile=(props)=>{
    const styles={
        lightgreenColor:{
            color:"#29ff00"
        },
        col:{
            // padding:"50px",
            borderRadius:"50px",
            // width:"40%"
            
        },
        header:{
            backgroundColor:"#0c0c0C",
            color:"#29ff00",
            fontWeight:"bold",
            borderRadius:"50px 50px"

            
        },
        button:{
            color:"#29ff00",
            fontWeight:"bold",
            backgroundColor:"#0c0c0C",
            border:"2px solid #29ff00",
            borderRadius:"50px"
        },
        card:{
            boxShadow: ' 3px 3px #0c0c0C',
            width:"100%",
            margin: "0 auto",
            border:"2px solid",
            // borderRadius:"50px"
        },
        cbody:{
            backgroundColor:"#333333",
            color:"#29ff00",



        },

    }

        // const [post,setPost]=useState([]);
        // let posts=props.user.posts;

        useEffect(()=>{
            // console.log("profile....")
            props.loadUser();
        },[])

        useEffect(()=>{
            props.getPosts(props.user._id);
        },[])

    return(
        <>
            <Container fluid>
                <Row>
                    <Col sm={12} >
                    <Card style={styles.header} className="text-center">
                        <Card.Header><i className="fa fa-user"></i>  Profile</Card.Header>
                        <Card.Body style={styles.cbody}>
                            <Card.Title style={styles.cbody}>{props.user.name}</Card.Title>
                            {/* <Card.Text style={styles.cbody}>
                            With supporting text below as a natural lead-in to additional content.
                            </Card.Text> */}
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button size="lg" style={styles.button} block >{props.user.followers.length} <i className="fa fa-users">Followers</i></Button>
                                    
                                </Col>
                                <Col>
                                    <Button size="lg" style={styles.button} block>{props.user.posts.length}   <i className="fa fa-file-text-o"> Posts</i></Button>
                                    

                                </Col>
                                <Col>
                                    <Button size="lg" style={styles.button} block>{props.user.followings.length}    <i className="fa fa-users">Followings</i></Button>
                                    

                                </Col>
                            </Row>
                        </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col className="text-center">
                    <Card style={styles.header}>
                        <Card.Body style={styles.button}>ALL POSTS</Card.Body>
                        </Card>     
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row >
                    <Col style={{padding:"20px"}}>
                    <Posts/> 
                    </Col>
                </Row>
            </Container>
        </>
    )
}





const mapStateToProps=(state)=>({
user:state.auth.user
})








export default connect(mapStateToProps,{getPosts,loadUser})(Radium(Profile));