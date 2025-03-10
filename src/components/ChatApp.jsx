import { useEffect, useState } from "react";

import {ShowDial} from './ShowDial'
import {ShowMyProfile} from "./ShowMyProfile";

const ChatApp=()=>{

    const [showDial,setShowDial]=useState(false)


    function ApplyThemeColor() {
        //UiThemeStyle = light | dark | system (can change at any time)
        var cssUrl = hostingPrefix + "phone.light.css";
        var cssUrl=`src/assets/phone.light.css`;
        var wallpaperUrl = hostingPrefix + "" + imagesDirectory + "" + wallpaperLight;
        console.log("cssUrl: ",cssUrl)

        // Overall Theme
        // if (UiThemeStyle == "system") {
        //     if (window.matchMedia) {
        //         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //             cssUrl = hostingPrefix + "phone.dark.css";
        //             wallpaperUrl = hostingPrefix + "" + imagesDirectory + "" + wallpaperDark;
        //         } else {
        //             cssUrl = hostingPrefix + "phone.light.css";
        //             wallpaperUrl = hostingPrefix + "" + imagesDirectory + "" + wallpaperLight;
        //         }
        //     } else {
        //         cssUrl = hostingPrefix + "phone.dark.css";
        //     }
        // } else if (UiThemeStyle == "light") {
        //     cssUrl = hostingPrefix + "phone.light.css";
        //     wallpaperUrl = hostingPrefix + "" + imagesDirectory + "" + wallpaperLight;
        // } else if (UiThemeStyle == "dark") {
        //     cssUrl = hostingPrefix + "phone.dark.css";
        //     wallpaperUrl = hostingPrefix + "" + imagesDirectory + "" + wallpaperDark;
        // } else {
        //     // Defaults to light
        //     cssUrl = hostingPrefix + "phone.light.css";
        //     wallpaperUrl = hostingPrefix + "" + imagesDirectory + "" + wallpaperLight;
        // }
        if ($("#colorSchemeMode").length) {
            // Style Sheet Added
        } else {
            $("head").append('<link rel="stylesheet" id="colorSchemeMode" />');
        }
        $("#colorSchemeMode").attr("href", cssUrl);

        // Wallpaper
        if ($("#colorSchemeModeSheet").length) {
            $("#colorSchemeModeSheet").empty();
        } else {
            $("head").append("<style id='colorSchemeModeSheet'></style>");
        }
        var wallpaperStyle = ".wallpaperBackground { background-image:url('" + wallpaperUrl + "') }";
        $("#colorSchemeModeSheet").text(wallpaperStyle);
    }

    useEffect(()=>{
        ApplyThemeColor()
    })


    return(

        
    <div id="Phone" className="pageContainer" style={{maxWidth: UiMaxWidth + "px"}}>
        {/* // Left Section */}
        
        <div id="leftContent" className="leftContent" style={{float:"left", height: "100%", width:"320px"}}>
        {/* <div id="leftContent" className="leftContent" style={{float:"left", height: "100%", width:"1000px"}}> */}

        <table id="leftContentTable" className="leftContentTable" style={{height:"100%", width:"100%"}} cellSpacing="0" cellPadding="0">
            <tbody>
        <tr><td className="streamSection" style={{height: "50px", boxSizing: "border-box"}}>

        
        <div className="profileContainer">

        <div className="contact" id="UserProfile" style={{cursor: "default", marginBottom:"5px"}}>
        
        <span id="TxtVoiceMessages" className="voiceMessageNotifyer">0</span>
        <div id="UserProfilePic" className="buddyIcon"></div>


        <span className="settingsMenu">
        <button className="roundButtons" id="BtnFreeDial" onClick={(event)=> {
                if (DisableFreeDial == true) return;
    
                if (UiCustomDialButton == true) {
                    if (typeof web_hook_dial_out !== 'undefined') {
                        web_hook_dial_out(event);
                    }
                } else {
                    // ShowDial();
                    setShowDial(true)
                }
        }}><i className="fa fa-phone"></i></button>
        <button className="roundButtons" id="BtnAddSomeone"><i className="fa fa-user-plus"></i></button>
        
         
            <button id="BtnCreateGroup"><i className="fa fa-users"></i><i className="fa fa-plus" style={{fontSize:"9px"}}></i></button>
        
        
        <button className="roundButtons" id="SettingsMenu"><i className="fa fa-cogs"></i></button>
        </span>

        
        <div className="contactNameText" style={{marginRight: "0px"}}>
        
        <span id="dereglink" className="dotOnline" style={{display:"none"}}></span>
        <span id="WebRtcFailed" className="dotFailed" style={{display:"none"}}></span>
        <span id="reglink" className="dotOffline"></span>
        
         <span id="UserCallID"></span>
        </div>
        <div className="presenceText"><span id="regStatus">&nbsp;</span> <span id="dndStatus"></span></div>
        </div>

        </div>

        </td></tr>
        <tr id="searchArea"><td className="streamSection" style={{height: "35px", boxSizing: "border-box", paddingTop: "3px", paddingBottom: "0px"}}>

        
        <span id="divFindBuddy" className="searchClean"><input id="txtFindBuddy" type="text" autoComplete="none" style={{width: "calc(100% - 78px)"}}/></span>
        <button className="roundButtons" id="BtnFilter" style={{marginLeft:"5px"}}><i className="fa fa-sliders"></i></button>

        </td></tr>
        <tr><td className="streamSection">

        <div id="myContacts" className="contactArea cleanScroller"></div>
        {/* <div id="actionArea" style={{display:"none"}} className="contactArea cleanScroller"></div> */}
        {showDial?(<ShowDial/>):<ShowMyProfile/>}

        </td></tr>
        </tbody>
        </table>

        </div>
        

        <div id="rightContent" className="rightContent" style={{marginLeft: "320px", height: "100%"}}></div>

        </div>
        )
}

export default ChatApp;