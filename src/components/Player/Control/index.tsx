import React, { useState } from "react"
import LyricControl from "./LyricControl"
import NextControl from "./NextControl"
import PlayControl from "./PlayControl"
import PreviousControl from "./PreviousControl"
import RepeatControl from "./RepeatControl"
import ShuffleControl from "./ShuffleControl"
import TrackInfo from "./TrackInfo"

import { Dimensions, Text, View   } from "react-native"
import Header from "./header"
import SongSliderControl from "./SongSliderControl"
import { useAppSelector } from "../../../hooks/redux"
import { useNavigation } from "@react-navigation/native"

const win = Dimensions.get('window');
const Control: React.FC= () => {
  const  navigation = useNavigation();
const titlePlayList = useAppSelector((state) => state.audio.titlePlayList);
  return (
    <>
      

      <View>
        <Header title={titlePlayList} onDownPress={function (): void {
          navigation.goBack()
        }} onQueuePress={function (): void {
          throw new Error("Function not implemented.")
        }} onMessagePress={function (): void {
          throw new Error("Function not implemented.")
        }} />

        <TrackInfo />
        <SongSliderControl/>
       
        <View style={{ height:win.height*0.15, justifyContent:"space-between",  alignItems: "center", flexDirection:"row" ,paddingHorizontal:20}}>
            <PreviousControl />
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
