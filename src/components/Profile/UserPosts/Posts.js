import React, {useEffect,useCallback } from "react";
import {connect} from "react-redux";
import {getPosts,deletePost} from "../../../actions/postAction"


import {Container,Row,Col} from "react-bootstrap";
import Loader from 'react-loader-spinner'


import Post from "../UserPost/Post";


const Posts=(props)=>{
   

    let get=props.getPosts;
    let id=props.user._id;
    const innerFunction = useCallback(() => {
        // props.getPosts(props.user._id);
        get(id);
    },[get,id]);

    useEffect(()=>{
            innerFunction();
    },[innerFunction])

    console.log(props.post.posts);

    const onDeletePostHandler=(id)=>{
        console.log("clicked??")
        props.deletePost(id)

    }


    let UserPosts;
    if(props.post.posts.length===0){
        UserPosts=<h4 
        style={{textAlign:"center",
        color:"#29ff00",
        marginTop:"200px"}}>No Posts found</h4>;
    }
    else{
      let post=props.post.posts;
      UserPosts=post.map((p)=>{
                return<Post key={p._id} info={p} name={props.user.name} delete={onDeletePostHandler}/>
           })
           
    }
    
        




return(
    <Container>
    <Row>
        <Col>
      
        {!props.post.loading?   UserPosts
        :
        <Loader
        type="Circles"
        color="#29ff00"
        height={100}
        width={100}
        timeout={2000} //3 secs
        style={{textAlign:"center"}} 
    />
    }
         
        </Col>
   
       
        
    </Row>
</Container>
)
}

const mapStateToProps=(state)=>({
    user:state.auth.user,
    post:state.post
})
    
    


export default connect(mapStateToProps,{getPosts,deletePost})(Posts);