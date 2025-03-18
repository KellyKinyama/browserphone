import { useEffect, useState } from "react";

import { ShowDial } from './ShowDial'
import { ShowMyProfile } from "./ShowMyProfile";
import { UpdateBuddyList } from "./UpdateBuddyList"
import { AddLineHtml } from "./AddLineHtml"
import { ChatBody } from "./ChatBody"

const ChatApp = () => {

    const [showDial, setShowDial] = useState(false)
    const [lineHtml, setLineHtml] = useState(false)

    const [myBuddies, setyMyBuddies] = useState({})
    const [selectedBuddyObj, setSelectedBuddyObj] = useState(null)

    const [lineObjectHtml, setLineObjectHtml] = useState(null)

    // Create User Agent
    // =================
    function CreateUserAgent() {
        console.log("Creating User Agent...");

        wssServer = localDB.getItem("wssServer", wssServer);
        WebSocketPort = localDB.getItem("WebSocketPort", WebSocketPort);
        ServerPath = localDB.getItem("ServerPath", ServerPath);
        profileName = localDB.getItem("profileName", profileName);
        SipDomain = localDB.getItem("SipDomain", SipDomain);
        SipUsername = localDB.getItem("SipUsername", SipUsername);
        SipPassword = localDB.getItem("SipPassword", SipPassword);
        if (SipDomain == null || SipDomain == "" || SipDomain == "null" || SipDomain == "undefined") SipDomain = wssServer; // Sets globally
        var options = {
            logConfiguration: false,            // If true, constructor logs the registerer configuration.
            uri: SIP.UserAgent.makeURI("sip:" + SipUsername + "@" + SipDomain),
            transportOptions: {
                server: "ws://" + wssServer + ":" + WebSocketPort + "" + ServerPath,
                traceSip: false,
                connectionTimeout: TransportConnectionTimeout
                // keepAliveInterval: 30 // Uncomment this and make this any number greater then 0 for keep alive... 
                // NB, adding a keep alive will NOT fix bad internet, if your connection cannot stay open (permanent WebSocket Connection) you probably 
                // have a router or ISP issue, and if your internet is so poor that you need to some how keep it alive with empty packets
                // upgrade you internet connection. This is voip we are talking about here.
            },
            sessionDescriptionHandlerFactoryOptions: {
                peerConnectionConfiguration: {
                    bundlePolicy: BundlePolicy,
                    // certificates: undefined,
                    // iceCandidatePoolSize: 10,
                    // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
                    // iceTransportPolicy: "all",
                    // peerIdentity: undefined,
                    // rtcpMuxPolicy: "require",
                },
                iceGatheringTimeout: IceStunCheckTimeout
            },
            contactName: ContactUserName,
            displayName: profileName,
            authorizationUsername: SipUsername,
            authorizationPassword: SipPassword,
            hackIpInContact: IpInContact,           // Asterisk should also be set to rewrite contact
            userAgentString: userAgentStr,
            autoStart: false,
            autoStop: true,
            register: false,
            noAnswerTimeout: NoAnswerTimeout,
            // sipExtension100rel: // UNSUPPORTED | SUPPORTED | REQUIRED NOTE: rel100 is not supported
            contactParams: {},
            delegate: {
                onInvite: function (sip) {
                    ReceiveCall(sip);
                },
                onMessage: function (sip) {
                    ReceiveOutOfDialogMessage(sip);
                }
            }
        }
        if (IceStunServerJson != "") {
            options.sessionDescriptionHandlerFactoryOptions.peerConnectionConfiguration.iceServers = JSON.parse(IceStunServerJson);
        }

        // Added to the contact BEFORE the '>' (permanent)
        if (RegisterContactParams && RegisterContactParams != "" && RegisterContactParams != "{}") {
            try {
                options.contactParams = JSON.parse(RegisterContactParams);
            } catch (e) { }
        }
        if (WssInTransport) {
            try {
                options.contactParams.transport = "wss";
            } catch (e) { }
        }

        // Add (Hardcode) other RTCPeerConnection({ rtcConfiguration }) config dictionary options here
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection
        // Example: 
        // options.sessionDescriptionHandlerFactoryOptions.peerConnectionConfiguration.rtcpMuxPolicy = "require";

        userAgent = new SIP.UserAgent(options);
        userAgent.isRegistered = function () {
            return (userAgent && userAgent.registerer && userAgent.registerer.state == SIP.RegistererState.Registered);
        }
        // For some reason this is marked as private... not sure why
        userAgent.sessions = userAgent._sessions;
        userAgent.registrationCompleted = false;
        userAgent.registering = false;
        userAgent.transport.ReconnectionAttempts = TransportReconnectionAttempts;
        userAgent.transport.attemptingReconnection = false;
        userAgent.BlfSubs = [];
        userAgent.lastVoicemailCount = 0;

        console.log("Creating User Agent... Done");
        // Custom Web hook
        if (typeof web_hook_on_userAgent_created !== 'undefined') web_hook_on_userAgent_created(userAgent);

        userAgent.transport.onConnect = function () {
            onTransportConnected();
        }
        userAgent.transport.onDisconnect = function (error) {
            if (error) {
                onTransportConnectError(error);
            }
            else {
                onTransportDisconnected();
            }
        }

        var RegistererOptions = {
            logConfiguration: false,            // If true, constructor logs the registerer configuration.
            expires: RegisterExpires,
            extraHeaders: [],
            extraContactHeaderParams: [],
            refreshFrequency: 75              // Determines when a re-REGISTER request is sent. The value should be specified as a percentage of the expiration time (between 50 and 99).
        }

        // Added to the SIP Headers
        if (RegisterExtraHeaders && RegisterExtraHeaders != "" && RegisterExtraHeaders != "{}") {
            try {
                var registerExtraHeaders = JSON.parse(RegisterExtraHeaders);
                for (const [key, value] of Object.entries(registerExtraHeaders)) {
                    if (value != "") {
                        RegistererOptions.extraHeaders.push(key + ": " + value);
                    }
                }
            } catch (e) { }
        }

        // Added to the contact AFTER the '>' (not permanent)
        if (RegisterExtraContactParams && RegisterExtraContactParams != "" && RegisterExtraContactParams != "{}") {
            try {
                var registerExtraContactParams = JSON.parse(RegisterExtraContactParams);
                for (const [key, value] of Object.entries(registerExtraContactParams)) {
                    if (value == "") {
                        RegistererOptions.extraContactHeaderParams.push(key);
                    } else {
                        RegistererOptions.extraContactHeaderParams.push(key + "=" + value);
                    }
                }
            } catch (e) { }
        }

        userAgent.registerer = new SIP.Registerer(userAgent, RegistererOptions);
        console.log("Creating Registerer... Done");

        userAgent.registerer.stateChange.addListener(function (newState) {
            console.log("User Agent Registration State:", newState);
            switch (newState) {
                case SIP.RegistererState.Initial:
                    // Nothing to do
                    break;
                case SIP.RegistererState.Registered:
                    onRegistered();
                    break;
                case SIP.RegistererState.Unregistered:
                    onUnregistered();
                    break;
                case SIP.RegistererState.Terminated:
                    // Nothing to do
                    break;
            }
        });

        console.log("User Agent Connecting to WebSocket...");
        $("#regStatus").html(lang.connecting_to_web_socket);
        userAgent.start().catch(function (error) {
            onTransportConnectError(error);
        });

    }

    // Transport Events
    // ================
    function onTransportConnected() {
        console.log("Connected to Web Socket!");
        $("#regStatus").html(lang.connected_to_web_socket);

        $("#WebRtcFailed").hide();

        // Reset the ReconnectionAttempts
        userAgent.isReRegister = false;
        userAgent.transport.attemptingReconnection = false;
        userAgent.transport.ReconnectionAttempts = TransportReconnectionAttempts;

        // Auto start register
        if (userAgent.transport.attemptingReconnection == false && userAgent.registering == false) {
            window.setTimeout(function () {
                Register();
            }, 500);
        } else {
            console.warn("onTransportConnected: Register() called, but attemptingReconnection is true or registering is true")
        }
    }
    function onTransportConnectError(error) {
        console.warn("WebSocket Connection Failed:", error);

        // We set this flag here so that the re-register attempts are fully completed.
        userAgent.isReRegister = false;

        // If there is an issue with the WS connection
        // We unregister, so that we register again once its up
        console.log("Unregister...");
        try {
            userAgent.registerer.unregister();
        } catch (e) {
            // I know!!!
        }

        $("#regStatus").html(lang.web_socket_error);
        $("#WebRtcFailed").show();

        ReconnectTransport();

        // Custom Web hook
        if (typeof web_hook_on_transportError !== 'undefined') web_hook_on_transportError(userAgent.transport, userAgent);
    }
    function onTransportDisconnected() {
        console.log("Disconnected from Web Socket!");
        $("#regStatus").html(lang.disconnected_from_web_socket);

        userAgent.isReRegister = false;
    }
    function ReconnectTransport() {
        if (userAgent == null) return;

        userAgent.registering = false; // if the transport was down, you will not be registered
        if (userAgent.transport && userAgent.transport.isConnected()) {
            // Asked to re-connect, but ws is connected
            onTransportConnected();
            return;
        }
        console.log("Reconnect Transport...");

        window.setTimeout(function () {
            $("#regStatus").html(lang.connecting_to_web_socket);
            console.log("ReConnecting to WebSocket...");

            if (userAgent.transport && userAgent.transport.isConnected()) {
                // Already Connected
                onTransportConnected();
                return;
            } else {
                userAgent.transport.attemptingReconnection = true
                userAgent.reconnect().catch(function (error) {
                    userAgent.transport.attemptingReconnection = false
                    console.warn("Failed to reconnect", error);

                    // Try Again
                    ReconnectTransport();
                });
            }
        }, TransportReconnectionTimeout * 1000);

        $("#regStatus").html(lang.connecting_to_web_socket);
        console.log("Waiting to Re-connect...", TransportReconnectionTimeout, "Attempt remaining", userAgent.transport.ReconnectionAttempts);
        userAgent.transport.ReconnectionAttempts = userAgent.transport.ReconnectionAttempts - 1;
    }

    // Registration
    // ============
    function Register() {
        if (userAgent == null) return;
        if (userAgent.registering == true) return;
        if (userAgent.isRegistered()) return;

        var RegistererRegisterOptions = {
            requestDelegate: {
                onReject: function (sip) {
                    onRegisterFailed(sip.message.reasonPhrase, sip.message.statusCode);
                }
            }
        }

        console.log("Sending Registration...");
        $("#regStatus").html(lang.sending_registration);
        userAgent.registering = true
        userAgent.registerer.register(RegistererRegisterOptions);
    }
    function Unregister(skipUnsubscribe) {
        if (userAgent == null || !userAgent.isRegistered()) return;

        if (skipUnsubscribe == true) {
            console.log("Skipping Unsubscribe");
        } else {
            console.log("Unsubscribing...");
            $("#regStatus").html(lang.unsubscribing);
            try {
                UnsubscribeAll();
            } catch (e) { }
        }

        console.log("Unregister...");
        $("#regStatus").html(lang.disconnecting);
        userAgent.registerer.unregister();

        userAgent.transport.attemptingReconnection = false;
        userAgent.registering = false;
        userAgent.isReRegister = false;
    }

    // Registration Events
    // ===================
    /**
     * Called when account is registered
     */
    function onRegistered() {
        // This code fires on re-register after session timeout
        // to ensure that events are not fired multiple times
        // a isReRegister state is kept.
        // TODO: This check appears obsolete

        userAgent.registrationCompleted = true;
        if (!userAgent.isReRegister) {
            console.log("Registered!");
            setShowDial(true)

            $("#reglink").hide();
            $("#dereglink").show();
            if (DoNotDisturbEnabled || DoNotDisturbPolicy == "enabled") {
                $("#dereglink").attr("class", "dotDoNotDisturb");
                $("#dndStatus").html("(DND)");
            }

            // Start Subscribe Loop
            window.setTimeout(function () {
                SubscribeAll();
            }, 500);

            // Output to status
            $("#regStatus").html(lang.registered);

            // Start XMPP
            if (ChatEngine == "XMPP") reconnectXmpp();

            userAgent.registering = false;

            // Close possible Alerts that may be open. (Can be from failed registers)
            if (alertObj != null) {
                alertObj.dialog("close");
                alertObj = null;
            }

            // Custom Web hook
            if (typeof web_hook_on_register !== 'undefined') web_hook_on_register(userAgent);
        }
        else {
            userAgent.registering = false;

            console.log("ReRegistered!");
        }
        userAgent.isReRegister = true;
    }
    /**
     * Called if UserAgent can connect, but not register.
     * @param {string} response Incoming request message
     * @param {string} cause Cause message. Unused
    **/
    function onRegisterFailed(response, cause) {
        console.log("Registration Failed: " + response);
        $("#regStatus").html(lang.registration_failed);

        $("#reglink").show();
        $("#dereglink").hide();

        Alert(lang.registration_failed + ":" + response, lang.registration_failed);

        userAgent.registering = false;

        // Custom Web hook
        if (typeof web_hook_on_registrationFailed !== 'undefined') web_hook_on_registrationFailed(response);
    }
    /**
     * Called when Unregister is requested
     */
    function onUnregistered() {
        if (userAgent.registrationCompleted) {
            console.log("Unregistered, bye!");
            $("#regStatus").html(lang.unregistered);

            $("#reglink").show();
            $("#dereglink").hide();

            // Custom Web hook
            if (typeof web_hook_on_unregistered !== 'undefined') web_hook_on_unregistered();
        }
        else {
            // Was never really registered, so cant really say unregistered
        }

        // We set this flag here so that the re-register attempts are fully completed.
        userAgent.isReRegister = false;
    }

    // Presence / Subscribe
    // ====================
    function SubscribeAll() {
        if (!userAgent.isRegistered()) return;

        if (VoiceMailSubscribe) {
            SubscribeVoicemail();
        }
        if (SubscribeToYourself) {
            SelfSubscribe();
        }

        // Start subscribe all
        if (userAgent.BlfSubs && userAgent.BlfSubs.length > 0) {
            UnsubscribeAll();
        }
        userAgent.BlfSubs = [];
        if (Buddies.length >= 1) {
            console.log("Starting Subscribe of all (" + Buddies.length + ") Extension Buddies...");
            for (var b = 0; b < Buddies.length; b++) {
                SubscribeBuddy(Buddies[b]);
            }
        }
    }
    function SelfSubscribe() {
        if (!userAgent.isRegistered()) return;

        if (userAgent.selfSub) {
            console.log("Unsubscribe from old self subscribe...");
            SelfUnsubscribe();
        }

        var targetURI = SIP.UserAgent.makeURI("sip:" + SipUsername + "@" + SipDomain);

        var options = {
            expires: SubscribeBuddyExpires,
            extraHeaders: ['Accept: ' + SubscribeBuddyAccept]
        }

        userAgent.selfSub = new SIP.Subscriber(userAgent, targetURI, SubscribeBuddyEvent, options);
        userAgent.selfSub.delegate = {
            onNotify: function (sip) {
                ReceiveNotify(sip, true);
            }
        }
        console.log("SUBSCRIBE Self: " + SipUsername + "@" + SipDomain);
        userAgent.selfSub.subscribe().catch(function (error) {
            console.warn("Error subscribing to yourself:", error);
        });
    }

    function SubscribeVoicemail() {
        if (!userAgent.isRegistered()) return;

        if (userAgent.voicemailSub) {
            console.log("Unsubscribe from old voicemail Messages...");
            UnsubscribeVoicemail();
        }

        var vmOptions = { expires: SubscribeVoicemailExpires }
        var targetURI = SIP.UserAgent.makeURI("sip:" + SipUsername + "@" + SipDomain);
        userAgent.voicemailSub = new SIP.Subscriber(userAgent, targetURI, "message-summary", vmOptions);
        userAgent.voicemailSub.delegate = {
            onNotify: function (sip) {
                VoicemailNotify(sip);
            }
        }
        console.log("SUBSCRIBE VOICEMAIL: " + SipUsername + "@" + SipDomain);
        userAgent.voicemailSub.subscribe().catch(function (error) {
            console.warn("Error subscribing to voicemail notifications:", error);
        });
    }




    /**
     * Primary method for making a call. 
     * @param {string} type (required) Either "audio" or "video". Will setup UI according to this type.
     * @param {Buddy} buddy (optional) The buddy to dial if provided.
     * @param {sting} numToDial (required) The number to dial.
     * @param {string} CallerID (optional) If no buddy provided, one is generated automatically using this callerID and the numToDial
     * @param {Array<string>} extraHeaders = (optional) Array of headers to include in the INVITE eg: ["foo: bar"] (Note the space after the :)
     */
    function DialByLine(type, buddy, numToDial, CallerID, extraHeaders) {
        if (userAgent == null || userAgent.isRegistered() == false) {
            ShowMyProfile();
            return;
        }

        var numDial = (numToDial) ? numToDial : $("#dialText").val();
        if (EnableAlphanumericDial) {
            numDial = numDial.replace(telAlphanumericRegEx, "").substring(0, MaxDidLength);
        }
        else {
            numDial = numDial.replace(telNumericRegEx, "").substring(0, MaxDidLength);
        }
        if (numDial.length == 0) {
            console.warn("Enter number to dial");
            return;
        }

        // ShowContacts();

        // Create a Buddy if one is not already existing
        var buddyObj = (buddy) ? FindBuddyByIdentity(buddy) : FindBuddyByDid(numDial);
        if (buddyObj == null) {
            var buddyType = (numDial.length > DidLength) ? "contact" : "extension";
            // Assumption but anyway: If the number starts with a * or # then its probably not a subscribable did,  
            // and is probably a feature code.
            if (numDial.substring(0, 1) == "*" || numDial.substring(0, 1) == "#") buddyType = "contact";
            buddyObj = MakeBuddy(buddyType, true, false, false, (CallerID) ? CallerID : numDial, numDial, null, false, null, AutoDeleteDefault, false);
        }

        // Create a Line
        newLineNumber = newLineNumber + 1;
        var lineObj = new Line(newLineNumber, buddyObj.CallerIDName, numDial, buddyObj);
        Lines.push(lineObj);
        // AddLineHtml(lineObj, "outbound");
        setLineHtml(true)
        setLineObjectHtml(lineObj)
        SelectLine(newLineNumber);
        UpdateBuddyList();

        // Start Call Invite
        if (type == "audio") {
            AudioCall(lineObj, numDial, extraHeaders);
        }
        else {
            VideoCall(lineObj, numDial, extraHeaders);
        }

        try {
            $("#line-" + newLineNumber).get(0).scrollIntoViewIfNeeded();
        } catch (e) { }
    }



    useEffect(() => {
        PreloadAudioFiles();

        // Custom Web hook
        if (typeof web_hook_on_init !== 'undefined') web_hook_on_init();

        // CreateUserAgent();
    })

    return (


        <div id="Phone" className="pageContainer" style={{ maxWidth: UiMaxWidth + "px" }}>
            {/* // Left Section */}

            <div id="leftContent" className="leftContent" style={{
                float: "left",
                height: "600px",
                //  height: "100%",
                width: "600px"
            }}>
                {/* <div id="leftContent" className="leftContent" style={{float:"left", height: "100%", width:"1000px"}}> */}

                <table id="leftContentTable" className="leftContentTable" style={{ height: "100%", width: "100%" }} cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr><td className="streamSection" style={{ height: "50px", boxSizing: "border-box" }}>


                            <div className="profileContainer">

                                <div className="contact" id="UserProfile" style={{ cursor: "default", marginBottom: "5px" }}>

                                    <span id="TxtVoiceMessages" className="voiceMessageNotifyer" onClick={() => {
                                        if (VoicemailDid != "") {
                                            DialByLine("audio", null, VoicemailDid, lang.voice_mail);
                                        }
                                    }}>0</span>
                                    <div id="UserProfilePic" className="buddyIcon"></div>


                                    <span className="settingsMenu">
                                        <button className="roundButtons" id="BtnFreeDial" onClick={(event) => {
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
                                        <button className="roundButtons" id="BtnAddSomeone" onClick={() => {
                                            if (UiCustomAddBuddy == true) {
                                                if (typeof web_hook_on_add_buddy !== 'undefined') {
                                                    web_hook_on_add_buddy(event);
                                                }
                                            } else {
                                                AddSomeoneWindow();
                                            }
                                        }}><i className="fa fa-user-plus"></i></button>


                                        <button id="BtnCreateGroup" onClick={() => {
                                            CreateGroupWindow();
                                        }}><i className="fa fa-users"></i><i className="fa fa-plus" style={{ fontSize: "9px" }}></i></button>


                                        <button className="roundButtons" id="SettingsMenu" onClick={() => {
                                            if (UiCustomConfigMenu == true) {
                                                if (typeof web_hook_on_config_menu !== 'undefined') {
                                                    web_hook_on_config_menu(event);
                                                }
                                            } else {
                                                ShowMyProfileMenu(this);
                                            }
                                        }}><i className="fa fa-cogs"></i></button>
                                    </span>


                                    <div className="contactNameText" style={{ marginRight: "0px" }}>

                                        <span id="dereglink" className="dotOnline" style={{ display: "none" }} onClick={() => {
                                            UnRegister()
                                        }}></span>
                                        <span id="WebRtcFailed" className="dotFailed" style={{ display: "none" }} onClick={() => {
                                            Confirm(lang.error_connecting_web_socket, lang.web_socket_error, function () {
                                                window.open("https://" + wssServer + ":" + WebSocketPort + "/httpstatus");
                                            }, null);
                                        }}></span>
                                        <span id="reglink" className="dotOffline" onClick={() => {
                                            Register()
                                        }}></span>

                                        <span id="UserCallID"></span>
                                    </div>
                                    <div className="presenceText"><span id="regStatus">&nbsp;</span> <span id="dndStatus"></span></div>
                                </div>

                            </div>

                        </td></tr>
                        <tr id="searchArea"><td className="streamSection" style={{ height: "35px", boxSizing: "border-box", paddingTop: "3px", paddingBottom: "0px" }}>


                            <span id="divFindBuddy" className="searchClean"><input id="txtFindBuddy" type="text" autoComplete="none" style={{ width: "calc(100% - 78px)" }} /></span>
                            <button className="roundButtons" id="BtnFilter" style={{ marginLeft: "5px" }} onClick={() => {
                                if (UiCustomSortAndFilterButton == true) {
                                    if (typeof web_hook_sort_and_filter !== 'undefined') {
                                        web_hook_sort_and_filter(event);
                                    }
                                } else {
                                    ShowSortAnfFilter();
                                }
                            }} onKeyUp={() => {
                                UpdateBuddyList();
                                $("#txtFindBuddy").focus();
                            }}><i className="fa fa-sliders"></i></button>

                        </td>
                        </tr>
                        <tr><td className="streamSection">

                            {/* <div id="myContacts" className="contactArea cleanScroller">
                                <div id="contact-17420180671131F15" className="buddySelected"
                                    onClick={() => {

                                        console.log("Selecting buddy: ",'17420180671131F15')
                                        setSelectedBuddyObj('17420180671131F15')
                                        //  SelectBuddy('17420180671131F15', 'extension')
                                    }}>
                                    <span id="contact-17420180671131F15-missed" className="missedNotifyer" style={{ display: "none" }}>0</span>
                                    <div id="contact-17420180671131F15-picture" className="buddyIcon" style={{ backgroundImage: "url('avatars/default.1.webp')" }}></div>
                                    <div className="contactNameText">
                                        <span id="contact-17420180671131F15-devstate" className="dotDefault"></span> 2056</div>
                                    <div id="contact-17420180671131F15-datetime" className="contactDate"><i className="fa fa-clock-o"></i> 7:54:51 AM</div>
                                    <div id="contact-17420180671131F15-presence" className="presenceText"></div></div>
                            </div> */}
                            {/* <div id="actionArea" style={{display:"none"}} className="contactArea cleanScroller"></div> */}
                            {/* <ChatBody /> */}
                            {showDial ? (<ShowDial dialCallback={DialByLine} />) : <ShowMyProfile callback={CreateUserAgent} />}

                        </td>
                        </tr>
                    </tbody>
                </table>

            </div>


            {/* {lineHtml == true ? <AddLineHtml lineObjectHtml={lineObjectHtml} /> : ""} */}

        </div>
    )
}

export default ChatApp;