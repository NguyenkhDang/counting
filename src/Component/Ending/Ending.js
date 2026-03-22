import { useEffect, useRef } from "react";
import "./Ending.css"
import victoryFanfare from "../../Sound/VictoryFanfare.mp3"
import confetti from "canvas-confetti"; //https://github.com/catdad/canvas-confetti

const Ending = () =>{

  function Confetti(){
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);

      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  const victorySound = useRef(null)
useEffect(() =>{
  victorySound.current = new Audio(victoryFanfare)
  victorySound.current.volume = 0.6;
  victorySound.current.play();
  Confetti();
}, [])


  return(
    <div className="ending">
      <div>
        <p>CONGRAT YOU GOT THROUGH 1000 CLICKS!</p>
        <p>NOW JUST ONCE CLICK LEFT FOR YOUR FINAL REWARD.....</p>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1" target="_blank">
          <button onClick={Confetti} >FINAL REWARD</button>
        </a>
      </div>
    </div>
  )
}

export default Ending