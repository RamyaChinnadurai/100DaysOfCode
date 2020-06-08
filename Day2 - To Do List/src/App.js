import React from 'react';
import './App.css';

export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      value:'',
      tasks: [
       
      ]
    }
  }

  handleChange = (event)=>{
    this.setState({
      value: event.target.value
    })
  }

  handleClick = ()=>{
    const {value, tasks} = this.state;
    tasks.push(value);
    this.setState({
      tasks,
      value:''
    })
  }

  

  handleDone = (index) => {
    document.getElementById(index).classList.add('MarkAsDone');
  }

  handleDelete = (index) => {
   let {tasks} = this.state;
    tasks.splice(index,1);
    this.setState({
      tasks
    })
    document.getElementById(index).classList.remove('MarkAsDone');
  }

  render (){
    const {tasks} = this.state;
    return(
    <div className="App">
        <div className="taskDiv"> 
          <h1 className="title"> My To Do List </h1>
          <div>
            <div className="taskArea">
              <textarea className="inputTask" type = "text" name="task"  value={this.state.value} onChange={this.handleChange} />
              <button className="addTask" onClick={this.handleClick}> Add task </button>
            </div>
            <div> 
              { tasks.map( (val, index) => {
                return (
                    <div className="taskDisplay" key={index}>
                      <div className="taskCount">
                         <li className="tasks" type="number"> <label id={index}>{val}</label> </li>
                         
                      </div>
                      <div className="buttonDiv">
                        <button className="markAsDone" onClick={()=>this.handleDone(index)}> Mark as Done </button>
                        <button className="delete" onClick={()=>this.handleDelete(index)}> Delete </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
    );
  }
}