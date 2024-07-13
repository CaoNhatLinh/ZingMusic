import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const ShuffleControl: React.FC = () => {
  return (
    <TouchableOpacity
      style={styles.button}
      accessibilityLabel="Shuffle"
    >
      <Icon name="shuffle" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 2,
    marginVertical: 0,
  },
});

export default ShuffleControl;