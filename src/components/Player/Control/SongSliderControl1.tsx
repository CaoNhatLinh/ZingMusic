import React from "react";
import { View } from "react-native";
import Slider from "../Slider";
import { useSelector } from "react-redux";

const SongSliderControl1: React.FC<{ auRef: any | null | undefined }> = ({ auRef }) => {

  const currentTime = useSelector((state: any) => state.audio.currentTime);
  const duration = useSelector((state: any) => state.audio.duration);

  return (
    <View>
      <Slider
        setWidth={100}
        setHeight={2}
        percentSlider={(currentTime/duration)*100}
        toogleTooltip={true}
        currentTimeSongTooltip={currentTime}
        getPercentSlider={(value: number) => {
          if(auRef) {
            auRef.currentTime = (value / 100) * auRef.duration
          }
        }}
      />
    </View>
  );
}

export default SongSliderControl1;