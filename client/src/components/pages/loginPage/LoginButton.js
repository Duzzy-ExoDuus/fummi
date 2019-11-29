import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import spotifyLogo from '../../../images/spotifyLogo.png'



const LoginButton = styled.button`
display: block;
	margin-top: 50px;
	margin-left: auto;
	margin-right: auto;
	background-color: #51C768; /* Green */
	border: none;
	color: white;
	padding: 15px; 
	text-decoration: none;
	cursor: pointer;
	border-radius: 65px;
	font-family:"Montserrat";
	font-size: 30px;
	font-weight: normal;
	line-height: 22px;
    text-align: center;


    @media screen and (max-width: 500px) {
      padding: 13px;
      width:90%;
      font-size: 20px;
  }
    
  
    &::before {
        background: url(${spotifyLogo}) no-repeat scroll center center / 100% auto rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        color: #fff;
        height: 30px;
        margin-right: 18px;
        margin-left: -15px;
        position: relative;
        top: -2px;
        vertical-align: middle;
        width: 36px;
        height: 36px;
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