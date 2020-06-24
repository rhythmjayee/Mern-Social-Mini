import React, { useState,useEffect,useCallback } from "react";
import Radium from 'radium';
import {connect} from "react-redux";
import {getPosts,addPost,deletePost,setPostsLoading} from "../../../actions/postAction"


import {Accordion,Card,Button,Container,Row,Col,Form} from "react-bootstrap"

import Post from "../Post/Post";


const Posts=(props)=>{
   

    const innerFunction = useCallback(() => {
        props.getPosts(props.user._id);
    },[]);

    useEffect(()=>{
            innerFunction();
    },[innerFunction,props.getPosts])

    console.log(props.post.posts);

return(
    <Container>
    <Row>
        
        {props.post.posts.map((p)=>{
           return<Post key={p._id} info={p}/>
        })}
       
        
    </Row>
</Container>
)
}

const mapStateToProps=(state)=>({
    user:state.auth.user,
    post:state.post
})
    
    


export default connect(mapStateToProps,{getPosts,deletePost})(Posts);