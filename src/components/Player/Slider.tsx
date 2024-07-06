import React, { useState, useRef } from "react";
import { formatTime } from "../../utils/formatTime";
import { View, StyleSheet, PanResponder, Animated, Text } from "react-native";

interface SliderProps {
  setWidth: number;
  setHeight: number;
  percentSlider: number;
  getPercentSlider: Function;
  toogleTooltip: boolean;
  currentTimeSongTooltip?: number;
}

const Slider: React.FC<SliderProps> = ({
  setWidth,
  setHeight,
  percentSlider,
  getPercentSlider,
  toogleTooltip,
  currentTimeSongTooltip,
}) => {
  const sliderRef = useRef<View>(null);
  const [isActiveSliderDotHover, setActiveSliderDotHover] = useState<boolean>(false);
  const [isActiveSliderTooltipHover, setActiveSliderTooltipHover] = useState<boolean>(false);

  const handleActiveSliderDotHover = (handle: boolean) => {
    setActiveSliderDotHover(handle);
  };

  const handleActiveSliderTooltipHover = (handle: boolean) => {
    setActiveSliderTooltipHover(handle);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (sliderRef.current) {
          const percentSliderWidth =
            (gestureState.moveX - sliderRef.current.measureInWindow((x, y, width, height) => {}).left) /
            sliderRef.current.measureInWindow((x, y, width, height) => {}).width;

          getPercentSlider(percentSliderWidth * 100);
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, { width: setWidth }]}>
      <View
        style={[styles.sliderBar, { height: setHeight }]}
        {...panResponder.panHandlers}
        ref={sliderRef}
      >
        <View style={[styles.sliderBarRail, { height: setHeight }]}>
          <Animated.View
            style={[
              styles.sliderProgress,
              { width: `${percentSlider}%`, height: setHeight },
            ]}
          ></Animated.View>
          <Animated.View
            style={[
              styles.sliderDot,
              { left: `${percentSlider}%` },
            ]}
          >
            <View
              style={[
                styles.dotHandle,
                isActiveSliderDotHover ? styles.visible : styles.invisible,
              ]}
              onTouchStart={() => handleActiveSliderTooltipHover(true)}
              onTouchEnd={() => handleActiveSliderTooltipHover(false)}
            ></View>
            {toogleTooltip && (
              <View
                style={[
                  styles.dotTooltip,
                  isActiveSliderTooltipHover ? styles.visible : styles.invisible,
                ]}
              >
                <View style={styles.tooltipContent}>
                  <Text>{formatTime(currentTimeSongTooltip || 0)}</Text>
                </View>
              </View>
            )}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: -6,
    alignItems: "center",
  },
  sliderBar: {
    paddingVertical: 6,
  },
  sliderBarRail: {
    position: "relative",
    width: "100%",
    backgroundColor: "hsla(0,0%,50.2%,.18)",
    borderRadius: 15,
  },
  sliderProgress: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: "#335eea",
    borderRadius: 15,
  },
  sliderDot: {
    position: "absolute",
    zIndex: 5,
    width: 3,
    height: 3,
    top: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    transitionProperty: "left",
  },
  dotHandle: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "#fff",
  },
  dotTooltip: {
   
  },
  tooltipContent: {
    minWidth: 20,
    padding: 2,
    textAlign: "center",
    color: "#000",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  visible: {
    backfaceVisibility: "visible",
  },
  invisible: {
    backfaceVisibility: "hidden",
  },
});

export default Slider;
