import { useState } from "react"
import { useEffect } from "react";
import "../CSS/Memory.css";

export default function Memory( {setCount }){

    const [userSequence, setUserSequence] = useState([])

    const [randomSequence, setRandomSequence] = useState([])

    const [sequenceLength, setSequenceLength] = useState(1)
    const [activeColor, setActiveColor] = useState(null);

    const [disable, setDisable] = useState(false);
    const [text, setText] = useState("");

    const [onPlay, setOnPlay] = useState(false);
    const [restart, setRestart] = useState(false);


useEffect(() => {
  if (!restart) return;

  const timer = setTimeout(() => {
    makeRandom();
    setRestart(false);
  }, 1500);

  return () => clearTimeout(timer);
}, [restart]);


    const makeRandom = () => {
      setText(" ");
      setUserSequence([])
      setDisable(true);
      setOnPlay(true)

      var newRandomSequence = [];
      for (let i = 0; i < sequenceLength; i ++){
        newRandomSequence.push(Math.ceil(Math.random() * 3))
      }

      setRandomSequence(newRandomSequence);
      beginPlay(newRandomSequence);
      
    }

    const beginPlay = (newRandomSequence) => {
      newRandomSequence.forEach((value, index) => {
        setTimeout(() => {
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
      const newUserSequence = [...userSequence, value];
      setUserSequence(newUserSequence);
      checkForMistake(newUserSequence);
    }

    const checkForMistake = (sequence) =>{
      for(let i = 0; i < sequence.length; i ++)
      {
        if (sequence[i] !== randomSequence[i]) {
          setDisable(true);
          setText("❌ Incorrect!");
          setSequenceLength(1);
          setRestart(true);
        }
      }
      if (sequence.length === randomSequence.length) {
          setDisable(true);
          setText("✅ Correct!");
          setCount(prev => prev + 10);
          setSequenceLength(prev => prev + 1);
          setRestart(true);
        }
    }


  return (
    <div
      className = {`memory ${disable === true ? "disable" : ""}`}
      
    >
      <div className="buttonClass">
        <button
        style={{
              backgroundColor: "red",
              width: "15vw",
              height: "15vh",
              margin: "0"
            }}
        className = {`btn ${activeColor === 1 ? "active" : ""}`}
        onClick={() => handleClick(1)}/>
        <button
          style={{
                backgroundColor: "green",
                width: "15vw",
                height: "15vh",
                margin: "0"
              }}
          className = {`btn ${activeColor === 2 ? "active" : ""}`}
          onClick={() => handleClick(2)}/>

        <button
          style={{
                backgroundColor: "blue",
                width: "15vw",
                height: "15vh",
                margin: "0"
              }}
            className = {`btn ${activeColor === 3 ? "active" : ""}`}
          onClick={() => handleClick(3)}/>
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


