import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useAppSelector } from "../hooks/redux";
import { useAudio } from "../utils/AudioContext";
import { useRoute, useNavigation } from "@react-navigation/native"
const AudioPlayerBox = () => {

    const {
        nextSong,
        audioRef,
      } = useAudio();
     
      const shouldHide = false;
  
      if ( !audioRef.current || shouldHide ) {
        return null; 
      }
 
  const info = useAppSelector((state) => state.audio.infoSongPlayer);
  return (
    <View style={styles.container}>
      <Image source={{ uri: info.thumbnail }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{info.title}</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pause</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: "#007bff",
  },
});

export default AudioPlayerBox;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AudioBox() {
  return (
    <View>
      <Text>AudioBox</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

r