import { useEffect, useState } from 'react';
import VideoPlayer from './videoPlayer';
import Timer from "./Timer"
import MathQuestion from './MathQuestion';
import Memory from './Memory';
import './App.css';


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


  const [text, setText] = useState("")
  const [isTrue, setIsTrue] = useState(true)
  const [color, setColor] = useState("rgb(25, 223, 25)")


  const clickAreaStyle = {
    backgroundColor: isTrue ? "white" : "gray"
  }


  function onClick(){
    setCount(count + 10);
    setTextVisible(false);
    setText("");
  }


useEffect(() =>{
  switch(count){
    case 1000: //End, victory fanfare audio, audio
      break;
    case 900: //Change everything, zoom in, only button and counts
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
      setIsTrue(false);
      break;
    default:
      setText("Click the green button! Every 100 click count, something new will happen. Let's get to 1000!!!")
    }

},[count])


  return (
    <div>
      <div className="clickArea" style={clickAreaStyle}>
        <div className="counter" style={
          {
            backgroundColor: "white",
            display:"flex",
            fontSize:"2rem",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
            border: "1px solid black"
          }
        }>
        {countDefault && <span>{count}</span>}
        {counterAnimate && <span className='CountAnimate'>{count}</span>}
        </div>
        {textVisible && <span className='openText'>{text}</span>}



        <div className="buttons">
          <button
            onClick={onClick}
            style={{
              backgroundColor: color,
              width: "15vw",
              height: "15vh"
            }}
            />
            {moreButton && <button
            onClick={onClick}
            style={{
              backgroundColor: color,
              width: "15vw",
              height: "15vh"
            }}
            />}
            {moreButton && <button
            onClick={onClick}
            style={{
              backgroundColor: color,
              width: "15vw",
              height: "15vh"
            }}
            />}
        </div>
      </div>


      <div className="videoTimer">

        {videoVisible && count > 1 && <VideoPlayer />}

        {questionVisible && <MathQuestion setCount={setCount}/>}

        {memoryVisible && count > 1 && <Memory setCount={setCount}/>}
        {timervisible && count > 1 &&
          <div
            style={{
            fontSize: "20rem",
            textAlign:"center",
            justifyContent: "center",
            alignContent: "center"
          }}>
            <Timer/>
          </div>}
      </div>
    </div>
  );

}


export default App;
