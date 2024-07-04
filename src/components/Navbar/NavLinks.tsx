import React from "react"
import { NavLink } from "react-router-dom"

interface navLinksProps {
  toLink?: string
  titleLink: string
}

const NavLinks: React.FC<navLinksProps> = ({ toLink, titleLink })=> {
  return (
    <NavLink
      to={toLink || ""}
      className="text-[color:var(--color-text)] text-lg font-bold py-1.5 px-2.5 mx-3 hover:bg-[color:var(--color-secondary-bg-for-transparent)] rounded-md uppercase hover:duration-200"
      style={({ isActive }) => isActive ? {color:"var(--color-primary)"} : {} }
    >
      {titleLink}
    </NavLink>
  )
}

export default NavLinks
