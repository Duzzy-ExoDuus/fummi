import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import seed from '../../../images/zaadje.png'



const LoginButton = styled.button`
margin-top: 10px;
display: block;
	margin-left: auto;
	margin-right: auto;
	background-color: #9C9C9C; 
	border: none;
	color: white;
    //padding: 30px; 
	text-decoration: none;
	cursor: pointer;
	border-radius: 65px;
	text-align:center;
  font-family:"Montserrat", sans-serif;
	font-size: 25px;
	line-height: 22px;


    @media screen and (max-width: 400px) {
      padding: 13px;
      width:90%;
      font-size: 25px;
  }
    @media screen  and (min-width: 400px) and (max-width: 450px)  {
      padding: 13px;
      width:75%;
      font-size: 20px;
  }
    
   

 
    &::before {
        background: url(${seed}) no-repeat scroll center center / 100% auto rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        color: #fff;
        height: 60px;
        position: relative;
        top: -2px;
        vertical-align: middle;
        width: 34px;
        padding:20px;
        // margin-left:14px;
    }

`


const Button = ({children, onClick, style}) => 
  <LoginButton 
    onClick={e => onClick(e)}>
    {children ? children : "Default button text"}
  </LoginButton>

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default Button;