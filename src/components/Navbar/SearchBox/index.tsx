import React, { useState } from "react"
import IconSearch from "../../Icons/Search"
import { useNavigate } from "react-router-dom"

const SearchBox: React.FC = () => {

  const navigate = useNavigate()

  const [ isActive, setActive ] = useState<boolean>(false)
  const [ keyword, setKeyword ] = useState<string>()

  const handleSubmitForm = (e:any) => {
    e.preventDefault()
    navigate(`/search/${e.target[0].value}`)
  }

  return (
    <div
      className={`search_box flex items-center w-52 h-8 rounded-lg
          ${
            ( isActive === false
              ? "bg-[color:var(--color-secondary-bg-for-transparent)]"
              : "bg-[color:var(--color-primary-bg-for-transparent)]"
            )
          }
        `
      }
    >
      {/* Icon Search */}
      <div
        className={`icon_search ml-2 mr-1
            ${(isActive === false ? "opacity-25" : "")}
          `
        }
      >
        <IconSearch setColor="var(--color-text)" setWidth="15px" setHeight="15px"/>
      </div>
      {/* Input */}
      <form
        method="GET"
        onSubmit={handleSubmitForm}
      >
        <input
          type="search"
          value={keyword}
          placeholder={ isActive === false ? "Search" : "" }
          className={ "input_search text-[16px] text-[color:var(--color-text)] border-none bg-transparent font-semibold outline-none w-10/12 " + (isActive === false ? "opacity-25" : "") }
          onFocus={ () => { setActive(!isActive) } }
          onBlur={ () => { setActive(!isActive) } }
          onChange={e => setKeyword(e.target.value)}
        >
        </input>
      </form>
    </div>
  )
}

export default SearchBox
