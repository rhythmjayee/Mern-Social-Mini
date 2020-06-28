import React from "react";
import {connect} from "react-redux";
import {getPosts,deletePost} from "../../../actions/postAction"



import {Container,Row,Col} from "react-bootstrap"
import Loader from 'react-loader-spinner'


import Post from "../UserPost/Post";


const Posts=(props)=>{
    // const styles={
    //     lightgreenColor:{
    //         color:"#29ff00"
    //     },
    //     col:{
    //         padding:"50px",
    //         borderRadius:"50px",
    //         width:"40%"
            
    //     },
    //     header:{
    //         backgroundColor:"#0c0c0C",
    //         color:"#29ff00",
    //         borderRadius:"50px"

            
    //     },
    //     button:{
    //         color:"#29ff00",
    //         fontWeight:"bold",
    //         backgroundColor:"#0c0c0C",
    //         border:"2px solid #0c0c0C",
    //     },
    //     card:{
    //         boxShadow: ' 3px 3px #0c0c0C',
    //         width:"90%",
    //         margin: "0 auto",
    //         borderRadius:"50px"
    //     },
    //     cbody:{
    //         backgroundColor:"#333333",
    //         color:"#29ff00",
    //         padding:"20px",
    //         borderRadius:"30px"


    //     },
    //     FormControl:{
    //         backgroundColor:"#3333",
    //         color:"#29ff00",

    //     },
    //     commentA:{
    //         backgroundColor:"#0c0c0C",
    //         color:"#29ff00",
    //         textAlign:"end"
    //     },
    //     comments:{
    //         backgroundColor:"#333333",
    //         color:"#0c0c0C"
    //     },
    //     btn:{
    //         backgroundColor:"#3333",
    //         color:"#29ff00",
    //         marginLeft:"10px",
    //         border:"1px solid",
    //         marginTop:"20px",
    //         borderRadius:"50px"
    //     }

    // }
   

    // let get=props.getPosts;
    // let id=props.user._id;
    // const innerFunction = useCallback(() => {
    //     // props.getPosts(props.user._id);
    //     get(id);
    // },[get,id]);

    // useEffect(()=>{
    //         innerFunction();
    // },[innerFunction])

    console.log(props.post.posts);

    const onDeletePostHandler=(id)=>{
        console.log("clicked??")
        props.deletePost(id);

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
      UserPosts=post.map((p,index)=>{
                return<Post key={index} info={p} name={props.user.name} delete={onDeletePostHandler}/>
    //             return <Accordion key={p._id} style={{marginTop:"50px"}} defaultActiveKey="1">
    //             <Card style={styles.header}> 
    //             <Card.Body style={styles.header}>
    // <Card.Title style={{textAlign:"center",textTransform:"uppercase"}}>{props.user.name}</Card.Title>
    //             <Card.Text style={styles.cbody}>
    //             {p.body}
    //             </Card.Text>
    //             <Button style={styles.btn} disabled>{p.likes.length}  <i className="fa fa-thumbs-up"> Likes</i></Button>
    //             <Button style={styles.btn} disabled>{" 3 "}    <i className="fa fa-book"> Comments</i></Button>
    //             <Button style={styles.btn} onClick={()=>props.deletePost(p._id)}><i className="fa fa-trash"></i></Button>
    
    //             </Card.Body>
    //                 <Accordion.Toggle as={Card.Header} style={styles.commentA}  eventKey="0">
    //                 <Button style={styles.btn}><i className="fa fa-arrow-down"></i></Button>         
    //                 </Accordion.Toggle>
    //                 <Accordion.Collapse eventKey="0">
    //                 <Card.Body style={styles.comments} >
    //                     <Container className="m-3">
    //                         <Row>
    //                             <Col sm>
    //                             <Card.Body style={styles.header}>
    //                             <Card.Title style={{textAlign:"center",textTransform:"uppercase"}}>User Name</Card.Title>
    
    //                                 <Card.Text style={styles.cbody}>
    //                                 User Article body
    //                                 </Card.Text> 
    //                             </Card.Body>
                                
    //                             </Col>
    //                         </Row>
    //                     </Container>
                            
    //                 <Form>
    //                     <Row>
    //                         <Col sm={10}>
    //                         <Form.Control  style={styles.header} type="text" placeholder="type here...." />
    //                         </Col>
    //                         <Col sm>
    //                         <Button style={{backgroundColor:"#0c0c0C",color:"#29ff00",borderRadius:"50px", border:"2px solid #29ff00"}}>add</Button>                    
    //                         </Col>
    //                     </Row>
    //                     </Form>
    //                 </Card.Body>
    //                 </Accordion.Collapse>
    //             </Card>
    //             </Accordion>
           })
           
    }
    
        




return(
    <Container>
    <Row>
        <Col sm={12}>
      
        {!props.post.loading?   UserPosts
        :
        <Loader
        type="Circles"
        color="#29ff00"
        height={100}
        width={100}
        timeout={3000} //3 secs
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