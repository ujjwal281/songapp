import React from "react"

export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }
  return (
    <div className="row m-2 align-items-center bg-light hover-bg-black" style={{ cursor: "pointer" }} onClick={handlePlay}>
        <img className="col" src={track.albumUrl} style={{ height: "64px", width: "24px" }} alt="" />
        <div className="col ml-3">
        <div>{track.title}</div>
        <div className="col text-muted">{track.artist}</div>      
        </div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
        <div className="col flex-reverse -9fr"></div>
    </div>
  )
}