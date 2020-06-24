 
import React, { Fragment } from 'react';
import { NavLink } from 'react-bootstrap';
import { connect } from 'react-redux';
import Radium from 'radium';

import { logout } from '../../../actions/authAction';

export const Logout = (props) => {
    const styles={
        link:{
            marginLeft:"20px",
            color:"#7bff56",

            textDecoration:"none",
            padding:"10px",
            boxShadow: '0 3px 3px #7bff56',
        }}

        const onClickHandler=()=>{
          props.logout()
        }

        // if(!props.isAuthenticated){
        //     return <Redirect  to="/login"/>
        // }
  return (
    <Fragment>
      <NavLink style={styles.link} onClick={onClickHandler} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
})

export default connect(mapStateToProps, { logout })(Radium(Logout));