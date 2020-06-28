import React, { useState,useEffect } from "react";

import {Card,Col} from "react-bootstrap";
import Radium from 'radium';






const Comments=(props)=>{
    const styles={
    
        header:{
            backgroundColor:"#0c0c0C",
            color:"#29ff00",
            borderRadius:"50px"

            
        },
        cbody:{
            backgroundColor:"#333333",
            color:"#29ff00",
            padding:"20px",
            borderRadius:"30px"


        },

      

    }

    const [info,setInfo]=useState({
        body:"",
        user:[]
    });

    useEffect(()=>{
        setInfo(props.c);
    },[]);

    return(
        <Col style={{marginTop:"20px"}} sm={12}>
            <Card.Body style={styles.header}>
            <Card.Title style={{textAlign:"center",textTransform:"uppercase"}}>{info.user.name}</Card.Title>
            <Card.Text style={styles.cbody}>
                {info.body}
                </Card.Text>  
                
            </Card.Body>
            
            </Col>
    )
}


export default Radium(Comments);