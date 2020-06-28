import React from "react";
import Radium from 'radium';


import {Accordion,Card,Button,Container,Row,Col} from "react-bootstrap"

import Input from "../CommentInput/Input";

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
        },
         Lbtn:{
            backgroundColor:"#29ff00",
            color:"#0c0c0C",
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
        <Card.Title style={{textAlign:"center",textTransform:"uppercase"}}>{props.info.creator.name}</Card.Title>
            <Card.Text style={styles.cbody}>
            {props.info.body}
            </Card.Text>
            {props.info.likes.indexOf(props.usrId)=== -1 ?
            <Button style={styles.btn} onClick={()=>props.like(props.info._id)}>{props.info.likes.length}   <i className="fa fa-thumbs-up"> Likes</i></Button>
            :<Button style={styles.Lbtn} onClick={()=>props.unlike(props.info._id)}>{props.info.likes.length}   <i className="fa fa-thumbs-up"> Likes</i></Button>
            }
            <Button style={styles.btn}>{props.info.comments.length}   <i className="fa fa-book"> Comments</i></Button>

            </Card.Body>
                <Accordion.Toggle as={Card.Header} style={styles.commentA}  eventKey="0">
                <Button style={styles.btn}><i className="fa fa-arrow-down"></i></Button>         
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                <Card.Body style={styles.comments} >
                    <Container className="m-3">
                        <Row>
                            {props.info.comments.map(c=>{
                                return<Col style={{marginTop:"20px"}} key={c._id} sm={12}>
                            <Card.Body style={styles.header}>
                            <Card.Title style={{textAlign:"center",textTransform:"uppercase"}}>{c.user.name}</Card.Title>

                                <Card.Text style={styles.cbody}>
                                {c.body}
                                </Card.Text> 
                            </Card.Body>
                            
                            </Col>
                            })}
                            
                        </Row>
                    </Container>
                        
                    <Input postId={props.info._id} />
                </Card.Body>
                </Accordion.Collapse>
            </Card>
            </Accordion></Col>
    
       
        
    </Row>
</Container>
)
}

    
    


export default (Radium(Post));