import React from "react";


class Flames extends React.Component{

    componentDidMount(){
        const a = "ranbir";
        const b = "alia";
        let c = a.split("").concat(b.split(""));
            c = [... new Set(c)]
        console.log(c)
        
    }


    render(){
        return(
            <div> Flames </div>
        )
    }


}

export default Flames;