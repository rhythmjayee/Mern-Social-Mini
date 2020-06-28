import React from "react";
import Radium from 'radium';


import {Accordion,Card,Button,Container,Row,Col,Form} from "react-bootstrap"

import Comments from "../Comments/Comments"

const Post=(props)=>{
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
            borderRadius:"50px"

            
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
            margin: "0 auto",
            borderRadius:"50px"
        },
        cbody:{
            backgroundColor:"#333333",
            color:"#29ff00",
            padding:"20px",
            borderRadius:"30px"


        },
        FormControl:{
            backgroundColor:"#3333",
            color:"#29ff00",

        },
        commentA:{
            backgroundColor:"#0c0c0C",
            color:"#29ff00",
            textAlign:"end"
        },
        comments:{
            backgroundColor:"#333333",
            color:"#0c0c0C"
        },
        btn:{
            backgroundColor:"#3333",
            color:"#29ff00",
            marginLeft:"10px",
            border:"1px solid",
            marginTop:"20px",
            borderRadius:"50px"
        }

    }

return(
    <Container>
    <Row>
        
       <Col sm={12}> <Accordion style={{marginTop:"50px"}} defaultActiveKey="1">
            <Card style={styles.header}> 
            <Card.Body style={styles.header}>
<Card.Title style={{textAlign:"center",textTransform:"uppercase"}}>{props.name}</Card.Title>
            <Card.Text style={styles.cbody}>
            {props.info.body}
            </Card.Text>
            <Button style={styles.btn} disabled>{props.info.likes.length}  <i className="fa fa-thumbs-up"> Likes</i></Button>
            <Button style={styles.btn} disabled>{props.info.comments.length}   <i className="fa fa-book"> Comments</i></Button>
            <Button style={styles.btn} onClick={()=>props.delete(props.info._id)}><i className="fa fa-trash"></i></Button>

            </Card.Body>
                <Accordion.Toggle as={Card.Header} style={styles.commentA}  eventKey="0">
                <Button style={styles.btn}><i className="fa fa-arrow-down"></i></Button>         
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body style={styles.comments} >
                    <Container className="m-3">
                        <Row>
                        {props.info.comments.length!==0 ?props.info.comments.map((c,index)=>{
                                return<Comments  key={index} c={c} />
                            }):
                            null}
                        </Row>
                    </Container>
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion></Col>
    
       
        
    </Row>
</Container>
)
}

    
    


export default (Radium(Post));