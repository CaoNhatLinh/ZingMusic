import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { changeIconPlay, setAutoPlay, setCurrnetIndexPlaylist, setInfoSongPlayer } from '../redux/features/audioSlice';
import { getInfoSong } from '../api/song';
import { useNavigation } from '@react-navigation/native';
import colors from '../assets/colors';
import { formatTime } from '../utils/formatTime';
interface TypeTrackListDetailPlaylist {
    streamingStatus: number;
    encodeId: string;
    thumbnail: string;
    thumbnailM: string;
    title: string;
    artists: any[];
    duration: number;
}
interface songType {
    [key: number]: string
    title: string
    infoSong: string
    thumbnail: string
    thumbnailM: string
    artistsNames: string
    artists: []
}
const win = Dimensions.get("window");
const CardSongs: React.FC<{ index: number; item: TypeTrackListDetailPlaylist }> = ({ item, index }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const songId = useAppSelector((state) => (state.audio ? state.audio.songId : null));
    
    const handleClickPlaySong = (streamingStatus: number, encodeId: string, currentIndex: number): void => {
        if (streamingStatus === 1) {
            dispatch(setCurrnetIndexPlaylist(currentIndex));
            (async () => {
                const infoSong: songType = await getInfoSong(encodeId);
                dispatch(
                    setInfoSongPlayer({
                        title: infoSong.title,
                        thumbnail: infoSong.thumbnail,
                        thumbnailM: infoSong.thumbnailM,
                        artistsNames: infoSong.artistsNames,
                        artists: infoSong.artists,
                    })
                );
                navigation.navigate("SongSreen" as never, { encodeId });
            })();
        }
    };
    return (
        <View>
            <TouchableOpacity
                key={index}
                onPress={() => {
                    handleClickPlaySong(item.streamingStatus, item.encodeId, index);
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    width: win.width,
                    borderRadius: 10,
                    backgroundColor: item.streamingStatus === 1 ? "transparent" : "#000",
                    marginBottom: 10,
                    ...(songId === item.encodeId && { backgroundColor: colors.facebook, borderRadius: 10 }),
                }}
            >
                {/* Thumbnail */}
                <Image
                    style={{ width: 46, height: 46, borderRadius: 10, marginRight: 5 }}
                    source={{ uri: item.thumbnail }}
                    resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                    {/* Title */}
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: songId === item.encodeId ? "bold" : "normal",
                            color: songId === item.encodeId ? colors.white : colors.white,
                        }}
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>

                    {/* Artist */}
                    <Text
                        style={{
                            marginTop: 2,
                            fontSize: 12,
                            opacity: 0.7,
                            color: songId === item.encodeId ? colors.white : colors.white,
                        }}
                        numberOfLines={1}
                    >
                        {(item.artists || [])
                            .filter((element: any) => {
                                return element !== undefined;
                            })
                            .map((eArtist: { alias: string; name: string }, iArtist: number) => {
                                return (
                                    <Text key={iArtist}>
                                        {iArtist > 0 ? ", " : ""}
                                        <Text>
                                            {eArtist.name}
                                        </Text>
                                    </Text>
                                );
                            })}
                    </Text>
                    {/* End Artist */}
                </View>
                {/* End Title & Artist */}
                {/* Show Song VIP */}
                <Text style={{ color: "#FFD700", fontWeight: "bold", marginRight: 4 }}>
                    {item.streamingStatus === 1 ? "" : "VIP"}
                </Text>
                {/* End Show Song VIP */}
                {/* Show Time Duration */}
                <Text
                    style={{
                        fontWeight: songId === item.encodeId ? "bold" : "normal",
                        color: songId === item.encodeId ? colors.white : colors.white,
                    }}
                >
                    {formatTime(item.duration)}
                </Text>
                {/* End Show Time Duration */}
            </TouchableOpacity>
        </View>
    )
}

export default memo(CardSongs)

const styles = StyleSheet.create({})