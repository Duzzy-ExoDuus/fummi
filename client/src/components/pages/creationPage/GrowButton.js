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
	cursor: pointer;
	border-radius: 65px;
	text-align:center;
    font-family:"Roboto";
	font-size: 14px;
	font-weight: medium;
	line-height: 22px;
    padding: 1%;
    width:80%;  
    font-size: 18px;
  }
    
    &::before {
        background: url(${seed}) no-repeat scroll center center / 85% auto rgba(0, 0, 0, 0);
        content: "";
        display: inline-block;
        color: #fff;
        position: relative;
        //top: -1%;
        left: -5%;
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