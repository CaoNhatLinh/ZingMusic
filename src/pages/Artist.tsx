import React, { useEffect, useState } from "react";
import { getArtist, getArtistSong } from "../api/artist";
import DetailArtistInfo from "../components/DetailArtistInfo";
import TrackPlaylist from "../components/TrackPlaylist";
import Loading from "../components/Loading";
import { useAppDispatch } from "../hooks/redux";
import { setPlaylistSong } from "../redux/features/audioSlice";
import { useRoute } from "@react-navigation/native";
import { Text, View, FlatList, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface artistType {
  id: string;
  name: string;
  thumbnailM: string;
  sortBiography: string;
  realname: string;
  birthday: string;
  totalFollow: number;
}
const win = Dimensions.get("window").width;
const Artist: React.FC = () => {
  const route = useRoute();
  const params = route.params as { name: string };
  const [dataDetailArtist, setDataDetailArtist] = useState<artistType | null>(null);
  const [dataListArtistSong, setDataListArtistSong] = useState<{ items: any[] }>({ items: [] });
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.name) {
      getArtist(params.name).then((data) => setDataDetailArtist(data));
    }
  }, [params.name]);

  useEffect(() => {
    if (dataDetailArtist) {
      getArtistSong(dataDetailArtist.id, 1, 20).then((data) => {
        setDataListArtistSong(data);
        dispatch(setPlaylistSong(data.items));
      });
    }
  }, [dataDetailArtist, dispatch]);

  const fetchMoreDataSongArtist = () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    getArtistSong(dataDetailArtist!.id, page + 1, 20).then((data) => {
      
      if (data.items != null && data.items.length > 0) {
        setDataListArtistSong((prevData) => ({
          items: [...prevData.items, ...data.items],
        }));
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    });
  };

  return (
    
  
    <View style={styles.container}>
      <ScrollView>
      {dataDetailArtist ? (
        <>
          <DetailArtistInfo
            name={dataDetailArtist.name}
            thumbnailM={dataDetailArtist.thumbnailM}
            sortBiography={dataDetailArtist.sortBiography}
            realname={dataDetailArtist.realname}
            birthday={dataDetailArtist.birthday}
            totalFollow={dataDetailArtist.totalFollow}
          />
            <ScrollView horizontal={true} >
          <FlatList
            data={dataListArtistSong.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackPlaylist items={[item]} />}
            onEndReached={fetchMoreDataSongArtist}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Loading /> : null}
          />
          </ScrollView >
        </>
      ) : (
        <Loading />
      )}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Artist;
