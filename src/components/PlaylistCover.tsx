import React, { useState } from "react"
import { Image, Text, TouchableOpacity, View,StyleSheet } from "react-native"
import colors from "../assets/colors"


interface coverProps {
  title: string
  sortDescription?: string
  thumbnail: string
  handleClickPlaylist: (playlistId: any) => void
}

const styles = StyleSheet.create({
  roundedContainer: {
    borderRadius: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
  },
  imageBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  contentContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  sortDescription: {
  },
});
const Cover: React.FC<coverProps> = ({ title, sortDescription, thumbnail ,handleClickPlaylist}) => {
  return (
    <View>
      <TouchableOpacity onPress={handleClickPlaylist}>
      <View style={styles.roundedContainer}>
          <Image style={styles.thumbnail} source={{ uri: thumbnail }} alt={title} />
      </View>
      <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        {sortDescription && (
          <Text style={styles.sortDescription} numberOfLines={2}>
            {sortDescription}
          </Text>
        )}
      </View>
      </TouchableOpacity>
    </View>
  );
}

export default Cover
