import React from "react"
import { SvgProps } from "../../utils/types"

const ArrowRight: React.FC<SvgProps> = ({ setColor, setWidth, setHeight, ...orthers }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 512"
      fill="none"
      width={ setWidth }
      height={ setHeight }
      { ...orthers }
    >
      <path
        d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
        fill={ setColor }
      />
    </svg>
  )
}

export default ArrowRight
