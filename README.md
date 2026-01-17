My First Independent React Project

After completing the Meta React Front-End Developer Certification, this is the first project I built entirely on my own.

What began as a simple click counter that counts to 1000 gradually evolved as new challenges appeared. Every 100 clicks unlocks a new feature on the webpage — from background and button color changes to interactive mini-games such as a Math Question Generator and a Simon Says–style memory game. Each feature introduced new problems and required creative problem-solving to implement.

Live Demo: https://nguyenkhdang.github.io/counting/
<h1>Requirements</h1>
<ul>
  <li>Node.js</li>
  <li>npm</li>
</ul>
<h1>Installation (Local)</h1>
<ul>
  <li>npm install</li>
  <li>npm start</li>
</ul>

    Local Application
    http://localhost:3000 

<h1>Tech Stack</h1>
<ul>
  <li>React</li>
  <li>JavaScript (ES6+) </li>
  <li>CSS</li>
  <li>HTML</li>
</ul>

<h1>Features</h1>
<ul>
  <li>Audio</li>
  <li>Embedded YouTube video</li>
  <li>Timer counting upward</li>
  <li>Real-time UI updates</li>
  <li>Math Question Generator </li>
  <li>Simon Says–style memory game</li>
  <li>Mouse-only interaction (no keyboard required)</li>
  <li>DOM manipulation via React</li>
  
</ul>

<h1>Design Decisions</h1>
<ul>
  <li>Used Bollean state to control feature visibility</li>
  <li>Avoided keyboard input to support touch-only interaction</li>
  <li>Used arrays to model game sequence for the Simon Game</li>
  <li>Games and other visibility features must be in a seperate component for resuablity and easier to make changes/fix bugs</li>
</ul>

<h1>Known Isssues</h1>
<ul>
  <li>Mobile layout is not fully optimized</li>
  <li>Only way to reverse the negative number in math question is to backspace the whole thing</li>
  <li>Division is not possible in the Math Question Generator due to decimals point</li>
  <li>Music not looping</li>
</ul>

<h2>Below is what every 100 clicks do and what my solution to each problems as it appeared</h2>

<h2>Core:</h2>
<ul>
  <li>Tracking Count amount using useState</li>
  <li>A button that increase the count amount</li>
  <li>Conditional feature unlocks based on click milestones</li>
</ul>

    const [count, setCount] = useState(0);

    
    useEffect(() =>{
      switch(count){
        case 1000: // When count is 1000, this case will happen
        ....
        ....
        ....            
        case 100: // When count is 100, this case will happen
          {code}
            break;
            
        default:
          break;
        }
    },[count])// This will run everytime count is updated 

    function onClick(){
      setCount(count + 1)
    }

    return (
    <button onClick={onClick} />
    )
    
<h2>Click 100: Change the background color</h2>
<ul>
  <li> Uses boolean state as an on/off switch</li>
  <li> Background toggles once 100 clicks are reached </li>
</ul>

      
      const [backgroundColorChange, setBackgroundColorChange] = useState(true)
      backgroundColor: backgroundColorChange? "white" : "gray"
      
<h2>Click 200: Change the button color</h2>
<ul>
  <li>Same state-based approach as Click 100</li>
</ul>
  
     
      const [color, setColor] = useState("white") // color is current set to white
      setColor("red") // color is now set to red
      

<h2>Click 300: Add video at the bottom left</h2>
<ul>
  <li>Using iframe tag, we can run video with Youtube link</li>
</ul>

   
    <iframe src = "https://youtube.com/video-here" />
   
<ul>
  <li>Using the same UseState idea from previous clicks, we can set UseState as a true or false statement. I use this a lot during my project</li>
</ul>

    
    const [videoVisible, setVideoVisible] = useState(true); //videoVisible is set to true
    {videoVisible && <iframe src = "https://youtube.com/video-here" /> //This will appear
    
    const [videoVisible, setVideoVisible] = useState(false); //videoVisible is set to false
    {videoVisible && <iframe src = "https://youtube.com/video-here" /> //This will not appear
    
<h2>Click 400: Add a Timer to the bottom right</h2>
<ul>
  <li>Use the same UseState trick to make the Timer appear</li>
  <li>Updates every second using setInterval</li>
</ul>

    0 0 0 0
          ^----We use function to increase this number by 1 for every second. 
              When it reaches 9, it will increase the number to right of it by 1 and reset itself to 0

    <-------------------------------Full Code-------------------->

    const [minuteFirstDigit, setMinuteFirstDigit]=  useState(0);
    const [minuteLastDigit, setMinuteLastDigit] = useState(0);
  
    const [secondFirstDigit, setSecondFirstDigit] = useState(0)
    const [secondLastDigit, setSecondLastDigit] = useState(0);
  
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (secondLastDigit === 9){
          setSecondFirstDigit(prev => prev + 1)
          setSecondLastDigit(-1); // For some reason, the lastDigit is increased by 2 when it reaches 9, this make sure it won't go 0 -> 2
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
    <span>{minuteFirstDigit}{minuteLastDigit}:{secondFirstDigit}{secondLastDigit} </span>
    )

    Output: 00:00, 00:01, 00:02, ......, 00:09, 00:10, ....., 00:59, 01:00

<h2>Click 500: Animation to the Counter</h2>
<ul>
  <li>Swaps between default and animated counters using state</li>
  <li>Animation handled with CSS keyframes</li>
</ul>

    const [countDefault, setCountDefault] = useState(true);
    const [countAnimate, setCountAnimate] = useState(false);

    return (
      <>
        {countDefault && <span>{count}</span>} // This will print
        {countAnimate && <span className="CountAnimate">{count}</span> // This will not print
      </>
    )

    const [countDefault, setCountDefault] = useState(false);
    const [countAnimate, setCountAnimate] = useState(true);

    return (
      <>
        {countDefault && <span>{count}</span>} // This will not print
        {countAnimate && <span className="CountAnimate">{count}</span> // This will print
      </>
CSS

      .CountAnimate{
        animation-name: Test;
        animation-duration: 10s;
        animation-iteration-count: infinite;
      }
      
    @keyframes Test{
      0% {
        background-color: red;
      }
      50%{
        background-color: green;
      }
      100%{
        background-color: yellow;
      }
    }
              

<h2>Click 600: Add More button</h2>
<ul>
  <li>Buttons appear conditionally using boolean state</li>
</ul>

    const [moreButton, setMoreButton] = useState(true)
    <Button />
    {moreButton && <Button/> // These 2 will print because moreButton is set to true
    {moreButton && <Button/>

<h2>Click 700: Math Question Generator, replacing the video</h2>
Simple Math Generator where we make 2 random number, then add, subtract, or multiply them together. After we get user answer and compared it to the answer.
What is needed in the Math Question Generator
<ul>
  <li>Random number between 0 and 10 for both number</li>
  <li>Random generator for expression (+, -, *) </li>
  <li>Storing User input and comparing their answer to the random generators answer</li>
</ul>

    Math.ceil(Math.random() * 10) // This code here will give us a random number between 0 and 10

    function makeRandom(){
    
    var firstNumber = Math.ceil(Math.random() * 10)
    var secondNumber = Math.ceil(Math.random() * 10)
    //  firstNumber and secondNumber is now a random number between 0 and 10

    const operatorArray = ["+", "-", "*"];
    const randomOperator = operatorArray[Math.floor(Math.random() * 3) ;
    //This code will make random operator
    }
    switch(randomOperator) {
        case: "+":
          let answer = firstNumber + secondNumber;
          break;
        case: "-":
          let answer = firstNumber - secondNumber;
          break;
        case: "*":
          let answer = firstNumber * secondNumber;
          break;

    if(userInput === answer{
      console.log("You are Correct!")
      }
    }
    else{ console.log("You are incorect!") };
    setTimeout(makeRandom, 1500) // Run the make random number after 1.5 seconds

Replacing the Timer with the Math Question 

    const [timerVisible, setTimerVisible] = useState(true);
    const [mathQuestionVisible, setMathQuestionVisible] = useState(false);

    case 700:
        setTimerVisible(false);
        setMathQuestionVisible(true);
        break;
    }


    return (
    <>
      {timerVisible && <Timer />}
      {mathQuestionVisible && <MathQuestion />}
    </>
    )
    
What I added
  <ul>
    <li>
      Whenever the user answer the question correct, count is increased by 5
    </li>
    <li>
      Visual for user to know if they got the correct or incorrect answer
    </li>
    <li>
      Keypad for number, with negative number as possible answer
    </li>
    <li>
      Backspace for answer
    </li>
  </ul>

<h2>Click 800: Simple Memory game, replacing the timer</h2>
A recreation of simon said with 3 buttons instead of 4. Making the Random Sequence as an array give us the way for making button light up with it suppose sequence. 

    Making a Random Array Sequence

    var randomSequence = []
    for(let i = 0; i<5; i++{
      randomSequence.push(Math.ceil(Math.random() * 3) // It is important to use '.push' as we will be reading the array from left to right. 
                                                          Making the whole array value move from left to right.
    }

    return ( <> randomSequence </> ) // [3, 2, 1, 2, 1]
    return ( <> randomSequence </> ) // [2, 2, 1, 2, 2]
    
Using the Random Sequence combining with forEach function, we get access to each of the value in the array. We can use this to do a light up button sequence.

    var randomSequence = [3, 2, 1, 2, 1]
    const [activeColor, setActiveColor] = useState(0)

    randomSequence.forEach((value) => {
      setTimeout(setActiveColor(value), 1000)
    })

    // Using interpolation with String, the className can be change based on what the ActiveColor value is. 
    <p className = {`btn ${activeColor} === 1 ? "active" : ""}`} style = {{ backgroundColor: "red" }}> One </p> // "btn active" if activeColor is 1, else "btn"
    <p className = {`btn ${activeColor} === 2 ? "active" : ""}`} style = {{ backgroundColor: "blue" }}> Two </p>  
    <p className = {`btn ${activeColor} === 3 ? "active" : ""}`} style = {{ backgroundColor: "green" }}> Three </p> 

    // Result: green, blue, red, blue, red
  CSS

    .btn{
      opacity: 0.6;
      transform: opacity 0.2s, transform 0.2s;
    }
    
    .btn.active {
      opacity: 1;
      transform: scale(1.1);
    }

  For user Side, it is mostly the same structure. Each button will give out a unique value and no other button shared the same value.

      var userSequence = []

      const onClick = (value) =>{
            userSequence.push(value);
      }
  
  
      <button onClick = {() => onClick(1)} >1 </button>
      <button onClick = {() => onClick(2)} >2 </button>
      <button onClick = {() => onClick(3)} >2 </button>

      // Click: 2, 3, 1, 3
      // userSequence: [2, 3, 1, 3]

  With both Random and User Array list ready, we can now compare each of their index to see if their value matches each other, just like Simon Said Game.

    var randomSequence = []
    var userSequence = []
    const hasRun = useRef(false);
    
    useEffect(()=>{
      if(!hasRun.current){
        makeRandom();
        hasRun.current = true
      }
    }, []);
    
    function makeRandom(){
       for(let i = 0; i<5; i++){
        randomSequence.push(Math.ceil(Math.random() * 3)) 
      }
      console.log(randomSequence)
    }
    function checkForMistake(userSequence){
      for(let i = 0; i<userSequence.length; i++){
        if (userSequence[i] !== randomSequence[i]) { console.log("You choose the wrong button"); break;}
      }
      if (userSequence.length === randomSequence.length) { console.log("You chooose the right sequences ") }
    }
    
      const onClick = (value) => {
            userSequence.push(value);
            checkForMistake(userSequence);
            
      }
      
    return (
      <>
      <button onClick = {() => onClick(1)} style={{
                  backgroundColor: "red",
                  width: "15vw",
                  height: "15vh",
                }}/>
      <button onClick = {() => onClick(2)}  style={{
                  backgroundColor: "blue",
                  width: "15vw",
                  height: "15vh",
                }}/>
      <button onClick = {() => onClick(3)}  style={{
                  backgroundColor: "green",
                  width: "15vw",
                  height: "15vh",
                }}/>
      </>
    )
    }

What I added
  <ul>
    <li>The length of Random Sequence increase after every correct sequence completed. And set the length to 1 when user fail the sequence</li>
    <li>Visual for correct and incorrect sequences</li>
    <li>Set the count to increase by 10 for each correct sequence completed</li>
    <li>Disable user clicking/input when the random sequence is being play</li>
  </ul>

<h2>Click 900: Change everything where only the button, the count and some text are visible only on the screen</h2>
<ul>
  <li>Screen transitions to a minimal UI</li>
  <li>Every click, a motivation text quotes will appear in the middle of the screen</li>
  <li>Background music</li>
</ul>

<h2>Cick 1000: End</h2>
<ul>
  <li>Final screen congratulates the user for reaching 1000 clicks</li>
  <li>Includes firework and victory fanfares sound</li>
  <li>Button redirect to another YouTube Video</li>
</ul>

