import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getCharthome } from "../api/zingchart";
import TrackPlaylist from "../components/TrackPlaylist";
import { useDispatch } from "react-redux";
import { setPlaylistSong } from "../redux/features/audioSlice";
import SearchBox from "../components/Navbar/SearchBox";
import colors from "../assets/colors";

const ChartHome: React.FC = () => {
  const [dataChartHome, setDataChartHome] = useState<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setDataChartHome(await getCharthome());
    })();
  }, []);

  useEffect(() => {
    if (dataChartHome) {
      dispatch(setPlaylistSong(dataChartHome.RTChart.items));
    }
  }, [dataChartHome]);

  return (
    
    <View style={{ flex: 1, paddingTop: 24, paddingHorizontal: 10 }}>
      <View>
        <Text style={{ fontSize: 32, fontWeight: "bold",color:colors.googlePlus }}>Bảng xếp hạng</Text>
      </View>
      <View style={{ marginTop: 8 }}>
        {dataChartHome ? (
          <TrackPlaylist items={dataChartHome.RTChart.items} />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </View>
  );
};

export default ChartHome;
