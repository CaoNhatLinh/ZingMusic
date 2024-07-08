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

    const currentTime = useSelector((state: any) => state.audio.currentTime);   
    const duration = useSelector((state: any) => state.audio.duration);
   const dispatch = useAppDispatch();
    useEffect(() => {
        const intervalId = setInterval(() => {
            auRef?.getCurrentTime((seconds) => {
                dispatch(setCurrentTime(seconds))
            }
            );
        }, 1000);
       
        return () => clearInterval(intervalId);
    }, [currentTime]);
    useEffect(() => {
        dispatch(setDuration(auRef?.getDuration() ?? 0));
       
    }, [auRef]);
    const formatTime = (seconds:any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    };
    return (
        duration?
           
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ color: colors.white }} >{formatTime(currentTime)}</Text>
                <Slider
                    style={{ width: width * 0.8, height: 40 }}
                    minimumValue={0}
                    maximumValue={Math.floor(duration)}
                    step={1}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTrackTintColor="#8E8E93"
                    thumbTintColor="#1EB1FC"
                    value={currentTime}
                    onValueChange={setCurrentTime}
                />
                <Text style={{ color: colors.white }} >{formatTime(duration)}</Text>
            </View>
        :null
    );
};

export default SongSliderControl;