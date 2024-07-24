import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../hooks/redux";
import colors from "../../../assets/colors";
import { Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import ImgArtfrom from "./imgArt"
import ImgArt from "./imgArt";
const TrackInfo: React.FC = () => {
  const info = useAppSelector((state) => state.audio.infoSongPlayer);
  const win = Dimensions.get('window');
  const navigation = useNavigation<any>();
  return (
    <>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <ImgArt  />
        <View style={{ height: win.height * 15 / 100, flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: win.width, paddingHorizontal: 20 }}>
          <Icon name="share" size={20} color="#FFF" />
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Text
              style={{ 
                fontSize: 20,
                color: colors.white,
                opacity: 0.9,
                marginBottom: 1,
                width: win.width * 0.6,
                textAlign: "center"
              }}
            >
              {info.title}
            </Text>
            {info.artists &&
              info.artists.map((e: any, i: number) => (
                <React.Fragment key={i}>
                  <Text
                    style={{ color: colors.white, fontSize: 12, opacity: 0.6, textDecorationLine: "underline" }}
                  onPress={() => navigation.navigate("ArtisScreen", { name: e.alias })}
                  >
                    {e.name}
                  </Text>
                </React.Fragment>
              ))}
          </View>
          <Icon name="heart" size={20} color="#FFF" />
        </View>
      </View>
    </>
  );
};

export default memo(TrackInfo);
