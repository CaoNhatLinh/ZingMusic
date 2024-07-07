import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { useAppSelector } from "../../../hooks/redux";
const ImgArt =  () => {
  const win = Dimensions.get('window');
  const ratio = win.width ;
  const styles = StyleSheet.create({
    imgArt: {
      height: 70 * ratio/100,
      width: 70 * ratio/100,
      borderRadius: 9999999
    }
  });
  const info = useAppSelector((state) => state.audio.infoSongPlayer);
  return (
        info.thumbnailM?
        <View style={{ height: win.height * 50 / 100, flexDirection: "row", alignItems: "center" ,justifyContent: "center"}}>
          <Image
            source={{ uri: info.thumbnailM }}
            style={styles.imgArt}
          />
        </View>
        :null
  );
};
export default ImgArt;