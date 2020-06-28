import React,{useState} from "react";
import Radium from 'radium';
import {connect} from "react-redux";

import {commentPost} from "../../../actions/postAction";


import {Button,Row,Col,Form} from "react-bootstrap"

const Input=(props)=>{
    const styles={
        header:{
            backgroundColor:"#0c0c0C",
            color:"#29ff00",
            borderRadius:"50px"

            
        },
        FormControl:{
            backgroundColor:"#3333",
            color:"#29ff00",

        }


    }
    const [input,setInput]=useState("");

    const inputHandler=(e)=>{
        // console.log("input....")
        setInput(e.target.value);
    }

    const onSubmitHandler=(e)=>{
        // console.log("submit....")
        // console.log(props.id)
        e.preventDefault();
        const comment={
            body:input,
            postId:props.id
        }
        props.commentPost(comment);
    }

    return(
        <Form onSubmit={onSubmitHandler}>
        <Row>
            <Col sm={10}>
            <Form.Control onChange={inputHandler} name="comment" value={input} style={styles.header} type="text" placeholder="type here...." />
            </Col>
            <Col sm>
            <Button type="submit" style={{backgroundColor:"#0c0c0C",color:"#29ff00",borderRadius:"50px", border:"2px solid #29ff00"}}>add</Button>                    
            </Col>
        </Row>
        </Form>
    )
}

const mapStateToProps=(state,ownProps)=>({
id: ownProps.postId 
});

export default connect(mapStateToProps,{commentPost})(Radium(Input));