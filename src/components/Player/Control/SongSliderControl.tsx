import { Dimensions, Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Sound from "react-native-sound";
import colors from "../../../assets/colors";
import { useAppDispatch } from "../../../hooks/redux";
import { setCurrentTime, setDuration } from "../../../redux/features/audioSlice";

const width = Dimensions.get('window').width;
const SongSliderControl: React.FC<{ auRef: Sound | null | undefined }> = ({ auRef }) => {
    const [value, setValue] = useState(0);
    const dispatch = useAppDispatch();
    const currentTime = useSelector((state: any) => state.audio.currentTime);   
    const duration = useSelector((state: any) => state.audio.duration);
    console.log("currentTime", currentTime);
    useEffect(() => {
        const intervalId = setInterval(() => {
            auRef?.getCurrentTime((seconds) => {
                dispatch(setCurrentTime(seconds));
            });
        }, 1000);
        
        return () => clearInterval(intervalId);
    }, [currentTime]);
  

    
    const formatTime = (seconds:any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    };
    return (
        <>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Text style={{ color: colors.white }} >{formatTime(currentTime)}</Text>
                <Slider
                    style={{ width: width * 0.8, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTrackTintColor="#8E8E93"
                    thumbTintColor="#1EB1FC"
                    value={value}
                    onValueChange={setValue}
                />
                <Text style={{ color: colors.white }} >{formatTime(duration)}</Text>
            </View>
        </>
    );
};

export default SongSliderControl;