import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"
import Player from "../components/Player";


const SongSreen: React.FC = () => {

    return (
        <> 
            <View >
             <Player />
            </View>
        </>
    )
}
export default SongSreen