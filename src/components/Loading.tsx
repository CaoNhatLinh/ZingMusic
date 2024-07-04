import React from "react"
import Loading3Dot from "../components/Icons/Loading3Dot"
import { View } from "react-native"

const Loading:React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Loading3Dot setColor="white" setWidth={30} setHeight={30}/>
    </View>
  )
}

export default Loading