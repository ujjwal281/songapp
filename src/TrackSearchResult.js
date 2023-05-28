import React from "react"
import './trackResult.css'
export default function TrackSearchResult({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track)
  }

  return (
    <div
      className="d-flex m-2 align-items-center table-responsive-lg text-white"
      id="music"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} id="image" style={{ height: "64px", width: "64px" }} alt="" />
      <div className="ml-5">
        <div>{track.title}</div>
        <div className="size">{track.artist}</div>
      </div>
    </div>
  )
}