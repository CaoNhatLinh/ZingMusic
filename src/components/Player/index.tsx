import React, { useEffect, useRef } from "react"
import { Text, View } from "react-native"
import Controls from "./Control"
import Sound from "react-native-sound"
import { getSong, getInfoSong } from "../../api/song"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import {
  setInfoSongPlayer,
  setCurrentTime,
  setDuration,
  setSrcAudio,
  changeIconPlay,
} from "../../redux/features/audioSlice"
import { setSongId, setCurrnetIndexPlaylist } from "../../redux/features/audioSlice"
import Lyric from "./Lyric"
import colors from "../../assets/colors"
import { useRoute } from "@react-navigation/native"
//
interface songType {
  [key: number]: string
  title: string
  infoSong: string
  thumbnail: string
  thumbnailM: string
  artistsNames: string
  artists: []
}
var whoosh = new Sound('whoosh.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
const Player:React.FC = () => {

  const route = useRoute()

  const songId = (route.params as { encodeId?: string })?.encodeId ?? ""
  const srcAudio = useAppSelector((state) => state.audio.srcAudio)
  const isLoop = useAppSelector((state) => state.audio.isLoop)
  const dispath = useAppDispatch()

  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist)
  const playlistSong:any = useAppSelector((state) => state.audio.playlistSong)
 
  const dispatch = useAppDispatch()

  const audioRef = useRef<any>(null)

  useEffect(() => {
    (
      async () => {
        try {
          if(songId === "") {
            console.log("song id not found")
          } else {
            const linkSong:songType = await getSong(songId)
            linkSong[128] ? dispath(setSrcAudio( linkSong[128] )) : dispath(setSrcAudio(""))
           
            const infoSong:songType = await getInfoSong(songId)
            dispath(setInfoSongPlayer(
              {
                title: infoSong.title,
                thumbnail: infoSong.thumbnail,
                thumbnailM: infoSong.thumbnailM,
                artistsNames: infoSong.artistsNames,
                artists: infoSong.artists,
              }
            ))
          }
        } catch(err) {
          console.log(err)
        }
      }
    )()
  }, [songId, dispath])
  

  return (
    <View>
        
        {
          songId
          ?
          <View>
             <Controls auRef={audioRef.current} />
          </View>
          :
          null
        }
      {/* Replace the audio element with the appropriate Audio component */}
      {/* <Audio
        ref={audioRef}
        source={{uri: srcAudio}}
        style={{display: 'none'}}
        loop={isLoop}
        autoPlay={true}
        hidden
        onTimeUpdate = {() => {
            if(audioRef.current) {
              dispath(setCurrentTime(
                (audioRef.current.currentTime)
              ))
            }
          }
        }
        
        onLoadedData = {() => {
            if(audioRef.current) {
              dispath(setDuration(
                (audioRef.current.duration)
              ))
            }
        }}
        onEnded = {() => {
          if (!isLoop) {
            dispath(setCurrentTime(0))
            dispath(changeIconPlay(false))

            if(playlistSong !== undefined && playlistSong.length > 0) {

              let currentIndex

              if(currnetIndexPlaylist === playlistSong.length - 1) {
                currentIndex = 0
              } else {
                currentIndex = currnetIndexPlaylist + 1
              }

              dispatch(setCurrnetIndexPlaylist(
                currentIndex
              ))

              dispatch(setSongId(
                playlistSong[currentIndex].encodeId
              ))

              dispatch(changeIconPlay(true))
            }

          }
        }}
      /> */}
{/* 
      <Lyric auRef={audioRef.current}/> */}

    </View>
  )
}

export default Player
