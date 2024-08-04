import React, { memo, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import Player from "../components/Player";
import Header from "../components/Player/Control/header";
import Lyric from "../components/Player/Lyric";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setOpenLyric, setShowAudioBox } from "../redux/features/audioSlice";
const SongScreen: React.FC = () => {
    const win = Dimensions.get('window');
    const info = useAppSelector((state) => state.audio.infoSongPlayer);
    const navigate = useNavigation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setShowAudioBox(false));
    }, []);
    const handlePageChange = (event:any) => {
        const position = event.nativeEvent.position;
        if(position === 1){
            dispatch(setOpenLyric(true)); 
        }
        else{
            dispatch(setOpenLyric(false));
        }
      };
    return (
        info ?
            <>
                <View style={{ position: "relative" }}>
                    <ImageBackground
                        source={{ uri: info.thumbnailM }}
                        style={{ width: win.width, height: win.height }}
                    >
                        <BlurView
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                            }}
                            blurType="dark"
                            blurAmount={30}
                        ></BlurView>
                        <Header title={info.title} onDownPress={function (): void {
                            dispatch(setShowAudioBox(true));
                             dispatch(setOpenLyric(false));
                            navigate.goBack();
                        }} onQueuePress={function (): void {
                        }} onMessagePress={function (): void {
                        }} />
                        <PagerView style={styles.pagerView} initialPage={0} useNext={false}   onPageSelected={handlePageChange}>
                            <View key="1" style={styles.page}>
                                <Player />
                            </View>
                            <View key="2" style={styles.page}>
                                <Lyric />
                            </View>
                        </PagerView>
                    </ImageBackground>
                </View>
            </>
            : null
    );
};

const styles = StyleSheet.create({
    pagerView: {
        flex: 1,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    lyrics: {
        fontSize: 18,
        paddingHorizontal: 16,
        textAlign: 'center',
        color: 'gray',
    },
});

export default SongScreen;
