import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getDetailPlaylist } from "../api/detailPlaylist";
import DetailPlaylistInfo from "../components/DetailPlaylistInfo";
import TrackListDetailPlaylist from "../components/TrackPlaylist";
import { useAppDispatch } from "../hooks/redux";
import { setPlaylistSong, SetTitlePlayList } from "../redux/features/audioSlice";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../assets/colors";

interface playlistType {
  thumbnailM: string;
  title: string;
  artists: [];
  description: string;
  like: number;
  contentLastUpdate: number;
  song: {
    total: string;
    items: [any];
  };
}

const Playlist: React.FC = ({navigation}:any) => {
 
  const [dataDetailPlaylist, setDataDetailPlaylist] = useState<playlistType>();
  const route = useRoute();
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      
      const playlistId = (route.params as { playlistId?: string })?.playlistId ?? "";
      if (playlistId) {
        const detailPlaylist: playlistType = await getDetailPlaylist(playlistId);
        setDataDetailPlaylist(detailPlaylist);
        dispatch(setPlaylistSong(detailPlaylist.song.items));
        dispatch(SetTitlePlayList(detailPlaylist.title));
      }
    })();
  }, [route.params,dispatch]);

  return (
    <>
      <View style={{  marginBottom: 24,backgroundColor:colors.black }}>
      <ScrollView>
        {dataDetailPlaylist ? (
          <>
            <View style={{ paddingHorizontal: "10%"}}>
            <DetailPlaylistInfo
              thumbnailM={dataDetailPlaylist.thumbnailM}
              title={dataDetailPlaylist.title}
              artists={dataDetailPlaylist.artists}
              total={dataDetailPlaylist.song.total}
              description={dataDetailPlaylist.description}
              like={dataDetailPlaylist.like}
              contentLastUpdate={dataDetailPlaylist.contentLastUpdate}
            />
            </View>
            <TrackListDetailPlaylist  
            items={dataDetailPlaylist.song.items} 
            
            />
          </>
        ) 
        : (
          <ActivityIndicator />
        )}
        </ScrollView>
      </View>
    </>
  );
};

export default Playlist;
