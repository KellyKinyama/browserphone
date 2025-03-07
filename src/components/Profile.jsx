import React, { useEffect, useState } from 'react';
import { getDbItem } from '../utilities/functions';
import  lang  from '../utilities/lang';
const Profile = ({ }) => {
    const [enableAccountSettings, setEnableAccountSettings] = useState(false);
    const [voiceMailSubscribe, setVoiceMailSubscribe] = useState(false);
    const [chatEngine, setChatEngine] = useState("");
    const [enableVideoCalling, setEnableVideoCalling] = useState(false);
    const [enableAppearanceSettings, SetEnableAppearanceSettings] = useState(false);
    const [enableNotificationSettings, SetEnableNotificationSettings] = useState(false);
    const [profileVcard, setProfileVcard] = useState(false);

    useEffect(() => {
        setVoiceMailSubscribe((getDbItem("VoiceMailSubscribe", "1") == "1"));
        setChatEngine(getDbItem("ChatEngine", "XMPP"));
        setEnableVideoCalling((getDbItem("EnableVideoCalling", "1") == "1"));
        setEnableAccountSettings((getDbItem("EnableAccountSettings", "1") == "1"));

        // SIP & XMPP vCard
        var profileCard = getDbItem("profileVcard", null);
        if (profileCard != null) {
            setProfileVcard(JSON.parse(profileCard));
        }
    }, []);

    return (
        <div>
            <div style="text-align:right"><button className='roundButtons' onClick={ShowContacts}><i className="fa fa-close"></i></button></div>
            <div border='0' className='UiSideField'>
                {
                    enableAccountSettings && (
                        <React.Fragment>
                            <div className='UiTextHeading' onClick={() => ToggleHeading(this, 'Configure_Extension_Html')}>
                                <i className="fa fa-user-circle-o UiTextHeadingIcon" style="background-color:#a93a3a"></i>
                                {lang.account}
                            </div>
                            <div id='Configure_Extension_Html' style="display:none">
                                <div className='UiText'>{lang.asterisk_server_address}:</div>
                                <div>
                                    <input id='Configure_Account_wssServer' className='UiInputText' type='text' placeholder='{lang.eg_asterisk_server_address}' value='{getDbItem("wssServer", "")}' />
                                </div>
                                <div className='UiText'>{lang.websocket_port}:</div>";
                                <div>
                                    <input id='Configure_Account_WebSocketPort' className='UiInputText' type='text' placeholder='{lang.eg_websocket_port}' value='{getDbItem("WebSocketPort", "")}' />
                                </div>

                                <div className='UiText'>{lang.websocket_path}:</div>";
                                <div><input id='Configure_Account_ServerPath' className='UiInputText' type='text' placeholder='{lang.eg_websocket_path}' value='{getDbItem("ServerPath", "")}' /></div>

                                <div className='UiText'>{lang.full_name}:</div>";
                                <div><input id='Configure_Account_profileName' className='UiInputText' type='text' placeholder='{lang.eg_full_name}' value='{getDbItem("profileName", "")}' /></div>

                                <div className='UiText'>{lang.sip_domain}:</div>";
                                <div><input id='Configure_Account_SipDomain' className='UiInputText' type='text' placeholder='{lang.eg_sip_domain}' value='{getDbItem("SipDomain", "")}' /></div>

                                <div className='UiText'>{lang.sip_username}:</div>";
                                <div><input id='Configure_Account_SipUsername' className='UiInputText' type='text' placeholder='{lang.eg_sip_username}' value='{getDbItem("SipUsername", "")}' /></div>

                                <div className='UiText'>{lang.sip_password}:</div>";
                                <div><input id='Configure_Account_SipPassword' className='UiInputText' type='password' placeholder='{lang.eg_sip_password}' value='{getDbItem("SipPassword", "")}' /></div>

                                <div className='UiText'>{lang.subscribe_voicemail}:</div>";
                                <div><input type='checkbox' id='Configure_Account_Voicemail_Subscribe' checked={voiceMailSubscribe} />
                                    <label for='Configure_Account_Voicemail_Subscribe' >{lang.yes}</label></div>

                                <div id='Voicemail_Did_row' style={{ display: voiceMailSubscribe ? 'unset' : 'none' }}>
                                    <div className='UiText' style="margin-left:20px">{lang.voicemail_did}:</div>
                                    <div style="margin-left:20px">
                                        <input id='Configure_Account_Voicemail_Did'
                                            className='UiInputText' type='text'
                                            placeholder='{lang.eg_internal_subscribe_extension}'
                                            value='{getDbItem("VoicemailDid", "")}'
                                        /></div>
                                </div><div className='UiText'>${lang.chat_engine}:</div>

                                <ul style="list-style-type:none">
                                    <li>
                                        <input type='radio' name='chatEngine' id='chat_type_sip' checked={chatEngine == "XMPP"} />
                                        <label for='chat_type_sip'>SIP</label>
                                    </li>
                                    <li><input type='radio' name='chatEngine' id='chat_type_xmpp' checked={chatEngine == "XMPP"} />
                                        <label for='chat_type_xmpp'>XMPP</label>
                                    </li>
                                </ul>

                                <div id='RowChatEngine_xmpp' style={{ display: chatEngine == "XMPP" ? 'unset' : 'none' }}>

                                    <div className='UiText'>{lang.xmpp_server_address}:</div>
                                    <div><input id='Configure_Account_xmpp_address' className='UiInputText' type='text' placeholder={lang.eg_xmpp_server_address} value={getDbItem("XmppServer", "")} /></div>

                                    <div className='UiText'>XMPP ${lang.websocket_port}:</div>
                                    <div><input id='Configure_Account_xmpp_port' className='UiInputText' type='text' placeholder={lang.eg_websocket_port} value={getDbItem("XmppWebsocketPort", "")} /></div>

                                    <div className='UiText'>XMPP ${lang.websocket_path}:</div>
                                    <div><input id='Configure_Account_xmpp_path' className='UiInputText' type='text' placeholder={lang.eg_websocket_path} value={getDbItem("XmppWebsocketPath", "")} /></div>

                                    <div className='UiText'>XMPP {lang.sip_domain}:</div>
                                    <div><input id='Configure_Account_xmpp_domain' className='UiInputText' type='text' placeholder={lang.eg_sip_domain} value={getDbItem("XmppDomain", "")} /></div>

                                    <div className='UiText'>{lang.extension_number}:</div>
                                    <div>
                                        <input id='Configure_Account_profileUser' className='UiInputText' type='text' placeholder={lang.eg_internal_subscribe_extension} value={getDbItem("profileUser", "")} />
                                    </div>
                                </div>
                            </div>`
                        </React.Fragment>
                    )
                }
                <div className='UiTextHeading' onClick={() => { ToggleHeading(this, 'Audio_Video_Html') }}>
                    <i className="fa fa fa-video-camera UiTextHeadingIcon" style="background-color:#208e3c"></i> {lang.audio_video}</div>

                <div id='Audio_Video_Html' style="display:none">
                    <div className='UiText'>{lang.speaker}:</div>
                    <div style="text-align:center"><select id='playbackSrc' style="width:100%"></select></div>
                    <div className='Settings_VolumeOutput_Container'><div id='Settings_SpeakerOutput' className='Settings_VolumeOutput'></div></div>
                    <div><button className='roundButtons' id='preview_output_play'><i className="fa fa-play"></i></button></div>

                    <div id='RingDeviceSection'>
                        <div className='UiText'>${lang.ring_device}:</div>
                        <div style="text-align:center"><select id='ringDevice' style="width:100%"></select></div>
                        <div className='Settings_VolumeOutput_Container'><div id='Settings_RingerOutput' className='Settings_VolumeOutput'></div></div>
                        <div><button className='roundButtons' id='preview_ringer_play'><i className="fa fa-play"></i></button></div>
                    </div>
                    <div className='UiText'>{lang.microphone}:</div>
                    <div style="text-align:center"><select id='microphoneSrc' style="width:100%"></select></div>
                    <div className='Settings_VolumeOutput_Container'><div id='Settings_MicrophoneOutput' className='Settings_VolumeOutput'></div></div>
                    <div>
                        <input type='checkbox' id='Settings_AutoGainControl' />
                        <label for='Settings_AutoGainControl'>{lang.auto_gain_control}</label>

                    </div>
                    <div><input type='checkbox' id='Settings_EchoCancellation' />
                        <label for='Settings_EchoCancellation'> ${lang.echo_cancellation}</label></div>
                    <div><input type='checkbox' id='Settings_NoiseSuppression' />
                        <label for='Settings_NoiseSuppression'> ${lang.noise_suppression}</label></div>`

                    {enableVideoCalling && (
                        <React.Fragment>
                            <div className="UiText">${lang.camera}:</div>
                            <div style="text-align:center">
                                <select id="previewVideoSrc" style="width:100%"></select>
                            </div>

                            <div className="UiText">${lang.frame_rate}:</div>
                            <div className="pill-nav">
                                <input name="Settings_FrameRate" id="r40" type="radio" value="2" />
                                <label className="radio_pill" for="r40">2</label>

                                <input name="Settings_FrameRate" id="r41" type="radio" value="5" />
                                <label className="radio_pill" for="r41">5</label>

                                <input name="Settings_FrameRate" id="r42" type="radio" value="10" />
                                <label className="radio_pill" for="r42">10</label>

                                <input name="Settings_FrameRate" id="r43" type="radio" value="15" />
                                <label className="radio_pill" for="r43">15</label>

                                <input name="Settings_FrameRate" id="r44" type="radio" value="20" />
                                <label className="radio_pill" for="r44">20</label>

                                <input name="Settings_FrameRate" id="r45" type="radio" value="25" />
                                <label className="radio_pill" for="r45">25</label>

                                <input name="Settings_FrameRate" id="r46" type="radio" value="30" />
                                <label className="radio_pill" for="r46">30</label>

                                <input name="Settings_FrameRate" id="r47" type="radio" value="" />
                                <label className="radio_pill" for="r47"><i className="fa fa-trash"></i></label>
                            </div>

                            <div className="UiText">${lang.quality}:</div>
                            <div className="pill-nav">
                                <input name="Settings_Quality" id="r30" type="radio" value="160" />
                                <label className="radio_pill" for="r30">
                                    <i className="fa fa-video-camera" style="transform: scale(0.4)"></i> HQVGA
                                </label>

                                <input name="Settings_Quality" id="r31" type="radio" value="240" />
                                <label className="radio_pill" for="r31">
                                    <i className="fa fa-video-camera" style="transform: scale(0.6)"></i> QVGA
                                </label>

                                <input name="Settings_Quality" id="r32" type="radio" value="480" />
                                <label className="radio_pill" for="r32">
                                    <i className="fa fa-video-camera" style="transform: scale(0.8)"></i> VGA
                                </label>

                                <input name="Settings_Quality" id="r33" type="radio" value="720" />
                                <label className="radio_pill" for="r33">
                                    <i className="fa fa-video-camera" style="transform: scale(1)"></i> HD
                                </label>

                                <input name="Settings_Quality" id="r34" type="radio" value="" />
                                <label className="radio_pill" for="r34"><i className="fa fa-trash"></i></label>
                            </div>

                            <div className="UiText">${lang.image_orientation}:</div>
                            <div className="pill-nav">
                                <input name="Settings_Orientation" id="r20" type="radio" value="rotateY(0deg)" />
                                <label className="radio_pill" for="r20">
                                    <i className="fa fa-address-card" style="transform: rotateY(0deg)"></i> {lang.image_orientation_normal}
                                </label>

                                <input name="Settings_Orientation" id="r21" type="radio" value="rotateY(180deg)" />
                                <label className="radio_pill" for="r21">
                                    <i className="fa fa-address-card" style="transform: rotateY(180deg)"></i> {lang.image_orientation_mirror}
                                </label>
                            </div>

                            <div className="UiText">${lang.aspect_ratio}:</div>
                            <div className="pill-nav">
                                <input name="Settings_AspectRatio" id="r10" type="radio" value="1" />
                                <label className="radio_pill" for="r10">
                                    <i className="fa fa-square-o" style="transform: scaleX(1); margin-left: 7px; margin-right: 7px"></i> 1:1
                                </label>

                                <input name="Settings_AspectRatio" id="r11" type="radio" value="1.33" />
                                <label className="radio_pill" for="r11">
                                    <i className="fa fa-square-o" style="transform: scaleX(1.33); margin-left: 5px; margin-right: 5px;"></i> 4:3
                                </label>

                                <input name="Settings_AspectRatio" id="r12" type="radio" value="1.77" />
                                <label className="radio_pill" for="r12">
                                    <i className="fa fa-square-o" style="transform: scaleX(1.77); margin-right: 3px;"></i> 16:9
                                </label>

                                <input name="Settings_AspectRatio" id="r13" type="radio" value="" />
                                <label className="radio_pill" for="r13"><i className="fa fa-trash"></i></label>
                            </div>

                            <div className="UiText">${lang.preview}:</div>
                            <div style="text-align:center; margin-top:10px">
                                <video id="local-video-preview" className="previewVideo" muted playsinline></video>
                            </div>

                        </React.Fragment>)
                    }


                </div>


                {enableAppearanceSettings && (
                    <React.Fragment>
                        <div className='UiTextHeading' onclick="ToggleHeading(this,'Appearance_Html')"><i className="fa fa-pencil UiTextHeadingIcon" style="background-color:#416493"></i> ${lang.appearance}</div>`


                        <div id='Appearance_Html' style="display:none">
                            <div id='ImageCanvas' style="width:150px; height:150px"></div>
                            <div style="margin-top:50px;">
                                <input id='fileUploader' type='file' /></div>
                            <div style="margin-top:10px"></div>`;


                            <div className='UiText'>${lang.title_description}:</div>
                            <div><input id='Configure_Profile_TitleDesc' className='UiInputText'
                                type='text' placeholder={lang.eg_general_manager} value={((profileVcard != null) ? profileVcard.TitleDesc : "")} />
                            </div>
                            <div className='UiText'>{lang.mobile_number}:</div>
                            <div>
                                <input id='Configure_Profile_Mobile' className='UiInputText'
                                    type='text' placeholder={lang.eg_mobile_number} value={((profileVcard != null) ? profileVcard.Mobile : "")} />
                            </div>
                            <div className='UiText'>${lang.email}:</div>
                            <div>
                                <input id='Configure_Profile_Email' className='UiInputText'
                                    type='text' placeholder={lang.email} value={((profileVcard != null) ? profileVcard.Email : "")} />
                            </div>
                            <div className='UiText'>${lang.contact_number_1}:</div>
                            <div><input id='Configure_Profile_Number1' className='UiInputText'
                                type='text' placeholder={lang.eg_contact_number_1} value={((profileVcard != null) ? profileVcard.Number1 : "")} />
                            </div>
                            <div className='UiText'>${lang.contact_number_2}:</div>
                            <div><input id='Configure_Profile_Number2' className='UiInputText'
                                type='text' placeholder={lang.eg_contact_number_2} value={((profileVcard != null) ? profileVcard.Number2 : "")} />
                            </div>
                        </div>
                    </React.Fragment>
                )
                }
                {enableNotificationSettings && (
                    <React.Fragment>
                        <div className='UiTextHeading' onclick="ToggleHeading(this,'Notifications_Html')">
                            <i className="fa fa-bell UiTextHeadingIcon" style="background-color:#ab8e04"></i> ${lang.notifications}
                        </div>
                        <div id='Notifications_Html' style="display:none">
                            <div className='UiText'>${lang.notifications}:</div>
                            <div><input type='checkbox' id='Settings_Notifications' />
                                <label for='Settings_Notifications'> ${lang.enable_onscreen_notifications}</label>
                            </div>
                        </div>
                    </React.Fragment>)
                }

            </div>

            <div className='UiWindowButtonBar' id='ButtonBar'>
            </div>
        </div>
    );
};

function ShowMyProfile() {
    //CloseUpSettings();

    //$("#myContacts").hide();
    //$("#searchArea").hide();
    $("#actionArea").empty();



    // // Buttons
    // var buttons = [];
    // buttons.push({
    //     text: lang.save,
    //     action: function(){

    //         var chatEng = ($("#chat_type_sip").is(':checked'))? "SIMPLE" : "XMPP";

    //         if(EnableAccountSettings){
    //             if($("#Configure_Account_wssServer").val() == "") {
    //                 console.warn("Validation Failed");
    //                 return;
    //             } 
    //             if($("#Configure_Account_WebSocketPort").val() == "") {
    //                 console.warn("Validation Failed");
    //                 return;
    //             } 
    //             if($("#Configure_Account_profileName").val() == "") {
    //                 console.warn("Validation Failed");
    //                 return;
    //             } 
    //             if($("#Configure_Account_SipDomain").val() == "") {
    //                 console.warn("Validation Failed");
    //                 return;
    //             }
    //             if($("#Configure_Account_SipUsername").val() == "") {
    //                 console.warn("Validation Failed");
    //                 return;
    //             } 
    //             if($("#Configure_Account_SipPassword").val() == "") {
    //                 console.warn("Validation Failed");
    //                 return;
    //             }
    //             if(chatEng == "XMPP"){
    //                 if($("#Configure_Account_xmpp_address").val() == "") {
    //                     console.warn("Validation Failed");
    //                     return;
    //                 } 
    //                 if($("#Configure_Account_xmpp_port").val() == "") {
    //                     console.warn("Validation Failed");
    //                     return;
    //                 }
    //                 if($("#Configure_Account_xmpp_domain").val() == "") {
    //                     console.warn("Validation Failed");
    //                     return;
    //                 }
    //                 if($("#Configure_Account_profileUser").val() == "") {
    //                     console.warn("Validation Failed");
    //                     return;
    //                 }
    //             }
    //         }

    //         // The profileUserID identifies users
    //         if(localDB.getItem("profileUserID") == null) localDB.setItem("profileUserID", uID()); // For first time only

    //         // 1 Account
    //         if(EnableAccountSettings){
    //             localDB.setItem("wssServer", $("#Configure_Account_wssServer").val());
    //             localDB.setItem("WebSocketPort", $("#Configure_Account_WebSocketPort").val());
    //             localDB.setItem("ServerPath", $("#Configure_Account_ServerPath").val());
    //             localDB.setItem("profileName", $("#Configure_Account_profileName").val());
    //             localDB.setItem("SipDomain", $("#Configure_Account_SipDomain").val());
    //             localDB.setItem("SipUsername", $("#Configure_Account_SipUsername").val());
    //             localDB.setItem("SipPassword", $("#Configure_Account_SipPassword").val());
    //             localDB.setItem("VoiceMailSubscribe", ($("#Configure_Account_Voicemail_Subscribe").is(':checked'))? "1" : "0");
    //             localDB.setItem("VoicemailDid", $("#Configure_Account_Voicemail_Did").val());

    //             localDB.setItem("ChatEngine", chatEng);

    //             localDB.setItem("XmppServer", $("#Configure_Account_xmpp_address").val());
    //             localDB.setItem("XmppWebsocketPort", $("#Configure_Account_xmpp_port").val());
    //             localDB.setItem("XmppWebsocketPath", $("#Configure_Account_xmpp_path").val());
    //             localDB.setItem("XmppDomain", $("#Configure_Account_xmpp_domain").val());
    //             localDB.setItem("profileUser", $("#Configure_Account_profileUser").val());
    //         }

    //         // 2 Audio & Video
    //         localDB.setItem("AudioOutputId", $("#playbackSrc").val());
    //         localDB.setItem("AudioSrcId", $("#microphoneSrc").val());
    //         localDB.setItem("AutoGainControl", ($("#Settings_AutoGainControl").is(':checked'))? "1" : "0");
    //         localDB.setItem("EchoCancellation", ($("#Settings_EchoCancellation").is(':checked'))? "1" : "0");
    //         localDB.setItem("NoiseSuppression", ($("#Settings_NoiseSuppression").is(':checked'))? "1" : "0");
    //         localDB.setItem("RingOutputId", $("#ringDevice").val());

    //         if(EnableVideoCalling == true){
    //             localDB.setItem("VideoSrcId", $("#previewVideoSrc").val());
    //             localDB.setItem("VideoHeight", $("input[name=Settings_Quality]:checked").val());
    //             localDB.setItem("FrameRate", $("input[name=Settings_FrameRate]:checked").val());
    //             localDB.setItem("AspectRatio", $("input[name=Settings_AspectRatio]:checked").val());
    //             localDB.setItem("VideoOrientation", $("input[name=Settings_Orientation]:checked").val());
    //         }
    //         // 3 Appearance
    //         if(EnableAppearanceSettings){
    //             var vCard = { 
    //                 "TitleDesc": $("#Configure_Profile_TitleDesc").val(),
    //                 "Mobile": $("#Configure_Profile_Mobile").val(),
    //                 "Email": $("#Configure_Profile_Email").val(),
    //                 "Number1": $("#Configure_Profile_Number1").val(),
    //                 "Number2": $("#Configure_Profile_Number2").val(),
    //             }
    //             localDB.setItem("profileVcard", JSON.stringify(vCard));

    //             var options =  { 
    //                 type: 'base64', 
    //                 size: 'viewport', 
    //                 format: 'webp', // png
    //                 quality: 0.5, 
    //                 circle: false 
    //             }
    //             $("#Appearance_Html").show(); // Bug, only works if visible
    //             $("#ImageCanvas").croppie('result', options).then(function(base64) {
    //                 localDB.setItem("profilePicture", base64);
    //                 $("#Appearance_Html").hide();

    //                 // Notify Changes
    //                 Alert(lang.alert_settings, lang.reload_required, function(){
    //                     window.location.reload();
    //                 });

    //             });
    //         }
    //         else {
    //             // Notify Changes
    //             Alert(lang.alert_settings, lang.reload_required, function(){
    //                 window.location.reload();
    //             });
    //         }

    //         // 4 Notifications
    //         if(EnableNotificationSettings){
    //             localDB.setItem("Notifications", ($("#Settings_Notifications").is(":checked"))? "1" : "0");
    //         }

    //     }
    // });
    // buttons.push({
    //     text: lang.cancel,
    //     action: function(){
    //         ShowContacts();
    //     }
    // });
    // $.each(buttons, function(i,obj){
    //     var button = $('<button>'+ obj.text +'</button>').click(obj.action);
    //     $("#ButtonBar").append(button);
    // });

    // // Show
    // $("#actionArea").show();

    // // DoOnload
    // window.setTimeout(function(){
    //     // Account
    //     if(EnableAccountSettings){
    //         $("#chat_type_sip").change(function(){
    //             if($("#chat_type_sip").is(':checked')){
    //                 $("#RowChatEngine_xmpp").hide();
    //             }
    //         });
    //         $("#chat_type_xmpp").change(function(){
    //             if($("#chat_type_xmpp").is(':checked')){
    //                 $("#RowChatEngine_xmpp").show();
    //             }
    //         });
    //         $("#Configure_Account_Voicemail_Subscribe").change(function(){
    //             if($("#Configure_Account_Voicemail_Subscribe").is(':checked')){
    //                 $("#Voicemail_Did_row").show();
    //             } else {
    //                 $("#Voicemail_Did_row").hide();
    //             }
    //         });
    //     }

    //     // Audio Preview
    //     var playButton = $("#preview_output_play");
    //     // Audio Preview Button press
    //     playButton.click(function(){

    //         try{
    //             window.SettingsOutputAudio.pause();
    //         } 
    //         catch(e){}
    //         window.SettingsOutputAudio = null;

    //         try{
    //             var tracks = window.SettingsOutputStream.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });
    //         }
    //         catch(e){}
    //         window.SettingsOutputStream = null;

    //         try{
    //             var soundMeter = window.SettingsOutputStreamMeter;
    //             soundMeter.stop();
    //         }
    //         catch(e){}
    //         window.SettingsOutputStreamMeter = null;

    //         // Load Sample
    //         console.log("Audio:", audioBlobs.speech_orig.url);
    //         var audioObj = new Audio(audioBlobs.speech_orig.blob);
    //         audioObj.preload = "auto";
    //         audioObj.onplay = function(){
    //             var outputStream = new MediaStream();
    //             if (typeof audioObj.captureStream !== 'undefined') {
    //                 outputStream = audioObj.captureStream();
    //             } 
    //             else if (typeof audioObj.mozCaptureStream !== 'undefined') {
    //                 return;
    //                 // BUG: mozCaptureStream() in Firefox does not work the same way as captureStream()
    //                 // the actual sound does not play out to the speakers... its as if the mozCaptureStream
    //                 // removes the stream from the <audio> object.
    //                 outputStream = audioObj.mozCaptureStream();
    //             }
    //             else if (typeof audioObj.webkitCaptureStream !== 'undefined') {
    //                 outputStream = audioObj.webkitCaptureStream();
    //             }
    //             else {
    //                 console.warn("Cannot display Audio Levels")
    //                 return;
    //             }
    //             // Monitor Output
    //             window.SettingsOutputStream = outputStream;
    //             window.SettingsOutputStreamMeter = MeterSettingsOutput(outputStream, "Settings_SpeakerOutput", "width", 50);
    //         }
    //         audioObj.oncanplaythrough = function(e) {
    //             if (typeof audioObj.sinkId !== 'undefined') {
    //                 audioObj.setSinkId(selectAudioScr.val()).then(function() {
    //                     console.log("Set sinkId to:", selectAudioScr.val());
    //                 }).catch(function(e){
    //                     console.warn("Failed not apply setSinkId.", e);
    //                 });
    //             }
    //             // Play
    //             audioObj.play().then(function(){
    //                 // Audio Is Playing
    //             }).catch(function(e){
    //                 console.warn("Unable to play audio file", e);
    //             });
    //             console.log("Playing sample audio file... ");
    //         }

    //         window.SettingsOutputAudio = audioObj;
    //     });

    //     var playRingButton = $("#preview_ringer_play");
    //     // Ringtone Button Press
    //     playRingButton.click(function(){

    //         try{
    //             window.SettingsRingerAudio.pause();
    //         } 
    //         catch(e){}
    //         window.SettingsRingerAudio = null;

    //         try{
    //             var tracks = window.SettingsRingerStream.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });
    //         }
    //         catch(e){}
    //         window.SettingsRingerStream = null;

    //         try{
    //             var soundMeter = window.SettingsRingerStreamMeter;
    //             soundMeter.stop();
    //         }
    //         catch(e){}
    //         window.SettingsRingerStreamMeter = null;

    //         // Load Sample
    //         console.log("Audio:", audioBlobs.Ringtone.url);
    //         var audioObj = new Audio(audioBlobs.Ringtone.blob);
    //         audioObj.preload = "auto";
    //         audioObj.onplay = function(){
    //             var outputStream = new MediaStream();
    //             if (typeof audioObj.captureStream !== 'undefined') {
    //                 outputStream = audioObj.captureStream();
    //             } 
    //             else if (typeof audioObj.mozCaptureStream !== 'undefined') {
    //                 return;
    //                 // BUG: mozCaptureStream() in Firefox does not work the same way as captureStream()
    //                 // the actual sound does not play out to the speakers... its as if the mozCaptureStream
    //                 // removes the stream from the <audio> object.
    //                 outputStream = audioObj.mozCaptureStream();
    //             }
    //             else if (typeof audioObj.webkitCaptureStream !== 'undefined') {
    //                 outputStream = audioObj.webkitCaptureStream();
    //             }
    //             else {
    //                 console.warn("Cannot display Audio Levels")
    //                 return;
    //             }
    //             // Monitor Output
    //             window.SettingsRingerStream = outputStream;
    //             window.SettingsRingerStreamMeter = MeterSettingsOutput(outputStream, "Settings_RingerOutput", "width", 50);
    //         }
    //         audioObj.oncanplaythrough = function(e) {
    //             if (typeof audioObj.sinkId !== 'undefined') {
    //                 audioObj.setSinkId(selectRingDevice.val()).then(function() {
    //                     console.log("Set sinkId to:", selectRingDevice.val());
    //                 }).catch(function(e){
    //                     console.warn("Failed not apply setSinkId.", e);
    //                 });
    //             }
    //             // Play
    //             audioObj.play().then(function(){
    //                 // Audio Is Playing
    //             }).catch(function(e){
    //                 console.warn("Unable to play audio file", e);
    //             });
    //             console.log("Playing sample audio file... ");
    //         }

    //         window.SettingsRingerAudio = audioObj;
    //     });

    //     // Audio Playback Source
    //     var selectAudioScr = $("#playbackSrc");
    //     // Handle output change (speaker)
    //     selectAudioScr.change(function(){
    //         console.log("Call to change Speaker ("+ this.value +")");

    //         var audioObj = window.SettingsOutputAudio;
    //         if(audioObj != null) {
    //             if (typeof audioObj.sinkId !== 'undefined') {
    //                 audioObj.setSinkId(this.value).then(function() {
    //                     console.log("sinkId applied to audioObj:", this.value);
    //                 }).catch(function(e){
    //                     console.warn("Failed not apply setSinkId.", e);
    //                 });
    //             }
    //         }
    //     });

    //     // Microphone
    //     var selectMicScr = $("#microphoneSrc");
    //     $("#Settings_AutoGainControl").prop("checked", AutoGainControl);
    //     $("#Settings_EchoCancellation").prop("checked", EchoCancellation);
    //     $("#Settings_NoiseSuppression").prop("checked", NoiseSuppression);
    //     // Handle Audio Source changes (Microphone)
    //     selectMicScr.change(function(){
    //         console.log("Call to change Microphone ("+ this.value +")");

    //         // Change and update visual preview
    //         try{
    //             var tracks = window.SettingsMicrophoneStream.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });
    //             window.SettingsMicrophoneStream = null;
    //         }
    //         catch(e){}

    //         try{
    //             soundMeter = window.SettingsMicrophoneSoundMeter;
    //             soundMeter.stop();
    //             window.SettingsMicrophoneSoundMeter = null;
    //         }
    //         catch(e){}

    //         // Get Microphone
    //         var constraints = { 
    //             audio: {
    //                 deviceId: { exact: this.value }
    //             }, 
    //             video: false 
    //         }
    //         var localMicrophoneStream = new MediaStream();
    //         navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
    //             var audioTrack = mediaStream.getAudioTracks()[0];
    //             if(audioTrack != null){
    //                 // Display Micrphone Levels
    //                 localMicrophoneStream.addTrack(audioTrack);
    //                 window.SettingsMicrophoneStream = localMicrophoneStream;
    //                 window.SettingsMicrophoneSoundMeter = MeterSettingsOutput(localMicrophoneStream, "Settings_MicrophoneOutput", "width", 50);
    //             }
    //         }).catch(function(e){
    //             console.log("Failed to getUserMedia", e);
    //         });
    //     });

    //     // Ring Tone
    //     var selectRingTone = $("#ringTone");
    //     // TODO

    //     // Ring Device
    //     var selectRingDevice = $("#ringDevice");

    //     if(EnableVideoCalling == true){

    //         // Webcam
    //         var selectVideoScr = $("#previewVideoSrc");
    //         // Handle video input change (WebCam)
    //         selectVideoScr.change(function(){
    //             console.log("Call to change WebCam ("+ this.value +")");

    //             var localVideo = $("#local-video-preview").get(0);
    //             localVideo.muted = true;
    //             localVideo.playsinline = true;
    //             localVideo.autoplay = true;

    //             var tracks = localVideo.srcObject.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });

    //             var constraints = {
    //                 audio: false,
    //                 video: {
    //                     deviceId: (this.value != "default")? { exact: this.value } : "default"
    //                 }
    //             }
    //             if($("input[name=Settings_FrameRate]:checked").val() != ""){
    //                 constraints.video.frameRate = $("input[name=Settings_FrameRate]:checked").val();
    //             }
    //             if($("input[name=Settings_Quality]:checked").val() != ""){
    //                 constraints.video.height = $("input[name=Settings_Quality]:checked").val();
    //             }
    //             if($("input[name=Settings_AspectRatio]:checked").val() != ""){
    //                 constraints.video.aspectRatio = $("input[name=Settings_AspectRatio]:checked").val();
    //             } 
    //             console.log("Constraints:", constraints);
    //             var localStream = new MediaStream();
    //             if(navigator.mediaDevices){
    //                 navigator.mediaDevices.getUserMedia(constraints).then(function(newStream){
    //                     var videoTrack = newStream.getVideoTracks()[0];
    //                     localStream.addTrack(videoTrack);
    //                     localVideo.srcObject = localStream;
    //                     localVideo.onloadedmetadata = function(e) {
    //                         localVideo.play();
    //                     }
    //                 }).catch(function(e){
    //                     console.error(e);
    //                     Alert(lang.alert_error_user_media, lang.error);
    //                 });
    //             }
    //         });

    //         // Orientation
    //         var OriteationSel = $("input[name=Settings_Orientation]");
    //         OriteationSel.each(function(){
    //             if(this.value == MirrorVideo) $(this).prop("checked", true);
    //         });
    //         $("#local-video-preview").css("transform", MirrorVideo);
    //         // Change Video Image
    //         OriteationSel.change(function(){
    //             console.log("Call to change Orientation ("+ this.value +")");
    //             $("#local-video-preview").css("transform", this.value);
    //         });

    //         // Frame Rate
    //         var frameRateSel = $("input[name=Settings_FrameRate]");
    //         frameRateSel.each(function(){
    //             if(this.value == maxFrameRate) $(this).prop("checked", true);
    //         });
    //         // Handle Frame Rate Change 
    //         frameRateSel.change(function(){
    //             console.log("Call to change Frame Rate ("+ this.value +")");

    //             var localVideo = $("#local-video-preview").get(0);
    //             localVideo.muted = true;
    //             localVideo.playsinline = true;
    //             localVideo.autoplay = true;

    //             var tracks = localVideo.srcObject.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });

    //             var constraints = {
    //                 audio: false,
    //                 video: {
    //                     deviceId: (selectVideoScr.val() != "default")? { exact: selectVideoScr.val() } : "default" ,
    //                 }
    //             }
    //             if(this.value != ""){
    //                 constraints.video.frameRate = this.value;
    //             }
    //             if($("input[name=Settings_Quality]:checked").val() != ""){
    //                 constraints.video.height = $("input[name=Settings_Quality]:checked").val();
    //             }
    //             if($("input[name=Settings_AspectRatio]:checked").val() != ""){
    //                 constraints.video.aspectRatio = $("input[name=Settings_AspectRatio]:checked").val();
    //             } 
    //             console.log("Constraints:", constraints);
    //             var localStream = new MediaStream();
    //             if(navigator.mediaDevices){
    //                 navigator.mediaDevices.getUserMedia(constraints).then(function(newStream){
    //                     var videoTrack = newStream.getVideoTracks()[0];
    //                     localStream.addTrack(videoTrack);
    //                     localVideo.srcObject = localStream;
    //                     localVideo.onloadedmetadata = function(e) {
    //                         localVideo.play();
    //                     }
    //                 }).catch(function(e){
    //                     console.error(e);
    //                     Alert(lang.alert_error_user_media, lang.error);
    //                 });
    //             }
    //         });

    //         // Quality
    //         var QualitySel = $("input[name=Settings_Quality]");
    //         QualitySel.each(function(){
    //             if(this.value == videoHeight) $(this).prop("checked", true);
    //         });    
    //         // Handle Video Height Change
    //         QualitySel.change(function(){    
    //             console.log("Call to change Video Height ("+ this.value +")");

    //             var localVideo = $("#local-video-preview").get(0);
    //             localVideo.muted = true;
    //             localVideo.playsinline = true;
    //             localVideo.autoplay = true;

    //             var tracks = localVideo.srcObject.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });

    //             var constraints = {
    //                 audio: false,
    //                 video: {
    //                     deviceId: (selectVideoScr.val() != "default")? { exact: selectVideoScr.val() } : "default" ,
    //                 }
    //             }
    //             if($("input[name=Settings_FrameRate]:checked").val() != ""){
    //                 constraints.video.frameRate = $("input[name=Settings_FrameRate]:checked").val();
    //             }
    //             if(this.value){
    //                 constraints.video.height = this.value;
    //             }
    //             if($("input[name=Settings_AspectRatio]:checked").val() != ""){
    //                 constraints.video.aspectRatio = $("input[name=Settings_AspectRatio]:checked").val();
    //             } 
    //             console.log("Constraints:", constraints);
    //             var localStream = new MediaStream();
    //             if(navigator.mediaDevices){
    //                 navigator.mediaDevices.getUserMedia(constraints).then(function(newStream){
    //                     var videoTrack = newStream.getVideoTracks()[0];
    //                     localStream.addTrack(videoTrack);
    //                     localVideo.srcObject = localStream;
    //                     localVideo.onloadedmetadata = function(e) {
    //                         localVideo.play();
    //                     }
    //                 }).catch(function(e){
    //                     console.error(e);
    //                     Alert(lang.alert_error_user_media, lang.error);
    //                 });
    //             }
    //         });    

    //         // Aspect Ratio
    //         var AspectRatioSel = $("input[name=Settings_AspectRatio]");
    //         AspectRatioSel.each(function(){
    //             if(this.value == videoAspectRatio) $(this).prop("checked", true);
    //         });    
    //         // Handle Aspect Ratio Change
    //         AspectRatioSel.change(function(){    
    //             console.log("Call to change Aspect Ratio ("+ this.value +")");

    //             var localVideo = $("#local-video-preview").get(0);
    //             localVideo.muted = true;
    //             localVideo.playsinline = true;
    //             localVideo.autoplay = true;

    //             var tracks = localVideo.srcObject.getTracks();
    //             tracks.forEach(function(track) {
    //                 track.stop();
    //             });

    //             var constraints = {
    //                 audio: false,
    //                 video: {
    //                     deviceId: (selectVideoScr.val() != "default")? { exact: selectVideoScr.val() } : "default"
    //                 }
    //             }
    //             if($("input[name=Settings_FrameRate]:checked").val() != ""){
    //                 constraints.video.frameRate = $("input[name=Settings_FrameRate]:checked").val();
    //             }
    //             if($("input[name=Settings_Quality]:checked").val() != ""){
    //                 constraints.video.height = $("input[name=Settings_Quality]:checked").val();
    //             }
    //             if(this.value != ""){
    //                 constraints.video.aspectRatio = this.value;
    //             }        
    //             console.log("Constraints:", constraints);
    //             var localStream = new MediaStream();
    //             if(navigator.mediaDevices){
    //                 navigator.mediaDevices.getUserMedia(constraints).then(function(newStream){
    //                     var videoTrack = newStream.getVideoTracks()[0];
    //                     localStream.addTrack(videoTrack);
    //                     localVideo.srcObject = localStream;
    //                     localVideo.onloadedmetadata = function(e) {
    //                         localVideo.play();
    //                     }
    //                 }).catch(function(e){
    //                     console.error(e);
    //                     Alert(lang.alert_error_user_media, lang.error);
    //                 });
    //             }
    //         });

    //         // Note: Only works over HTTPS or via localhost!!
    //         var localVideo = $("#local-video-preview").get(0);
    //         localVideo.muted = true;
    //         localVideo.playsinline = true;
    //         localVideo.autoplay = true;
    //     }

    //     if(navigator.mediaDevices){
    //         navigator.mediaDevices.enumerateDevices().then(function(deviceInfos){
    //             var savedVideoDevice = getVideoSrcID();
    //             var videoDeviceFound = false;

    //             var savedAudioDevice = getAudioSrcID();
    //             var audioDeviceFound = false;

    //             var MicrophoneFound = false;
    //             var SpeakerFound = false;
    //             var VideoFound = false;

    //             for (var i = 0; i < deviceInfos.length; ++i) {
    //                 console.log("Found Device ("+ deviceInfos[i].kind +"): ", deviceInfos[i].label);

    //                 // Check Devices
    //                 if (deviceInfos[i].kind === "audioinput") {
    //                     MicrophoneFound = true;
    //                     if(savedAudioDevice != "default" && deviceInfos[i].deviceId == savedAudioDevice) {
    //                         audioDeviceFound = true;
    //                     }
    //                 }
    //                 else if (deviceInfos[i].kind === "audiooutput") {
    //                     SpeakerFound = true;
    //                 }
    //                 else if (deviceInfos[i].kind === "videoinput") {
    //                     if(EnableVideoCalling == true){
    //                         VideoFound = true;
    //                         if(savedVideoDevice != "default" && deviceInfos[i].deviceId == savedVideoDevice) {
    //                             videoDeviceFound = true;
    //                         }
    //                     }
    //                 }
    //             }

    //             var contraints = {
    //                 audio: MicrophoneFound,
    //                 video: VideoFound
    //             }

    //             if(MicrophoneFound){
    //                 contraints.audio = { deviceId: "default" }
    //                 if(audioDeviceFound) contraints.audio.deviceId = { exact: savedAudioDevice }
    //             }

    //             if(EnableVideoCalling == true){
    //                 if(VideoFound){
    //                     contraints.video = { deviceId: "default" }
    //                     if(videoDeviceFound) contraints.video.deviceId = { exact: savedVideoDevice }
    //                 }
    //                 // Additional
    //                 if($("input[name=Settings_FrameRate]:checked").val() != ""){
    //                     contraints.video.frameRate = $("input[name=Settings_FrameRate]:checked").val();
    //                 }
    //                 if($("input[name=Settings_Quality]:checked").val() != ""){
    //                     contraints.video.height = $("input[name=Settings_Quality]:checked").val();
    //                 }
    //                 if($("input[name=Settings_AspectRatio]:checked").val() != ""){
    //                     contraints.video.aspectRatio = $("input[name=Settings_AspectRatio]:checked").val();
    //                 } 
    //             }
    //             console.log("Get User Media", contraints);

    //             // Get User Media
    //             navigator.mediaDevices.getUserMedia(contraints).then(function(mediaStream){
    //                 // Note: This code may fire after the close button

    //                 // Handle Audio
    //                 settingsMicrophoneStreamTrack = (mediaStream.getAudioTracks().length >= 1)? mediaStream.getAudioTracks()[0] : null ;
    //                 if(MicrophoneFound && settingsMicrophoneStreamTrack != null){
    //                     settingsMicrophoneStream = new MediaStream();
    //                     settingsMicrophoneStream.addTrack(settingsMicrophoneStreamTrack);
    //                     // Display Micrphone Levels
    //                     // window.SettingsMicrophoneStream = settingsMicrophoneStream;
    //                     settingsMicrophoneSoundMeter = MeterSettingsOutput(settingsMicrophoneStream, "Settings_MicrophoneOutput", "width", 50);
    //                 }
    //                 else {
    //                     console.warn("No microphone devices found. Calling will not be possible.")
    //                 }

    //                 // Display Output Levels
    //                 $("#Settings_SpeakerOutput").css("width", "0%");
    //                 $("#Settings_RingerOutput").css("width", "0%");
    //                 if(!SpeakerFound){
    //                     console.log("No speaker devices found, make sure one is plugged in.")
    //                     $("#playbackSrc").hide();
    //                     $("#RingDeviceSection").hide();
    //                 }

    //                 if(EnableVideoCalling == true){
    //                     // Handle Video
    //                     settingsVideoStreamTrack = (mediaStream.getVideoTracks().length >= 1)? mediaStream.getVideoTracks()[0] : null;
    //                     if(VideoFound && settingsVideoStreamTrack != null){
    //                         settingsVideoStream = new MediaStream();
    //                         settingsVideoStream.addTrack(settingsVideoStreamTrack);
    //                         // Display Preview Video
    //                         localVideo.srcObject = settingsVideoStream;
    //                         localVideo.onloadedmetadata = function(e) {
    //                             localVideo.play();
    //                         }
    //                     }
    //                     else {
    //                         console.warn("No video / webcam devices found. Video Calling will not be possible.")
    //                     }
    //                 }

    //                 // Return .then()
    //                 return navigator.mediaDevices.enumerateDevices();
    //             }).then(function(deviceInfos){
    //                 for (var i = 0; i < deviceInfos.length; ++i) {
    //                     console.log("Found Device ("+ deviceInfos[i].kind +") Again: ", deviceInfos[i].label, deviceInfos[i].deviceId);

    //                     var deviceInfo = deviceInfos[i];
    //                     var devideId = deviceInfo.deviceId;
    //                     var DisplayName = deviceInfo.label;
    //                     if(DisplayName.indexOf("(") > 0) DisplayName = DisplayName.substring(0,DisplayName.indexOf("("));

    //                     var option = $('<option/>');
    //                     option.prop("value", devideId);

    //                     if (deviceInfo.kind === "audioinput") {
    //                         option.text((DisplayName != "")? DisplayName : "Microphone");
    //                         if(getAudioSrcID() == devideId) option.prop("selected", true);
    //                         selectMicScr.append(option);
    //                     }
    //                     else if (deviceInfo.kind === "audiooutput") {
    //                         option.text((DisplayName != "")? DisplayName : "Speaker");
    //                         if(getAudioOutputID() == devideId) option.prop("selected", true);
    //                         selectAudioScr.append(option);
    //                         var ringOption = option.clone();
    //                         if(getRingerOutputID() == devideId) ringOption.prop("selected", true);
    //                         selectRingDevice.append(ringOption);
    //                     }
    //                     else if (deviceInfo.kind === "videoinput") {
    //                         if(EnableVideoCalling == true){
    //                             if(getVideoSrcID() == devideId) option.prop("selected", true);
    //                             option.text((DisplayName != "")? DisplayName : "Webcam");
    //                             selectVideoScr.append(option);
    //                         }
    //                     }
    //                 }
    //                 if(EnableVideoCalling == true){
    //                     // Add "Default" option
    //                     if(selectVideoScr.children('option').length > 0){
    //                         var option = $('<option/>');
    //                         option.prop("value", "default");
    //                         if(getVideoSrcID() == "default" || getVideoSrcID() == "" || getVideoSrcID() == "null") option.prop("selected", true);
    //                         option.text("("+ lang.default_video_src +")");
    //                         selectVideoScr.append(option);
    //                     }
    //                 }
    //             }).catch(function(e){
    //                 console.error(e);
    //                 Alert(lang.alert_error_user_media, lang.error);
    //             });
    //         }).catch(function(e){
    //             console.error("Error getting Media Devices", e);
    //         });
    //     }
    //     else {
    //         Alert(lang.alert_media_devices, lang.error);
    //     }

    //     // Appearance
    //     if(EnableAppearanceSettings){

    //         $("#Appearance_Html").show(); // Bit of an annoying bug... croppie has to be visible to work
    //         // $("#ImageCanvas").croppie({
    //         //     viewport: { width: 150, height: 150, type: 'circle' }
    //         // });

    //         // Preview Existing Image
    //         // $("#ImageCanvas").croppie('bind', { 
    //         //     url: getPicture("profilePicture")
    //         // }).then(function(){
    //         //     $("#Appearance_Html").hide();
    //         // });


    //         // Wireup File Change
    //         $("#fileUploader").change(function () {
    //             var filesArray = $(this).prop('files');

    //             if (filesArray.length == 1) {
    //                 var uploadId = Math.floor(Math.random() * 1000000000);
    //                 var fileObj = filesArray[0];
    //                 var fileName = fileObj.name;
    //                 var fileSize = fileObj.size;

    //                 if (fileSize <= 52428800) {
    //                     console.log("Adding (" + uploadId + "): " + fileName + " of size: " + fileSize + "bytes");

    //                     var reader = new FileReader();
    //                     reader.Name = fileName;
    //                     reader.UploadId = uploadId;
    //                     reader.Size = fileSize;
    //                     reader.onload = function (event) {
    //                         $("#ImageCanvas").croppie('bind', {
    //                             url: event.target.result
    //                         });
    //                     }

    //                     // Use onload for this
    //                     reader.readAsDataURL(fileObj);
    //                 }
    //                 else {
    //                     Alert(lang.alert_file_size, lang.error);
    //                 }
    //             }
    //             else {
    //                 Alert(lang.alert_single_file, lang.error);
    //             }
    //         });
    //     }

    //     // Notifications
    //     if(EnableNotificationSettings){
    //         var NotificationsCheck = $("#Settings_Notifications");
    //         NotificationsCheck.prop("checked", NotificationsActive);
    //         NotificationsCheck.change(function(){
    //             if(this.checked){
    //                 if(Notification.permission != "granted"){
    //                     if(checkNotificationPromise()){
    //                         Notification.requestPermission().then(function(p){
    //                             console.log(p);
    //                             HandleNotifyPermission(p);
    //                         });
    //                     }
    //                     else {
    //                         Notification.requestPermission(function(p){
    //                             console.log(p);
    //                             HandleNotifyPermission(p)
    //                         });
    //                     }
    //                 }
    //             }
    //         });
    //     }


    // }, 0);
}
export default Profile;



