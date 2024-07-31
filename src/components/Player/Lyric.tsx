import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { setOpenLyric } from "../../redux/features/audioSlice";
import IconArrowDown from "../../components/Icons/ArrowDow";
import useLyric from "../../hooks/lyric";
import Sound from "react-native-sound";
import { useAudio } from "../../utils/AudioContext";
import colors from "../../assets/colors";
import { ScrollView } from "react-native-gesture-handler";

const Lyric = () => {
  const {
    audioRef: auRef,
  } = useAudio();
  const songId = useAppSelector((state) => state.audio.songId);

  const lyric = useLyric(songId);
  const currentTime = useAppSelector((state: any) => state.audio.currentTime) *1000 +1200;
  const scrollViewRef = useRef<any>(null);
  const [lastTap, setLastTap] = useState(0);
  const scrollToLine = (index:number) => {
    const lineHeight = 50; 
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({
        y: lineHeight * index,
        animated: true,
      });
    }
  };
  const handleSetTime = (value:number) => {
    const now = Date.now();
    const TIME_THRESHOLD = 300;
    if (lastTap && (now - lastTap) < TIME_THRESHOLD) {
      if (auRef) {
        auRef.current?.setCurrentTime(value);
      }
    } else {
      console.log('Single click');
    }
    setLastTap(now);
    
}
  return (
    lyric?.length > 0? 
        <View >
          
          <ScrollView >
            {lyric &&
              lyric.map(
                (
                  e: { data: string; startTime: number; endTime: number },
                  index: number
                ) => {
                  if (e.startTime <= currentTime  && currentTime  <= e.endTime) {
                    scrollToLine(index);
                  }
                    return (
                      <TouchableOpacity
                        key={index}
                        style={styles.lineLyric}
                        onPress={() => handleSetTime(e.startTime / 1000)}
              
                      >
                        <Text
                          style={{
                            fontSize: 24,
                            opacity: e.startTime <= currentTime && currentTime <= e.endTime ? 1 : 0.4,
                            color: colors.white,
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          {e.data}
                        </Text>
                      </TouchableOpacity>
                    );
                  
                }
              )}
          </ScrollView>
          {/* End Line Lyric*/}
        </View>
        : <Text style={{color:colors.white}}>No lyric</Text>
  );
};

const styles = StyleSheet.create({
  lyricContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 200,
    backgroundColor: colors.white,
  },

  closeButton: {
    padding: 2,
    margin: 3,
    backgroundColor: "transparent",
    borderRadius: 1000,
    position: "absolute",
    top: 6,
    right: 6,
  },
  
  lineLyricContainer: {
    marginTop: 50,
  },
  lineLyric: {
    marginVertical: 2,
    marginHorizontal: 0,
    paddingVertical: 3,
    paddingHorizontal: 18,
    borderRadius: 100,
  },

});

export default Lyric;
