import React, { useState } from "react"
import { Link } from "react-router-dom"

interface coverProps {
  title: string
  sortDescription?: string
  thumbnail: string
  link: string
}

const Cover: React.FC<coverProps> = ({ title, sortDescription, thumbnail, link }) => {

  const [isCoverHover, setCoverHover] = useState(false)

  return (
    <div>
      <div className="relative">
        {/* Thumbnail */}
        <Link to={link}>
          <img
            className="rounded-xl w-[100%] cursor-pointer"
            src={thumbnail}
            alt={title}
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
            backgroundImage: `url(${thumbnail})`
          }}>
        </div>
        {/* End Image Blur */}
      </div>
      <div className="mt-2">
        {/* Title */}
        <div className="text-base font-semibold text-[color:var(--color-text)] truncate hover:underline">
          <Link to={link}>
            {title}
          </Link>
        </div>
        {/* End Title */}

        {/* Sort Description */}
        <div
          className="text-xs text-[color:var(--color-text)] opacity-60"
          style={{
            maxWidth: "100%",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span>{sortDescription}</span>
        </div>
        {/* End Sort Description */}
      </div>
    </div>
  )
}

export default Cover
