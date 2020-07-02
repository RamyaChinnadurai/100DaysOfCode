import React from "react";


class Flames extends React.Component{

    componentDidMount(){
        const a = "ranbir";
        const b = "alia";
        let c = a.split("").concat(b.split(""));
            c  = [ ...new Set(c)];
        const flames = "flames";
        const output = {
            "f" : "friends",
            "l" : "love",
            "m" : "marriage",
            "e" : "enemy",
            "s" : "sisters"
        }
        
       
    }


    render(){
        return(
            <div> Flames </div>
        )
    }


}

export default Flames;