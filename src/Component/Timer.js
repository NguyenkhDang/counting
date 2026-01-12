
import { useStopwatch} from "react-timer-hook"

export default function Timer(){

  const {
    seconds,
    minutes,
  } = useStopwatch({ autoStart: true, interval: 20 });


  return (
    <div
      style={{
      fontSize: "20rem",
      textAlign:"center",
      justifyContent: "center",
      alignContent: "center"
    }}>
        <span>{minutes}:{seconds}</span>
    </div>
  )
}

