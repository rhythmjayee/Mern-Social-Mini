import React, { useEffect } from "react";
import {Card,Button,Container,Row,Col} from "react-bootstrap"
import Radium from 'radium';

import {connect} from "react-redux";
import {loadPeople,followPeople,unFollowPeople,setPeopleLoading} from "../../actions/peopleAction";


import Loader from 'react-loader-spinner'






const AllUsers=(props)=>{
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
            borderRadius:"50px 50px",
            marginBottom:"50px"

            
        },
        button:{
            color:"#29ff00",
            fontWeight:"bold",
            backgroundColor:"#0c0c0C",
            border:"2px solid #29ff00",
            borderRadius:"50px"
        },
        UNbutton:{
            color:"#0c0c0C",
            fontWeight:"bold",
            backgroundColor:"#29ff00",
            border:"2px solid #0c0c0C",
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

    useEffect(()=>{
        props.loadPeople();
    },[]);

    const followHandler=(id)=>{
        props.setPeopleLoading();
        let follow={
            followId:id,
            userId:props.auth.user._id
        }
        props.followPeople(follow);

    }

    const UnfollowHandler=(id)=>{
        props.setPeopleLoading();

        let unfollow={
            unfollowId:id,
            userId:props.auth.user._id
        }
        props.unFollowPeople(unfollow);

    }


// console.log("people......")


    let Users;
    if(props.people.users.length===0){
        Users=<h4 
        style={{textAlign:"center",
        color:"#29ff00",
        marginTop:"200px"}}>No Users found</h4>;
    }
    else{
      let urs=props.people.users;
      Users=urs.map((p)=>{
        return <Card key={p._id} style={styles.header} className="text-center">
        <Card.Header><i className="fa fa-user"></i> {p.name}</Card.Header>
        <Card.Body style={styles.cbody}>
      <Card.Title style={styles.cbody}>{p.email}</Card.Title>
        </Card.Body>
        <Card.Footer>
            <Row>
                <Col>{p.followers.indexOf(props.auth.user._id)!== -1?
                <Button size="lg" style={styles.UNbutton} onClick={()=>UnfollowHandler(p._id)} block ><i className="fa fa-users">Unfollow</i></Button>:
                <Button size="lg" style={styles.button} onClick={()=>followHandler(p._id)} block ><i className="fa fa-users">Follow</i></Button>
            }
                    
                </Col>
                <Col>
                    <Button size="lg" style={styles.button} block>{p.posts.length}   <i className="fa fa-file-text-o"> Posts</i></Button>
                    

                </Col>
                <Col>
                    <Button size="lg" style={styles.button} block>{p.followers.length}    <i className="fa fa-users">Followers</i></Button>
                    

                </Col>
            </Row>
        </Card.Footer>
    </Card>
        
    
           })
           
    }







    return(

        <Container fluid>
            <Row>
            <Col>
            {!props.people.isLoading?   Users
        :
        <Loader
        type="Circles"
        color="#29ff00"
        height={100}
        width={100}
        timeout={5000} //3 secs
        style={{textAlign:"center"}} 
    />
    }
                </Col>
            </Row>
        </Container>
  
    )
}



const mapStateToProps=(state)=>({
people:state.people,
auth:state.auth
})


 export default connect(mapStateToProps,{loadPeople,setPeopleLoading,followPeople,unFollowPeople})(Radium(AllUsers));