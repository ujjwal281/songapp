import {useEffect, useState} from "react";
import SpotifyWebApi from "spotify-web-api-node"
import { Container, Form } from "react-bootstrap"
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import axios from 'axios';
import './Login.css'

const spotifyApi = new SpotifyWebApi({
  clientId: "5609644436ef41f7b05c81029bc84fbf",
})

export default function Login() {

  const CLIENT_ID = "5609644436ef41f7b05c81029bc84fbf";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URI ="http://localhost:3000/";
  const SCOPE = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
  const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
  


    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")
        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }
        console.log(token)
        setToken(token)
    }, [])

  const logout = () => {
      setToken("")
      window.localStorage.removeItem("token")
  }
  
  function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return

    axios
      .get("http://localhost:5000/", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics)
      })
  }, [playingTrack])

    useEffect(() => {
      if (!token) return
      spotifyApi.setAccessToken(token)
    }, [token])
  
    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!token) return
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            console.log(res);
          if (cancel) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
              
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
    
        return () => (cancel = true)
    }, [search, token])
    
    return (
      <div className="">
                
                    {token ?
                        <div>
                             <button onClick={logout} className="align-middle justify-center" id="loginauth">LOGOUT</button>
                        <Container className="d-flex flex-column py-1" style={{ height: "100vh" }}>
                <Form.Control
                  type="search"
                  placeholder="Search Songs/Artists"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  />
                <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                  {searchResults.map(track => (
                      <TrackSearchResult
                      track={track}
                      key={track.uri}
                      chooseTrack={chooseTrack}
                      />
                      ))}
                  {searchResults.length === 0 && (
                      <div className="text-center" style={{ whiteSpace: "pre" }}>
                        {/* <img src={image} width="500px" alt="noImage"/> */}
                          {lyrics}
                    </div>
                    )
                  }
                      </div>
                          <div>
                  <Player className="" token={token} trackUri={playingTrack?.uri} />
                        </div>
                        </Container>
                       
                </div>
                        : <div className="flex justify-content-center align-bottom" id="loginBut" >
                            <a id="loginauth" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>Login to Spotify</a>
                            
              </div>
                    }
              
              
                <br/>
           
        </div> 
    );
}