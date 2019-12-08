import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import spotifyLogo from '../../../images/spotifyLogo.png'
import seed from "../../../images/zaadje.png";



const LoginButton = styled.button`
margin-top: 20%;
display: block;
	margin-left: auto;
	margin-right: auto;
	background-color: #51C768; 
	border: none;
	color: white;
    //padding: 30px; 
	text-decoration: none;
	cursor: pointer;
	border-radius: 65px;
	text-align:center;
    font-family:"Roboto";
	font-size: 14px;
	font-weight: medium;
	line-height: 22px;
	width:70%;


    @media screen and (max-width: 400px) {
      //padding: 13px;
      width:90%;
      font-size: 18px;
  }
    @media screen  and (min-width: 400px) and (max-width: 450px)  {
      //padding: 13px;
      width:90%;  
      font-size: 18px;
  }
    
    &::before {
        background: url(${spotifyLogo}) no-repeat scroll center center / 85% auto rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        color: #fff;
        position: relative;
        //top: -1%;
        left: -10%;
        vertical-align: middle;
        width: 34px;
        height: 50px;
        //padding:20px;
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