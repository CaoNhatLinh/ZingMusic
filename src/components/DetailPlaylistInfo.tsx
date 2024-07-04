import React from "react"
import { Link } from "react-router-dom"
import IconPlay from "./Icons/Play"
import IconHeart from "./Icons/Heart"

interface detailPlaylistInfoProps {
  thumbnailM: string
  title: string
  artists: []
  total: string
  description: string
  like: number
  contentLastUpdate: number
}

const PlaylistInfo:React.FC<detailPlaylistInfoProps> = ({ thumbnailM, title, artists, total, description, like, contentLastUpdate }) => {

  const playlistLastUpdate =  (new Date(contentLastUpdate*1000)).toLocaleDateString("vi-VN")

  const styleButton = "flex justify-center items-center rounded-lg py-2 px-4 w-auto h-10 min-h-[40px] transition duration-300 hover:scale-105 mr-4"

  return (
    <div className="flex mb-[72px]">
      {/* Thumbnail */}
      <div className="relative min-w-[288px] min-h-[288px]">
        <img
          className="rounded-xl w-full h-full"
          src={thumbnailM}
          alt=""
        />
        {/* Image Blur */}
        <div
          className="absolute top-3 w-full h-full z-[-1] bg-cover rounded-xl blur-md scale-95"
          style={{
            backgroundImage: `url(${thumbnailM})`
          }}
        >
        </div>
        {/* End Image Blur */}
      </div>
      {/* End Thumbnail */}
      <div className="flex flex-col justify-center ml-14">
          {/* Title */}
          <div className="text-4xl font-bold text-[color:var(--color-text)]">{title}</div>
          {/* End Title */}

          {/* List Artists Playlist */}
          <div className="text-lg opacity-90 text-[color:var(--color-text)] mt-6">
            Playlist by
            <span> </span>
            {
              artists &&
              artists.map((e:{alias: string, name: string}, i:number) => {
                return (
                  <span key={i}>
                    {
                      (i > 0) ? (<span>, </span>) : ("")
                    }
                    <Link
                      className="hover:underline opacity-100 font-medium"
                      to={`/artist/${e.alias}`}
                    >
                      {e.name}
                    </Link>
                  </span>
                )
              })
            }
          </div>
          {/* End List Artists Playlist */}

          {/* Total Song */}
          <div className="flex items-center text-sm opacity-70 font-medium text-[color:var(--color-text)] mt-[2px]">
            <span className="mr-3">
              Updated at {playlistLastUpdate}
            </span>
            <span className="mr-3">
              {total} Songs
            </span>
            <span className="flex items-center">
              <IconHeart setColor="red" setWidth="16px" setHeight="16px" />
              {like}
            </span>
          </div>
          {/* End Total Song */}

          {/* Description */}
          <div
            className="text-sm opacity-70 font-medium text-[color:var(--color-text)] mt-6"
            style={{
              maxWidth: "100%",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}

          >
            {description}
          </div>
          {/* End Description */}
          {/* Button */}
          <div className="flex">
            {/* Play */}
            <div className="flex mt-8">
              <button className={`${styleButton} bg-[color:var(--color-primary-bg)] text-[color:var(--color-primary)]`}>
                <IconPlay setColor="var(--color-primary)" setWidth="16px" setHeight="16px" />
                <span className="ml-2 text-lg font-semibold">PLAY</span>
              </button>
            </div>
          </div>
          {/* End Button */}
      </div>
    </div>
  )
}

export default PlaylistInfo
