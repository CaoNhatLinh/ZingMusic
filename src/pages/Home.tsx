import React, { useState, useEffect } from "react"
import PlaylistCover from "../components/PlaylistCover"
import { getHomePlayList } from "../api/home"
import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import colors from "../assets/colors"
import SearchBox from "../components/Navbar/SearchBox"
interface typePlaylistCover {
  items: []
  title: string
  encodeId: string
  thumbnail: string
  sortDescription: string
  sectionId: string
}
const Home: React.FC = ({ navigation }: any) => {
  const [dataHome, setdataHome] = useState<Array<object> | undefined>()
  const handleClickPlaylist = ({ playlistId, name }: { playlistId: string, name: string }) => {
    navigation.navigate('DetailPlaylist', { playlistId, name })
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
      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: "row", gap: 10, alignContent: "center", justifyContent: "center",  }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: colors.googlePlus }}>Zing Music</Text>
          <SearchBox />
        </View>

        <ScrollView >
          {
            dataHome
              ?
              dataHome.map((e: any, i: number) => (
                  <View key={i} style={{ marginHorizontal:10 }}>
                    <Text style={{ justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 24, fontWeight: 'bold', color: colors.white, marginTop: 9, marginBottom: 3 }}>
                      {(e.title === "") ? (e.sectionId.slice(1)) : (e.title)}
                    </Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 11, gap: 16 }}>
                      {
                        e.items.map((element: typePlaylistCover, index: number) => (
                          <View style={{ width: '30%' }} key={index}>
                            <PlaylistCover
                              key={index}
                              title={element.title}
                              thumbnail={element.thumbnail}
                              sortDescription={element.sortDescription}
                              handleClickPlaylist={() => handleClickPlaylist({ playlistId: element.encodeId, name: element.title })}
                            />
                          </View>
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
