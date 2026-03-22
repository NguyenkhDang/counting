import { useState } from "react"
import "./MathQuestion.css"
const MathQuestion = ({ setCount }) => {

  const [operators, setOperators] = useState("+")
  const [firstNumber, setFirstNumber] = useState(Math.ceil(Math.random() * 10));
  const [secondNumber, setSecondNumber] = useState(Math.ceil(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");

  const [text, setText] = useState(" ");

const MakeQuestion = () => {
  setText("");

  const operatorSymbolArray = ["+", "-", "*", "/"];
  const randomOperator =
    operatorSymbolArray[Math.floor(Math.random() * operatorSymbolArray.length)];

  setOperators(randomOperator);

  if (randomOperator === "/") {
    const divisor = Math.ceil(Math.random() * 10);
    const result = Math.ceil(Math.random() * 10);

    setSecondNumber(divisor);
    setFirstNumber(divisor * result); 
  } else {
    setFirstNumber(Math.ceil(Math.random() * 10));
    setSecondNumber(Math.ceil(Math.random() * 10));
  }

  setUserAnswer("");
};

const negativeAnswer = () => {
  setUserAnswer(prev => prev.startsWith("-") ? prev.slice(1) : "-" + prev);
};

const handleClick = (value) =>{
  setUserAnswer(prev => prev + value)
}

const getAnswer = () =>{
  if (userAnswer === "" || userAnswer === "-") return;
  let answer
  switch(operators) {
    case "/":
      answer = firstNumber / secondNumber;
      break;
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
      setText("✅ Correct! ")
      setCount(prev => prev + 5)
    }
    else{
      setText("❌ Incorrect! ")
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
        {userAnswer} 
      </div>
       <div className="row">
        <div>
          <button
            className="btn-negative"
            onClick={negativeAnswer}>
              (-)
          </button>
        </div>

        <div className="numberPad">
          <button onClick={() => handleClick(1)}>1</button>
          <button onClick={() => handleClick(2)}>2</button>
          <button onClick={() => handleClick(3)}>3</button>
          <button onClick={() => handleClick(4)}>4</button>
          <button onClick={() => handleClick(5)}>5</button>
          <button onClick={() => handleClick(6)}>6</button>
          <button onClick={() => handleClick(7)}>7</button>
          <button onClick={() => handleClick(8)}>8</button>
          <button onClick={() => handleClick(9)}>9</button>
          <button onClick={() => handleClick(0)}>0</button>
          <button onClick={getAnswer} style={{backgroundColor: "green"}}>Check!</button>
          <button onClick={() => setUserAnswer(userAnswer.slice(0, -1))} style={{backgroundColor: "red"}}>Backspace</button>
        </div>
      </div>
    </div>
    )
}
export default MathQuestion