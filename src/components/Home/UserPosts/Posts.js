import React, { useEffect,useCallback } from "react";
import {connect} from "react-redux";
import {getPeoplePosts,likePost,unlikePost} from "../../../actions/postAction"


import {Container,Row,Col} from "react-bootstrap"
import Loader from 'react-loader-spinner'

import Post from "../UserPost/Post";


const Posts=(props)=>{
   

    const innerFunction = useCallback(() => {
        props.getPeoplePosts();
    },[]);

    useEffect(()=>{
            innerFunction();
    },[innerFunction,props.getPeoplePosts])

    console.log(props.post.peoplePosts);

    const likeHandler=(id)=>{
        console.log(id);

        props.likePost({PostId:id});
    }

    const unlikeHandler=(id)=>{
        console.log(id);
        props.unlikePost({PostId:id});
    }

    let UsersPosts;
    if(props.post.peoplePosts.length===0){
        UsersPosts=<h4 
        style={{textAlign:"center",
        color:"#29ff00",
        marginTop:"200px"}}>No Feeds found</h4>;
    }
    else{
      let post=props.post.peoplePosts;
      UsersPosts=post.map((p)=>{
        return<Post key={p._id} info={p} usrId={props.user._id} unlike={unlikeHandler} like={likeHandler} />
     })
           
    }

return(
    <Container>
    <Row>

        <Col>
            
            {!props.post.loading?   UsersPosts
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
    
    


export default connect(mapStateToProps,{getPeoplePosts,likePost,unlikePost})(Posts);