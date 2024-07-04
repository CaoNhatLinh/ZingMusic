import React from "react"
import VideoPlayer from "../components/VideoPlayer"
import { useParams } from "react-router-dom"

const DetailMV: React.FC = () => {

  const params = useParams<{id: string}>()

  return (
    <div className="pt-[65px] pb-[96px] px-[10vw]">
      {
        params.id &&
        <VideoPlayer id={params.id}/>
      }

    </div>
  )
}

export default DetailMV
