import React from 'react';
import './App.css';

class Typing extends React.Component {
  
  constructor(props){
    super(props);
    this.state ={
      quote:'Get new quote...',
      timeLimit: 30,
      timeLeft: 30,
      timeElapsed: 0,
      totalErrors: 0,
      errors: 0,
      accuracy: 0,
      characterTyped: 0,
      timer: null,
      wpm: 0,
      cpm: 0,
      disableInput: false,
      start: false,
      showOutput: false
    } 
    this.renderNewQuote = this.renderNewQuote.bind(this);
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.startGame = this.startGame.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.resetValues = this.resetValues.bind(this);
  }
  
  componentDidMount(){
    let { start, errors, totalErrors, characterTyped } = this.state;
    this.renderNewQuote();
    const quoteDisplay = document.getElementById('quoteDisplay');
    const quoteInput   = document.getElementById('quoteInput');
    
    quoteInput.addEventListener('input', ()=> {

         errors = 0;
        
         if(!start){
           this.startGame();
           this.setState({
             start: true
           })
         }
      
        const arrayQuote = quoteDisplay.querySelectorAll('span');
        const arrayValue = quoteInput.value.split('');
        let correct = true;
        this.setState({
          characterTyped : characterTyped++,
          errors: errors
        })
      
        arrayQuote.forEach((characterSpan, index) => {
              const character = arrayValue[index]
                if(character == null){
                    characterSpan.classList.remove('correct');
                    characterSpan.classList.remove('incorrect');
                    correct = false;
                }else if(character === characterSpan.innerText) {
                   characterSpan.classList.add('correct');
                   characterSpan.classList.remove('incorrect');
                }else{
                    characterSpan.classList.remove('correct');
                    characterSpan.classList.add('incorrect');
                    correct = false;
                    errors++;
                    this.setState({
                      errors: errors
                    })
                }
          })
         
          errors = totalErrors + errors;
        
          let correctCharacters = (characterTyped - ( totalErrors + errors ));
          let accuracyVal = ((correctCharacters / characterTyped) * 100);
          this.setState({
            accuracy: Math.round(accuracyVal),
            totalErrors: errors,
            errors
          })
        console.log("totalErrors: ",totalErrors);
          if(correct){
            this.renderNewQuote();
          }
      })
    
  }
  
  updateTimer(){
      let { timeLeft, timeElapsed } = this.state;
      timeLeft--
      timeElapsed++
      if (timeLeft > 0) {
        this.setState({
          timeLeft,
          timeElapsed
        })
      }else{
        this.finishGame();
      }
  }
  
  finishGame(){
    let { timer, characterTyped, timeElapsed } = this.state;
    let cpm = Math.round(((characterTyped / timeElapsed) * 60));
    console.log('cpm: ', cpm);
    let wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    console.log('wpm: ', wpm);
    clearInterval(timer);
    this.resetValues();
    this.setState({
      disableInput: true,
      cpm,
      wpm
    })
    
  }
  
  startGame(){
      let { timer } = this.state;
      clearInterval(timer);
      timer = setInterval(this.updateTimer, 500);
      this.setState({
        timer
      }) 
     
  }
  
  resetValues(){
    let { timeLeft } = this.state;
    this.setState({
      timeLeft: timeLeft,
      erros: 0,
      totalErros: 0,
      accuracy: 0, 
      characterTyped: 0,
      disabledInput: false
    })
  }
  
  
  getRandomQuote(){
    return fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => data.content)
  }
  
  async renderNewQuote(){
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    const quoteInput   = document.getElementById('quoteInput');
    const quote = await this.getRandomQuote();
    quoteDisplay.innerText = '';
    quote.split('').forEach( character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        quoteDisplay.appendChild(characterSpan);
    });
    quoteInput.value = null;
 
  }
  
  
  render(){
    const { wpm, cpm, timeLeft, totalErrors, accuracy, disableInput, showOutput} = this.state;
    console.log('totalErrors: ', totalErrors);
    return(
      <div>
        <div className="container">
          <div className="header" >
            <div className="wpm" style={showOutput ? {display: "block"} : {display: "none"}} >
              <div className="headerText"> WPM </div>
              <div className="currentWpm"> {wpm} </div>
            </div>
            <div className="cpm" style={showOutput ? {display: "block"} : {display: "none"}} >
              <div className="headerText"> CPM </div>
              <div className="currentCPM"> {cpm} </div>
            </div>
            <div className="errors">
              <div className="headerText"> Errors </div>
              <div className="currentErros"> {totalErrors} </div>
            </div>
            <div className="timer">
              <div className="headerText"> Timer </div>
              <div className="currentTimer"> {timeLeft}s </div>
            </div>
            <div className="accuracy">
              <div className="headerText"> %Accuracy </div>
              <div className="currentAccuracy"> {accuracy} </div>
            </div>
           </div>
        </div> 
        <div id="title"> Learn Typing </div>
        <div id="quote-div">
          <div id="quoteDisplay">
            {this.state.quote}
          </div>
          <textarea id="quoteInput" disabled={disableInput} focusinput="true"></textarea>
          <p id="info"> Type the quote and get new quote on finishing</p>
        </div>
        <button className="restart_btn" onClick={this.resetValues}>Restart</button>
        <div className="footer">
          by <a href="https://twitter.com/code_rams"> Rams codes <span role="img" aria-labelledby="sparkels"> ✨ </span> </a>
        </div>
      </div>
    )
  }
}

export default Typing;