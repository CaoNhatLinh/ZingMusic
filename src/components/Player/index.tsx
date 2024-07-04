import React, { useEffect, useRef } from "react"
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

  const audioRef = useRef<HTMLAudioElement | null>(null)

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
          <div className="flex flex-col justify-around h-16 backdrop-saturate-[180%] backdrop-blur-[30px] bg-[color:var(--color-navbar-bg)] fixed inset-x-0 bottom-0 z-[100]">
            <Controls auRef={audioRef.current} />
          </div>
          :
          ""
        }

      <audio
        ref={audioRef}
        src={srcAudio}
        className="hidden"
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
