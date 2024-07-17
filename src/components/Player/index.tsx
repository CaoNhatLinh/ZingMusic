import React, { useEffect, useRef, useMemo, memo, useCallback } from "react"
import { ActivityIndicator, Text, View } from "react-native"
import Controls from "./Control"
import Sound from "react-native-sound"
import { getSong, getInfoSong } from "../../api/song"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import {
  setInfoSongPlayer,
  setSrcAudio,
} from "../../redux/features/audioSlice"
import { setSongId, setCurrnetIndexPlaylist } from "../../redux/features/audioSlice"
import Lyric from "./Lyric"
import colors from "../../assets/colors"
import { useRoute } from "@react-navigation/native"
import { useAudio } from "../../utils/AudioContext"

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

const Player: React.FC = () => {

  const {
    status,
    playAudio,
    initializeAudio,
  } = useAudio();
  const route = useRoute()
  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist)
  const playlistSong: any = useAppSelector((state) => state.audio.playlistSong)
  const audioRef = useRef<Sound | null>(null)
  const dispath = useAppDispatch()
  const RoutesongId = (route.params as { encodeId?: string })?.encodeId ?? ""
  const currentSongId = useAppSelector((state) => state.audio.songId)
  function isUpdate() {
    if (RoutesongId != currentSongId) {
      
      return true
    }
    return false
  }

  useEffect(() => {
    (
      async () => {
        try {
          if (RoutesongId === "") {
            console.log("song id not found")
          }
          else {
            if (isUpdate()) {
              if (audioRef.current) {
                audioRef.current.stop()
              }
              const songID = playlistSong[currnetIndexPlaylist].encodeId
              const linkSong: songType = await getSong(songID)
              linkSong[128] ? dispath(setSrcAudio(linkSong[128])) : dispath(setSrcAudio(""))
              const infoSong: songType = await getInfoSong(songID)
              dispath(setInfoSongPlayer(
                {
                  title: infoSong.title,
                  thumbnail: infoSong.thumbnail,
                  thumbnailM: infoSong.thumbnailM,
                  artistsNames: infoSong.artistsNames,
                  artists: infoSong.artists,
                }
              ))
             
              initializeAudio(linkSong[128])
              dispath(setSongId(songID))
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    )()
  }, [dispath, currentSongId])


  // useEffect(() => {
  //   if (status === "success") {
  //     playAudio()
  //   }
  // }, [status])

  return (
    <View>
      {
        status == 'play' || status == 'pause'
          ?
          <View>
            <Controls />
          </View>
          :
          <ActivityIndicator />
      }

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


