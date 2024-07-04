import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDetailPlaylist } from "../api/detailPlaylist"
import DetailPlaylistInfo from "../components/DetailPlaylistInfo"
import TrackListDetailPlaylist from "../components/TrackPlaylist"
import { useAppDispatch } from "../hooks/redux"
import { setPlaylistSong } from "../redux/features/audioSlice"
import Loading from "../components/Loading"

interface playlistType {
  thumbnailM: string
  title: string
  artists: []
  description: string
  like: number
  contentLastUpdate: number
  song: {
    total: string
    items: []
  }
}

const Playlist: React.FC = () => {

  const [dataDetailPlaylist, setDataDetailPlaylist] = useState<playlistType>()

  const params = useParams<{playlistId: string}>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    (
      async () => {
        if(params.playlistId) {
          const detailPlaylist:playlistType = await getDetailPlaylist(params.playlistId)
          setDataDetailPlaylist(detailPlaylist)
          dispatch(setPlaylistSong(detailPlaylist.song.items))
        }
      }
    )()
  }, [params, dispatch])

  return (
    <>
      {/* {console.log(dataDetailPlaylist)} */}
      <div className="mx-[10vw] mt-16 mb-24">
        {
          dataDetailPlaylist
          ?
          <>
            <DetailPlaylistInfo
              thumbnailM={dataDetailPlaylist.thumbnailM}
              title={dataDetailPlaylist.title}
              artists={dataDetailPlaylist.artists}
              total={dataDetailPlaylist.song.total}
              description={dataDetailPlaylist.description}
              like={dataDetailPlaylist.like}
              contentLastUpdate={dataDetailPlaylist.contentLastUpdate}
            />
            <TrackListDetailPlaylist items={dataDetailPlaylist.song.items}/>
          </>
          :
          <Loading />
        }
      </div>
    </>
  )
}

export default Playlist