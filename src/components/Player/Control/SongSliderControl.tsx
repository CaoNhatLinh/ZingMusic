import { Dimensions, View } from "react-native";
import Slider from '@react-native-community/slider';
import { useState } from "react";
import { useSelector } from "react-redux";

const width = Dimensions.get('window').width;
const SongSliderControl = () => {
    const [value, setValue] = useState(0);
    const currentTime = useSelector((state: any) =>
        state.audio.currentTime
    );
    const duration = useSelector((state: any) => state.audio.duration);

    return (
        <>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Slider
                    style={{ width: width * 0.8, height: 40 }}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#1EB1FC"
                    maximumTrackTintColor="#8E8E93"
                    thumbTintColor="#1EB1FC"
                    value={value}
                    onValueChange={setValue}
                />
            </View>
        </>
    );
};
export default SongSliderControl;