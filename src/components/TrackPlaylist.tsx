import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { formatTime } from "../utils/formatTime";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { changeIconPlay, setAutoPlay, setCurrnetIndexPlaylist, setInfoSongPlayer, setSongId } from "../redux/features/audioSlice";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";

interface typeTrackListDetailPlaylist {
  streamingStatus: number;
  encodeId: string;
  thumbnail: string;
  thumbnailM: string;
  title: string;
  artists: [];
  duration: number;
}

const TrackListDetailPlaylist: React.FC<{ items: [any] }> = ({ items = [] }) => {
  const songId = useAppSelector((state) => state.audio ? state.audio.songId : null);
  const dispatch = useAppDispatch()
  const navigation = useNavigation<any>();
  const handleClickPlaySong = (streamingStatus: number, encodeId: string, currentIndex: number): void => {
    if (streamingStatus === 1) {
      dispatch(setCurrnetIndexPlaylist(currentIndex));
      dispatch(changeIconPlay(true));
      dispatch(setAutoPlay(true));
      navigation.navigate('SongSreen' as never, { encodeId });
    }
  };

  return (
    <View>

      {items.map((e: typeTrackListDetailPlaylist, i: number) => {
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              handleClickPlaySong(e.streamingStatus, e.encodeId, i);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              backgroundColor: e.streamingStatus === 1 ? "transparent" : "#000",
              marginBottom: 10,
              ...(songId === e.encodeId && { backgroundColor: colors.facebook, borderRadius: 10 }),
            }}
          >
            {/* Thumbnail */}
            <Image
              style={{ width: 46, height: 46, borderRadius: 10, marginRight: 5 }}
              source={{ uri: e.thumbnail }}
              resizeMode="cover"
            // onPress={() => {
            //   handleClickPlaySong(e.streamingStatus, e.encodeId, i);
            // }}
            />

            {/* End Thumbnail */}
            {/* Title & Artist */}
            <View style={{ flex: 1 }}>
              {/* Title */}
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: songId === e.encodeId ? "bold" : "normal",
                  color: songId === e.encodeId ? colors.white : colors.white,
                }}
                numberOfLines={1}
              >
                {e.title}
              </Text>

              {/* Artist */}
              <Text
                style={{
                  marginTop: 2,
                  fontSize: 12,
                  opacity: 0.7,
                  color: songId === e.encodeId ? colors.white : colors.white,
                }}
                numberOfLines={1}
              >
                {(e.artists || [])
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
              {e.streamingStatus === 1 ? "" : "VIP"}
            </Text>
            {/* End Show Song VIP */}
            {/* Show Time Duration */}
            <Text
              style={{
                fontWeight: songId === e.encodeId ? "bold" : "normal",
                color: songId === e.encodeId ? colors.white : colors.white,
              }}
            >
              {formatTime(e.duration)}
            </Text>
            {/* End Show Time Duration */}
          </TouchableOpacity>
        );
      })}

    </View>
  );
};

export default memo(TrackListDetailPlaylist);