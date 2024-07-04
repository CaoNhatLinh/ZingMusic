import React, { useEffect, useState } from "react"
import { getArtist, getArtistSong } from "../api/artist"
import { useParams } from "react-router-dom"
import DetailArtistInfo from "../components/DetailArtistInfo"
import TrackPlaylist from "../components/TrackPlaylist"
import Loading from "../components/Loading"
import {useAppDispatch} from "../hooks/redux"
import { setPlaylistSong } from "../redux/features/audioSlice"
import InfiniteScroll from 'react-infinite-scroll-component'

interface artistType {
  id: string
  name: string
  thumbnailM: string
  sortBiography: string
  realname: string
  birthday: string
  totalFollow: number
}

const Artist: React.FC = () => {

  const params = useParams<{name: string}>()
  const [dataDetailArtist, setDataDetailArtist] = useState<artistType>()
  const [dataListArtistSong, setDataListArtistSong] = useState<{ items: [] }>()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const dispatch = useAppDispatch()

  useEffect(() => {
    (
      async () => {
        if(params.name) {
          const data = await getArtist(params.name)
          setDataDetailArtist(data)
        }
      }
    )()
  }, [params.name])

  useEffect(() => {
    (
      async () => {
        if(dataDetailArtist) {
          const data = await getArtistSong(dataDetailArtist.id, 1, 20)
          setDataListArtistSong(data)
          dispatch(setPlaylistSong(data.items))
        }
      }
    )()
  }, [dataDetailArtist, dispatch])

  const fetchMoreDataSongArtist = () => {
    setPage(page + 1);
    (
      async () => {
        if(dataDetailArtist) {
          const data: {items: []} = await getArtistSong(dataDetailArtist.id, page + 1, 20)
          if(data.items) {
            if(dataListArtistSong) {
              const customDataListArtistSong:any = dataListArtistSong.items.concat(data.items)
              setDataListArtistSong({items: customDataListArtistSong})
            }
          } else {
            setHasMore(false)
            console.log("error loading song items")
          }
        }
      }
    )()
  }

  return(
    <>
      <div className="mx-[10vw] mt-16 mb-24">
        {
          dataDetailArtist
          ?
          <>
            <DetailArtistInfo
              name={dataDetailArtist.name}
              thumbnailM={dataDetailArtist.thumbnailM}
              sortBiography={dataDetailArtist.sortBiography}
              realname={dataDetailArtist.realname}
              birthday={dataDetailArtist.birthday}
              totalFollow={dataDetailArtist.totalFollow}
            />
            {
              dataListArtistSong
              ?

              <InfiniteScroll
                dataLength={dataListArtistSong.items.length}
                next={fetchMoreDataSongArtist}
                hasMore={hasMore}
                loader={<Loading />}
              >
                <TrackPlaylist items={dataListArtistSong.items}/>
              </InfiniteScroll>
              :
              <Loading />
            }
          </>
          :
          <Loading />
        }
      </div>
    </>
  )
}

export default Artist
