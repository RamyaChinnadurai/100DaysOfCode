import React from 'react';
import { OuterDiv, TextBox, FindButton, RelationShip } from './styles';

class Flames extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            partnerName: '',
            result: 'Find Relationship',
        }
    }

    handleChange = (value, type) => {
         this.setState({
            [type]: value,
            result: 'Find Relationship',
        })
    }

    handleClick = () => {
        
        const uniqueCharacters = this.getUniqueCharacters();
        const flames_value     = this.crossOutFlames(uniqueCharacters);
        const result           = this.getResult(flames_value[0]);
        this.setState({
            result,
            calculate: "Calculated"
        })
       
    }

    getUniqueCharacters(){

        const { name, partnerName } = this.state;
        let array     = name.concat(partnerName).split('');
        let duplicate = array.filter( (val,index)  => index !== array.indexOf(val) );
        let unique    = array.filter( val => !duplicate.includes(val));
        return unique;

    }

    crossOutFlames(uniqueCharacters){

        let index          = 0;
        let previous_index = 0;
        let flames         = ["F","L","A","M","E","S"];
        let letter_count   = uniqueCharacters.length;
           
        while(flames.length !== 1){

            if( index === 0 || index > flames.length){
                index = letter_count - flames.length;
            }
            index += previous_index;
                
            if( index > flames.length ){
                index = letter_count - flames.length;
            }

            flames = flames.splice( index, 1);
                previous_index = index;
        }
        
        return flames;
    }

    getResult(flames_value){
        
        const result = {
            "F" : "You both are Friends",
            "L" : "You both Love each other",
            "A" : "You are Affectionate",
            "M" : "You both will Marry soon",
            "E" : "You both are Enemy",
            "S" : "You both are sisters"
        }

        return result[flames_value];
    }

    render(){
        const { name, partnerName, result } = this.state;
       
        return(
            <OuterDiv> 
                <h1> FLAMES </h1>
                <div>
                    <TextBox type="text" placeholder="Enter your name" value={name} onChange={e=>this.handleChange(e.target.value, 'name')} />
                    <TextBox type="text" placeholder="Enter your partner name" value={partnerName} onChange={e=>this.handleChange(e.target.value, 'partnerName')}/>
                </div>
                <div>
                    <FindButton onClick={this.handleClick} result={result}>
                         <RelationShip result={result}> { result } </RelationShip>    
                    </FindButton> 
                </div>
            </OuterDiv>
        )
    }


}


export default Flames;