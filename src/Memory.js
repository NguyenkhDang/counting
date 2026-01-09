import { useState } from "react"
import "./Memory.css"

export default function Memory( {setCount }){

    const [userSequence, setUserSequence] = useState([])

    const [randomSequence, setRandomSequence] = useState([])
//Get the randomSequence which is now an Array. Check with UserSequence to see any mismatch from...left to right 

    const [activeColor, setActiveColor] = useState();

    const [disable, setDisable] = useState(false);
    const [text, setText] = useState("");

    const makeRandom = () => {
      setText(" ");
      setRandomSequence([]);
      setUserSequence([])
      setDisable(true);
      var newRandomSequence = [];
      for (let i = 0; i < 5; i ++){
        newRandomSequence.push(Math.ceil(Math.random() * 3))
      }
      setRandomSequence(newRandomSequence);
      beginPlay(newRandomSequence);
      setDisable(false)
      console.log(newRandomSequence)
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
        if( sequence[i] !== randomSequence[i]){
          setDisable(true);
          setText("❌ Incorrect!")
          setTimeout(makeRandom, 1500)
          return;
        }
      }
       if(sequence.length === randomSequence.length){
        setDisable(true);
        setText("✅ Correct!")
        setCount(prev => prev + 10)
        setTimeout(makeRandom, 1500)
      }
    }


  return (
    <div
      className = {`memory ${disable === true ? "disable" : ""}`}
      
    >
      <button
        style={{
              backgroundColor: "red",
              width: "15vw",
              height: "15vh",
              margin: "0"
            }}
            className = {`btn ${activeColor === 1 ? "active" : ""}`}
        onClick={() => handleClick(1)}
        
      />
      <button
        style={{
              backgroundColor: "green",
              width: "15vw",
              height: "15vh",
              margin: "0"
            }}
            className = {`btn ${activeColor === 2 ? "active" : ""}`}
        onClick={() => handleClick(2)}
        
      />

      <button
        style={{
              backgroundColor: "blue",
              width: "15vw",
              height: "15vh",
              margin: "0"
            }}
          className = {`btn ${activeColor === 3 ? "active" : ""}`}
        onClick={() => handleClick(3)}
        
      />

        <p>{text}</p>
        <button
          onClick={makeRandom}
          style={{gridColumn: "1/ -1"}}
        >
            Start!
        </button>
    </div>
  )
}


