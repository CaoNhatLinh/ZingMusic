import React from "react";
import { View, TouchableOpacity } from "react-native";
import IconPlay from "../../Icons/Play";
import IconPause from "../../Icons/Pause";
import { useSelector, useDispatch } from "react-redux";
import { changeIconPlay } from "../../../redux/features/audioSlice";
import Sound from "react-native-sound";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Icon from "react-native-vector-icons/FontAwesome";
const PlayControl: React.FC<{ auRef: Sound | null | undefined }> = ({ auRef }) => {
  const isPlay = useAppSelector((state) => state.audio.isPlay);
  const dispatch = useAppDispatch();

  const handlePlaySong = () => {
    if (isPlay === true) {
      dispatch(changeIconPlay(false));
      if (auRef) {
        auRef.pause();
      }
    } else {
      dispatch(changeIconPlay(true));
      if (auRef) {
        auRef.play();
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