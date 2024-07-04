import React, { useState, useRef } from "react"
import { formatTime } from "../../utils/formatTime"

interface sliderProps {
  setWidth: string
  setHeight: string
  percentSlider: number
  getPercentSlider: Function
  toogleTooltip: boolean
  currentTimeSongTooltip?: number
}

const Slider: React.FC<sliderProps> = ({ setWidth, setHeight, percentSlider, getPercentSlider, toogleTooltip, currentTimeSongTooltip }) => {

  const sliderRef = useRef<HTMLDivElement>(null)

  // Active UI Dot Slider Hover
  const [isActiveSliderDotHover, setActiveSliderDotHover] = useState<boolean>(false)

  // Active UI Tooltip Dot Hover
  const [isActiveSliderTooltipHover, setActiveSliderTooltipHover] = useState<boolean>(false)

  // Handler Active Dot Slider Hover
  const handleActiveSliderDotHover = (handle: boolean) => {
    setActiveSliderDotHover(handle)
  }

  // Handler Active Tooltip Dot Hover
  const handleActiveSliderTooltipHover = (handle: boolean) => {
    setActiveSliderTooltipHover(handle)
  }

  return (
    // Slider Bar
    // w-full || w-[84px]
    <div
      className="my-[-6px] cursor-pointer"
      style={{
        width: `${setWidth}`
      }}
    >
      {/* Slider Bar Progress */}
      <div
        className="py-[6px] px-0"
        onMouseOver={() => handleActiveSliderDotHover(true)}
        onMouseOut={() => handleActiveSliderDotHover(false)}
        ref={sliderRef}
        onMouseDown={(e) => {
          // console.log("Mouse Down")

          /*
            |-------------------|------|----------------|------|
            ^                   ^      ^                ^
            |<--Bounding Left-->|      |                |
            |<-----------clientX------>|                |
            |<-------------Slider Offset Width--------->|
          */

          if(sliderRef.current) {

            let percentSliderWidth  = (
              (e.clientX - sliderRef.current.getBoundingClientRect().left)
                / sliderRef.current.offsetWidth
            ) * 100

            percentSliderWidth = percentSliderWidth < 0
              ? 0
              : percentSliderWidth > 100
              ? 100
              : percentSliderWidth

            getPercentSlider(percentSliderWidth)
          }

          const handleMouseMove = (e: MouseEvent) => {
            // console.log("Mouse Move")
            if(sliderRef.current) {
              let percentSliderWidth  = (
                  (e.clientX - sliderRef.current.getBoundingClientRect().left)
                    / sliderRef.current.offsetWidth
              ) * 100

              percentSliderWidth = percentSliderWidth < 0
                ? 0
                : percentSliderWidth > 100
                ? 100
                : percentSliderWidth

              getPercentSlider(percentSliderWidth)
            }
          }

          // Add Event Mouse Move
          window.addEventListener("mousemove", handleMouseMove)

          // Add Event Mouse Up
          window.addEventListener(
            "mouseup",
            () => {
            // Remove Event Mouse Move
              window.removeEventListener("mousemove", handleMouseMove)
            }
          )
        }}
      >
        {/* Slider Bar Rail */}
        <div
          className="relative w-full transition-[width,left] duration-300 bg-[hsla(0,0%,50.2%,.18)] rounded-[15px]"
          style={{
            height: `${setHeight}`
          }}
        >
          {/* React Slider Progress
            * Change Slider Progress -> width: 23%
          */}
          <div
            className="top-0 left-[0%] absolute z-[1] bg-[#335eea] rounded-[15px]"
            style={{
              width: `${percentSlider}%`,
              height: `${setHeight}`
            }}
          ></div>
          {/* End React Slider Process  */}

          {/* React Slider Dot
            * Change Slider Dot -> left: 23%
          */}
          <div
            className="absolute z-[5] w-3 h-3 top-[50%] translate-x-[-50%] translate-y-[-50%] transition-[left]"
            style={{
              left: `${percentSlider}%`
            }}
          >
            {/* Dot Handle */}
            <div
              className={"cursor-pointer w-full h-full rounded-full bg-[#fff] box-border " +
                (isActiveSliderDotHover ? "visible": "invisible")
              }
              onMouseOver={() => handleActiveSliderTooltipHover(true)}
              onMouseOut={() => handleActiveSliderTooltipHover(false)}
            >
            </div>
            {/* End Dot Handle */}
            {
              // Dot Tooltip
              toogleTooltip &&
              <div className={"top-[-10px] left-1/2 -translate-x-1/2 -translate-y-full absolute " +(isActiveSliderTooltipHover ? "visible" : "invisible")}>
                <div className="text-sm font-medium whitespace-nowrap px-[6px] py-[2px] min-w-[20px] text-center text-[#000] rounded-[5px] bg-[#fff] box-content">
                  <span>{formatTime(currentTimeSongTooltip || 0)}</span>
                </div>
              </div>
              // End Dot Tooltip
            }
          </div>
          {/* End React Slider Dot */}
        </div>
        {/* End Slider Bar Rail */}
      </div>
      {/* End Slider Bar Progress */}
    </div>
    // End Slider Bar
  )
}

export default Slider
