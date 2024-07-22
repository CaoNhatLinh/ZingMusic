import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
interface DetailPlaylistInfoProps {
  thumbnailM: string;
  title: string;
  artists: { alias: string; name: string }[];
  total: string;
  description: string;
  like: number;
  contentLastUpdate: number;
}

const DetailPlaylistInfo: React.FC<DetailPlaylistInfoProps> = ({
  thumbnailM,
  title,
  artists,
  total,
  description,
  like,
  contentLastUpdate,
}) => {
  const navigation = useNavigation<any>();
  const handleClickArtis = (name: String): void => {

    navigation.navigate("ArtisScreen", { name });
  };
  const playlistLastUpdate = new Date(contentLastUpdate * 1000).toLocaleDateString("vi-VN");
  return (
    <View style={{ marginBottom: 72 }}>
      {/* Thumbnail */}
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnailM }} />
        <View style={styles.imageBlur} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>

        {/* List Artists Playlist */}
        <Text style={styles.artists}>
          Playlist by{" "}
          {artists.map((e, i) => (
            <Text key={i}>
              {i > 0 && ", "}
              <Text style={styles.artistLink}
              onPress={() =>handleClickArtis(e.alias) }
              >{e.name}</Text>
            </Text>
          ))}
        </Text>
        {/* End List Artists Playlist */}

        {/* Total Song */}
        <View style={styles.totalSong}>
          <Text style={styles.updatedAt}>Updated at {playlistLastUpdate}</Text>
          <Text>{total} Songs</Text>
          <View style={styles.likeContainer}>
            <Icon name="heart" size={16} color={colors.white} />
            <Text style={{color: colors.white}}>{like}</Text>
          </View>
        </View>
     
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      
        <View style={styles.buttonContainer}>
          {/* Play */}
          <TouchableOpacity style={styles.button}>
            <Icon name='play' size={16} color={colors.white} />
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
        {/* End Button */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    position: "relative",
    minWidth: 288,
    minHeight: 288,
  },
  thumbnail: {
    borderRadius: 10,
    width: "100%",
    minHeight: 288,
  },
  imageBlur: {
    position: "absolute",
    top: 3,
    width: "100%",
    height: "100%",
    zIndex: -1,
    borderRadius: 10,
    transform: [{ scale: 0.95 }],
  },
  infoContainer: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  artists: {
    fontSize: 16,
    opacity: 0.9,
    color: colors.white,
    marginTop: 6,
  },
  artistLink: {
    textDecorationLine: "underline",
    opacity: 1,
    fontWeight: "bold",
  },
  totalSong: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    opacity: 0.7,
    color: colors.white,
    marginTop: 2,
  },
  updatedAt: {
    marginRight: 3,
    color: colors.white,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
    color: colors.white,
    marginTop: 6,
    maxWidth: "100%",
  },
  buttonContainer: {
    flex: 1,
    marginTop: 8,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 100,
    height: 40,
    backgroundColor: colors.dark,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  }
  
});

export default DetailPlaylistInfo;
