import React from "react"
import Loading3Dot from "../components/Icons/Loading3Dot"

const Loading:React.FC = () => {
  return (
    <div className="flex justify-center">
      <Loading3Dot setColor="white" setWidth="30" setHeight="30"/>
    </div>
  )
}

export default Loading