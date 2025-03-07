import React,{ useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Profile from './components/Profile';

const LeftSection = ({ }) => {
  const lang = {}
  function btnFilterOnClick(event) {
    console.log("Filter and Sort Button Clicked");
    if (UiCustomSortAndFilterButton == true) {
        if (typeof web_hook_sort_and_filter !== 'undefined') {
            web_hook_sort_and_filter(event);
        }
    } else {
        ShowSortAnfFilter();
    }
};
  return (
    <React.Fragment>
      <div id='leftContent' style={{float: 'left', height:'100%', width:'320'}}>
        <table id="leftContentTable" className="leftContentTable" style={{ height:'100%', width:'100%'}} cellspacing='0'
          cellpadding='0'>
          <tr>
            <td className="streamSection" style="height: 50px; box-sizing: border-box;">
              <div className="profileContainer">
                <div className="contact" id="UserProfile" style="cursor: default; margin-bottom:5px;">
                  <span id='TxtVoiceMessages' className="voiceMessageNotifyer">
                    0
                  </span>
                  <div id="UserProfilePic" className="buddyIcon">
                  </div>
                  <span className='settingsMenu'>
                    <button className='roundButtons' id='BtnFreeDial'>
                      <i className="fa fa-phone"></i>
                    </button>
                    <button className='roundButtons' id='BtnAddSomeone'>
                      <i className="fa fa-user-plus"></i>
                    </button>

                    <button className='roundButtons' id='SettingsMenu'>
                      <i className="fa fa-cogs"></i>
                    </button>
                  </span>

                  <div className='contactNameText' style="margin-right: 0px;">
                    <span id='dereglink' className='dotOnline' style="display:none"></span>
                    <span id='WebRtcFailed' className='dotFailed' style="display:none"></span>
                    <span id='reglink' className='dotOffline'></span>
                    <span id='UserCallID'></span>
                  </div>
                  <div className='presenceText'>
                    <span id='regStatus'>&nbsp;</span>
                    <span id='dndStatus'></span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr id='searchArea'>
            <td className='streamSection'
              style="height: 35px; box-sizing: border-box; padding-top: 3px; padding-bottom: 0px;">
              <span id='divFindBuddy' className='searchClean'>
                <input id='txtFindBuddy' type='text' autocomplete='none'
                  style="width: calc(100% - 78px);" />
                  </span>
              <button type="button" className='roundButtons' id='BtnFilter'
                style="margin-left:5px" title={lang?.filter_and_sort}
                onclick="btnFilterOnClick()">
                <i className="fa fa-sliders"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td className='streamSection'>
              <div id='myContacts' className="contactArea cleanScroller">
              </div>
              <div id='actionArea' style="display:none" className="contactArea cleanScroller">
                <Profile />
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div id="rightContent" className="rightContent" style="margin-left: 320px; height: 100%" />
    </React.Fragment>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LeftSection />
    </>
  )
}

export default App
