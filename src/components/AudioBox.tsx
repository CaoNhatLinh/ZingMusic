import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from "react-native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useAudio } from "../utils/AudioContext";
import Icon from "react-native-vector-icons/FontAwesome6";
import { changeIconPlay } from "../redux/features/audioSlice";
import { useNavigation } from "@react-navigation/native";

const AudioPlayerBox = () => {
  const { audioRef, nextSong, playAudio, pauseAudio } = useAudio();
  const translateX = useRef(new Animated.Value(300)).current;
  const isShowAudioBox = useAppSelector((state) => state.audio.isShowAudioBox);
  const [textWidth, setTextWidth] = useState(0);
  const info = useAppSelector((state) => state.audio.infoSongPlayer);
  const isPlay = useAppSelector((state) => state.audio.isPlay);
  const dispatch = useAppDispatch();
  const playlistSong = useAppSelector((state) => state.audio.playlistSong);
  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist);
  const navigation = useNavigation<any>();
  useEffect(() => {
    const animate = () => {
      translateX.setValue(300);
      Animated.loop(
        Animated.timing(translateX, {
          toValue: -textWidth,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
    if (textWidth > 0) {
      animate();
    }
  });

  const handlePlaySong = () => {
    if (isPlay) {
      dispatch(changeIconPlay(false));
      pauseAudio();
    } else {
      dispatch(changeIconPlay(true));
      playAudio();
    }
  };

  if (!isShowAudioBox || !audioRef.current) {
    return null;
  }
  
  return (
      
      <View style={styles.container}>
      <Image source={{ uri: info.thumbnail }} style={styles.thumbnail} />
     
      <View style={styles.info}>
      <TouchableOpacity onPress={() => navigation.navigate("SongSreen")}>
        <Animated.Text
          style={[styles.title, { transform: [{ translateX }] }]}
          onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        >
          {info.title}
        </Animated.Text>
      </TouchableOpacity>

      </View>
      <View style={{flexDirection:"row",gap:20}}>
      <TouchableOpacity
        style={{ width: 32, height: 32, justifyContent: "center", alignItems: "center" }}
        onPress={handlePlaySong}
      >
        {isPlay ? (
          <Icon name="pause" size={32} color="white" />
        ) : (
          <Icon name="play" size={32} color="white" />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nextSong(playlistSong, currnetIndexPlaylist)}>
              <Icon name="forward-step" size={32} color="white" />
            </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#242424",
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  info: {
    overflow: "hidden",
    flexGrow: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: "#007bff",
  },
});

export default AudioPlayerBox;
