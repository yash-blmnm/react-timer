import { useState, useEffect } from "react";
// When application starts, it should begin with 60 secs in the clock. 
// Start button should be present in the screen. On click on Start, the count down should begin. 
// The Start button shall be hidden and It should display Stop and Pause Button. 
// On clicking Stop button, the countdown should stop. 
//Stop button will then replaced with Reset button. 
//On clicking Pause button, the countdown should stop. 
// The Pause button will be replaced with Resume button. 
// Clicking on Resume button 
//On reaching 0, the countdown stop. Stop Button and Pause button will be replaced with Reset button. 
//Clicking on Reset Button will reset the timer back to 60 sec. Reset Button will be replaced with Start button
const START_VALUE = 60
const DELAY = 1000
function App() {
  const [timer, setTimer] = useState(START_VALUE);
  const [timerState, updateTimerState] = useState('initial');
  const [sountDownInterval, setSountDownInterval] = useState();

  // const [start, setStart] = useState(false);
  // let sountDownInterval;
  // const startCountDown = () => {
  //   sountDownInterval = setInterval(() => {setTimer(prev => prev - 1)}, 1000);
  //   // setHideStart(true)
  //   setStart(true);
  // }
  // const stopTimer = () => {
  //   clearInterval(sountDownInterval);
  // }
  // const pauseTimer = () => {
  //   clearInterval(sountDownInterval);
  // }
  // const resumeTimer = () => {
  //   sountDownInterval = setInterval(() => {setTimer(prev => prev - 1)}, 1000);
  // }
  // const resetTimer = () => {
  //   setTimer(START_VALUE)
  // }
  useEffect(() => {
    if(timerState == 'start') {
      setSountDownInterval(setInterval(() => setTimer(prev => prev - 1), DELAY));
    }else if(timerState == 'stop' || timerState == 'pause') {
      clearInterval(sountDownInterval);
    }else if(timerState == 'resume') {
      setSountDownInterval(setInterval(() => setTimer(prev => prev - 1), DELAY));
    }else if(timerState == 'reset') {
      setTimer(START_VALUE)
      updateTimerState('initial')
    }
  }, [timerState])

  useEffect(() => {
    if(timer == 0){
      clearInterval(sountDownInterval);
      updateTimerState('reset');
    }
  }, [timer])

  useEffect(() => {
    return(() => clearInterval(sountDownInterval));
  }, [])

  return (
    <div className="App">
      <p>{timer}</p>
      {timerState == 'initial' ? 
      <button onClick={() => updateTimerState('start')}>Start</button>
      :
      <>
      {timerState == 'stop' ?
        <button onClick={() => updateTimerState('reset')}>Reset</button>
      :
      <>
        <button onClick={() => updateTimerState('stop')}>Stop</button>
        {timerState == 'pause' ? 
          <button onClick={() => updateTimerState('resume')}>Resume</button>
          :
          <button onClick={() => updateTimerState('pause')}>Pause</button>
        }
      </>
      } 
      </>
      }
      
    </div>
  );
}

export default App;
