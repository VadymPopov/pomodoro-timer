import { Component } from "react";
import './App.css';

let countdown;

const url = 'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';

const initialState = {
  breakTime: "05:00",
  breakDisplay: 5,
  time: "25:00",
  timerIsOn: false,
  sessionDisplay: 25,
  label: "Session"
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.breakDec =  this.breakDec.bind(this);
    this.breakInc =  this.breakInc.bind(this);
    this.sessionDec =  this.sessionDec.bind(this);
    this.sessionInc =  this.sessionInc.bind(this);
    this.toggleTimer =  this.toggleTimer.bind(this);
    this.onReset =  this.onReset.bind(this);
    this.intervalFunc = this.intervalFunc.bind(this);
    this.formatTimeDisplay = this.formatTimeDisplay.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.handleSpacebar = this.handleSpacebar.bind(this);
    this.intervalRunning = false;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleSpacebar);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleSpacebar);
  }

  handleSpacebar(event) {
    if (event.code === 'Space') {
      this.toggleTimer();
    }
  }

  formatTimeDisplay(timeValue, action) {
    if(action === 'increment'){
      return timeValue < 9 ? "0" + (timeValue + 1) + ":00" : (timeValue + 1) + ":00";
    } else {
    return timeValue > 10 ? (timeValue - 1) + ":00" : "0" + (timeValue - 1) + ":00";
    }
  }

  secondsToTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  breakDec(){
    if(this.state.breakDisplay <= 1) return;

    this.setState(({breakDisplay})=>({
      breakDisplay: breakDisplay - 1, 
      breakTime: this.formatTimeDisplay(breakDisplay, 'decrement'),
    }))
  }
  
  breakInc(){
    if(this.state.breakDisplay >= 60) return;

    this.setState(({breakDisplay})=>({
      breakDisplay: breakDisplay + 1, 
      breakTime: this.formatTimeDisplay(breakDisplay, 'increment'),
    }))
  }
  
  sessionDec(){
    if(this.state.sessionDisplay <= 1) return;

    this.setState(({sessionDisplay})=>({
      time: this.formatTimeDisplay(sessionDisplay, 'decrement'),
      sessionDisplay: sessionDisplay - 1,
    }))
  }
  
  sessionInc(){
    if(this.state.sessionDisplay >= 60) return;

     this.setState(({sessionDisplay})=>({
      time: this.formatTimeDisplay(sessionDisplay, 'increment'),
      sessionDisplay: sessionDisplay + 1,
    }))
  }

  toggleTimer(){
    if(this.state.timerIsOn){
       this.setState(prevState=>({
        timerIsOn: false,
        time: prevState.time
      }));

      clearInterval(countdown);
      this.intervalRunning = false;
      return;
    }

    if (!this.intervalRunning) {
      this.intervalRunning = true;
      this.intervalFunc(this.state.time, this.state.breakTime);
    }
  }
  
 intervalFunc(timeParam, breakParam){
     let time = Number(timeParam.slice(0,2)) * 60 + Number(timeParam.slice(3, timeParam.length) - 1); 

     countdown = setInterval(()=>{
      if(this.state.time === '00:00'){
        const audio = document.getElementById("beep");
        audio.play();

        setTimeout(()=> {
          audio.pause();
      }, 1500);
          
      clearInterval(countdown);

      this.setState(({label})=>({
        time: breakParam,
        label: label === "Session" ? "Break" : "Session",
      }));

      this.intervalRunning = false;
      this.intervalFunc(breakParam, timeParam);
      return;
    }
  
      this.setState({
        time: this.secondsToTime(time),
        timerIsOn: true
      });
       
      time--; 
    }, 1000);
  }
  
  onReset(){
    clearInterval(countdown);
    
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
    
    this.setState( 
      initialState
    );
  }
  
  render() {
    const { time, sessionDisplay, breakDisplay, label, timerIsOn} = this.state;
    
    return (
      <div className='clock'>
        <h1>25+5 CLOCK</h1>
        <div className='length'>
          <div className='break'>
            <h2 id="break-label">Break Length</h2>
            <div>
              <button className='lengthBtn' id="break-decrement" disabled={breakDisplay === 1 || timerIsOn} onClick={this.breakDec}><i className="fa-xl fa-solid fa-circle-minus"></i></button>
              <span id="break-length">{breakDisplay}</span>
              <button className='lengthBtn' id="break-increment" disabled={breakDisplay === 60 || timerIsOn} onClick={this.breakInc}><i className="fa-xl fa-solid fa-circle-plus"></i></button>
            </div>
          </div>

          <div className='session'>
            <h2 id="session-label">Session Length</h2>
            <div>
              <button className='lengthBtn' id="session-decrement" disabled={sessionDisplay === 1 || timerIsOn} onClick={this.sessionDec}><i className="fa-xl fa-solid fa-circle-minus"></i></button>
              <span id="session-length">{sessionDisplay}</span>
              <button className='lengthBtn' id="session-increment" disabled={sessionDisplay === 60 || timerIsOn} onClick={this.sessionInc}><i className="fa-xl fa-solid fa-circle-plus"></i></button>
            </div>
          </div>
        </div>

        <div className='timer'>
          <p id="timer-label">{label}</p>
          <span id="time-left">{time}</span>
           <div className='time-controls'>
          <button id="start_stop" onClick={this.toggleTimer}>{!timerIsOn ? <i className=" fa-lg fa-solid fa-circle-play"></i> : <i className="fa-lg fa-solid fa-circle-pause"></i>}</button>
          <button id="reset" onClick={this.onReset}><i className="fa-lg fa-solid fa-arrow-rotate-right fa-flip-horizontal"></i></button>
        </div>
        </div>
       
        <audio id="beep" src={url}></audio>
       
        <div className="dev">by <a href="https://github.com/VadymPopov/pomodoro-timer">Vadym Popov</a></div>
        </div>
    );
  }
}

export default App;
