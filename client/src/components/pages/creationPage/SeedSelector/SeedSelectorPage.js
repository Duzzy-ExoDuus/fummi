import React, {Component} from 'react';
import SeedSelector from './SeedSelector';
import SeedRecommender from './SeedRecommender';
import styled from "styled-components";
import {Col} from "reactstrap";

const ConfirmButton = styled.button`
    color:#009688;
    font-family: Roboto;
    font-weight: bolder;
    font-size:1rem;
    float:right;
    margin-right: 10%;
    margin-bottom:1%;
    border: none;
    background-color: transparent;
`;

const HeaderDiv = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;
  margin-top: -50px;
  font-family: Roboto;
  font-size:large;
  padding: 5% 5% 15px;
  margin-bottom: 15px;
`

const HeaderDiv2 = styled.div`
  background-color: rgb(0, 150, 136);
  color: white;
  width:100vw;
  float: left;

  font-family: Roboto;
  font-size:large;
  padding: 5% 5% 15px;

  margin-bottom: 15px;
`;
class SeedSelectorPage extends Component {

    render() {
        return (
            <div>
                <HeaderDiv>
                    Search for seeds
                </HeaderDiv>
                <br/>
                <SeedSelector seeds={this.props.seeds} updateSeeds={this.props.updateSeeds} close={this.props.close}/>
                <ConfirmButton onClick={this.props.close}>Confirm</ConfirmButton>
                <br/>
                {/*<HeaderDiv2>*/}
                {/*    Recommended seeds*/}
                {/*</HeaderDiv2>*/}
                <SeedRecommender/>

            </div>

        );
    }
}

export default SeedSelectorPage;