import React from 'react'
import {assets} from '../../assets/assets.js'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
    <div className="app-download-left">
      <img src={assets.donut} alt=""></img>
    </div>
      <div className="app-download-right">
        <p>For Better Experience Download <br/> <span>Baking-Studio.</span> on</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt=""/>
            <img src={assets.app_store} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default AppDownload