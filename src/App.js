import { useEffect, useState } from 'react';
import VideoPlayer from './Component/videoPlayer';
import Timer from "./Component/Timer"
import MathQuestion from './Component/MathQuestion';
import Memory from './Component/Memory';
import LastStage from "./Component/LastStage"
import Ending from './Component/Ending';
import './CSS/App.css';


function App() {
  const [count, setCount] = useState(0);

  const [textVisible, setTextVisible] = useState(true)
  const [videoVisible, setVideoVisible] = useState(false)
  const [timervisible, setTimerVisible] = useState(false)
  const [counterAnimate, setCounterAnimate] = useState(false)
  const [countDefault, setCountDefault] = useState(true)
  const [moreButton, setMoreButton] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false)
  const [memoryVisible, setMemoryVisible] = useState(false);

  const [begin, setBegin] = useState(true)
  const [lastStage, setLastStage] = useState(false)
  const [ending, setEnding] = useState(false);

  const [text, setText] = useState("")
  const [backgroundColorChange, setBackgroundColorChange] = useState(true)
  const [color, setColor] = useState("rgb(25, 223, 25)")


  const clickAreaStyle = {
    backgroundColor: backgroundColorChange ? "white" : "gray"
  }


  function onClick(){
    setCount(count + 10);
    setTextVisible(false);
    setText("");
  }


useEffect(() =>{
  switch(count){
    case 1000: //Ending
    setLastStage(false)
    setEnding(true)
      break;
    case 900: //Change everything, zoom in, only button and counts
    setLastStage(true);
    setBegin(false);
      break;
    case 800: //Memory games with the button, replace timer
      setMemoryVisible(true);
      setTimerVisible(false);
      break;
    case 700: //Math question, replacing the video part, each answer correct will equal 5 more clicks.
      setQuestionVisible(true)
      setVideoVisible(false)
      break;
    case 600://Add more button
      setMoreButton(true);
      break;
    case 500://Animation on the counts
      setCountDefault(false);
      setCounterAnimate(true);
      break;
    case 400: //Show timer
      setTimerVisible(true)
      break;
    case 300: //Add video`
      setVideoVisible(true);
      break;
    case 200: //Change button color
      setColor("red")
      break;
    case 100: //Change background
      setBackgroundColorChange(false);
      break;
    default:
      setText("Click the green button! Every 100 click count, something new will happen. Let's get to 1000!!!")
    }

},[count])


  return (
    <>
      {lastStage && <LastStage count = {count} setCount={setCount} lastStage={lastStage}/>}
      {ending && <Ending />}
      {begin && <div>
      <div className="clickArea" style={clickAreaStyle}>
        <div className="counter">
          {countDefault && <span>{count}</span>}
          {counterAnimate && <span className='CountAnimate'>{count}</span>}
        </div>

        {textVisible && <span className='openText'>{text}</span>}



        <div className="btn">
          <button
            onClick={onClick}
            style={{backgroundColor: color}}
            />

            {moreButton && <button
            onClick={onClick}
            style={{backgroundColor: color}}
            />}
            {moreButton && <button
            onClick={onClick}
            style={{backgroundColor: color}}
            />}
        </div>
      </div>


      <div className="funArea">

        {videoVisible &&  <VideoPlayer />}

        {questionVisible && <MathQuestion setCount={setCount}/>}

        {memoryVisible && <Memory setCount={setCount}/>}

        {timervisible && <Timer />}

      </div>
    </div>}
    </>
  );

}


export default App;
