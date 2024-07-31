import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";
import Player from "../components/Player";
import Header from "../components/Player/Control/header";
import Lyric from "../components/Player/Lyric";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { useAppSelector } from "../hooks/redux";
const SongScreen: React.FC = () => {
    const win = Dimensions.get('window');
    const info = useAppSelector((state) => state.audio.infoSongPlayer);
    const navigate = useNavigation();
    return (
        info?
        <>
            <Header title={"ss"} onDownPress={function (): void {
                navigate.goBack();
            }} onQueuePress={function (): void {
                console.log("message");
            }} onMessagePress={function (): void {
                console.log("message");
            }} />
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
            <PagerView style={styles.pagerView} initialPage={0} useNext={false}>
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
        :<></>
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
