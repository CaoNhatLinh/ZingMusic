import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useAudio } from "../../../utils/AudioContext";
import colors from "../../../assets/colors";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setShuffle } from "../../../redux/features/audioSlice";

const ShuffleControl: React.FC = () => {
  const dispath = useAppDispatch();
 const handleShuffle =()=>{
  dispath(setShuffle(!isShuffle));
  }
  const isShuffle = useAppSelector((state) => state.audio.isShuffle);
  return (
    <TouchableOpacity onPress={handleShuffle}>
      {isShuffle ? (
        <Icon
         name="shuffle" size={24} color={colors.white}
        />
      ) : (
        <Icon
         name="shuffle" size={24} color={colors.transparentGray}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    marginVertical: 0,
  },
});

export default ShuffleControl;