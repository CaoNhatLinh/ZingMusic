import React, { useEffect, useRef, useMemo, memo, useCallback } from "react"
import { ActivityIndicator, Text, View } from "react-native"
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
type AudioStatusType = 'loading' | 'success' | 'error' | 'play' | 'pause' | 'next' | 'previous' | 'stop';
// function playSound(url:String) {
//   const callback = (error:any, sound:Sound) => {
//     sound.play(() => {
//       sound.release();
//     });
//   };

//     return new Sound(url, Sound.MAIN_BUNDLE, error => callback(error, sound));
//   }



const Player: React.FC = () => {


  const [status, setStatus] = React.useState<AudioStatusType>('loading');
  const [duration, setDuration] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');


  const route = useRoute()
  const isPlay = useAppSelector((state) => state.audio.isPlay)
  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist)
  const playlistSong: any = useAppSelector((state) => state.audio.playlistSong)

  const audioRef = useRef<Sound | null>(null)

  const isLoop = useAppSelector((state) => state.audio.isLoop)
  const dispath = useAppDispatch()
  const songId = (route.params as { encodeId?: string })?.encodeId ?? ""

  const currentSongId = useAppSelector((state) => state.audio.songId)
  const intervalRef =  useRef< NodeJS.Timeout | null>(null)

  function handleAudioAction(action: string, player: Sound) {
    switch (action) {
      case 'play':
        player.play();
        setStatus('play');
        break;
      case 'stop':
        player.stop();
        setStatus('stop');
        break;
      case 'pause':
        player.pause();
        setStatus('pause');
        break;

      default:
        break;
    }
  }
  function isUpdate() {
    if (songId != currentSongId) {

      dispath(setSongId(songId))

      return true
    }
    return false
  }
  useEffect(() => {
    (

      async () => {
        try {
          if (songId === "") {
            console.log("song id not found")
          }
          else {
            if (isUpdate()) {
              if (audioRef.current) {
                audioRef.current.stop()
              }

              const linkSong: songType = await getSong(songId)
              linkSong[128] ? dispath(setSrcAudio(linkSong[128])) : dispath(setSrcAudio(""))
              const infoSong: songType = await getInfoSong(songId)
              dispath(setInfoSongPlayer(
                {
                  title: infoSong.title,
                  thumbnail: infoSong.thumbnail,
                  thumbnailM: infoSong.thumbnailM,
                  artistsNames: infoSong.artistsNames,
                  artists: infoSong.artists,
                }
              ))

              const sound = new Sound(linkSong[128], Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                  setStatus('error');
                  setErrorMessage(error.message);
                } else {
                  setStatus('success');
                  setErrorMessage('');
                }
                sound.play((success) => {
                  if (success) {
                    console.log('successfully finished playing');
                  } else {
                    console.log('playback failed due to audio decoding errors');
                  }
                  sound.release();
                });
              });
              audioRef.current = sound;
              
              intervalRef.current = setInterval(() => {
                if (audioRef.current) {
                  audioRef.current.getCurrentTime((seconds) => {
                  dispath(setCurrentTime(Math.floor(seconds)))
                });

              }
              }, 1000);
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    )()
  }, [dispath])
 
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  return (
    <View>
      {
        audioRef.current
          ?
          <View>
            <Controls auRef={audioRef.current} />
          </View>
          :
          <ActivityIndicator />
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


