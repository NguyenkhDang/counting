import { useEffect, useState } from 'react';
import VideoPlayer from './videoPlayer';
import './App.css';


function App() {
  const [count, setCount] = useState(0);
  const [textVisible, setTextVisible] = useState(true)
  const [videoVisible, setVideoVisible] = useState(false);
  const [text, setText] = useState("")
  const [isTrue, setIsTrue] = useState(true)
  const [color, setColor] = useState("rgb(25, 223, 25)")

  const clickAreaStyle = {
    backgroundColor: isTrue ? "white" : "gray"
  }

  const buttonStyle = {
    backgroundColor: color,
    width: "15vw",
    height: "15vh"
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
    case 900:
      break;
    case 800:
      break;
    case 700:
      break;
    case 600:
      break;
    case 500:
      break;
    case 400:
      break;
    case 300: //Add video
      setVideoVisible(true);
      break;
    case 200: //Change button color
      setColor("red")
      break;
    case 100: //Change background
      setIsTrue(false);
      break;
    default:
      setText("Click the green button! Every 100 click count, something new will happen. Let get to 1000!!!")
    }

},[count])


  return (
    <div>
      <div className="clickArea" style={clickAreaStyle}>
        <div className="count">{count}</div>


        {textVisible && <span className='openText'>{text}</span>}

        <div className="buttons">
          <button
            onClick={onClick}
            style={buttonStyle}
            />
        </div>
      </div>
      {videoVisible && count > 1 && <div className="videoArea">
          <VideoPlayer
          />
        </div>}
    </div>
  );

}


export default App;
