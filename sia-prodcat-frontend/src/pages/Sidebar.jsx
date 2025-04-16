import React from 'react'
import "./Sidebar.css";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

function Sidebar() {
  return (
    <div className="sidebar-main">
      <div className="sidebar">
        <ul>
            <li><a href="Home"><HomeRoundedIcon/></a></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
