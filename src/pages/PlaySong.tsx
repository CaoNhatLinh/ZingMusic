import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import Player from "../components/Player";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

const SongSreen: React.FC = () => {
    const [songId, setSongid] = useState<any>("")
    const dispatch = useAppDispatch()
    useEffect(() => {
        (async () => {
          setSongid(useAppSelector((state) => state.audio.songId))
         
        })();
      }, [setSongid,dispatch]);
    return (
        <> 
            <View >
             <Player />
            </View>
        </>
    )
}
export default SongSreen