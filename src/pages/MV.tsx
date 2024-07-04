import React, { useEffect, useState } from "react"
import ListMV from "../components/ListMV"
import { getlistMV } from "../api/mv"
import Loading from "../components/Loading"
import InfiniteScroll from 'react-infinite-scroll-component'

const MV:React.FC = () => {

  const [dataListMV, setDataListMV] = useState<[]>()
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  useEffect(() => {
    (
      async () => {
        const data: {items: []} = await getlistMV("IWZ9Z08I", 1, 20)
        setDataListMV(data.items)
      }
    )()
  }, [])

  const fetchMoreDataListMV = () => {
    setPage(page + 1);
    (
      async () => {
        const data: {items: []} = await getlistMV("IWZ9Z08I", page + 1, 20)
        if(dataListMV) {
          if(data.items) {
            const customDataListMV:any = dataListMV.concat(data.items)
            setDataListMV(customDataListMV)
          } else {
            setHasMore(false)
            console.log("error loading mv items")
          }
        }
      }
    )()
  }

  return (
    <div className="pt-[65px] pb-[96px] px-[10vw]">
      {
        dataListMV
        ?
        <InfiniteScroll
          dataLength={dataListMV.length}
          next={fetchMoreDataListMV}
          hasMore={hasMore}
          loader={<Loading />}
        >
          <div className="grid grid-cols-5 gap-x-6 gap-y-10">
            {
              dataListMV.map((e: {encodeId: string, title: string, thumbnail: string, artists: []}, i) => {
                return (
                  <ListMV key={i} encodeId={e.encodeId} title={e.title} thumbnail={e.thumbnail} artists={e.artists} />
                )
              })
            }
          </div>
        </InfiniteScroll>
        :
        <Loading />
      }
    </div>
  )
}

export default MV
