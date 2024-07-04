import React from "react"
import { SvgProps } from "../../utils/types"

const Loading3Dot: React.FC<SvgProps> = ({ setColor, setWidth, setHeight, ...orthers }) => {
  return (
    <svg
      width={setWidth}
      height={setHeight}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill={setColor}
      >
        <circle cx="4" cy="12" r="3"><animate id="a" begin="0;b.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="12" cy="12" r="3"><animate begin="a.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle><circle cx="20" cy="12" r="3"><animate id="b" begin="a.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33"/></circle>
    </svg>
  )
}

export default Loading3Dot
