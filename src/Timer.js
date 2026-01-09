
import { useStopwatch} from "react-timer-hook"

export default function Timer(){

  const {
    seconds,
    minutes,
  } = useStopwatch({ autoStart: true, interval: 20 });


  return (
    <div>
        <span>{minutes}:{seconds}</span>
    </div>
  )
}

