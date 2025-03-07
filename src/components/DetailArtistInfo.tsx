import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import colors from "../assets/colors";
import { BlurView } from "@react-native-community/blur";

interface DetailArtistInfoProps {
  name: string;
  thumbnailM: string;
  sortBiography: string;
  realname: string;
  birthday: string;
  totalFollow: number;
}

const DetailArtistInfo: React.FC<DetailArtistInfoProps> = ({
  name,
  thumbnailM,
  sortBiography,
  realname,
  birthday,
  totalFollow,
}) => {
  
  return (

      <View style={styles.Container}>
      <ImageBackground
        source={{ uri: thumbnailM }}
        style={styles.imageBackground}
      >
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={30}
        ></BlurView>
          <Image
          style={styles.thumbnail}
          source={{ uri: thumbnailM }}
          resizeMode="cover"
        />
         <View style={styles.infoContainer}>
        {/* Name */}
        <Text style={styles.name}>{name}</Text>
        {/* End Name */}

        <Text style={styles.realName}>Real Name: {realname}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.birthday}>Birthday: {birthday}</Text>
          <Text style={styles.totalFollow}>Follow: {totalFollow}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={3}>
          {sortBiography}
        </Text>
        {/* End Description */}
      </View>
        </ImageBackground>
      </View>

  );
};
const win = Dimensions.get("window");
const styles = StyleSheet.create({
  
  Container: {
    position: "relative",
    height: win.height/2,
  },
  thumbnail: {
    height: win.height/4,
    width: win.height/4,
    borderRadius: 9999,
    resizeMode: "cover",
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
 
  infoContainer: {
    height: "auto",
    justifyContent: "center",
    padding: 14,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  realName: {
    fontSize: 16,
    opacity: 0.7,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 6,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    opacity: 0.7,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 2,
    justifyContent: "space-between",
  },
  birthday: {
    marginRight: 3,
    color: colors.white,
  },
  totalFollow: {
    flexDirection: "row",
    alignItems: "center",
    color: colors.white,
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 6,
    maxWidth: "100%",
  },
});

export default DetailArtistInfo;