import React from "react";
import { View, TouchableOpacity } from "react-native";
import { changeIconPlay } from "../../../redux/features/audioSlice";
import Sound from "react-native-sound";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAudio } from "../../../utils/AudioContext";
import colors from "../../../assets/colors";

const PlayControl: React.FC= () => {
    const {
      audioRef,
      playAudio,
      pauseAudio,
    } = useAudio();
  const isPlay = useAppSelector((state) => state.audio.isPlay);
  const dispatch = useAppDispatch();
  const isLoop = useAppSelector((state) => state.audio.isLoop);
  const handlePlaySong = () => {
    if (isPlay === true) {
      dispatch(changeIconPlay(false));
      if (audioRef) {
        pauseAudio();
      }
    } else {
      dispatch(changeIconPlay(true));
      if (audioRef) {
        playAudio(isLoop);
      }
    }
  };
  
  return (
    <TouchableOpacity
      style={{ width: 72, height: 72,  borderRadius:999,borderColor:colors.white,borderWidth:2,justifyContent:"center",alignItems:"center"}}
      onPress={handlePlaySong}
    >
      {isPlay ? (
        <Icon name="pause" size={32} color="white" />
      ) : (
        <Icon name="play" size={32} color="white" />
      )}
    </TouchableOpacity>
  );
};
export default PlayControl;