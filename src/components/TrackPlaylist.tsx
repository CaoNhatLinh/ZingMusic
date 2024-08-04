import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { formatTime } from "../utils/formatTime";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { changeIconPlay, setAutoPlay, setCurrnetIndexPlaylist, setInfoSongPlayer } from "../redux/features/audioSlice";
import colors from "../assets/colors";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { getInfoSong } from "../api/song";
import CardSongs from "./CardSongs";

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

  const renderItem = ({ item, index }: { item: TypeTrackListDetailPlaylist, index: number }) => (
    <CardSongs item={item}  index={index} />
  );

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
