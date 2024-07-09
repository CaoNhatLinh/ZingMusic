import { Dimensions, Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Sound from "react-native-sound";
import colors from "../../../assets/colors";
import { useAppDispatch } from "../../../hooks/redux";
import { setCurrentTime, setDuration } from "../../../redux/features/audioSlice";

const width = Dimensions.get('window').width;
const SongSliderControl: React.FC<{ auRef: Sound | null | undefined }> = ({  auRef }) => {
    const dispath = useAppDispatch();
    const currentTime = useSelector((state: any) => state.audio.currentTime);
    const duration = useSelector((state: any) => state.audio.duration);
    useEffect(() => {
        dispath(setDuration((Math.floor(auRef?.getDuration() ?? 0))));
    }, [auRef]);
    const formatTime = (seconds:any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds =seconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    };
    const handleChangedSlider = (value:number) => {
        if (auRef) {
            auRef.setCurrentTime(value);
        }
    }
    return (
        auRef?
           
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ color: colors.white }} >{formatTime(Math.floor(currentTime))}</Text>
                <Slider
                    style={{ width: width * 0.8, height: 40 }}
                    minimumValue={0}
                    maximumValue={Math.floor(duration)}
                    step={1}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTrackTintColor="#8E8E93"
                    thumbTintColor="#1EB1FC"
                    value={Math.floor(currentTime)}
                    onValueChange={handleChangedSlider}
                />
                <Text style={{ color: colors.white }} >{formatTime(duration)}</Text>
            </View>
        :null
    );
};

export default SongSliderControl;