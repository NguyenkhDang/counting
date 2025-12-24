import React from "react";
import ReactPlayer from "react-player"

export default function VideoPlayer(){
  return (
    <div>
      <ReactPlayer
        src="https://www.youtube.com/watch?v=vTfD20dbxho"
        autoPlay
        muted
        width="50%"
        height="600px"
      />
    </div>
  )
}