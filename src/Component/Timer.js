
import { useEffect, useState} from "react";

export default function Timer(){

  const [minuteFirstDigit, setMinuteFirstDigit]=  useState(0);
  const [minuteLastDigit, setMinuteLastDigit] = useState(0);

  const [secondFirstDigit, setSecondFirstDigit] = useState(0)
  const [secondLastDigit, setSecondLastDigit] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      if (secondLastDigit === 9){
        setSecondFirstDigit(prev => prev + 1)
        setSecondLastDigit(-1);
        if(secondFirstDigit === 5){
          setMinuteLastDigit(prev => prev + 1)
          setSecondFirstDigit(0);
          if(minuteLastDigit === 9){
            setMinuteFirstDigit(prev => prev + 1)
            setMinuteLastDigit(0);
          }
        }
      }
      setSecondLastDigit(prev => prev + 1)
    }, 1000);

    return () => clearInterval(interval);
  }, [secondLastDigit]);


  return (
    <div
      style={{
      fontSize: "20rem",
      textAlign:"center",
      justifyContent: "center",
      alignContent: "center"
    }}>
        <span>
          {minuteFirstDigit}{minuteLastDigit}
          :
          {secondFirstDigit}{secondLastDigit}
        </span>
    </div>
  )
}

