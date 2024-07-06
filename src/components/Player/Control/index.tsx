import React from "react"
import LyricControl from "./LyricControl"
import NextControl from "./NextControl"
import PlayControl from "./PlayControl"
import PreviousControl from "./PreviousControl"
import RepeatControl from "./RepeatControl"
import ShuffleControl from "./ShuffleControl"
import TrackInfo from "./TrackInfo"
import VolumeControl from "./VolumeControl"
import VolumeSliderControl from "./VolumeSliderControl"
import SongSliderControl from "./SongSliderControl"
import { Dimensions, Text, View   } from "react-native"
import Slider from '@react-native-community/slider';
import Header from "./header"
import colors from "../../../assets/colors"

const win = Dimensions.get('window');
const Control: React.FC<{ auRef: any | null }> = ({ auRef }) => {
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
        <View style={{ backgroundColor: colors.facebook }}>
        <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />

         
        </View>
        {/* Mid Controls Button */}


        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <PreviousControl />
            <PlayControl auRef={auRef} />
            <NextControl />
          </View> */}
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
