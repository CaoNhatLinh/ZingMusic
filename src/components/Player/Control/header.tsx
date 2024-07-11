import {Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../assets/colors";
import { memo } from "react";
const styles = StyleSheet.create({
  container: {
    
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    height: 30 *2,
    paddingHorizontal: 15,
  },
  message: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  }
});

interface HeaderProps {
  title: string;
  onDownPress: () => void;
  onQueuePress: () => void;
  onMessagePress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onDownPress, onQueuePress, onMessagePress }) => (
  <View style={[styles.container,{flexDirection: "row"}]}>
    <TouchableOpacity onPress={onDownPress}>
      <Icon name="chevron-down" size={20} color="#FFF" />
    </TouchableOpacity>
    <View style={[styles.container,{flexDirection: "column", justifyContent: "center",}]}>
    <Text style={[styles.message,{fontWeight: "400"}]}>Đang phát</Text>
    <Text onPress={onMessagePress}
      style={styles.message}>{title.toUpperCase()}</Text>
    </View>
    <TouchableOpacity onPress={onQueuePress}>
    <Icon name="bars" size={20} color="#FFF" />
    </TouchableOpacity>
  </View>
);

export default memo(Header);