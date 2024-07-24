import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { formatTime } from "../utils/formatTime";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay, setAutoPlay, setCurrnetIndexPlaylist } from "../redux/features/audioSlice";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

interface TypeTrackListDetailPlaylist {
  streamingStatus: number;
  encodeId: string;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  artists: any[];
  duration: number;
}

const win = Dimensions.get("window");

const TrackListDetailPlaylist: React.FC<{ items: TypeTrackListDetailPlaylist[] }> = ({ items = [] }) => {
  const songId = useAppSelector((state) => (state.audio ? state.audio.songId : null));
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const handleClickPlaySong = (streamingStatus: number, encodeId: string, currentIndex: number): void => {
    if (streamingStatus === 1) {
      dispatch(setCurrnetIndexPlaylist(currentIndex));
      dispatch(changeIconPlay(true));
      dispatch(setAutoPlay(true));
      navigation.navigate("SongSreen" as never, { encodeId });
    }
  };

  const renderItem = ({ item, index }: { item: TypeTrackListDetailPlaylist; index: number }) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          handleClickPlaySong(item.streamingStatus, item.encodeId, index);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
          width: win.width,
          borderRadius: 10,
          backgroundColor: item.streamingStatus === 1 ? "transparent" : "#000",
          marginBottom: 10,
          ...(songId === item.encodeId && { backgroundColor: colors.facebook, borderRadius: 10 }),
        }}
      >
        {/* Thumbnail */}
        <Image
          style={{ width: 46, height: 46, borderRadius: 10, marginRight: 5 }}
          source={{ uri: item.thumbnail }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          {/* Title */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: songId === item.encodeId ? "bold" : "normal",
              color: songId === item.encodeId ? colors.white : colors.white,
            }}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          {/* Artist */}
          <Text
            style={{
              marginTop: 2,
              fontSize: 12,
              opacity: 0.7,
              color: songId === item.encodeId ? colors.white : colors.white,
            }}
            numberOfLines={1}
          >
            {(item.artists || [])
              .filter((element: any) => {
                return element !== undefined;
              })
              .map((eArtist: { alias: string; name: string }, iArtist: number) => {
                return (
                  <Text key={iArtist}>
                    {iArtist > 0 ? ", " : ""}
                    <Text>
                      {eArtist.name}
                    </Text>
                  </Text>
                );
              })}
          </Text>
          {/* End Artist */}
        </View>
        {/* End Title & Artist */}
        {/* Show Song VIP */}
        <Text style={{ color: "#FFD700", fontWeight: "bold", marginRight: 4 }}>
          {item.streamingStatus === 1 ? "" : "VIP"}
        </Text>
        {/* End Show Song VIP */}
        {/* Show Time Duration */}
        <Text
          style={{
            fontWeight: songId === item.encodeId ? "bold" : "normal",
            color: songId === item.encodeId ? colors.white : colors.white,
          }}
        >
          {formatTime(item.duration)}
        </Text>
        {/* End Show Time Duration */}
      </TouchableOpacity>

    );
  };

  return (
    <View style={{ width: win.width }}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.encodeId}
          initialNumToRender={10}
          windowSize={5}
        />
    </View>
  );
};

export default memo(TrackListDetailPlaylist);
