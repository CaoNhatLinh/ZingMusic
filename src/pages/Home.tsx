import React, { useState, useEffect } from "react"
import PlaylistCover from "../components/PlaylistCover"
import { getHomePlayList } from "../api/home"
import Loading from "../components/Loading"
import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import colors from "../assets/colors"
interface typePlaylistCover{
  items: []
  title: string
  encodeId: string
  thumbnail: string
  sortDescription: string
  sectionId: string
}
const Home: React.FC = ({ navigation }:any) => {
  const [dataHome, setdataHome] = useState<Array<object> | undefined>()
  const handleClickPlaylist = ({ playlistId ,name}: { playlistId: string,name:string }) => {
    navigation.navigate( 'DetailPlaylist', {  playlistId,name})
  }
  useEffect(() => {
    (
      async () => {
        setdataHome(await getHomePlayList())
      }
    )()
  }, [])

return (
    <>
   
    <View >
        <ScrollView style={{ marginTop: 8 }}>
            {
                dataHome
                ?
                dataHome.map((e: any, i: number) => (
                    <View key={i}>
                        <Text style={{ justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 24, fontWeight: 'bold', color: colors.white, marginTop: 9, marginBottom: 3 }}>
                            {(e.title === "") ? (e.sectionId.slice(1)) : (e.title)}
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 11 }}>
                            {
                               e.items.map((element: typePlaylistCover, index: number) => (
                                <PlaylistCover
                                  key={index}
                                  title={element.title}
                                  thumbnail={element.thumbnail}
                                  sortDescription={element.sortDescription}
                                  handleClickPlaylist={() => handleClickPlaylist({ playlistId: element.encodeId, name: element.title})}
                                />
                              ))
                            }
                        </View>
                    </View>
                ))
                :
                <ActivityIndicator />
            }
        </ScrollView>
    </View>
    </>
)
}

export default Home
