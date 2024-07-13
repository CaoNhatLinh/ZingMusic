import React from "react";
import { View, TouchableOpacity } from "react-native";
import IconRepeat from "../../Icons/Repeat";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setLoop } from "../../../redux/features/audioSlice";
import Icon from "react-native-vector-icons/FontAwesome6";
import colors from "../../../assets/colors";
const RepeatControl: React.FC = () => {
  const isLoop = useAppSelector((state) => state.audio.isLoop);
  const dispatch = useAppDispatch();

  const handleRepeat = () => {
    
      dispatch(setLoop(!isLoop));
  };

  return (
    <View>
      <TouchableOpacity onPress={handleRepeat}>
        {isLoop ? (
          <Icon
           name="repeat" size={36} color={colors.white}
          />
        ) : (
          <Icon
           name="repeat" size={24} color={colors.facebook}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RepeatControl;