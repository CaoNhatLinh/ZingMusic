import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { setSongId, setCurrnetIndexPlaylist, changeIconPlay } from "../../../redux/features/audioSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

const PreviousControl: React.FC = () => {
  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist);
  const playlistSong = useAppSelector((state) => state.audio.playlistSong) as { encodeId: string }[];
  const dispatch = useAppDispatch();

  const handlePreviousSong = () => {
    if (playlistSong !== undefined && playlistSong.length > 0) {
      let currentIndex
      if (currnetIndexPlaylist === 0) {
        currentIndex = 0
      } else {
        currentIndex = currnetIndexPlaylist - 1
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

  return (
    <TouchableOpacity onPress={handlePreviousSong}>
      <Icon name="backward-step" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default PreviousControl;