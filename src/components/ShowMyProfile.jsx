
import React, { useState } from 'react';

// const ShowContacts = () => {
//     console.log("Show contacts");
// }



// const onChange = () => {
//     console.log("toggle heading");
// }

export const ShowMyProfile = () => {
    const [ConfigureExtension, setConfigureExtension] = useState(false);

    const ToggleHeading = (htmlText) => {

        if (htmlText == 'Configure_Extension_Html')
            setConfigureExtension(ConfigureExtension => !ConfigureExtension);
        console.log("toggle Configure_Extension_Html");
    }


    return (
        <div id="actionArea">
            <div style={{ textAlign: "right" }}><button className="roundButtons" onClick={() =>{
                console.log("toggle heading"); ShowContacts()}
        }><i className="fa fa-close"></i></button></div>

            <div border="0" className="UiSideField">

                {/* // SIP Account */}
                {/* {EnableAccountSettings == true ? ( */}
                    <div className="UiTextHeading" style={{ 
        padding: 20, 
        backgroundColor: 'lightblue', 
         zIndex: 999,
         //position: 'relative'
         }} onClick={(event) =>{
                        console.log("toggle heading");
                        ToggleHeading('Configure_Extension_Html')}}><i className="fa fa-user-circle-o UiTextHeadingIcon" style={{ backgroundColor: "#a93a3a" }}></i> {lang.account}</div>
                {/* // ) : ""} */}
                <div id="Configure_Extension_Html" 
                style={{ display: ConfigureExtension ? "unset" : "none" }}
                >
                    <div className="UiText">{lang.asterisk_server_address}:</div>
                    <div><input id="Configure_Account_wssServer" className="UiInputText" onChange={() => onChange()} type="text" placeholder={lang.eg_asterisk_server_address} value={getDbItem("wssServer", "")} /></div>

                    <div className="UiText">{lang.websocket_port}</div>
                    <div><input id="Configure_Account_WebSocketPort" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_websocket_port +"' value={getDbItem("WebSocketPort", "")} /></div>

                    <div className="UiText">{lang.websocket_path}:</div>
                    <div><input id="Configure_Account_ServerPath" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_websocket_path +"' value={getDbItem("ServerPath", "")} /></div>

                    <div className="UiText">{lang.full_name}:</div>
                    <div><input id="Configure_Account_profileName" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_full_name +"' value={getDbItem("profileName", "")} /></div>

                    <div className="UiText">{lang.sip_domain}:</div>
                    <div><input id="Configure_Account_SipDomain" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_sip_domain +"' value={getDbItem("SipDomain", "")} /></div>

                    <div className="UiText">{lang.sip_username}:</div>
                    <div><input id="Configure_Account_SipUsername" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_sip_username +"' value={getDbItem("SipUsername", "")} /></div>

                    <div className="UiText">{lang.sip_password}:</div>
                    <div><input id="Configure_Account_SipPassword" className="UiInputText" onChange={() => onChange()} type="password" placeholder='"+ lang.eg_sip_password +"' value={getDbItem("SipPassword", "")} /></div>

                    <div className="UiText">{lang.subscribe_voicemail}:</div>
                    <div><input type="checkbox" id="Configure_Account_Voicemail_Subscribe" checked={VoiceMailSubscribe == true} onChange={() => onChange()} /><label htmlFor="Configure_Account_Voicemail_Subscribe">{lang.yes}</label></div>

                    <div id="Voicemail_Did_row" style={{ display: VoiceMailSubscribe == true ? "unset" : "none" }}>
                        <div className="UiText" style={{ marginLeft: "20px" }}>{lang.voicemail_did}:</div>
                        <div style={{ marginLeft: "20px" }}><input id="Configure_Account_Voicemail_Did" className="UiInputText" onChange={() => onChange()} type="text" placeholder={lang.eg_internal_subscribe_extension} value={getDbItem(VoicemailDid, "")} /></div>
                    </div>

                    <div className="UiText">{lang.chat_engine}:</div>

                    <ul style={{ listStyleType: "none" }}>
                        <li><input type="radio" name="chatEngine" onChange={() => onChange()} id="chat_type_sip" checked={ChatEngine == "XMPP"} /><label htmlFor="chat_type_sip">SIP</label></li>
                        <li><input type="radio" name="chatEngine" onChange={() => onChange()} id="chat_type_xmpp" checked={ChatEngine == "XMPP"} /><label htmlFor="chat_type_xmpp">XMPP</label></li>
                    </ul>

                    <div id="RowChatEngine_xmpp" style={{ display: (ChatEngine == "XMPP") ? "unset" : "none" }}>

                        <div className="UiText">{lang.xmpp_server_address}:</div>
                        <div><input id="Configure_Account_xmpp_address" className="UiInputText" onChange={() => onChange()} type="text" placeholder={lang.eg_xmpp_server_address} value={getDbItem("XmppServer", "")} /></div>

                        <div className="UiText">XMPP {lang.websocket_port}:</div>
                        <div><input id="Configure_Account_xmpp_port" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_websocket_port +"' value='"+ getDbItem("XmppWebsocketPort", "") +"' /></div>

                        <div className="UiText">XMPP {lang.websocket_path}:</div>
                        <div><input id="Configure_Account_xmpp_path" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_websocket_path +"' value='"+ getDbItem("XmppWebsocketPath", "") +"' /></div>

                        <div className="UiText">XMPP {lang.sip_domain}:</div>
                        <div><input id="Configure_Account_xmpp_domain" className="UiInputText" onChange={() => onChange()} type="text" placeholder='"+ lang.eg_sip_domain +"' value='"+ getDbItem("XmppDomain", "") +"' /></div>

                        <div className="UiText">{lang.extension_number}:</div>
                        <div><input id="Configure_Account_profileUser" className="UiInputText" onChange={() => onChange()} type="text" placeholder={lang.eg_internal_subscribe_extension} value={getDbItem("profileUser", "")} /></div>
                    </div>

                </div>
                {/* if (EnableAccountSettings == true) html += AccountHtml; */}

                {/* // 2 Audio & Video */}
                <div className="UiTextHeading" onClick={() => ToggleHeading('Audio_Video_Html')}><i className="fa fa fa-video-camera UiTextHeadingIcon" style={{ backgroundColor: "#208e3c" }}></i> {lang.audio_video}</div>

                <div id="Audio_Video_Html" style={{ display: "none" }}>

                    <div className="UiText">{lang.speaker}:</div>
                    <div style={{ textAlign: "center" }}><select id="playbackSrc" style={{ width: "100%" }}></select></div>
                    <div className="Settings_VolumeOutput_Container"><div id="Settings_SpeakerOutput" className="Settings_VolumeOutput"></div></div>
                    <div><button className="roundButtons" id="preview_output_play"><i className="fa fa-play"></i></button></div>

                    <div id="RingDeviceSection">
                        <div className="UiText">{lang.ring_device}:</div>
                        <div style={{ textAlign: "center" }}><select id="ringDevice" style={{ width: "100%" }}></select></div>
                        <div className="Settings_VolumeOutput_Container"><div id="Settings_RingerOutput" className="Settings_VolumeOutput"></div></div>
                        <div><button className="roundButtons" id="preview_ringer_play"><i className="fa fa-play"></i></button></div>
                    </div>

                    <div className="UiText">{lang.microphone}:</div>
                    <div style={{ textAlign: "center" }}><select id="microphoneSrc" style={{ width: "100%" }}></select></div>
                    <div className="Settings_VolumeOutput_Container"><div id="Settings_MicrophoneOutput" className="Settings_VolumeOutput"></div></div>
                    <div><input type="checkbox" id="Settings_AutoGainControl" onChange={() => onChange()} /><label htmlFor="Settings_AutoGainControl"> {lang.auto_gain_control}</label></div>
                    <div><input type="checkbox" id="Settings_EchoCancellation" onChange={() => onChange()} /><label htmlFor="Settings_EchoCancellation"> {lang.echo_cancellation}</label></div>
                    <div><input type="checkbox" id="Settings_NoiseSuppression" onChange={() => onChange()} /><label htmlFor="Settings_NoiseSuppression"> {lang.noise_suppression}</label></div>

                    {EnableVideoCalling} (
                    <div className="UiText">{lang.camera}:</div>
                    <div style={{ textAlign: "center" }}><select id="previewVideoSrc" style={{ width: "100%" }}></select></div>

                    <div className="UiText">{lang.frame_rate}:</div>
                    <div className="pill-nav">";
                        <input name="Settings_FrameRate" id="r40" type="radio" value="2" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r40">2</label>
                        <input name="Settings_FrameRate" id="r41" type="radio" value="5" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r41">5</label>
                        <input name="Settings_FrameRate" id="r42" type="radio" value="10" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r42">10</label>
                        <input name="Settings_FrameRate" id="r43" type="radio" value="15" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r43">15</label>
                        <input name="Settings_FrameRate" id="r44" type="radio" value="20" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r44">20</label>
                        <input name="Settings_FrameRate" id="r45" type="radio" value="25" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r45">25</label>
                        <input name="Settings_FrameRate" id="r46" type="radio" value="30" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r46">30</label>
                        <input name="Settings_FrameRate" id="r47" type="radio" value="" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r47"><i className="fa fa-trash"></i></label>
                    </div>

                    <div className="UiText">{lang.quality}:</div>
                    <div className="pill-nav">
                        <input name="Settings_Quality" id="r30" type="radio" value="160" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r30"><i className="fa fa-video-camera" style={{ transform: "scale(0.4)" }}></i> HQVGA</label>
                        <input name="Settings_Quality" id="r31" type="radio" value="240" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r31"><i className="fa fa-video-camera" style={{ transform: "scale(0.6)" }}></i> QVGA</label>
                        <input name="Settings_Quality" id="r32" type="radio" value="480" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r32"><i className="fa fa-video-camera" style={{ transform: "scale(0.8)" }}></i> VGA</label>
                        <input name="Settings_Quality" id="r33" type="radio" value="720" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r33"><i className="fa fa-video-camera" style={{ transform: "scale(1)" }}></i> HD</label>
                        <input name="Settings_Quality" id="r34" type="radio" value="" onChange={() => onChange()} /><label className="radio_pill" htmlFor="r34"><i className="fa fa-trash"></i></label>
                    </div>

                    <div className="UiText">{lang.image_orientation}:</div>
                    <div className="pill-nav">
                        <input name="Settings_Orientation" id="r20" onChange={() => onChange()} type="radio" value="rotateY(0deg)" /><label className="radio_pill" htmlFor="r20"><i className="fa fa-address-card" style={{ transform: "rotateY(0deg)" }}></i> {lang.image_orientation_normal}</label>
                        <input name="Settings_Orientation" id="r21" onChange={() => onChange()} type="radio" value="rotateY(180deg)" /><label className="radio_pill" htmlFor="r21"><i className="fa fa-address-card" style={{ transform: "rotateY(180deg)" }}></i> {lang.image_orientation_mirror}</label>
                    </div>

                    <div className="UiText">{lang.aspect_ratio}:</div>
                    <div className="pill-nav">
                        <input name="Settings_AspectRatio" id="r10" onChange={() => onChange()} type="radio" value="1" /><label className="radio_pill" htmlFor="r10"><i className="fa fa-square-o" style={{ transform: "scaleX(1)", marginLeft: "7px", marginRight: "7px" }}></i> 1:1</label>
                        <input name="Settings_AspectRatio" id="r11" onChange={() => onChange()} type="radio" value="1.33" /><label className="radio_pill" htmlFor="r11"><i className="fa fa-square-o" style={{ transform: "scaleX(1.33)", marginLeft: "5px", marginRight: "5px" }}></i> 4:3</label>
                        <input name="Settings_AspectRatio" id="r12" onChange={() => onChange()} type="radio" value="1.77" /><label className="radio_pill" htmlFor="r12"><i className="fa fa-square-o" style={{ transform: "scaleX(1.77)", marginRight: "3px" }}></i> 16:9</label>
                        <input name="Settings_AspectRatio" id="r13" onChange={() => onChange()} type="radio" value="" /><label className="radio_pill" htmlFor="r13"><i className="fa fa-trash"></i></label>
                    </div>

                    <div className="UiText">{lang.preview}:</div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}><video id="local-video-preview" className="previewVideo" muted playsInline></video></div>
                    )

                </div>



                {/* // 3 Appearance */}
                {/* {EnableAppearanceSettings == true} */}
                <div className="UiTextHeading" onClick={() => ToggleHeading('Appearance_Html')}><i className="fa fa-pencil UiTextHeadingIcon" style={{ backgroundColor: "#416493" }}></i> {lang.appearance}</div>


                <div id="Appearance_Html" style={{ display: "none" }}>
                    <div id="ImageCanvas" style={{ width: "150px", height: "150px" }}></div>
                    <div style={{ marginTop: "50px" }}><input id="fileUploader" onChange={() => onChange()} type="file" /></div>
                    <div style={{ marginTop: "10px" }}></div>

                    {/* // SIP & XMPP vCard */}

                    {getDbItem("profileVcard", null) != null ? profileVcard = JSON.parse(getDbItem("profileVcard", null)) : ""}

                    <div className="UiText">{lang.title_description}:</div>
                    <div><input id="Configure_Profile_TitleDesc" onChange={() => onChange()} className="UiInputText" type="text" placeholder={lang.eg_general_manager} value='"+ ((profileVcard != null)? profileVcard.TitleDesc : "") +"' /></div>
                    <div className="UiText">{lang.mobile_number}:</div>
                    <div><input id="Configure_Profile_Mobile" onChange={() => onChange()} className="UiInputText" type="text" placeholder={lang.eg_mobile_number} value='"+ ((profileVcard != null)? profileVcard.Mobile : "") +"' /></div>
                    <div className="UiText">{lang.email}:</div>
                    <div><input id="Configure_Profile_Email" onChange={() => onChange()} className="UiInputText" type="text" placeholder={lang.email} value='"+ ((profileVcard != null)? profileVcard.Email : "") +"' /></div>
                    <div className="UiText">{lang.contact_number_1}:</div>";
                    <div><input id="Configure_Profile_Number1" onChange={() => onChange()} className="UiInputText" type="text" placeholder={lang.eg_contact_number_1} value='"+ ((profileVcard != null)? profileVcard.Number1 : "") +"' /></div>
                    <div className="UiText">{lang.contact_number_2}:</div>";
                    <div><input id="Configure_Profile_Number2" onChange={() => onChange()} className="UiInputText" type="text" placeholder={lang.eg_contact_number_2} value='"+ ((profileVcard != null)? profileVcard.Number2 : "") +"' /></div>

                </div>

                {/* if (EnableAppearanceSettings == true) html += AppearanceHtml; */}

                {/* // 4 Notifications */}
                {/* if (EnableNotificationSettings == true) { */}
                <div className="UiTextHeading" onClick={() => ToggleHeading('Notifications_Html')}><i className="fa fa-bell UiTextHeadingIcon" style={{ backgroundColor: "#ab8e04" }}></i> {lang.notifications}</div>
                {/* } */}

                <div id="Notifications_Html" style={{ display: "none" }}>
                    <div className="UiText">{lang.notifications}:</div>
                    <div><input type="checkbox" onChange={() => onChange()} id="Settings_Notifications" /><label htmlFor="Settings_Notifications"> {lang.enable_onscreen_notifications}</label></div>
                </div>
                {/* // TODO: Add ring tone selection etc */}

                {/* if (EnableNotificationSettings == true) html += NotificationsHtml; */}

            </div>

            <div className="UiWindowButtonBar" id="ButtonBar"></div>
        </div>

    )
}

// export const ShowMyProfile = () => {
//     const [ConfigureExtension, setConfigureExtension] = useState(false);

//         const ToggleHeading = (htmlText) => {

//         if (htmlText == 'Configure_Extension_Html')
//             setConfigureExtension(ConfigureExtension => !ConfigureExtension);
//         console.log("toggle Configure_Extension_Html");
//     }
//     return (
//       <div className="UiTextHeading"
//        style={{ 
//         padding: 20, 
//         // backgroundColor: 'lightblue', 
//         // zIndex: 999,
//          position: 'relative'
//          }}
//        >
//         <button onClick={() => {
//             console.log('MyProfile button clicked')

// ToggleHeading('Configure_Extension_Html');
//         }}><i className="fa fa-user-circle-o UiTextHeadingIcon" style={{ backgroundColor: "#a93a3a" }}></i>{lang.account}</button>
//       </div>
//     )


//   }

  /* <div className="UiTextHeading" onClick={(event) =>{
                            console.log("toggle heading");
                            ToggleHeading('Configure_Extension_Html')}}><i className="fa fa-user-circle-o UiTextHeadingIcon" style={{ backgroundColor: "#a93a3a" }}></i> {lang.account}</div>
                     */

      
                    