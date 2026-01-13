My First Own Project

After completeting META React Front-End Developer Certification. This is the first project where I get to be on my own. The Project counting clicks to 1000 was what I thought simple turn sideway as my ambition gotten bigger. Every 100 clicks, something new will happen to the screen.

Core: 
  How do we track the clicks amount?


Click 100: Change the background color
      - Usestate and be use as on and off switch. I use this trick a lot during the whole project.
      - When 100 clicks is reach, the background color value is changes from 0 to 1, we can use that changes to change the background.
      ```
      const [backgroundColorChange, setBackgroundColorChange] = useState(true)
      backgroundColor: backgroundColorChange? "white" : "gray"
      ```