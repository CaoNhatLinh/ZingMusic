import React from "react";
import { View, TouchableOpacity } from "react-native";
import { changeIconPlay } from "../../../redux/features/audioSlice";
import Sound from "react-native-sound";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAudio } from "../../../utils/AudioContext";
const PlayControl: React.FC= () => {
    const {
      audioRef,
      playAudio,
      pauseAudio,
    } = useAudio();
  const isPlay = useAppSelector((state) => state.audio.isPlay);
  const dispatch = useAppDispatch();
  const handlePlaySong = () => {
    if (isPlay === true) {
      dispatch(changeIconPlay(false));
      if (audioRef) {
        pauseAudio();
      }
    } else {
      dispatch(changeIconPlay(true));
      if (audioRef) {
        playAudio();
      }
    }
  };

  return (
    <TouchableOpacity
      style={{ width: 42, height: 42, marginHorizontal: 2, marginVertical: 0 }}
      onPress={handlePlaySong}
    >
      {isPlay ? (
        <Icon name="pause" size={24} color="white" />
      ) : (
        <Icon name="play" size={24} color="white" />
      )}
    </TouchableOpacity>
  );
};

export default PlayControl;