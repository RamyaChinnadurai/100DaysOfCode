import React from 'react';
import { OuterDiv, TextBox, FindButton, RelationShip, ResultDiv } from './styles';

class Flames extends React.Component {

    render(){

        return(
            <OuterDiv> 
                <h1> FLAMES </h1>
                <div>
                    <TextBox type="text" placeholder="Enter your name"/>
                    <TextBox type="text" placeholder="Enter your partner name"/>
                </div>
                <div>
                    <FindButton >
                         <RelationShip> Find RelationShip </RelationShip>    
                    </FindButton> 
                </div>
                <ResultDiv>
                    You both are Friends!
                </ResultDiv>
            </OuterDiv>
        )
    }


}


export default Flames;