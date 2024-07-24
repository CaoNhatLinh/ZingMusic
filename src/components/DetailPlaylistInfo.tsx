import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../assets/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay, setAutoPlay, setCurrnetIndexPlaylist } from "../redux/features/audioSlice";
interface DetailPlaylistInfoProps {
  thumbnailM: string;
  title: string;
  artists: { alias: string; name: string }[];
  total: string;
  description: string;
  like: number;
  contentLastUpdate: number;
}
interface typeTrackListDetailPlaylist {
  streamingStatus: number;
  encodeId: string;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  duration: number;
}
const DetailPlaylistInfo: React.FC<DetailPlaylistInfoProps> = ({
  thumbnailM,
  artists,
  total,
  description,
  like,
  contentLastUpdate,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const handleClickArtis = (name: String): void => {

    navigation.navigate("ArtisScreen", { name });
  };
  const PlaylistSong = useAppSelector((state) => state.audio.playlistSong); 
  const fisrtSong = PlaylistSong?.at(0) as typeTrackListDetailPlaylist | undefined;
  const handleClickPlaySong = (): void => {
    if (fisrtSong) {
      dispatch(setCurrnetIndexPlaylist(0));
      dispatch(changeIconPlay(true));
      dispatch(setAutoPlay(true));
      const songID = fisrtSong.encodeId;
      navigation.navigate('SongSreen' as never, {encodeId:songID });
    }
  };
  const playlistLastUpdate = new Date(contentLastUpdate * 1000).toLocaleDateString("vi-VN");
  return (
    <View style={{ marginBottom: 24 }}>
      {/* Thumbnail */}
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnailM }} />
      </View>
      <View style={styles.infoContainer}>
      <Text style={styles.text} numberOfLines={3}>
          {description}
        </Text>
        

        {/* Total Song */}
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={styles.text}>{total} Bài hát</Text>
          <View style={styles.likeContainer}>
            <Icon name="heart" size={16} color={colors.white} style={{paddingHorizontal:10}} />
            <Text style={styles.text}>{like}</Text>
          </View>
        </View>
        <Text style={styles.text}>Cập nhật mới nhất {playlistLastUpdate}</Text>
        
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
        <View style={styles.buttonContainer}>
          {/* Play */}
          <TouchableOpacity style={styles.button} onPress={handleClickPlaySong}>
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
    paddingVertical: 16,
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
  
  text: {
    marginRight: 3,
    color: colors.white,
    fontSize:16,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  description: {
    fontSize: 12,
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
    borderRadius: 20,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 100,
    height: 42,
    backgroundColor: colors.facebook,
  },
  buttonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  }
  
});

export default DetailPlaylistInfo;
