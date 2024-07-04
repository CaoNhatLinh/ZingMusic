import React, { useRef } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/redux"
import { setOpenLyric } from "../../redux/features/audioSlice"
import IconArrowDown from "../../components/Icons/ArrowDow"
import useLyric from "../../hooks/lyric"

const Lyric:React.FC<{auRef: HTMLAudioElement | null}> = ({auRef}) => {

  const isLyric = useAppSelector((state) => state.audio.isLyric)
  const songId = useAppSelector((state) => state.audio.songId)
  const currentTime = useAppSelector((state) => state.audio.currentTime)

  const dispatch = useAppDispatch()

  const lyrRef = useRef<HTMLDivElement>(null)

  const handleCloseLyric = () => {
    if(isLyric) {
      if(lyrRef.current) {
        lyrRef.current.classList.remove("animate-[lyric-up_1s]")
        lyrRef.current.classList.add("animate-[lyric-down_1s]")
      }
      setTimeout(() => {
        dispatch(setOpenLyric(false))
      }, 1000)
    } else {
      dispatch(setOpenLyric(true))
    }
  }

  const lyric = useLyric(songId)

  return (
    <>
      <div
        className={ "fixed inset-0 z-[200] bg-[color:var(--color-body-bg)] transition-all ease-linear duration-300 " + ( isLyric ? "animate-[lyric-up_1s]" : "hidden" )}
        ref={lyrRef}
      >
        {/* Close Button */}
        <button
          className="p-2 mx-3 my-3 bg-transparent rounded-[25%] transition-all duration-200 hover:bg-[color:var(--color-secondary-bg-for-transparent)] fixed top-6 right-6"
          title="Close"
          onClick={ handleCloseLyric }
        >
          <IconArrowDown setColor="white" setWidth="24px" setHeight="24px" />
        </button>
        {/* End Close Button */}

        {/* Lyric */}
        <div className="font-semibold text-[28px] text-[color:var(--color-text)] max-w-2xl mx-auto my-0 h-full flex flex-col overflow-y-auto overflow-x-hidden">

          <div className="mt-[50vh]"></div>
          {/* Line Lyric */}
          {
            lyric &&
            lyric.map((e:{data: string, startTime: number, endTime: number}, index: number) => {
              if(e.startTime <= currentTime*1000 && currentTime*1000 <= e.endTime) {
                document.getElementById(`line-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              return (
                <div
                  id={`line-${index}`}
                  key={index}
                  className={"my-[2px] mx-0 px-[18px] py-3 rounded-xl transition-all duration-500 hover:bg-[color:var(--color-secondary-bg-for-transparent)] box-border " + ( e.startTime <= currentTime*1000 && currentTime*1000 <= e.endTime ? "origin-[center_left] scale-105" : "" )}
                  onDoubleClick={() => {
                    if(auRef) {
                      auRef.currentTime = e.startTime/1000
                    }
                  }}
                  >
                  <span
                    className={"cursor-pointer inline-block " + ( e.startTime <= currentTime*1000 && currentTime*1000 <= e.endTime ? "opacity-100" : "opacity-30" )}
                  >
                    {e.data}
                  </span>
                </div>
              )
            })
          }
          {/* End Line Lyric*/}
        </div>
        {/* End Lyric */}
      </div>
    </>
  )
}

export default Lyric
