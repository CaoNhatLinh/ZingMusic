import React, { useEffect, useRef } from "react"
import { View } from "react-native"
import Controls from "./Control"
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
//
interface songType {
  [key: number]: string
  title: string
  infoSong: string
  thumbnail: string
  artistsNames: string
  artists: []
}

const Player:React.FC = () => {

  const songId = useAppSelector((state) => state.audio.songId)
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
    <>
        {
          songId
          ?
          <View style={{flexDirection: 'column', justifyContent: 'space-around', height: 16, backgroundColor: colors.dark, position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 100}}>
            <Controls auRef={audioRef.current} />
          </View>
          :
          null
        }

      {/* Replace the audio element with the appropriate Audio component */}
      <Audio
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
      />

      <Lyric auRef={audioRef.current}/>

    </>
  )
}

export default Player
