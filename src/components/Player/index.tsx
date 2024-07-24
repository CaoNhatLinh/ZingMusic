import React, { useEffect, useRef, useMemo, memo, useCallback } from "react"
import { ActivityIndicator, Dimensions, ImageBackground, Text, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import Controls from "./Control"
import Sound from "react-native-sound"
import { getSong, getInfoSong } from "../../api/song"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import {
  setInfoSongPlayer,
  setSrcAudio,
} from "../../redux/features/audioSlice"
import { setSongId, setCurrnetIndexPlaylist } from "../../redux/features/audioSlice"
import { useRoute } from "@react-navigation/native"
import { useAudio } from "../../utils/AudioContext"
import TrackInfo from "./Control/TrackInfo"
import Header from "./Control/header"
import { BlurView } from "@react-native-community/blur";

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


  const win = Dimensions.get('window');
  const navigation = useNavigation();
  const info = useAppSelector((state) => state.audio.infoSongPlayer);
  const titlePlayList = useAppSelector((state) => state.audio.titlePlayList);
  return (
    info ?
      <View>
        {
          status == 'play' || status == 'pause'
            ?
            <View style={{ position: "relative" }}>
              <ImageBackground
                source={{ uri: info.thumbnailM }}
                style={{ width: win.width, height: win.height }}
              >
                <BlurView
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                  blurType="dark"
                  blurAmount={30}
                ></BlurView>
                <Header title={titlePlayList} onDownPress={function (): void {
                  navigation.goBack()
                }} onQueuePress={function (): void {
                  console.log("message")
                }} onMessagePress={function (): void {
                  console.log("message")
                }} />
                <TrackInfo />
                <Controls />

              </ImageBackground>
            </View>
            :
            <ActivityIndicator />
        }
      </View>
      : null
  )
}

export default Player


