import React, { useState } from "react"
import LyricControl from "./LyricControl"
import NextControl from "./NextControl"
import PlayControl from "./PlayControl"
import PreviousControl from "./PreviousControl"
import RepeatControl from "./RepeatControl"
import ShuffleControl from "./ShuffleControl"
import TrackInfo from "./TrackInfo"
import VolumeControl from "./VolumeControl"
import VolumeSliderControl from "./VolumeSliderControl"

import { Button, Dimensions, Text, View   } from "react-native"
import Header from "./header"
import colors from "../../../assets/colors"
import SongSliderControl from "./SongSliderControl"
import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { setCurrentTime } from "../../../redux/features/audioSlice"
import { useAudio } from "../../../utils/AudioContext"

const win = Dimensions.get('window');
const Control: React.FC= () => {
  const {
    audioRef,
    status,
    errorMessage,
    initializeAudio,
    playAudio,
    pauseAudio,
    stopAudio,
  } = useAudio();
  return (
    <>
      {/* <SongSliderControl auRef={auRef} /> */}

      <View>
        <Header message="hhhsssssssssss" onDownPress={function (): void {

        }} onQueuePress={function (): void {
          throw new Error("Function not implemented.")
        }} onMessagePress={function (): void {
          throw new Error("Function not implemented.")
        }} />

        <TrackInfo />
        <SongSliderControl/>
        
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {/* <PreviousControl /> */}
            <PlayControl/>
            <NextControl />
          </View>
        {/* End Mid Controls Button */}

        {/* Right Controls Button */}
        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <LyricControl />
            <RepeatControl />
            <ShuffleControl />
            <VolumeControl auRef={auRef} />
            <VolumeSliderControl auRef={auRef} />
          </View> */}
        {/* End Right Controls Button */}
      </View>
    </>
  );
};

export default Control
