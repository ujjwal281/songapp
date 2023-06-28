import React from "react"
import './trackResult.css'
export default function TrackSearchResult({ track, chooseTrack }) {
  
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="col m-2 align-items-center table-responsive-lg text-white "
      id="music"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} id="image" style={{ height: "164px", width: "140px" }} alt="" />
      <div className="ml-5">
        <div className="fs-5 ">{track.title}</div>
        <div className="fs-6 text-light-emphasis">{track.artist}</div>
      </div>
    </div>
  )
}