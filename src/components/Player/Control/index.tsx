import React, { useState } from "react"
import LyricControl from "./LyricControl"
import PlayControl from "./PlayControl"
import RepeatControl from "./RepeatControl"
import ShuffleControl from "./ShuffleControl"
import { Dimensions, View } from "react-native"
import SongSliderControl from "./SongSliderControl"
import { useAppSelector } from "../../../hooks/redux"

import { useAudio } from "../../../utils/AudioContext"
import { TouchableOpacity } from "react-native-gesture-handler"
import Icon from "react-native-vector-icons/FontAwesome6";
const win = Dimensions.get('window');
const Control: React.FC = () => {
  const {
    nextSong,
    previousSong,
  } = useAudio();
  const playlistSong = useAppSelector((state) => state.audio.playlistSong);
  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist);
  return (
    <>
        <View style={{ paddingHorizontal: 20 }}>
          <SongSliderControl />
          <View style={{ height: win.height * 0.2, justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
            <ShuffleControl />
            <TouchableOpacity onPress={()=>previousSong(playlistSong,currnetIndexPlaylist)}>
              <Icon name="backward-step" size={32} color="white" />
            </TouchableOpacity>
            <PlayControl />
            <TouchableOpacity onPress={() => nextSong(playlistSong, currnetIndexPlaylist)}>
              <Icon name="forward-step" size={32} color="white" />
            </TouchableOpacity>
            <RepeatControl />
          </View>
        </View>
    </>
  );
};

export default Control
