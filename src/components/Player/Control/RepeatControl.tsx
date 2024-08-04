import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../hooks/redux";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../assets/colors";
import { useAudio } from "../../../utils/AudioContext";
const RepeatControl: React.FC = () => {
  const isLoop = useAppSelector((state) => state.audio.isLoop);
  const {
    handleRepeat
  } = useAudio();
  
  return (
    <View>
      <TouchableOpacity onPress={handleRepeat}>
        {isLoop ? (
          <Icon
           name="repeat" size={24} color={colors.white}
          />
        ) : (
          <Icon
           name="repeat" size={24} color={colors.transparentGray}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RepeatControl;