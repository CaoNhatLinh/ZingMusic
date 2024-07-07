import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import Player from "../components/Player";
import { useAppDispatch } from "../hooks/redux";


const SongSreen: React.FC = () => {
    const [dataSong, setDataSong] = useState<any>()
    const dispatch = useAppDispatch()
    useEffect(() => {
        (async () => {
          const songId = 
          
          if (encodeId) {
           
          
          }
        })();
      }, [route.params]);
    return (
        <> 
            <View >
             <Player />
            </View>
        </>
    )
}
export default SongSreen