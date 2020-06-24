import React, { useEffect,useCallback } from "react";
import {connect} from "react-redux";
import {getPosts,deletePost,setPostsLoading} from "../../../actions/postAction"


import {Container,Row} from "react-bootstrap"

import Post from "../UserPost/Post";


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