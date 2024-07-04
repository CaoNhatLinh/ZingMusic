import React from "react"
import IconArrowLeft from "../Icons/ArrowLeft"
import IconArrowRight from "../Icons/ArrowRight"
import { useNavigate } from "react-router-dom"

const NavButtons: React.FC = () => {
  // style button arrow
  const styleArrow = "p-2 m-1 hover:bg-[color:var(--color-secondary-bg-for-transparent)] rounded-md hover:duration-200"
  // next & prev navigat
  const navigate = useNavigate()

  return (
    <div className="flex">
      <button
        className={styleArrow}
        onClick={() => {navigate(-1)}}
      >
          <IconArrowLeft setColor="white" setWidth="24" setHeight="24"/>
      </button>
      <button
        className={styleArrow}
        onClick={() => {navigate(+1)}}
      >
        <IconArrowRight setColor="white" setWidth="24px" setHeight="24px"/>
      </button>
    </div>
  )
}

export default NavButtons
