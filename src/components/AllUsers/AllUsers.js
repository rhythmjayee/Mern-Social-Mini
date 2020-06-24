import React from "react";
import {Card,Button,Container,Row,Col} from "react-bootstrap"
import Radium from 'radium';





const AllUsers=()=>{
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
    return(

        <Container fluid>
            <Row>
                <Col sm={12} >
                    <Card style={styles.header} className="text-center">
                        <Card.Header><i className="fa fa-user"></i></Card.Header>
                        <Card.Body style={styles.cbody}>
                            <Card.Title style={styles.cbody}>User NAme</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button size="lg" style={styles.button} block ><i className="fa fa-users">Follow</i></Button>
                                    
                                </Col>
                                <Col>
                                    <Button size="lg" style={styles.button} block><i className="fa fa-file-text-o"> Posts</i></Button>
                                    

                                </Col>
                                <Col>
                                    <Button size="lg" style={styles.button} block><i className="fa fa-users">Followers</i></Button>
                                    

                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
  
    )
}
 export default Radium(AllUsers);