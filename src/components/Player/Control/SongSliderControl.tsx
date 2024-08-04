import { Dimensions, Text, View } from "react-native";
import Slider from '@react-native-community/slider';
import colors from "../../../assets/colors";
import {  useAppSelector } from "../../../hooks/redux";
import { useAudio } from "../../../utils/AudioContext"
const win = Dimensions.get('window');

const SongSliderControl: React.FC = () => {
    const {
        audioRef,
      } = useAudio();
    const currentTime = useAppSelector((state: any) => state.audio.currentTime);
    const duration = useAppSelector((state: any) => state.audio.duration);
    
    const formatTime = (seconds:any) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds =Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    };
    const handleChangedSlider = (value:number) => {
        if (audioRef) {
            audioRef.current?.setCurrentTime(value);
        }
    }
    
    return (
        audioRef?
            <View style={{ justifyContent: "center", flexDirection: "row" , alignItems:"center"}}>
                <Text style={{ color: colors.white }} >{formatTime(Math.floor(currentTime))}</Text>
                <Slider
                    style={{ width: win.width * 0.8, height: win.height * 0.03}}
                    minimumValue={0}
                    maximumValue={Math.floor(duration)}
                    step={1}
                    minimumTrackTintColor={colors.white}
                    maximumTrackTintColor= {colors.white}
                    thumbTintColor={colors.white}
                    value={Math.floor(currentTime)}
                    onValueChange={handleChangedSlider}
                />
                <Text style={{ color: colors.white }} >{formatTime(duration)}</Text>
            </View>
        :null
    );
};

export default SongSliderControl;