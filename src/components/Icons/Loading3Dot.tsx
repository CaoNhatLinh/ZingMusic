import React from "react";
import { View, Animated, Easing } from "react-native";

interface Loading3DotProps {
  setColor?: string;
  setWidth?: number;
  setHeight?: number;
}

const Loading3Dot: React.FC<Loading3DotProps> = ({
  setColor = "black",
  setWidth = 24,
  setHeight = 24,
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -6, 0],
  });

  return (
    <View style={{ width: setWidth, height: setHeight }}>
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: setColor,
            marginHorizontal: 2,
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: setColor,
            marginHorizontal: 2,
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: setColor,
            marginHorizontal: 2,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default Loading3Dot;
