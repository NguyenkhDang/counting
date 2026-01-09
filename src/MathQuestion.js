import { useState } from "react"
import "./MathQuestion.css"
const MathQuestion = ({ setCount }) => {

  const [operators, setOperators] = useState("+")
  const [firstNumber, setFirstNumber] = useState(Math.ceil(Math.random() * 10));
  const [secondNumber, setSecondNumber] = useState(Math.ceil(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState();

  const [text, setText] = useState();


const MakeQuestion = () =>{
  setText(" ")
  setFirstNumber(Math.ceil(Math.random() * 10));
  setSecondNumber(Math.ceil(Math.random() * 10));
  const operatorSymbolArray = ["+", "-", "*"]
  const randonOperator = operatorSymbolArray[Math.floor(Math.random() * operatorSymbolArray.length)];
  setOperators(randonOperator)
  setUserAnswer("")
}


const getAnswer = () =>{
  let answer
  switch(operators) {
    case "+":
      answer = firstNumber + secondNumber;
      break;
    case "-":
      answer = firstNumber - secondNumber;
      break;
    case "*":
      answer = firstNumber * secondNumber;
      break;
    default:
      answer = firstNumber + secondNumber;
      break;
    }
    if(Number(userAnswer) === answer){
      setText("✅ Correct!")
      setCount(prev => prev + 5)
    }
    else{
      setText("❌ Incorrect!")
    }
    setTimeout(MakeQuestion, 1500);

  }
  return (
    <div className="MathQuestion">
      <div className="row">
        {firstNumber}
        {operators}
        {secondNumber}
      </div>
       <div className="row">
        {text}
      </div>
       <div className="row">
        <input
          type="number"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}/> 
          <button onClick={getAnswer}>Check</button>
      </div>
    </div>
    )
}
export default MathQuestion