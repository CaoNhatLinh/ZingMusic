import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../../../assets/colors";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    height: 20 *2,
    paddingHorizontal: 15,
  },
  message: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  }
});

interface HeaderProps {
  message: string;
  onDownPress: () => void;
  onQueuePress: () => void;
  onMessagePress: () => void;
}

const Header: React.FC<HeaderProps> = ({ message, onDownPress, onQueuePress, onMessagePress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onDownPress}>
      <Icon name="chevron-down" size={20} color="#FFF" />
    </TouchableOpacity>
    <Text onPress={onMessagePress}
      style={styles.message}>{message.toUpperCase()}</Text>
    <TouchableOpacity onPress={onQueuePress}>
    <Icon name="bars" size={20} color="#FFF" />
    </TouchableOpacity>
  </View>
);

export default Header;