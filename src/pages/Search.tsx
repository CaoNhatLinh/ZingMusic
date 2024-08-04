import React, { useEffect, useState } from "react";
import { getSearch } from "../api/search";
import TrackPlaylist from "../components/TrackPlaylist";
import { useRoute } from "@react-navigation/native";
import { Text, View } from "react-native";
import colors from "../assets/colors";

const Search: React.FC = () => {
  const route: any = useRoute();

  const [dataSearch, setDataSearch] = useState<any>();
  const keyword = route.params.keyword;
  console.log(keyword);
  useEffect(() => {
    (async () => {
      setDataSearch(await getSearch(keyword));
    })();
  }, [keyword]);

  return (
    <>
      <View style={{ flex: 1, paddingTop: 24, paddingBottom: 96, paddingHorizontal: 10 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold",color:colors.googlePlus }}>Tìm kiếm cho: {keyword}</Text>
        <View style={{ marginTop: 8 }}>
          {dataSearch && <TrackPlaylist items={dataSearch.songs} />}
        </View>
      </View>
    </>
  );
};

export default Search;
