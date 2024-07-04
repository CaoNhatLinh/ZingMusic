import React, { useState } from "react"
import { Link } from "react-router-dom"

interface infoMV {
  encodeId: string
  title: string
  thumbnail: string
  artists: []
}

const ListMV: React.FC<infoMV> = ({encodeId, title, thumbnail, artists}) => {

  const [isCoverHover, setCoverHover] = useState(false)

  return (
    <div>
      <div className="relative">
        {/* Thumbnail */}
        <Link to={`/mv/${encodeId}`}>
          <img
            className="rounded-xl w-[100%] cursor-pointer"
            src={thumbnail}
            alt=""
            onMouseOver = {() => {
              setCoverHover(true)
            }}
            onMouseOut = {() => {
              setCoverHover(false)
            }}
          />
        </Link>
        {/* End Thumbnail */}

        {/* Image Blur */}
        <div
          className={`absolute top-3 w-full h-full z-[-1] bg-cover rounded-xl blur-lg scale-95 transition-opacity duration-300
            ${(isCoverHover === false ? "opacity-0" : "opacity-100")}
          `}
          style={{
            backgroundImage: `url("https://photo-resize-zmp3.zmdcdn.me/w600_r300x169_jpeg/thumb_video/d/6/e/6/d6e6201323fed8fb16886a3f428fc4f7.jpg")`
          }}>
        </div>
        {/* End Image Blur */}
      </div>
      <div className="mt-2">
        {/* Title */}
        <div className="text-base font-semibold text-[color:var(--color-text)] truncate hover:underline">
          <Link to={`/mv/${encodeId}`}>
            {title}
          </Link>
        </div>
        {/* End Title */}

        {/* Artist */}
        <div className="text-sm opacity-60 text-[color:var(--color-text)]">
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
        {/* End Artist */}
      </div>
    </div>
  )
}

export default ListMV
