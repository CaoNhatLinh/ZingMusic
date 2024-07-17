import React from "react";
import { View, TouchableOpacity } from "react-native";
import IconRepeat from "../../Icons/Repeat";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setLoop } from "../../../redux/features/audioSlice";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../assets/colors";
import { useAudio } from "../../../utils/AudioContext";
const RepeatControl: React.FC = () => {
  const isLoop = useAppSelector((state) => state.audio.isLoop);
  const dispatch = useAppDispatch();
  const {
    playAudio,
    handleRepeat
  } = useAudio();
  
  return (
    <View>
      <TouchableOpacity onPress={handleRepeat}>
        {isLoop ? (
          <Icon
           name="repeat" size={28} color={colors.facebook}
          />
        ) : (
          <Icon
           name="repeat" size={28} color={colors.transparentGray}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RepeatControl;