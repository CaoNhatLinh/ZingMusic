import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import Player from "../components/Player";


const SongSreen: React.FC = () => {
    const [dataSong, setDataSong] = useState<any>()

    const route = useRoute();
    useEffect(() => {
        (async () => {
          
          const encodeId = (route.params as { encodeId?: string })?.encodeId ?? "";
          
          if (encodeId) {
           
            // const detailPlaylist: SongType = await (playlistId);
            // setDataDetailPlaylist(detailPlaylist);
            // dispatch(setPlaylistSong(detailPlaylist.song.items));
          }
        })();
      }, [route.params]);
    return (
        <> 
            <View >
              <Text> song</Text>
             <Player/>
            </View>
        </>
    )
}
export default SongSreen