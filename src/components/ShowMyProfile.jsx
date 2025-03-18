
import React, { useCallback, useEffect, useState } from 'react';



// const ShowContacts = () => {
//     console.log("Show contacts");
// }



// const onChange = () => {
//     console.log("toggle heading");
// }

export const ShowMyProfile = ({callback}) => {
    const [ConfigureExtension, setConfigureExtension] = useState(false);
    const [audioVideoHtml, setAudioVideoHtml] = useState(false);
    const [appearanceHtml, setAppearanceHtml] = useState(false);
    const [notificationsHtml, setNotificationsHtml] = useState(false);

    
    const [wssServer, setWssServer] = useState(getDbItem("wssServer", ""));
    const [WebSocketPort, setWebSocketPort] = useState(getDbItem("WebSocketPort", ""));
    const [ServerPath, setServerPath] = useState(getDbItem("ServerPath", ""));
    const [profileName, setProfileName] = useState(getDbItem("profileName", ""));

    
    const [SipDomain, setSipDomain] = useState(getDbItem("SipDomain", ""));
    const [SipUsername, setSipUsername] = useState(getDbItem("SipUsername", ""));
    const [SipPassword, setSipPassword] = useState(getDbItem("setSipPassword", ""));
    const [VoicemailDid, setVoicemailDid] = useState(getDbItem("VoicemailDid", ""));

    let profileVcard
    let selectMicScr
    let selectAudioScr
    let selectRingDevice

    const ToggleHeading = (htmlText) => {

        if (htmlText == 'Configure_Extension_Html')
            setConfigureExtension(ConfigureExtension => !ConfigureExtension);
        if(htmlText == "Audio_Video_Html")
            setAudioVideoHtml(audioVideoHtml => !audioVideoHtml);
        
        if(htmlText == "Appearance_Html")
            setAppearanceHtml(setAppearanceHtml => !setAppearanceHtml);
        if(htmlText == "Notifications_Html")
            setNotificationsHtml(notificationsHtml => !notificationsHtml);
        console.log("toggle Configure_Extension_Html");
    }

    const previewOutputPlay=()=>{
      try{
        window.SettingsOutputAudio.pause();
    } 
    catch(e){}
    window.SettingsOutputAudio = null;

    try{
        var tracks = window.SettingsOutputStream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
    }
    catch(e){}
    window.SettingsOutputStream = null;

    try{
        var soundMeter = window.SettingsOutputStreamMeter;
        soundMeter.stop();
    }
    catch(e){}
    window.SettingsOutputStreamMeter = null;

    // Load Sample
    console.log("Audio:", audioBlobs.speech_orig.url);
    var audioObj = new Audio(audioBlobs.speech_orig.blob);
    audioObj.preload = "auto";
    audioObj.onplay = function(){
        var outputStream = new MediaStream();
        if (typeof audioObj.captureStream !== 'undefined') {
            outputStream = audioObj.captureStream();
        } 
        else if (typeof audioObj.mozCaptureStream !== 'undefined') {
            return;
            // BUG: mozCaptureStream() in Firefox does not work the same way as captureStream()
            // the actual sound does not play out to the speakers... its as if the mozCaptureStream
            // removes the stream from the <audio> object.
            outputStream = audioObj.mozCaptureStream();
        }
        else if (typeof audioObj.webkitCaptureStream !== 'undefined') {
            outputStream = audioObj.webkitCaptureStream();
        }
        else {
            console.warn("Cannot display Audio Levels")
            return;
        }
        // Monitor Output
        window.SettingsOutputStream = outputStream;
        window.SettingsOutputStreamMeter = MeterSettingsOutput(outputStream, "Settings_SpeakerOutput", "width", 50);
    }
    audioObj.oncanplaythrough = function(e) {
        if (typeof audioObj.sinkId !== 'undefined') {
            audioObj.setSinkId(selectAudioScr.val()).then(function() {
                console.log("Set sinkId to:", selectAudioScr.val());
            }).catch(function(e){
                console.warn("Failed not apply setSinkId.", e);
            });
        }
        // Play
        audioObj.play().then(function(){
            // Audio Is Playing
        }).catch(function(e){
            console.warn("Unable to play audio file", e);
        });
        console.log("Playing sample audio file... ");
    }

    window.SettingsOutputAudio = audioObj;
    }

    const previewRingerPlay=()=>{
      try{
        window.SettingsRingerAudio.pause();
    } 
    catch(e){}
    window.SettingsRingerAudio = null;

    try{
        var tracks = window.SettingsRingerStream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
    }
    catch(e){}
    window.SettingsRingerStream = null;

    try{
        var soundMeter = window.SettingsRingerStreamMeter;
        soundMeter.stop();
    }
    catch(e){}
    window.SettingsRingerStreamMeter = null;

    // Load Sample
    console.log("Audio:", audioBlobs.Ringtone.url);
    var audioObj = new Audio(audioBlobs.Ringtone.blob);
    audioObj.preload = "auto";
    audioObj.onplay = function(){
        var outputStream = new MediaStream();
        if (typeof audioObj.captureStream !== 'undefined') {
            outputStream = audioObj.captureStream();
        } 
        else if (typeof audioObj.mozCaptureStream !== 'undefined') {
            return;
            // BUG: mozCaptureStream() in Firefox does not work the same way as captureStream()
            // the actual sound does not play out to the speakers... its as if the mozCaptureStream
            // removes the stream from the <audio> object.
            outputStream = audioObj.mozCaptureStream();
        }
        else if (typeof audioObj.webkitCaptureStream !== 'undefined') {
            outputStream = audioObj.webkitCaptureStream();
        }
        else {
            console.warn("Cannot display Audio Levels")
            return;
        }
        // Monitor Output
        window.SettingsRingerStream = outputStream;
        window.SettingsRingerStreamMeter = MeterSettingsOutput(outputStream, "Settings_RingerOutput", "width", 50);
    }
    audioObj.oncanplaythrough = function(e) {
        if (typeof audioObj.sinkId !== 'undefined') {
            audioObj.setSinkId(selectRingDevice.val()).then(function() {
                console.log("Set sinkId to:", selectRingDevice.val());
            }).catch(function(e){
                console.warn("Failed not apply setSinkId.", e);
            });
        }
        // Play
        audioObj.play().then(function(){
            // Audio Is Playing
        }).catch(function(e){
            console.warn("Unable to play audio file", e);
        });
        console.log("Playing sample audio file... ");
    }

    window.SettingsRingerAudio = audioObj;
    }

    useEffect(()=>{
      if(navigator.mediaDevices){
        navigator.mediaDevices.enumerateDevices().then(function(deviceInfos){
            var savedVideoDevice = getVideoSrcID();
            var videoDeviceFound = false;

            var savedAudioDevice = getAudioSrcID();
            var audioDeviceFound = false;

            var MicrophoneFound = false;
            var SpeakerFound = false;
            var VideoFound = false;

            selectAudioScr = $("#playbackSrc");

            for (var i = 0; i < deviceInfos.length; ++i) {
                console.log("Found Device ("+ deviceInfos[i].kind +"): ", deviceInfos[i].label);

                // Check Devices
                if (deviceInfos[i].kind === "audioinput") {
                    MicrophoneFound = true;
                    if(savedAudioDevice != "default" && deviceInfos[i].deviceId == savedAudioDevice) {
                        audioDeviceFound = true;
                    }
                }
                else if (deviceInfos[i].kind === "audiooutput") {
                    SpeakerFound = true;
                }
                else if (deviceInfos[i].kind === "videoinput") {
                    if(EnableVideoCalling == true){
                        VideoFound = true;
                        if(savedVideoDevice != "default" && deviceInfos[i].deviceId == savedVideoDevice) {
                            videoDeviceFound = true;
                        }
                    }
                }
            }

            var contraints = {
                audio: MicrophoneFound,
                video: VideoFound
            }

            if(MicrophoneFound){
                contraints.audio = { deviceId: "default" }
                if(audioDeviceFound) contraints.audio.deviceId = { exact: savedAudioDevice }
            }

            if(EnableVideoCalling == true){
                if(VideoFound){
                    contraints.video = { deviceId: "default" }
                    if(videoDeviceFound) contraints.video.deviceId = { exact: savedVideoDevice }
                }
                // Additional
                if($("input[name=Settings_FrameRate]:checked").val() != ""){
                    contraints.video.frameRate = $("input[name=Settings_FrameRate]:checked").val();
                }
                if($("input[name=Settings_Quality]:checked").val() != ""){
                    contraints.video.height = $("input[name=Settings_Quality]:checked").val();
                }
                if($("input[name=Settings_AspectRatio]:checked").val() != ""){
                    contraints.video.aspectRatio = $("input[name=Settings_AspectRatio]:checked").val();
                } 
            }
            console.log("Get User Media", contraints);

            // Get User Media
            navigator.mediaDevices.getUserMedia(contraints).then(function(mediaStream){
                // Note: This code may fire after the close button

                // Handle Audio
                settingsMicrophoneStreamTrack = (mediaStream.getAudioTracks().length >= 1)? mediaStream.getAudioTracks()[0] : null ;
                if(MicrophoneFound && settingsMicrophoneStreamTrack != null){
                    settingsMicrophoneStream = new MediaStream();
                    settingsMicrophoneStream.addTrack(settingsMicrophoneStreamTrack);
                    // Display Micrphone Levels
                    // window.SettingsMicrophoneStream = settingsMicrophoneStream;
                    settingsMicrophoneSoundMeter = MeterSettingsOutput(settingsMicrophoneStream, "Settings_MicrophoneOutput", "width", 50);
                }
                else {
                    console.warn("No microphone devices found. Calling will not be possible.")
                }

                // Display Output Levels
                $("#Settings_SpeakerOutput").css("width", "0%");
                $("#Settings_RingerOutput").css("width", "0%");
                if(!SpeakerFound){
                    console.log("No speaker devices found, make sure one is plugged in.")
                    $("#playbackSrc").hide();
                    $("#RingDeviceSection").hide();
                }

                if(EnableVideoCalling == true){
                    // Handle Video
                    settingsVideoStreamTrack = (mediaStream.getVideoTracks().length >= 1)? mediaStream.getVideoTracks()[0] : null;
                    if(VideoFound && settingsVideoStreamTrack != null){
                        settingsVideoStream = new MediaStream();
                        settingsVideoStream.addTrack(settingsVideoStreamTrack);
                        // Display Preview Video
                        localVideo.srcObject = settingsVideoStream;
                        localVideo.onloadedmetadata = function(e) {
                            localVideo.play();
                        }
                    }
                    else {
                        console.warn("No video / webcam devices found. Video Calling will not be possible.")
                    }
                }

                // Return .then()
                return navigator.mediaDevices.enumerateDevices();
            }).then(function(deviceInfos){
                for (var i = 0; i < deviceInfos.length; ++i) {
                    console.log("Found Device ("+ deviceInfos[i].kind +") Again: ", deviceInfos[i].label, deviceInfos[i].deviceId);

                    var deviceInfo = deviceInfos[i];
                    var devideId = deviceInfo.deviceId;
                    var DisplayName = deviceInfo.label;
                    if(DisplayName.indexOf("(") > 0) DisplayName = DisplayName.substring(0,DisplayName.indexOf("("));

                    var option = $('<option/>');
                    option.prop("value", devideId);
                    selectMicScr = $("#microphoneSrc");
                    // Audio Playback Source
        selectAudioScr = $("#playbackSrc");
        
        // Ring Device
        selectRingDevice = $("#ringDevice");

                    if (deviceInfo.kind === "audioinput") {
                        option.text((DisplayName != "")? DisplayName : "Microphone");
                        if(getAudioSrcID() == devideId) option.prop("selected", true);
                        selectMicScr.append(option);
                    }

                    
                    else if (deviceInfo.kind === "audiooutput") {
                        option.text((DisplayName != "")? DisplayName : "Speaker");
                        if(getAudioOutputID() == devideId) option.prop("selected", true);
                        selectAudioScr.append(option);
                        var ringOption = option.clone();
                        if(getRingerOutputID() == devideId) ringOption.prop("selected", true);
                        selectRingDevice.append(ringOption);
                    }
                    else if (deviceInfo.kind === "videoinput") {
                        if(EnableVideoCalling == true){
                            if(getVideoSrcID() == devideId) option.prop("selected", true);
                            option.text((DisplayName != "")? DisplayName : "Webcam");
                            selectVideoScr.append(option);
                        }
                    }
                }
                if(EnableVideoCalling == true){
                    // Add "Default" option
                    if(selectVideoScr.children('option').length > 0){
                        var option = $('<option/>');
                        option.prop("value", "default");
                        if(getVideoSrcID() == "default" || getVideoSrcID() == "" || getVideoSrcID() == "null") option.prop("selected", true);
                        option.text("("+ lang.default_video_src +")");
                        selectVideoScr.append(option);
                    }
                }
            }).catch(function(e){
                console.error(e);
                Alert(lang.alert_error_user_media, lang.error);
            });
        }).catch(function(e){
            console.error("Error getting Media Devices", e);
        });
    }
    else {
        Alert(lang.alert_media_devices, lang.error);
    }
    })

    const saveSettings=()=>{
        // The profileUserID identifies users
        if(localDB.getItem("profileUserID") == null) localDB.setItem("profileUserID", uID()); // For first time only
    
        // 1 Account
        if(EnableAccountSettings){
            localDB.setItem("wssServer", wssServer);
            localDB.setItem("WebSocketPort", WebSocketPort);
            localDB.setItem("ServerPath", ServerPath);
            localDB.setItem("profileName", profileName);
            localDB.setItem("SipDomain", SipDomain);
            localDB.setItem("SipUsername", SipUsername);
            localDB.setItem("SipPassword", SipPassword);

            // localDB.setItem("VoiceMailSubscribe", ($("#Configure_Account_Voicemail_Subscribe").is(':checked'))? "1" : "0");
            localDB.setItem("VoicemailDid", VoicemailDid);

            // localDB.setItem("ChatEngine", chatEng);

            // localDB.setItem("XmppServer", $("#Configure_Account_xmpp_address").val());
            // localDB.setItem("XmppWebsocketPort", $("#Configure_Account_xmpp_port").val());
            // localDB.setItem("XmppWebsocketPath", $("#Configure_Account_xmpp_path").val());
            // localDB.setItem("XmppDomain", $("#Configure_Account_xmpp_domain").val());
            // localDB.setItem("profileUser", $("#Configure_Account_profileUser").val());
        }

        // 2 Audio & Video
        localDB.setItem("AudioOutputId", selectAudioScr.val());
        localDB.setItem("AudioSrcId", selectMicScr.val());
        console.warn(selectMicScr.val())
        console.warn(selectAudioScr.val())
        console.warn(selectRingDevice.val())
        // localDB.setItem("AutoGainControl", ($("#Settings_AutoGainControl").is(':checked'))? "1" : "0");
        // localDB.setItem("EchoCancellation", ($("#Settings_EchoCancellation").is(':checked'))? "1" : "0");
        // localDB.setItem("NoiseSuppression", ($("#Settings_NoiseSuppression").is(':checked'))? "1" : "0");
        localDB.setItem("RingOutputId", selectRingDevice.val());

        // if(EnableVideoCalling == true){
        //     localDB.setItem("VideoSrcId", $("#previewVideoSrc").val());
        //     localDB.setItem("VideoHeight", $("input[name=Settings_Quality]:checked").val());
        //     localDB.setItem("FrameRate", $("input[name=Settings_FrameRate]:checked").val());
        //     localDB.setItem("AspectRatio", $("input[name=Settings_AspectRatio]:checked").val());
        //     localDB.setItem("VideoOrientation", $("input[name=Settings_Orientation]:checked").val());
        // }
        
        console.log("Calling create user agent callback ...")
        callback()
    }

    

    return (
        <div id="actionArea">
            <div style={{ textAlign: "right" }}><button className="roundButtons" onClick={() =>{
                console.log("toggle heading"); ShowContacts()}
        }><i className="fa fa-close"></i></button></div>

            <div border="0" className="UiSideField">

                {/* // SIP Account */}
                {/* {EnableAccountSettings == true ? ( */}
                    <div className="UiTextHeading" 
        //             style={{ 
        // padding: 20, 
        // backgroundColor: 'lightblue', 
        //  zIndex: 999,
        //  //position: 'relative'
        //  }} 
         onClick={(event) =>{
                        console.log("toggle heading");
                        ToggleHeading('Configure_Extension_Html')}}><i className="fa fa-user-circle-o UiTextHeadingIcon" style={{ backgroundColor: "#a93a3a" }}></i> {lang.account}</div>
                {/* // ) : ""} */}
                <div id="Configure_Extension_Html" 
                style={{ display: ConfigureExtension ? "unset" : "none" }}
                >
                    <div className="UiText">{lang.asterisk_server_address}:</div>
                    <div><input id="Configure_Account_wssServer" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setWssServer(e.target.value);
                }} type="text" placeholder={lang.eg_asterisk_server_address} value={wssServer} /></div>

                    <div className="UiText">{lang.websocket_port}</div>
                    <div><input id="Configure_Account_WebSocketPort" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setWebSocketPort(e.target.value);
                }} type="text" placeholder={lang.eg_websocket_port} value={WebSocketPort} /></div>

                    <div className="UiText">{lang.websocket_path}:</div>
                    <div><input id="Configure_Account_ServerPath" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setServerPath(e.target.value);
                }} type="text" placeholder={lang.eg_websocket_path} value={ServerPath} /></div>

                    <div className="UiText">{lang.full_name}:</div>
                    <div><input id="Configure_Account_profileName" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setProfileName(e.target.value);
                }} type="text" placeholder={lang.eg_full_name} value={profileName} /></div>

                    <div className="UiText">{lang.sip_domain}:</div>
                    <div><input id="Configure_Account_SipDomain" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setSipDomain(e.target.value);
                }}type="text" placeholder={lang.eg_sip_domain} value={SipDomain} /></div>

                    <div className="UiText">{lang.sip_username}:</div>
                    <div><input id="Configure_Account_SipUsername" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setSipUsername(e.target.value);
                }} type="text" placeholder={lang.eg_sip_username} value={SipUsername} /></div>

                    <div className="UiText">{lang.sip_password}:</div>
                    <div><input id="Configure_Account_SipPassword" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setSipPassword(e.target.value);
                }} type="password" placeholder={lang.eg_sip_password} value={SipPassword} /></div>

                    <div className="UiText">{lang.subscribe_voicemail}:</div>
                    <div><input type="checkbox" id="Configure_Account_Voicemail_Subscribe" checked={VoiceMailSubscribe == true} onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label htmlFor="Configure_Account_Voicemail_Subscribe">{lang.yes}</label></div>

                    <div id="Voicemail_Did_row" style={{ display: VoiceMailSubscribe == true ? "unset" : "none" }}>
                        <div className="UiText" style={{ marginLeft: "20px" }}>{lang.voicemail_did}:</div>
                        <div style={{ marginLeft: "20px" }}><input id="Configure_Account_Voicemail_Did" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="text" placeholder={lang.eg_internal_subscribe_extension} value={VoicemailDid} /></div>
                    </div>

                    <div className="UiText">{lang.chat_engine}:</div>

                    <ul style={{ listStyleType: "none" }}>
                        <li><input type="radio" name="chatEngine" onChange={(e) => {
                  e.preventDefault();
                  setVoicemailDid(e.target.value);
                }} id="chat_type_sip" checked={ChatEngine == "XMPP"} /><label htmlFor="chat_type_sip">SIP</label></li>
                        <li><input type="radio" name="chatEngine" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} id="chat_type_xmpp" checked={ChatEngine == "XMPP"} /><label htmlFor="chat_type_xmpp">XMPP</label></li>
                    </ul>

                    <div id="RowChatEngine_xmpp" style={{ display: (ChatEngine == "XMPP") ? "unset" : "none" }}>

                        <div className="UiText">{lang.xmpp_server_address}:</div>
                        <div><input id="Configure_Account_xmpp_address" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="text" placeholder={lang.eg_xmpp_server_address} value={getDbItem("XmppServer", "")} /></div>

                        <div className="UiText">XMPP {lang.websocket_port}:</div>
                        <div><input id="Configure_Account_xmpp_port" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="text" placeholder='"+ lang.eg_websocket_port +"' value='"+ getDbItem("XmppWebsocketPort", "") +"' /></div>

                        <div className="UiText">XMPP {lang.websocket_path}:</div>
                        <div><input id="Configure_Account_xmpp_path" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="text" placeholder='"+ lang.eg_websocket_path +"' value='"+ getDbItem("XmppWebsocketPath", "") +"' /></div>

                        <div className="UiText">XMPP {lang.sip_domain}:</div>
                        <div><input id="Configure_Account_xmpp_domain" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="text" placeholder='"+ lang.eg_sip_domain +"' value='"+ getDbItem("XmppDomain", "") +"' /></div>

                        <div className="UiText">{lang.extension_number}:</div>
                        <div><input id="Configure_Account_profileUser" className="UiInputText" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="text" placeholder={lang.eg_internal_subscribe_extension} value={getDbItem("profileUser", "")} /></div>
                    </div>

                </div>
                {/* if (EnableAccountSettings == true) html += AccountHtml; */}

                {/* // 2 Audio & Video */}
                <div className="UiTextHeading" onClick={() => ToggleHeading('Audio_Video_Html')}><i className="fa fa fa-video-camera UiTextHeadingIcon" style={{ backgroundColor: "#208e3c" }}></i> {lang.audio_video}</div>

                <div id="Audio_Video_Html" style={{ display: audioVideoHtml ? "unset" : "none" }}>

                    <div className="UiText">{lang.speaker}:</div>
                    <div style={{ textAlign: "center" }}><select id="playbackSrc" style={{ width: "100%" }} onChange={()=>{
                      console.log("Call to change Speaker ("+ this.value +")");
    
                      var audioObj = window.SettingsOutputAudio;
                      if(audioObj != null) {
                          if (typeof audioObj.sinkId !== 'undefined') {
                              audioObj.setSinkId(this.value).then(function() {
                                  console.log("sinkId applied to audioObj:", this.value);
                              }).catch(function(e){
                                  console.warn("Failed not apply setSinkId.", e);
                              });
                          }
                      }
                    }}></select></div>
                    <div className="Settings_VolumeOutput_Container"><div id="Settings_SpeakerOutput" className="Settings_VolumeOutput"></div></div>
                    <div><button className="roundButtons" id="preview_output_play" onClick={()=>previewOutputPlay()}><i className="fa fa-play"></i></button></div>

                    <div id="RingDeviceSection">
                        <div className="UiText">{lang.ring_device}:</div>
                        <div style={{ textAlign: "center" }}><select id="ringDevice" style={{ width: "100%" }} onChange={()=>{
                          console.log("Call to change WebCam ("+ this.value +")");
        
                          var localVideo = $("#local-video-preview").get(0);
                          localVideo.muted = true;
                          localVideo.playsinline = true;
                          localVideo.autoplay = true;
                  
                          var tracks = localVideo.srcObject.getTracks();
                          tracks.forEach(function(track) {
                              track.stop();
                          });
                  
                          var constraints = {
                              audio: false,
                              video: {
                                  deviceId: (this.value != "default")? { exact: this.value } : "default"
                              }
                          }
                          if($("input[name=Settings_FrameRate]:checked").val() != ""){
                              constraints.video.frameRate = $("input[name=Settings_FrameRate]:checked").val();
                          }
                          if($("input[name=Settings_Quality]:checked").val() != ""){
                              constraints.video.height = $("input[name=Settings_Quality]:checked").val();
                          }
                          if($("input[name=Settings_AspectRatio]:checked").val() != ""){
                              constraints.video.aspectRatio = $("input[name=Settings_AspectRatio]:checked").val();
                          } 
                          console.log("Constraints:", constraints);
                          var localStream = new MediaStream();
                          if(navigator.mediaDevices){
                              navigator.mediaDevices.getUserMedia(constraints).then(function(newStream){
                                  var videoTrack = newStream.getVideoTracks()[0];
                                  localStream.addTrack(videoTrack);
                                  localVideo.srcObject = localStream;
                                  localVideo.onloadedmetadata = function(e) {
                                      localVideo.play();
                                  }
                              }).catch(function(e){
                                  console.error(e);
                                  Alert(lang.alert_error_user_media, lang.error);
                              });
                          }
                        }}></select></div>
                        <div className="Settings_VolumeOutput_Container"><div id="Settings_RingerOutput" className="Settings_VolumeOutput"></div></div>
                        <div><button className="roundButtons" id="preview_ringer_play" onClick={()=>previewRingerPlay()}><i className="fa fa-play"></i></button></div>
                    </div>

                    <div className="UiText">{lang.microphone}:</div>
                    <div style={{ textAlign: "center" }}><select id="microphoneSrc" style={{ width: "100%" }} onChange={()=>{
                      console.log("Call to change Microphone ("+ this.value +")");
    
                      // Change and update visual preview
                      try{
                          var tracks = window.SettingsMicrophoneStream.getTracks();
                          tracks.forEach(function(track) {
                              track.stop();
                          });
                          window.SettingsMicrophoneStream = null;
                      }
                      catch(e){}
              
                      try{
                          soundMeter = window.SettingsMicrophoneSoundMeter;
                          soundMeter.stop();
                          window.SettingsMicrophoneSoundMeter = null;
                      }
                      catch(e){}
              
                      // Get Microphone
                      var constraints = { 
                          audio: {
                              deviceId: { exact: this.value }
                          }, 
                          video: false 
                      }
                      var localMicrophoneStream = new MediaStream();
                      navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
                          var audioTrack = mediaStream.getAudioTracks()[0];
                          if(audioTrack != null){
                              // Display Micrphone Levels
                              localMicrophoneStream.addTrack(audioTrack);
                              window.SettingsMicrophoneStream = localMicrophoneStream;
                              window.SettingsMicrophoneSoundMeter = MeterSettingsOutput(localMicrophoneStream, "Settings_MicrophoneOutput", "width", 50);
                          }
                      }).catch(function(e){
                          console.log("Failed to getUserMedia", e);
                      });
                    }}></select></div>
                    <div className="Settings_VolumeOutput_Container"><div id="Settings_MicrophoneOutput" className="Settings_VolumeOutput"></div></div>
                    <div><input type="checkbox" id="Settings_AutoGainControl" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label htmlFor="Settings_AutoGainControl"> {lang.auto_gain_control}</label></div>
                    <div><input type="checkbox" id="Settings_EchoCancellation" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label htmlFor="Settings_EchoCancellation"> {lang.echo_cancellation}</label></div>
                    <div><input type="checkbox" id="Settings_NoiseSuppression" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label htmlFor="Settings_NoiseSuppression"> {lang.noise_suppression}</label></div>

                    {EnableVideoCalling} (
                    <div className="UiText">{lang.camera}:</div>
                    <div style={{ textAlign: "center" }}><select id="previewVideoSrc" style={{ width: "100%" }}></select></div>

                    <div className="UiText">{lang.frame_rate}:</div>
                    <div className="pill-nav">";
                        <input name="Settings_FrameRate" id="r40" type="radio" value="2" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r40">2</label>
                        <input name="Settings_FrameRate" id="r41" type="radio" value="5" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r41">5</label>
                        <input name="Settings_FrameRate" id="r42" type="radio" value="10" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r42">10</label>
                        <input name="Settings_FrameRate" id="r43" type="radio" value="15" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r43">15</label>
                        <input name="Settings_FrameRate" id="r44" type="radio" value="20" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r44">20</label>
                        <input name="Settings_FrameRate" id="r45" type="radio" value="25" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r45">25</label>
                        <input name="Settings_FrameRate" id="r46" type="radio" value="30" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r46">30</label>
                        <input name="Settings_FrameRate" id="r47" type="radio" value="" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r47"><i className="fa fa-trash"></i></label>
                    </div>

                    <div className="UiText">{lang.quality}:</div>
                    <div className="pill-nav">
                        <input name="Settings_Quality" id="r30" type="radio" value="160" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r30"><i className="fa fa-video-camera" style={{ transform: "scale(0.4)" }}></i> HQVGA</label>
                        <input name="Settings_Quality" id="r31" type="radio" value="240" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}/><label className="radio_pill" htmlFor="r31"><i className="fa fa-video-camera" style={{ transform: "scale(0.6)" }}></i> QVGA</label>
                        <input name="Settings_Quality" id="r32" type="radio" value="480" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r32"><i className="fa fa-video-camera" style={{ transform: "scale(0.8)" }}></i> VGA</label>
                        <input name="Settings_Quality" id="r33" type="radio" value="720" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}/><label className="radio_pill" htmlFor="r33"><i className="fa fa-video-camera" style={{ transform: "scale(1)" }}></i> HD</label>
                        <input name="Settings_Quality" id="r34" type="radio" value="" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} /><label className="radio_pill" htmlFor="r34"><i className="fa fa-trash"></i></label>
                    </div>

                    <div className="UiText">{lang.image_orientation}:</div>
                    <div className="pill-nav">
                        <input name="Settings_Orientation" id="r20" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="radio" value="rotateY(0deg)" /><label className="radio_pill" htmlFor="r20"><i className="fa fa-address-card" style={{ transform: "rotateY(0deg)" }}></i> {lang.image_orientation_normal}</label>
                        <input name="Settings_Orientation" id="r21" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="radio" value="rotateY(180deg)" /><label className="radio_pill" htmlFor="r21"><i className="fa fa-address-card" style={{ transform: "rotateY(180deg)" }}></i> {lang.image_orientation_mirror}</label>
                    </div>

                    <div className="UiText">{lang.aspect_ratio}:</div>
                    <div className="pill-nav">
                        <input name="Settings_AspectRatio" id="r10" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="radio" value="1" /><label className="radio_pill" htmlFor="r10"><i className="fa fa-square-o" style={{ transform: "scaleX(1)", marginLeft: "7px", marginRight: "7px" }}></i> 1:1</label>
                        <input name="Settings_AspectRatio" id="r11" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="radio" value="1.33" /><label className="radio_pill" htmlFor="r11"><i className="fa fa-square-o" style={{ transform: "scaleX(1.33)", marginLeft: "5px", marginRight: "5px" }}></i> 4:3</label>
                        <input name="Settings_AspectRatio" id="r12" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="radio" value="1.77" /><label className="radio_pill" htmlFor="r12"><i className="fa fa-square-o" style={{ transform: "scaleX(1.77)", marginRight: "3px" }}></i> 16:9</label>
                        <input name="Settings_AspectRatio" id="r13" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="radio" value="" /><label className="radio_pill" htmlFor="r13"><i className="fa fa-trash"></i></label>
                    </div>

                    <div className="UiText">{lang.preview}:</div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}><video id="local-video-preview" className="previewVideo" muted playsInline></video></div>
                    )

                </div>



                {/* // 3 Appearance */}
                {/* {EnableAppearanceSettings == true} */}
                <div className="UiTextHeading" onClick={() => ToggleHeading('Appearance_Html')}><i className="fa fa-pencil UiTextHeadingIcon" style={{ backgroundColor: "#416493" }}></i> {lang.appearance}</div>


                <div id="Appearance_Html" style={{ display: appearanceHtml ? "unset" : "none" }}>
                    <div id="ImageCanvas" style={{ width: "150px", height: "150px" }}></div>
                    <div style={{ marginTop: "50px" }}><input id="fileUploader" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} type="file" /></div>
                    <div style={{ marginTop: "10px" }}></div>

                    {/* // SIP & XMPP vCard */}

                    {getDbItem("profileVcard", null) != null ? profileVcard = JSON.parse(getDbItem("profileVcard", null)) : ""}

                    <div className="UiText">{lang.title_description}:</div>
                    <div><input id="Configure_Profile_TitleDesc" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} className="UiInputText" type="text" placeholder={lang.eg_general_manager} value={((profileVcard != null)? profileVcard.TitleDesc : "")} /></div>
                    <div className="UiText">{lang.mobile_number}:</div>
                    <div><input id="Configure_Profile_Mobile" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} className="UiInputText" type="text" placeholder={lang.eg_mobile_number} value={((profileVcard != null)? profileVcard.Mobile : "")} /></div>
                    <div className="UiText">{lang.email}:</div>
                    <div><input id="Configure_Profile_Email" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} className="UiInputText" type="text" placeholder={lang.email} value={((profileVcard != null)? profileVcard.Email : "")} /></div>
                    <div className="UiText">{lang.contact_number_1}:</div>
                    <div><input id="Configure_Profile_Number1" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} className="UiInputText" type="text" placeholder={lang.eg_contact_number_1} value={((profileVcard != null)? profileVcard.Number1 : "")} /></div>
                    <div className="UiText">{lang.contact_number_2}:</div>
                    <div><input id="Configure_Profile_Number2" onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }} className="UiInputText" type="text" placeholder={lang.eg_contact_number_2} value={((profileVcard != null)? profileVcard.Number2 : "")} /></div>

                </div>

                {/* if (EnableAppearanceSettings == true) html += AppearanceHtml; */}

                {/* // 4 Notifications */}
                {/* if (EnableNotificationSettings == true) { */}
                <div className="UiTextHeading" onClick={() => ToggleHeading('Notifications_Html')}><i className="fa fa-bell UiTextHeadingIcon" style={{ backgroundColor: "#ab8e04" }}></i> {lang.notifications}</div>
                {/* } */}

                <div id="Notifications_Html" style={{ display: notificationsHtml ? "unset" : "none" }}>
                    <div className="UiText">{lang.notifications}:</div>
                    <div><input type="checkbox" id="Settings_Notifications" onChange={()=>{
                  if(this.checked){
                    if(Notification.permission != "granted"){
                        if(checkNotificationPromise()){
                            Notification.requestPermission().then(function(p){
                                console.log(p);
                                HandleNotifyPermission(p);
                            });
                        }
                        else {
                            Notification.requestPermission(function(p){
                                console.log(p);
                                HandleNotifyPermission(p)
                            });
                        }
                    }
                }
                }}/><label htmlFor="Settings_Notifications"> {lang.enable_onscreen_notifications}</label></div>
                </div>
                {/* // TODO: Add ring tone selection etc */}

                {/* if (EnableNotificationSettings == true) html += NotificationsHtml; */}

            </div>

            <div className="UiWindowButtonBar" id="ButtonBar"><button onClick={()=>{
                saveSettings();
            }}>Save</button><button>Cancel</button></div>
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

      
                    