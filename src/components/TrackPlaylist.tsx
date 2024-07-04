import React from "react"
import { Link } from "react-router-dom"
import { formatTime } from "../utils/formatTime"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { setSongId, changeIconPlay, setAutoPlay, setCurrnetIndexPlaylist } from "../redux/features/audioSlice"

interface typeTrackListDetailPlaylist {
  streamingStatus: number
  encodeId: string
  thumbnail: string
  title: string
  artists: []
  duration: number
}

const TrackListDetailPlaylist: React.FC<{ items: [] }> = ({ items }) => {

  const currnetIndexPlaylist = useAppSelector((state) => state.audio.currnetIndexPlaylist)

  const dispatch = useAppDispatch()

  const handleClickPlaySong = (streamingStatus: number, encodeId: string, currentIndex: number):void => {
    if(streamingStatus === 1) {
      dispatch(setSongId(
        encodeId
      ))
      dispatch(setCurrnetIndexPlaylist(currentIndex))
      dispatch(changeIconPlay(true))
      dispatch(setAutoPlay(true))
    }
  }

  return (
    <div>
      {
        items.map((e: typeTrackListDetailPlaylist, i:number) => {
          return (
            <div
            key={i}
              className={"flex items-center p-2 rounded-lg transition-all duration-300 " + (e.streamingStatus === 1 ? "cursor-pointer" : "cursor-default hover:bg-[black]") + (currnetIndexPlaylist === i ? " bg-[color:var(--color-primary-bg)]" : " hover:bg-[color:var(--color-secondary-bg)]")}
            >
              {/* Thumbnail */}
              <img
                className="rounded-lg w-[46px] h-[46px] mr-5" src={e.thumbnail} alt={e.title}
                onClick={() => {
                  handleClickPlaySong(e.streamingStatus, e.encodeId, i)
                }}
               />
              {/* End Thumbnail */}
              {/* Title & Artist */}
              <div className="flex flex-1 flex-col">
                {/* Title */}
                <div
                  className={"text-lg font-semibold truncate " + (currnetIndexPlaylist === i ? " text-[color:var(--color-primary)]" : " text-[color:var(--color-text)]")}
                  onClick={() => {
                    handleClickPlaySong(e.streamingStatus, e.encodeId, i)
                  }}
                >{e.title}</div>
                {/* Artist */}
                <div className={"mt-[2px] text-sm opacity-70 truncate " + (currnetIndexPlaylist === i ? " text-[color:var(--color-primary)]" : " text-[color:var(--color-text)]")}>
                  {
                    (e.artists || []).filter((element: any) => { return element !== undefined }).map((eArtist: {alias: string, name: string}, iArtist: number) => {
                      return (
                        <span key={iArtist}>
                          {
                            (iArtist > 0) ? (<span>, </span>) : ("")
                          }
                          <Link
                            className="hover:underline"
                            to={`/artist/${eArtist.alias}`}
                          >
                            {eArtist.name}
                          </Link>
                        </span>
                      )
                    })
                  }
                </div>
                {/* End Artist */}
              </div>
              {/* End Title & Artist */}

              {/* Show Song VIP */}
              <div className="text-yellow-500 font-medium mr-4">{(e.streamingStatus === 1 ? "" : "VIP")}</div>
              {/* End Show Song VIP */}

              {/* Show Time Deration */}
              <div className={"font-medium " + (currnetIndexPlaylist === i ? " text-[color:var(--color-primary)]" : " text-[color:var(--color-text)]")}>{formatTime(e.duration)}</div>
              {/* End Show Time Deration */}
            </div>
          )
        })
      }
    </div>
  )
}

export default TrackListDetailPlaylist