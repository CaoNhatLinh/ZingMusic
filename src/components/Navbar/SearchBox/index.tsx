import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import colors from "../../../assets/colors";

const SearchBox: React.FC = () => {
  const navigation = useNavigation<any>();

  const [isActive, setActive] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  const handleSubmitForm = () => {
    navigation.navigate("Search", { keyword });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
        borderRadius: 20,
        flexGrow: 1,
        backgroundColor: isActive? colors.white: colors.transparentGray
      }}
    >
      <View
        style={{
          marginLeft: 8,
          marginRight: 4,
          opacity: isActive ? 1 : 0.25,
        }}
      >
        <Icon name="search" size={24} />
      </View>
      <TouchableOpacity
        onPress={() => setActive(!isActive)}
        activeOpacity={1}
        style={{ flex: 1 }}
      >
        <TextInput
          value={keyword}
          placeholder={"Search"}
          style={{
            fontSize: 16,
            color: colors.black,
            borderWidth: 0,
            backgroundColor: "transparent",
            fontWeight: "bold",
            width: "100%",
            opacity: isActive ? 1 : 0.25,
            textDecorationLine: "none",
          }}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onChangeText={(text) => setKeyword(text)}
          onSubmitEditing={handleSubmitForm}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
