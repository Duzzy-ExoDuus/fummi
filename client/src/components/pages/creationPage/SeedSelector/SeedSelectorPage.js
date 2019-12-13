import React, {Component} from 'react';
import SeedSelector from './SeedSelector';
import SeedRecommender from './SeedRecommender';
import styled from "styled-components";

const ConfirmButton = styled.button`
    margin-top: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(90,90,90,0.98); 
    border: none;
    color: white;
    //padding: 30px; 
    cursor: pointer;
    border-radius: 65px;
    text-align:center;
    font-family:"Roboto";
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    padding: 1%;
    width:60vw;  
   
`;

const HeaderDiv = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding:5%;
  padding-bottom: 10px;
  margin-bottom: 15px;
`

const HeaderDiv2 = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;

  font-family: Roboto;
  font-size:large;
  padding:5%;
  padding-bottom: 10px;
  margin-bottom: 15px;
`
class SeedSelectorPage extends Component {

    render() {
        return (
            <div>
                <HeaderDiv>
                    Pick your seeds
                </HeaderDiv>
                <br/>
                <SeedSelector seeds={this.props.seeds} updateSeeds={this.props.updateSeeds} close={this.props.close}/>
                <ConfirmButton onClick={this.props.close}>Confirm seeds</ConfirmButton>
                <br/>
                <HeaderDiv2>
                    Recommended seeds
                </HeaderDiv2>
                <SeedRecommender/>

            </div>

        );
    }
}

export default SeedSelectorPage;