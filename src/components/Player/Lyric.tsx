import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, ViewStyle, Dimensions } from "react-native";
import { useAppSelector } from "../../hooks/redux";
import useLyric from "../../hooks/lyric";
import { useAudio } from "../../utils/AudioContext";
import colors from "../../assets/colors";
import { ScrollView } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;

const Lyric = () => {
  const { audioRef: auRef } = useAudio();
  const isOpen = useAppSelector((state) => state.audio.isLyric);
  const [lastTap, setLastTap] = useState(0);
  const currentTime = useAppSelector((state) => state.audio.currentTime)*1000;
  const songID =  useAppSelector((state) => state.audio.songId);
  const lyric = useLyric(songID);
  const handleSetTime = (value: number) => {
    const now = Date.now();
    const TIME_THRESHOLD = 300;
    if (lastTap && now - lastTap < TIME_THRESHOLD) {
      if (auRef) {
        auRef.current?.setCurrentTime(value);
      }
    } 
    setLastTap(now);
  };
 
  return (
    isOpen?
    <View style={{ height: height, alignContent: "center", justifyContent: "center" ,paddingVertical:80 }}>
      {lyric?.length > 0 ? (
        <ScrollView>
          {lyric &&
            lyric.map(
              (e: { data: string; startTime: number; endTime: number }, index: number) => {
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
      ) : (
        <Text style={{ color: colors.white, fontSize: 20 }}>No lyric</Text>
      )}
    </View>
    :null
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
