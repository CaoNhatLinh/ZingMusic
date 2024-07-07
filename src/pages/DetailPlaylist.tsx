import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getDetailPlaylist } from "../api/detailPlaylist";
import DetailPlaylistInfo from "../components/DetailPlaylistInfo";
import TrackListDetailPlaylist from "../components/TrackPlaylist";
import { useAppDispatch } from "../hooks/redux";
import { setPlaylistSong } from "../redux/features/audioSlice";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../assets/colors";
import Sound from "react-native-sound";

interface playlistType {
  thumbnailM: string;
  title: string;
  artists: [];
  description: string;
  like: number;
  contentLastUpdate: number;
  song: {
    total: string;
    items: [];
  };
}

type AudioStatusType = 'loading' | 'success' | 'error' | 'play' | 'pause' | 'next' | 'previous' | 'stop';
const Playlist: React.FC = ({navigation}:any) => {
  const [status, setStatus] = React.useState<AudioStatusType>('loading');
  const [duration, setDuration] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');
  const audioRef = useRef<Sound | null>(null)
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
      }
    })();
  }, [route.params,dispatch]);
  function handleAudioAction(action: string, player: Sound) {
    switch (action) {
        case 'play':
            player.play();
            setStatus('play');
            break;
        case 'stop':
            player.stop();
            setStatus('stop');
            break;
        case 'pause':
            player.pause();
            setStatus('pause');
            break;
            case 'release':
              player.release();
              setStatus('pause');
              break;
        default:
            break;
    }
  }

  const handlePlaySong = ({linksong}:any) => {
    console.log(linksong)
    // audioRef.current = new Sound(linksong, Sound.MAIN_BUNDLE, (error) => {
    //   if (error) {
    //     setStatus('error');
    //     setErrorMessage(error.message);
    //   } else {
    //     setStatus('success');
    //     setErrorMessage('');
    //   }
    //   handleAudioAction('play', audioRef.current as Sound)
    // }
  // );
}
  return (
    <>
      {/* {console.log(dataDetailPlaylist)} */}
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
            handlePlaySong={handlePlaySong("sss")}
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
