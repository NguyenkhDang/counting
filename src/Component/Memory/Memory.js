import { useState, useEffect, useRef } from "react"
import doSound from "../../Sound/Do.mp3"
import miSound from "../../Sound/Mi.mp3"
import solSound from "../../Sound/Sol.mp3"

import "./Memory.css";

export default function Memory({ setCount }){
  const sounds = useRef([
  new Audio(doSound),
  new Audio(miSound),
  new Audio(solSound)
  ])

  const [userSequence, setUserSequence] = useState([])

  const [randomSequence, setRandomSequence] = useState([])

  const [sequenceLength, setSequenceLength] = useState(1)
  const [activeColor, setActiveColor] = useState(null);

  const [disable, setDisable] = useState(true);
  const [text, setText] = useState(" ");

  const [onPlay, setOnPlay] = useState(false);
  const [restart, setRestart] = useState(false);


  useEffect(() => {
    if (!restart) return;

    const timer = setTimeout(() => {
      makeRandom();
      setRestart(false);
    }, 1500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [restart]);


    const makeRandom = () => {
      setText(" ");
      setUserSequence([])
      setDisable(true);
      setOnPlay(true)
      const newRandomSequence = [];
      for (let i = 0; i < sequenceLength; i ++){
        newRandomSequence.push(Math.floor(Math.random() * 3) + 1)
      }
      beginPlay(newRandomSequence);
    }

    const beginPlay = (newRandomSequence) => {
      setRandomSequence(newRandomSequence);
      newRandomSequence.forEach((value, index) => {
        setTimeout(() => {
          sounds.current[value - 1].currentTime = 0
          sounds.current[value - 1].play()
          setActiveColor(value);
          setTimeout(() => setActiveColor(null), 300);
        }, index * 700);
      })
      setTimeout(() => {
        setDisable(false);
      }, newRandomSequence.length * 700)
      
    }
  
    const handleClick = (value) => {
      if (disable) return;
      sounds.current[value - 1].currentTime = 0
      sounds.current[value - 1].play()
      const newUserSequence = [...userSequence, value];
      setUserSequence(newUserSequence);
      checkForMistake(newUserSequence);
    }

    function checkForMistake(sequence){
      const result = (correct) =>{
        setDisable(true);
        setText(`${correct ? "✅ Correct!" : "❌ Incorrect!"}`);
        setTimeout(() =>{
          setText("");
        }, 1500)
        correct && setCount(prev => prev + 10);
        setSequenceLength(correct ? prev => prev + 1 : 1);
        correct ? setRestart(true) : setOnPlay(false);
        return
      }
      
      for(let i = 0; i < sequence.length; i ++)
      {
        if (sequence[i] !== randomSequence[i]) {
          result(false)
          return;
        }
      }
      if (sequence.length === randomSequence.length) {
          result(true)
          return;
        }
    }

  return (
    <div className = "memory">
      <div className={`buttonClass ${disable ? "disable": ""}`}>
        <button
          disabled={disable}
          style={{ backgroundColor: "red"}}
          className={`btn ${activeColor === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        />

        <button
          disabled={disable}
          style={{ backgroundColor: "green" }}
          className={`btn ${activeColor === 2 ? "active" : ""}`}
          onClick={() => handleClick(2)}
        />

        <button
          disabled={disable}
          style={{ backgroundColor: "blue"}}
          className={`btn ${activeColor === 3 ? "active" : ""}`}
          onClick={() => handleClick(3)}
        />
      </div>

        <span style={{fontSize: "5rem", textAlign: "center", paddingTop: "5px"}}>{text}</span>
        <button
          onClick={makeRandom}
          disabled={onPlay}
          style={{gridColumn: "1/ -1", height: "15vh"}}
        >
          Start!
        </button>
    </div>
  )
}


