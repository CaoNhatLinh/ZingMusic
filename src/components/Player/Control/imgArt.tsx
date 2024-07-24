import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Dimensions } from 'react-native';
import { useAppSelector } from "../../../hooks/redux";
const ImgArt =  () => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const win = Dimensions.get('window');
  const ratio = win.width ;
  const isPlay = useAppSelector((state) => state.audio.isPlay);
  const animationDuration = 6000; 
  let remainingDuration = animationDuration;
  const [duration, setDuration] = React.useState(animationDuration); 
  const startRotation = (duration: number) => {
    Animated.timing(rotateValue, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && isPlay) {
        rotateValue.setValue(0);
        startRotation(animationDuration);  
      }
    });
  };

  useEffect(() => {
    if (isPlay) {
      startRotation(duration);
    } else {
      rotateValue.stopAnimation((value) => {
        remainingDuration = (1 - value) * animationDuration;
        setDuration(remainingDuration);
        rotateValue.setValue(value);
      });
    }
  }, [isPlay]);
  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };
  const styles = StyleSheet.create({
    imgArt: {
      height: 70 * ratio/100,
      width: 70 * ratio/100,
      borderRadius: 999,
      resizeMode: 'cover'
    }
  });
  const info = useAppSelector((state) => state.audio.infoSongPlayer);
  return (
    info.thumbnailM ? (
         
      <View style={{ height: win.height * 50 / 100, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <Animated.Image
          source={{ uri: info.thumbnailM }}
          style={[styles.imgArt,rotateStyle]}
        />
      </View>
    ) : null
  );
};
export default ImgArt;