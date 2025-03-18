const InitUI = () => {

    return (

        <div id="Phone" className="pageContainer" style={{ maxWidth: UiMaxWidth + "px" }}>
            {/* // Left Section */}
            <div id="leftContent" className="leftContent" style={{ "float:left; height: 100%; width:320px"}}>

                <table id="leftContentTable" class="leftContentTable" style="height:100%; width:100%" cellspacing="0" cellpadding="0">
                    <tr><td class="streamSection" style="height: 50px; box-sizing: border-box;">


                        <div class="profileContainer">

                            <div class="contact" id="UserProfile" style="cursor: default; margin-bottom:5px;">

                                <span id="TxtVoiceMessages" class="voiceMessageNotifyer">0</span>
                                <div id="UserProfilePic" class="buddyIcon"></div>


                                <span class="settingsMenu">
                                    <button class="roundButtons" id="BtnFreeDial"><i class="fa fa-phone"></i></button>
                                    <button class="roundButtons" id="BtnAddSomeone"><i class="fa fa-user-plus"></i></button>
                                    {false}

                                    (<button id="BtnCreateGroup"><i class="fa fa-users"></i><i class="fa fa-plus" style="font-size:9px"></i></button>)

                                    <button class="roundButtons" id="SettingsMenu"><i class="fa fa-cogs"></i></button>
                                </span>


                                <div class="contactNameText" style="margin-right: 0px;">

                                    <span id="dereglink" class="dotOnline" style="display:none"></span>
                                    <span id="WebRtcFailed" class="dotFailed" style="display:none"></span>
                                    <span id="reglink" class="dotOffline"></span>

                                    <span id="UserCallID"></span>
                                </div>
                                <div class="presenceText"><span id="regStatus">&nbsp;</span> <span id="dndStatus"></span></div>";
                            </div>

                        </div>

                    </td></tr>
                    <tr id="searchArea"><td class="streamSection" style="height: 35px; box-sizing: border-box; padding-top: 3px; padding-bottom: 0px;">";


                        <span id="divFindBuddy" class="searchClean"><input id="txtFindBuddy" type="text" autocomplete="none" style="width: calc(100% - 78px);" /></span>
                        <button class="roundButtons" id="BtnFilter" style={{marginLeft:"5px"}} onClick={()=>{
                             if(UiCustomSortAndFilterButton == true){
                                if(typeof web_hook_sort_and_filter !== 'undefined') {
                                    web_hook_sort_and_filter(event);
                                }
                            } else {
                                ShowSortAnfFilter();
                            }
                        }}><i class="fa fa-sliders"></i></button>"

                    </td></tr>
                    <tr><td class="streamSection">

                        <div id="myContacts" class="contactArea cleanScroller"></div>"
                        <div id="actionArea" style="display:none" class="contactArea cleanScroller"></div>"

                    </td></tr>";
                </table>";

            </div>


            <div id="rightContent" className="rightContent" style={{ marginLeft: "320px", height: "100%" }}></div>

        </div>
    )
}