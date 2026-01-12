import { useRef, useState } from "react"
import pianoBackground from "../Sound/pianoBackground.mp3" // https://pixabay.com/music/modern-classical-piano-music-background-462847/
import "../CSS/LastStage.css";

const LastStage = ({ setCount, count, lastStage })=>{

  const motivation = ["Small steps every day lead to big changes over time.",

                      "You don’t need to see the whole path—just take the next step.",

                      "Discipline is choosing what you want most over what you want now.",

                      "Progress, not perfection.",

                      "Every expert was once a beginner who didn’t quit.",

                      "Your future self is created by what you do today.",

                      "Hard days are building stronger versions of you.",

                      "Consistency beats intensity when intensity fades.",

                      "You are capable of more than you think.",

                      "Keep going—results often appear right after you feel like quitting.",
                    
                      "The creator cannot come up with motivation quotes, therefore all of these were made by ChatGPT",
                      
                      "Do it! Just do it!!! Don't let your dreams be dreams"]



  const [motivationQuotes, setMotivationQuotes] = useState("")

  const [hasPlayed, setHasPlayed] = useState(false)

  const pianoSound = useRef(null)

  const start = () => {
    var newMov = (motivation[Math.floor(Math.random() * 12)])
    if(!hasPlayed) {
      pianoSound.current = new Audio(pianoBackground);
      pianoSound.current.volume = 0.75;
      pianoSound.current.play();
      setHasPlayed(true);
    }
    setMotivationQuotes(newMov);
  }

  function onClick(){
    const newCount = count + 1;
    setCount(newCount);
    if (newCount === 1000 && pianoSound.current){
      pianoSound.current.pause();
    }
  }
  return (
    <>
    {lastStage && <div className="lastStage">
        <div className="finalCounter">
          {count}
        </div>
        
        <div className="motivationQuotes">
          {motivationQuotes}
        </div>

        <div className="btn">
          <button
            onClick={() => {
              onClick();
              start();
            }}
            style={{
              backgroundColor: "white",
              width: "15vw",
              height: "15vh"
            }}
            />
        </div>
      </div>}
    </>
  )



}
export default LastStage
