import React from "react"

interface detailArtistInfoProps {
  name: string
  thumbnailM: string
  sortBiography: string
  realname: string
  birthday: string
  totalFollow: number
}

const DetailArtistInfo:React.FC<detailArtistInfoProps> = ({ name, thumbnailM, sortBiography, realname, birthday, totalFollow }) => {
  return (
    <>
      <div className="flex mb-[72px]">
        {/* Thumbnail */}
        <div className="relative min-w-[248px] min-h-[248px]">
          <img
            className="rounded-full w-full h-full"
            src={thumbnailM}
            alt=""
          />
          {/* Image Blur */}
          <div
            className="absolute top-3 w-full h-full z-[-1] bg-cover rounded-full blur-md scale-95"
            style={{
              backgroundImage: `url(${thumbnailM})`
            }}
          >
          </div>
          {/* End Image Blur */}
        </div>
        {/* End Thumbnail */}

        <div className="flex flex-col justify-center ml-14">
          {/* Name */}
          <div className="text-4xl font-bold text-[color:var(--color-text)]">{name}</div>
          {/* End Name */}

          <div className="text-lg opacity-70 font-medium text-[color:var(--color-text)] mt-6">
            Real Name: {realname}
          </div>

          <div className="flex items-center text-sm opacity-70 font-medium text-[color:var(--color-text)] mt-[2px]">
            <span className="mr-3">
              Birthday: {birthday}
            </span>
            <span className="flex items-center">
              Total Follow: {totalFollow}
            </span>
          </div>

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
            {sortBiography}
          </div>
          {/* End Description */}
        </div>
      </div>

    </>
  )
}

export default DetailArtistInfo