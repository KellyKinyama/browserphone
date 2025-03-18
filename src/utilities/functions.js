

// Global Settings
// ===============
const appversion = "0.3.29";
const sipjsversion = "0.20.0";
const navUserAgent = window.navigator.userAgent;  // TODO: change to Navigator.userAgentData
const instanceID = String(Date.now());
const localDB = window.localStorage;

function getDbItem(itemIndex, defaultValue){
    if(localDB.getItem(itemIndex) != null) return localDB.getItem(itemIndex);
    return defaultValue;
}

/**
 * Language Packs (lang/xx.json)
 * Note: The following should correspond to files on your server. 
 * eg: If you list "fr" then you need to add the file "fr.json".
 * Use the "en.json" as a template.
 * More specific language must be first. ie: "zh-hans" should be before "zh".
 * "en.json" is always loaded by default
 */
let loadAlternateLang = (getDbItem("loadAlternateLang", "0") == "1"); // Enables searching and loading for the additional language packs other thAan /en.json
const availableLang = ["fr", "ja", "zh-hans", "zh", "ru", "tr", "nl", "es", "de", "pl", "pt-br"]; // Defines the language packs (.json) available in /lang/ folder

/**
 * Image Assets
 * Note: You can specify the assets to use below in array format
 */
let imagesDirectory = getDbItem("imagesDirectory", "");     // Directory For Image Assets eg: images/ 
let defaultAvatars = getDbItem("defaultAvatars", "avatars/default.0.webp,avatars/default.1.webp,avatars/default.2.webp,avatars/default.3.webp,avatars/default.4.webp,avatars/default.5.webp,avatars/default.6.webp,avatars/default.7.webp,avatars/default.8.webp"); 
let wallpaperLight = getDbItem("wallpaperLight", "wallpaper.light.webp");  // Wallpaper for Light Theme
let wallpaperDark = getDbItem("wallpaperDark", "wallpaper.dark.webp");     // Wallpaper for Dark Theme

/**
 * 
 * User Settings & Defaults
 * Note: Generally you don't really need to be changing these settings, the defaults should be fine
 * If you want to  keep this library in its original form, but still provision settings, look at the
 * index.html for some sample provisioning and web_hook options.
 */
let profileUserID = getDbItem("profileUserID", null);   // Internal reference ID. (DON'T CHANGE THIS!)
let profileName = getDbItem("profileName", null);       // eg: Keyla James
let wssServer = getDbItem("wssServer", null);           // eg: raspberrypi.local
let WebSocketPort = getDbItem("WebSocketPort", null);   // eg: 444 | 4443
let ServerPath = getDbItem("ServerPath", null);         // eg: /ws
let SipDomain = getDbItem("SipDomain", null);           // eg: raspberrypi.local
let SipUsername = getDbItem("SipUsername", null);       // eg: webrtc
let SipPassword = getDbItem("SipPassword", null);       // eg: webrtc

let SingleInstance = (getDbItem("SingleInstance", "1") == "1");      // Un-registers this account if the phone is opened in another tab/window

let TransportConnectionTimeout = parseInt(getDbItem("TransportConnectionTimeout", 15));          // The timeout in seconds for the initial connection to make on the web socket port
let TransportReconnectionAttempts = parseInt(getDbItem("TransportReconnectionAttempts", 999));   // The number of times to attempt to reconnect to a WebSocket when the connection drops.
let TransportReconnectionTimeout = parseInt(getDbItem("TransportReconnectionTimeout", 3));       // The time in seconds to wait between WebSocket reconnection attempts.

let SubscribeToYourself = (getDbItem("SubscribeToYourself", "0") == "1");              // Enable Subscribe to your own uri. (Useful to understand how other buddies see you.)
let VoiceMailSubscribe = (getDbItem("VoiceMailSubscribe", "1") == "1");                // Enable Subscribe to voicemail
let VoicemailDid = getDbItem("VoicemailDid", "");                                      // Number to dial for VoicemialMain()
let SubscribeVoicemailExpires = parseInt(getDbItem("SubscribeVoicemailExpires", 300)); // Voceimail Subscription expiry time (in seconds)
let ContactUserName = getDbItem("ContactUserName", "");                                // Optional name for contact header uri
let userAgentStr = getDbItem("UserAgentStr", "Browser Phone "+ appversion +" (SIPJS - "+ sipjsversion +") "+ navUserAgent);   // Set this to whatever you want.
let hostingPrefix = getDbItem("HostingPrefix", "");                                    // Use if hosting off root directory. eg: "/phone/" or "/static/"
let RegisterExpires = parseInt(getDbItem("RegisterExpires", 300));                     // Registration expiry time (in seconds)
let RegisterExtraHeaders = getDbItem("RegisterExtraHeaders", "{}");                    // Parsable Json string of headers to include in register process. eg: '{"foo":"bar"}'
let RegisterExtraContactParams = getDbItem("RegisterExtraContactParams", "{}");        // Parsable Json string of extra parameters add to the end (after >) of contact header during register. eg: '{"foo":"bar"}'
let RegisterContactParams = getDbItem("RegisterContactParams", "{}");                  // Parsable Json string of extra parameters added to contact URI during register. eg: '{"foo":"bar"}'
let WssInTransport = (getDbItem("WssInTransport", "1") == "1");                        // Set the transport parameter to wss when used in SIP URIs. (Required for Asterisk as it doesn't support Path)
let IpInContact = (getDbItem("IpInContact", "1") == "1");                              // Set a random IP address as the host value in the Contact header field and Via sent-by parameter. (Suggested for Asterisk)
let BundlePolicy = getDbItem("BundlePolicy", "balanced");                              // SDP Media Bundle: max-bundle | max-compat | balanced https://webrtcstandards.info/sdp-bundle/
let IceStunServerJson = getDbItem("IceStunServerJson", "");                            // Sets the JSON string for ice Server. Default: [{ "urls": "stun:stun.l.google.com:19302" }] Must be https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration/iceServers
let IceStunCheckTimeout = parseInt(getDbItem("IceStunCheckTimeout", 500));             // Set amount of time in milliseconds to wait for the ICE/STUN server
let SubscribeBuddyAccept = getDbItem("SubscribeBuddyAccept", "application/pidf+xml");  // Normally only application/dialog-info+xml and application/pidf+xml
let SubscribeBuddyEvent = getDbItem("SubscribeBuddyEvent", "presence");                // For application/pidf+xml use presence. For application/dialog-info+xml use dialog 
let SubscribeBuddyExpires = parseInt(getDbItem("SubscribeBuddyExpires", 300));         // Buddy Subscription expiry time (in seconds)
let ProfileDisplayPrefix = getDbItem("ProfileDisplayPrefix", "");                      // Can display an item from your vCard before your name. Options: Number1 | Number2
let ProfileDisplayPrefixSeparator = getDbItem("ProfileDisplayPrefixSeparator", "");    // Used with profileDisplayPrefix, adds a separating character (string). eg: - ~ * or even 💥
let InviteExtraHeaders = getDbItem("InviteExtraHeaders", "{}");                       // Extra SIP headers to be included in the initial INVITE message for each call. (Added to the extra headers in the DialByLine() parameters. e.g {"foo":"bar"})

let NoAnswerTimeout = parseInt(getDbItem("NoAnswerTimeout", 120));          // Time in seconds before automatic Busy Here sent
let AutoAnswerEnabled = (getDbItem("AutoAnswerEnabled", "0") == "1");       // Automatically answers the phone when the call comes in, if you are not on a call already
let DoNotDisturbEnabled = (getDbItem("DoNotDisturbEnabled", "0") == "1");   // Rejects any inbound call, while allowing outbound calls
let CallWaitingEnabled = (getDbItem("CallWaitingEnabled", "1") == "1");     // Rejects any inbound call if you are on a call already.
let RecordAllCalls = (getDbItem("RecordAllCalls", "0") == "1");             // Starts Call Recording when a call is established.
let StartVideoFullScreen = (getDbItem("StartVideoFullScreen", "1") == "1"); // Starts a video call in the full screen (browser screen, not desktop)
let SelectRingingLine = (getDbItem("SelectRingingLine", "1") == "1");       // Selects the ringing line if you are not on another call ()

let UiMaxWidth = parseInt(getDbItem("UiMaxWidth", 1240));                                   // Sets the max-width for the UI elements (don't set this less than 920. Set to very high number for full screen eg: 999999)
let UiThemeStyle = getDbItem("UiThemeStyle", "system");                                     // Sets the color theme for the UI dark | light | system (set by your systems dark/light settings)
let UiMessageLayout = getDbItem("UiMessageLayout", "middle");                               // Put the message Stream at the top or middle can be either: top | middle 
let UiCustomConfigMenu = (getDbItem("UiCustomConfigMenu", "0") == "1");                     // If set to true, will only call web_hook_on_config_menu
let UiCustomDialButton = (getDbItem("UiCustomDialButton", "0") == "1");                     // If set to true, will only call web_hook_dial_out
let UiCustomSortAndFilterButton = (getDbItem("UiCustomSortAndFilterButton", "0") == "1");   // If set to true, will only call web_hook_sort_and_filter
let UiCustomAddBuddy = (getDbItem("UiCustomAddBuddy", "0") == "1");                         // If set to true, will only call web_hook_on_add_buddy
let UiCustomEditBuddy = (getDbItem("UiCustomEditBuddy", "0") == "1");                       // If set to true, will only call web_hook_on_edit_buddy({})
let UiCustomMediaSettings = (getDbItem("UiCustomMediaSettings", "0") == "1");               // If set to true, will only call web_hook_on_edit_media
let UiCustomMessageAction = (getDbItem("UiCustomMessageAction", "0") == "1");               // If set to true, will only call web_hook_on_message_action

let AutoGainControl = (getDbItem("AutoGainControl", "1") == "1");        // Attempts to adjust the microphone volume to a good audio level. (OS may be better at this)
let EchoCancellation = (getDbItem("EchoCancellation", "1") == "1");      // Attempts to remove echo over the line.
let NoiseSuppression = (getDbItem("NoiseSuppression", "1") == "1");      // Attempts to clear the call quality of noise.
let MirrorVideo = getDbItem("VideoOrientation", "rotateY(180deg)");      // Displays the self-preview in normal or mirror view, to better present the preview. 
let maxFrameRate = getDbItem("FrameRate", "");                           // Suggests a frame rate to your webcam if possible.
let videoHeight = getDbItem("VideoHeight", "");                          // Suggests a video height (and therefor picture quality) to your webcam.
let MaxVideoBandwidth = parseInt(getDbItem("MaxVideoBandwidth", "2048")); // Specifies the maximum bandwidth (in Kb/s) for your outgoing video stream. e.g: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | -1 to disable
let videoAspectRatio = getDbItem("AspectRatio", "1.33");                  // Suggests an aspect ratio (1:1 = 1 | 4:3 = 0.75 | 16:9 = 0.5625) to your webcam.
let NotificationsActive = (getDbItem("Notifications", "0") == "1");

let StreamBuffer = parseInt(getDbItem("StreamBuffer", 50));                 // The amount of rows to buffer in the Buddy Stream
let MaxDataStoreDays = parseInt(getDbItem("MaxDataStoreDays", 0));          // Defines the maximum amount of days worth of data (calls, recordings, messages, etc) to store locally. 0=Stores all data always. >0 Trims n days back worth of data at various events where. 
let PosterJpegQuality = parseFloat(getDbItem("PosterJpegQuality", 0.6));    // The image quality of the Video Poster images
let VideoResampleSize = getDbItem("VideoResampleSize", "HD");               // The resample size (height) to re-render video that gets presented (sent). (SD = ???x360 | HD = ???x720 | FHD = ???x1080)
let RecordingVideoSize = getDbItem("RecordingVideoSize", "HD");             // The size/quality of the video track in the recordings (SD = 640x360 | HD = 1280x720 | FHD = 1920x1080)
let RecordingVideoFps = parseInt(getDbItem("RecordingVideoFps", 12));       // The Frame Per Second of the Video Track recording
let RecordingLayout = getDbItem("RecordingLayout", "them-pnp");             // The Layout of the Recording Video Track (side-by-side | them-pnp | us-only | them-only)

let DidLength = parseInt(getDbItem("DidLength", 6));                 // DID length from which to decide if an incoming caller is a "contact" or an "extension".
let MaxDidLength = parseInt(getDbItem("MaxDidLength", 16));          // Maximum length of any DID number including international dialled numbers.
let DisplayDateFormat = getDbItem("DateFormat", "YYYY-MM-DD");       // The display format for all dates. https://momentjs.com/docs/#/displaying/
let DisplayTimeFormat = getDbItem("TimeFormat", "h:mm:ss A");        // The display format for all times. https://momentjs.com/docs/#/displaying/
let Language = getDbItem("Language", "auto");                        // Overrides the language selector or "automatic". Must be one of availableLang[]. If not defaults to en.

// Buddy Sort and Filter
let BuddySortBy = getDbItem("BuddySortBy", "activity");                      // Sorting for Buddy List display (type|extension|alphabetical|activity)
let SortByTypeOrder = getDbItem("SortByTypeOrder", "e|x|c");                 // If the Sorting is set to type then describe the order of the types.
let BuddyAutoDeleteAtEnd = (getDbItem("BuddyAutoDeleteAtEnd", "0") == "1");  // Always put the Auto Delete buddies at the bottom
let HideAutoDeleteBuddies = (getDbItem("HideAutoDeleteBuddies", "0") == "1");    // Option to not display Auto Delete Buddies (May be confusing if newly created buddies are set to auto delete.)
let BuddyShowExtenNum = (getDbItem("BuddyShowExtenNum", "0") == "1");        // Controls the Extension Number display

// Permission Settings
let EnableTextMessaging = (getDbItem("EnableTextMessaging", "1") == "1");               // Enables the Text Messaging
let DisableFreeDial = (getDbItem("DisableFreeDial", "0") == "1");                       // Removes the Dial icon in the profile area, users will need to add buddies in order to dial.
let DisableBuddies = (getDbItem("DisableBuddies", "0") == "1");                         // Removes the Add Someone menu item and icon from the profile area. Buddies will still be created automatically. Please also use MaxBuddies or MaxBuddyAge
let EnableTransfer = (getDbItem("EnableTransfer", "1") == "1");                         // Controls Transferring during a call
let EnableConference = (getDbItem("EnableConference", "1") == "1");                     // Controls Conference during a call
let AutoAnswerPolicy = getDbItem("AutoAnswerPolicy", "allow");                          // allow = user can choose | disabled = feature is disabled | enabled = feature is always on
let DoNotDisturbPolicy = getDbItem("DoNotDisturbPolicy", "allow");                      // allow = user can choose | disabled = feature is disabled | enabled = feature is always on
let CallWaitingPolicy = getDbItem("CallWaitingPolicy", "allow");                        // allow = user can choose | disabled = feature is disabled | enabled = feature is always on
let CallRecordingPolicy = getDbItem("CallRecordingPolicy", "allow");                    // allow = user can choose | disabled = feature is disabled | enabled = feature is always on
let IntercomPolicy = getDbItem("IntercomPolicy", "enabled");                            // disabled = feature is disabled | enabled = feature is always on
let EnableAccountSettings = (getDbItem("EnableAccountSettings", "1") == "1");           // Controls the Account tab in Settings
let EnableAppearanceSettings = (getDbItem("EnableAppearanceSettings", "1") == "1");     // Controls the Appearance tab in Settings
let EnableNotificationSettings = (getDbItem("EnableNotificationSettings", "1") == "1"); // Controls the Notifications tab in Settings
let EnableAlphanumericDial = (getDbItem("EnableAlphanumericDial", "0") == "1");         // Allows calling /[^\da-zA-Z\*\#\+\-\_\.\!\~\'\(\)]/g default is /[^\d\*\#\+]/g 
// let EnableVideoCalling = (getDbItem("EnableVideoCalling", "1") == "1");  
let EnableVideoCalling = false                // Enables Video during a call
let EnableTextExpressions = (getDbItem("EnableTextExpressions", "1") == "1");           // Enables Expressions (Emoji) glyphs when texting
let EnableTextDictate = (getDbItem("EnableTextDictate", "1") == "1");                   // Enables Dictate (speech-to-text) when texting
let EnableRingtone = (getDbItem("EnableRingtone", "1") == "1");                         // Enables a ring tone when an inbound call comes in.  (media/Ringtone_1.mp3)
let MaxBuddies = parseInt(getDbItem("MaxBuddies", 999));                                // Sets the Maximum number of buddies the system will accept. Older ones get deleted. (Considered when(after) adding buddies)
let MaxBuddyAge = parseInt(getDbItem("MaxBuddyAge", 365));                              // Sets the Maximum age in days (by latest activity). Older ones get deleted. (Considered when(after) adding buddies)
let AutoDeleteDefault = (getDbItem("AutoDeleteDefault", "1") == "1");                   // For automatically created buddies (inbound and outbound), should the buddy be set to AutoDelete.

let ChatEngine = getDbItem("ChatEngine", "SIMPLE");    // Select the chat engine XMPP | SIMPLE

// XMPP Settings
let XmppServer = getDbItem("XmppServer", "");                // FQDN of XMPP server HTTP service";
let XmppWebsocketPort = getDbItem("XmppWebsocketPort", "");  // OpenFire Default : 7443
let XmppWebsocketPath = getDbItem("XmppWebsocketPath", "");  // OpenFire Default : /ws
let XmppDomain = getDbItem("XmppDomain", "");                // The domain of the XMPP server
let profileUser = getDbItem("profileUser", null);            // Username for auth with XMPP Server eg: 100
// XMPP Tenanting
let XmppRealm = getDbItem("XmppRealm", "");                    // To create a tenant like partition in XMPP server all users and buddies will have this realm prepended to their details.
let XmppRealmSeparator = getDbItem("XmppRealmSeparator", "-"); // Separates the realm from the profileUser eg: abc123-100@XmppDomain
// TODO
let XmppChatGroupService = getDbItem("XmppChatGroupService", "conference");

// TODO
let EnableSendFiles = false;          // Enables sending of Images
let EnableSendImages = false;          // Enables sending of Images
let EnableAudioRecording = false;  // Enables the ability to record a voice message
let EnableVideoRecording = false;  // Enables the ability to record a video message
let EnableSms = false;             // Enables SMS sending to the server (requires onward services)
let EnableFax = false;             // Enables Fax sending to the server (requires onward services)
let EnableEmail = false;           // Enables Email sending to the server (requires onward services)


// ===================================================
// Rather don't fiddle with anything beyond this point
// ===================================================

// System variables
// ================
let userAgent = null;
let CanvasCollection = [];
let Buddies = [];
let selectedBuddy = null;
let selectedLine = null;
let windowObj = null;
let alertObj = null;
let confirmObj = null;
let promptObj = null;
let menuObj = null;
let HasVideoDevice = false;
let HasAudioDevice = true;
let HasSpeakerDevice = true;
let AudioinputDevices = [];
let VideoinputDevices = [];
let SpeakerDevices = [];
let Lines = [];
// let lang = {}
let audioBlobs = {}
let newLineNumber = 1;
let telNumericRegEx = /[^\d\*\#\+]/g
let telAlphanumericRegEx = /[^\da-zA-Z\*\#\+\-\_\.\!\~\'\(\)]/g

let settingsMicrophoneStream = null;
let settingsMicrophoneStreamTrack = null;
let settingsMicrophoneSoundMeter = null;

let settingsVideoStream = null;
let settingsVideoStreamTrack = null;

let CallRecordingsIndexDb = null;
let CallQosDataIndexDb = null;
// Utilities
// =========
function uID(){
    return Date.now()+Math.floor(Math.random()*10000).toString(16).toUpperCase();
}
function utcDateNow(){
    return moment().utc().format("YYYY-MM-DD HH:mm:ss UTC");
}
function getDbItem(itemIndex, defaultValue){
    if(localDB.getItem(itemIndex) != null) return localDB.getItem(itemIndex);
    return defaultValue;
}
function getAudioSrcID(){
    var id = localDB.getItem("AudioSrcId");
    return (id != null)? id : "default";
}
function getAudioOutputID(){
    var id = localDB.getItem("AudioOutputId");
    return (id != null)? id : "default";
}
function getVideoSrcID(){
    var id = localDB.getItem("VideoSrcId");
    return (id != null)? id : "default";
}
function getRingerOutputID(){
    var id = localDB.getItem("RingOutputId");
    return (id != null)? id : "default";
}
function formatDuration(seconds){
    var sec = Math.floor(parseFloat(seconds));
    if(sec < 0){
        return sec;
    } 
    else if(sec >= 0 && sec < 60){
        return sec + " " + ((sec > 1) ? lang.seconds_plural : lang.second_single);
    } 
    else if(sec >= 60 && sec < 60 * 60){ // greater then a minute and less then an hour
        var duration = moment.duration(sec, 'seconds');
        return duration.minutes() + " "+ ((duration.minutes() > 1) ? lang.minutes_plural: lang.minute_single) +" " + duration.seconds() +" "+ ((duration.seconds() > 1) ? lang.seconds_plural : lang.second_single);
    } 
    else if(sec >= 60 * 60 && sec < 24 * 60 * 60){ // greater than an hour and less then a day
        var duration = moment.duration(sec, 'seconds');
        return duration.hours() + " "+ ((duration.hours() > 1) ? lang.hours_plural : lang.hour_single) +" " + duration.minutes() + " "+ ((duration.minutes() > 1) ? lang.minutes_plural: lang.minute_single) +" " + duration.seconds() +" "+ ((duration.seconds() > 1) ? lang.seconds_plural : lang.second_single);
    } 
    //  Otherwise.. this is just too long
}
function formatShortDuration(seconds){
    var sec = Math.floor(parseFloat(seconds));
    if(sec < 0){
        return sec;
    } 
    else if(sec >= 0 && sec < 60){
        return "00:"+ ((sec > 9)? sec : "0"+sec );
    } 
    else if(sec >= 60 && sec < 60 * 60){ // greater then a minute and less then an hour
        var duration = moment.duration(sec, 'seconds');
        return ((duration.minutes() > 9)? duration.minutes() : "0"+duration.minutes()) + ":" + ((duration.seconds() > 9)? duration.seconds() : "0"+duration.seconds());
    } 
    else if(sec >= 60 * 60 && sec < 24 * 60 * 60){ // greater than an hour and less then a day
        var duration = moment.duration(sec, 'seconds');
        return ((duration.hours() > 9)? duration.hours() : "0"+duration.hours())  + ":" + ((duration.minutes() > 9)? duration.minutes() : "0"+duration.minutes())  + ":" + ((duration.seconds() > 9)? duration.seconds() : "0"+duration.seconds());
    } 
    //  Otherwise.. this is just too long
}
function formatBytes(bytes, decimals) {
    if (bytes === 0) return "0 "+ lang.bytes;
    var k = 1024;
    var dm = (decimals && decimals >= 0)? decimals : 2;
    var sizes = [lang.bytes, lang.kb, lang.mb, lang.gb, lang.tb, lang.pb, lang.eb, lang.zb, lang.yb];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
function UserLocale(){
    var language = window.navigator.userLanguage || window.navigator.language; // "en", "en-US", "fr", "fr-FR", "es-ES", etc.
    // langtag = language["-"script]["-" region] *("-" variant) *("-" extension) ["-" privateuse]
    // TODO Needs work
    langtag = language.split('-');
    if(langtag.length == 1){
        return ""; 
    } 
    else if(langtag.length == 2) {
        return langtag[1].toLowerCase();  // en-US => us
    }
    else if(langtag.length >= 3) {
        return langtag[1].toLowerCase();  // en-US => us
    }
}
function GetAlternateLanguage(){
    var userLanguage = window.navigator.userLanguage || window.navigator.language; // "en", "en-US", "fr", "fr-FR", "es-ES", etc.
    // langtag = language["-"script]["-" region] *("-" variant) *("-" extension) ["-" privateuse]
    if(Language != "auto") userLanguage = Language;
    userLanguage = userLanguage.toLowerCase();
    if(userLanguage == "en" || userLanguage.indexOf("en-") == 0) return "";  // English is already loaded

    for(l = 0; l < availableLang.length; l++){
        if(userLanguage.indexOf(availableLang[l].toLowerCase()) == 0){
            console.log("Alternate Language detected: ", userLanguage);
            // Set up Moment with the same language settings
            moment.locale(userLanguage);
            return availableLang[l].toLowerCase();
        }
    }
    return "";
}
function getFilter(filter, keyword){
    if(filter.indexOf(",", filter.indexOf(keyword +": ") + keyword.length + 2) != -1){
        return filter.substring(filter.indexOf(keyword +": ") + keyword.length + 2, filter.indexOf(",", filter.indexOf(keyword +": ") + keyword.length + 2));
    }
    else {
        return filter.substring(filter.indexOf(keyword +": ") + keyword.length + 2);
    }
}
function base64toBlob(base64Data, contentType) {
    if(base64Data.indexOf("," != -1)) base64Data = base64Data.split(",")[1]; // [data:image/png;base64] , [xxx...]
    var byteCharacters = atob(base64Data);
    var slicesCount = Math.ceil(byteCharacters.length / 1024);
    var byteArrays = new Array(slicesCount);
    for (var s = 0; s < slicesCount; ++s) {
        var begin = s * 1024;
        var end = Math.min(begin + 1024, byteCharacters.length);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[s] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}
function MakeDataArray(defaultValue, count){
    var rtnArray = new Array(count);
    for(var i=0; i< rtnArray.length; i++) {
        rtnArray[i] = defaultValue;
    }
    return rtnArray;
}

// Sounds Meter Class
// ==================
class SoundMeter {
    constructor(sessionId, lineNum) {
        var audioContext = null;
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        }
        catch(e) {
            console.warn("AudioContext() LocalAudio not available... its fine.");
        }
        if (audioContext == null) return null;
        this.context = audioContext;
        this.source = null;

        this.lineNum = lineNum;
        this.sessionId = sessionId;

        this.captureInterval = null;
        this.levelsInterval = null;
        this.networkInterval = null;
        this.startTime = 0;

        this.ReceiveBitRateChart = null;
        this.ReceiveBitRate = [];
        this.ReceivePacketRateChart = null;
        this.ReceivePacketRate = [];
        this.ReceivePacketLossChart = null;
        this.ReceivePacketLoss = [];
        this.ReceiveJitterChart = null;
        this.ReceiveJitter = [];
        this.ReceiveLevelsChart = null;
        this.ReceiveLevels = [];
        this.SendBitRateChart = null;
        this.SendBitRate = [];
        this.SendPacketRateChart = null;
        this.SendPacketRate = [];

        this.instant = 0; // Primary Output indicator

        this.AnalyserNode = this.context.createAnalyser();
        this.AnalyserNode.minDecibels = -90;
        this.AnalyserNode.maxDecibels = -10;
        this.AnalyserNode.smoothingTimeConstant = 0.85;
    }
    connectToSource(stream, callback) {
        console.log("SoundMeter connecting...");
        try {
            this.source = this.context.createMediaStreamSource(stream);
            this.source.connect(this.AnalyserNode);
            // this.AnalyserNode.connect(this.context.destination); // Can be left unconnected
            this._start();

            callback(null);
        }
        catch(e) {
            console.error(e); // Probably not audio track
            callback(e);
        }
    }
    _start(){
        var self = this;
        self.instant = 0;
        self.AnalyserNode.fftSize = 32; // 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768. Defaults to 2048
        self.dataArray = new Uint8Array(self.AnalyserNode.frequencyBinCount);

        this.captureInterval = window.setInterval(function(){
            self.AnalyserNode.getByteFrequencyData(self.dataArray); // Populate array with data from 0-255

            // Just take the maximum value of this data
            self.instant = 0;
            for(var d = 0; d < self.dataArray.length; d++) {
                if(self.dataArray[d] > self.instant) self.instant = self.dataArray[d];
            }

        }, 1);
    }
    stop() {
        console.log("Disconnecting SoundMeter...");
        window.clearInterval(this.captureInterval);
        this.captureInterval = null;
        window.clearInterval(this.levelsInterval);
        this.levelsInterval = null;
        window.clearInterval(this.networkInterval);
        this.networkInterval = null;
        try {
            this.source.disconnect();
        }
        catch(e) { }
        this.source = null;
        try {
            this.AnalyserNode.disconnect();
        }
        catch(e) { }
        this.AnalyserNode = null;
        try {
            this.context.close();
        }
        catch(e) { }
        this.context = null;

        // Save to IndexDb
        var lineObj = FindLineByNumber(this.lineNum);
        var QosData = {
            ReceiveBitRate: this.ReceiveBitRate,
            ReceivePacketRate: this.ReceivePacketRate,
            ReceivePacketLoss: this.ReceivePacketLoss,
            ReceiveJitter: this.ReceiveJitter,
            ReceiveLevels: this.ReceiveLevels,
            SendBitRate: this.SendBitRate,
            SendPacketRate: this.SendPacketRate,
        }
        if(this.sessionId != null){
            SaveQosData(QosData, this.sessionId, lineObj.BuddyObj.identity);
        }
    }
}
function MeterSettingsOutput(audioStream, objectId, direction, interval){
    var soundMeter = new SoundMeter(null, null);
    soundMeter.startTime = Date.now();
    soundMeter.connectToSource(audioStream, function (e) {
        if (e != null) return;

        console.log("SoundMeter Connected, displaying levels to:"+ objectId);
        soundMeter.levelsInterval = window.setInterval(function () {
            // Calculate Levels (0 - 255)
            var instPercent = (soundMeter.instant/255) * 100;
            $("#"+ objectId).css(direction, instPercent.toFixed(2) +"%");
        }, interval);
    });

    return soundMeter;
}

function PreloadAudioFiles(){
    // audioBlobs.Alert = { file : "Alert.mp3", url : hostingPrefix +"media/Alert.mp3" }
    // audioBlobs.Ringtone = { file : "Ringtone_1.mp3", url : hostingPrefix +"media/Ringtone_1.mp3" }
    // audioBlobs.speech_orig = { file : "speech_orig.mp3", url : hostingPrefix +"media/speech_orig.mp3" }
    // audioBlobs.Busy_UK = { file : "Tone_Busy-UK.mp3", url : hostingPrefix +"media/Tone_Busy-UK.mp3" }
    // audioBlobs.Busy_US = { file : "Tone_Busy-US.mp3", url : hostingPrefix +"media/Tone_Busy-US.mp3" }
    // audioBlobs.CallWaiting = { file : "Tone_CallWaiting.mp3", url : hostingPrefix +"media/Tone_CallWaiting.mp3" }
    // audioBlobs.Congestion_UK = { file : "Tone_Congestion-UK.mp3", url : hostingPrefix +"media/Tone_Congestion-UK.mp3" }
    // audioBlobs.Congestion_US = { file : "Tone_Congestion-US.mp3", url : hostingPrefix +"media/Tone_Congestion-US.mp3" }
    // audioBlobs.EarlyMedia_Australia = { file : "Tone_EarlyMedia-Australia.mp3", url : hostingPrefix +"media/Tone_EarlyMedia-Australia.mp3" }
    // audioBlobs.EarlyMedia_European = { file : "Tone_EarlyMedia-European.mp3", url : hostingPrefix +"media/Tone_EarlyMedia-European.mp3" }
    // audioBlobs.EarlyMedia_Japan = { file : "Tone_EarlyMedia-Japan.mp3", url : hostingPrefix +"media/Tone_EarlyMedia-Japan.mp3" }
    // audioBlobs.EarlyMedia_UK = { file : "Tone_EarlyMedia-UK.mp3", url : hostingPrefix +"media/Tone_EarlyMedia-UK.mp3" }
    // audioBlobs.EarlyMedia_US = { file : "Tone_EarlyMedia-US.mp3", url : hostingPrefix +"media/Tone_EarlyMedia-US.mp3" }
   
    audioBlobs.Alert = { file : "Alert.mp3", url : "src/media/Alert.mp3" }
    audioBlobs.Ringtone = { file : "Ringtone_1.mp3", url : "src/media/Ringtone_1.mp3" }
    audioBlobs.speech_orig = { file : "speech_orig.mp3", url : "src/media/speech_orig.mp3" }
    audioBlobs.Busy_UK = { file : "Tone_Busy-UK.mp3", url : "src/media/Tone_Busy-UK.mp3" }
    audioBlobs.Busy_US = { file : "Tone_Busy-US.mp3", url : "src/media/Tone_Busy-US.mp3" }
    audioBlobs.CallWaiting = { file : "Tone_CallWaiting.mp3", url : "src/media/Tone_CallWaiting.mp3" }
    audioBlobs.Congestion_UK = { file : "Tone_Congestion-UK.mp3", url : "src/media/Tone_Congestion-UK.mp3" }
    audioBlobs.Congestion_US = { file : "Tone_Congestion-US.mp3", url : "src/media/Tone_Congestion-US.mp3" }
    audioBlobs.EarlyMedia_Australia = { file : "Tone_EarlyMedia-Australia.mp3", url : "src/media/Tone_EarlyMedia-Australia.mp3" }
    audioBlobs.EarlyMedia_European = { file : "Tone_EarlyMedia-European.mp3", url : "src/media/Tone_EarlyMedia-European.mp3" }
    audioBlobs.EarlyMedia_Japan = { file : "Tone_EarlyMedia-Japan.mp3", url : "src/media/Tone_EarlyMedia-Japan.mp3" }
    audioBlobs.EarlyMedia_UK = { file : "Tone_EarlyMedia-UK.mp3", url : "src/media/Tone_EarlyMedia-UK.mp3" }
    audioBlobs.EarlyMedia_US = { file : "Tone_EarlyMedia-US.mp3", url : "src/media/Tone_EarlyMedia-US.mp3" }
   

    $.each(audioBlobs, function (i, item) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", item.url, true);
        oReq.responseType = "blob";
        oReq.onload = function(oEvent) {
            var reader = new FileReader();
            reader.readAsDataURL(oReq.response);
            reader.onload = function() {
                item.blob = reader.result;
            }
        }
        oReq.send();
    });
    // console.log(audioBlobs);
}

function FindBuddyByDid(did){
    // Used only in Inbound
    for(var b = 0; b < Buddies.length; b++){
        if(Buddies[b].ExtNo == did || Buddies[b].MobileNumber == did || Buddies[b].ContactNumber1 == did || Buddies[b].ContactNumber2 == did) {
            return Buddies[b];
        }
    }
    return null;
}


/**
 * Method used to create a permanent buddy (saved to the local store).
 * Note: This method also makes the memory object for display it on the left hand side, using AddBuddy()
 * @param {string} type One of extension | xmpp | contact | group
 * @param {boolean} update Option to issue UpdateBuddyList() once done.
 * @param {boolean} focus Option to focus/select the buddy once done.
 * @param {boolean} subscribe Option to create a subscription to the user. (also see subscribeUser)
 * @param {string} callerID The Display Name or Caller ID of the Buddy
 * @param {string} did The Extension Number/DID/SipID of the Buddy
 * @param {string} jid The Jabber Identifier of the XMPP buddy (only if type=xmpp)
 * @param {boolean} AllowDuringDnd Option to allowing inbound calls when on DND
 * @param {string} subscribeUser If subscribe=true, you can optionally specify a SipID to subscribe to.
 * @param {boolean} autoDelete Option to have this buddy delete after MaxBuddyAge
 * @param {boolean} addToXmppRoster Option if the buddy type is Xmpp, can automatically add to remote roster.
**/
function MakeBuddy(type, update, focus, subscribe, callerID, did, jid, AllowDuringDnd, subscribeUser, autoDelete, addToXmppRoster){
    var json = JSON.parse(localDB.getItem(profileUserID + "-Buddies"));
    if(json == null) json = InitUserBuddies();

    var dateNow = utcDateNow();
    var buddyObj = null;
    var id = uID();

    if(type == "extension") {
        json.DataCollection.push({
            Type: "extension",
            LastActivity: dateNow,
            ExtensionNumber: did,
            MobileNumber: "",
            ContactNumber1: "",
            ContactNumber2: "",
            uID: id,
            cID: null,
            gID: null,
            jid: null,
            DisplayName: callerID,
            Description: "", 
            Email: "",
            MemberCount: 0,
            EnableDuringDnd: AllowDuringDnd,
            Subscribe: subscribe,
            SubscribeUser: subscribeUser,
            AutoDelete: autoDelete
        });
        buddyObj = new Buddy("extension", id, callerID, did, "", "", "", dateNow, "", "", null, AllowDuringDnd, subscribe, subscribeUser, autoDelete);
        AddBuddy(buddyObj, update, focus, subscribe, true);
    }
    if(type == "xmpp") {
        json.DataCollection.push({
            Type: "xmpp",
            LastActivity: dateNow,
            ExtensionNumber: did,
            MobileNumber: "",
            ContactNumber1: "",
            ContactNumber2: "",
            uID: id,
            cID: null,
            gID: null,
            jid: jid,
            DisplayName: callerID,
            Description: "", 
            Email: "",
            MemberCount: 0,
            EnableDuringDnd: AllowDuringDnd,
            Subscribe: subscribe,
            SubscribeUser: subscribeUser,
            AutoDelete: autoDelete
        });
        buddyObj = new Buddy("xmpp", id, callerID, did, "", "", "", dateNow, "", "", jid, AllowDuringDnd, subscribe, subscribeUser, autoDelete);
        if(addToXmppRoster == true){
            XmppAddBuddyToRoster(buddyObj);
        }
        AddBuddy(buddyObj, update, focus, subscribe, true);
    }
    if(type == "contact"){
        json.DataCollection.push({
            Type: "contact", 
            LastActivity: dateNow,
            ExtensionNumber: "", 
            MobileNumber: "",
            ContactNumber1: did,
            ContactNumber2: "",
            uID: null,
            cID: id,
            gID: null,
            jid: null,
            DisplayName: callerID,
            Description: "",
            Email: "",
            MemberCount: 0,
            EnableDuringDnd: AllowDuringDnd,
            Subscribe: false,
            SubscribeUser: null,
            AutoDelete: autoDelete
        });
        buddyObj = new Buddy("contact", id, callerID, "", "", did, "", dateNow, "", "", null, AllowDuringDnd, false, null, autoDelete);
        AddBuddy(buddyObj, update, focus, false, true);
    }
    if(type == "group") {
        json.DataCollection.push({
            Type: "group",
            LastActivity: dateNow,
            ExtensionNumber: did,
            MobileNumber: "",
            ContactNumber1: "",
            ContactNumber2: "",
            uID: null,
            cID: null,
            gID: id,
            jid: null,
            DisplayName: callerID,
            Description: "", 
            Email: "",
            MemberCount: 0,
            EnableDuringDnd: false,
            Subscribe: false,
            SubscribeUser: null,
            AutoDelete: autoDelete
        });
        buddyObj = new Buddy("group", id, callerID, did, "", "", "", dateNow, "", "", null, false, false, null, autoDelete);
        AddBuddy(buddyObj, update, focus, false, true);
    }
    // Update Size: 
    json.TotalRows = json.DataCollection.length;

    // Save To DB
    localDB.setItem(profileUserID + "-Buddies", JSON.stringify(json));

    // Return new buddy
    return buddyObj;
}

// Buddy & Contacts
// ================
var Buddy = function(type, identity, CallerIDName, ExtNo, MobileNumber, ContactNumber1, ContactNumber2, lastActivity, desc, Email, jid, dnd, subscribe, subscription, autoDelete, pinned){
    this.type = type; // extension | xmpp | contact | group
    this.identity = identity;
    this.jid = jid;
    this.CallerIDName = (CallerIDName)? CallerIDName : "";
    this.Email = (Email)? Email : "" ;
    this.Desc = (desc)? desc : "" ;
    this.ExtNo = ExtNo;
    this.MobileNumber = MobileNumber;
    this.ContactNumber1 = ContactNumber1;
    this.ContactNumber2 = ContactNumber2;
    this.lastActivity = lastActivity; // Full Date as string eg "1208-03-21 15:34:23 UTC"
    this.devState = "dotOffline";
    this.presence = "Unknown";
    this.missed = 0;
    this.IsSelected = false;
    this.imageObjectURL = "";
    this.presenceText = lang.default_status;
    this.EnableDuringDnd = dnd;
    this.EnableSubscribe = subscribe;
    this.SubscribeUser = (subscription)? subscription : ExtNo;
    this.AllowAutoDelete = (typeof autoDelete !== 'undefined')? autoDelete : AutoDeleteDefault;
    this.Pinned = (typeof pinned !== 'undefined')? pinned : false;
}

function AddBuddy(buddyObj, update, focus, subscribe, cleanup){
    Buddies.push(buddyObj);
    if(update == true) UpdateBuddyList();
    AddBuddyMessageStream(buddyObj);
    if(subscribe == true) SubscribeBuddy(buddyObj);
    if(focus == true) SelectBuddy(buddyObj.identity);
    if(cleanup == true) CleanupBuddies()
}
function CleanupBuddies(){
    if(MaxBuddyAge > 1 || MaxBuddies > 1){
        // Sort According to .lastActivity
        Buddies.sort(function(a, b){
            var aMo = moment.utc(a.lastActivity.replace(" UTC", ""));
            var bMo = moment.utc(b.lastActivity.replace(" UTC", ""));
            if (aMo.isSameOrAfter(bMo, "second")) {
                return -1;
            } else return 1;
            return 0;
        });

        if(MaxBuddyAge > 1){
            var expiredDate = moment.utc().subtract(MaxBuddyAge, 'days');
            console.log("Running Buddy Cleanup for activity older than: ", expiredDate.format(DisplayDateFormat+" "+DisplayTimeFormat));
            for (var b = Buddies.length - 1; b >= 0; b--) {
                var lastActivity = moment.utc(Buddies[b].lastActivity.replace(" UTC", ""));
                if(lastActivity.isSameOrAfter(expiredDate, "second")){
                    // This one is fine
                } else {
                    // Too Old
                    if(Buddies[b].AllowAutoDelete == true){
                        console.warn("This buddy is too old, and will be deleted: ", lastActivity.format(DisplayDateFormat+" "+DisplayTimeFormat));
                        DoRemoveBuddy(Buddies[b].identity);
                    }
                }
            }
        }
        if(MaxBuddies > 1 && MaxBuddies < Buddies.length){
            console.log("Running Buddy Cleanup for buddies more than: ", MaxBuddies);
            for (var b = Buddies.length - 1; b >= MaxBuddies; b--) {
                if(Buddies[b].AllowAutoDelete == true){
                    console.warn("This buddy is too Many, and will be deleted: ", Buddies[b].identity);
                    DoRemoveBuddy(Buddies[b].identity);
                }
            }
        }
    }
}


function InitUserBuddies(){
    var template = { TotalRows:0, DataCollection:[] }
    localDB.setItem(profileUserID + "-Buddies", JSON.stringify(template));
    return JSON.parse(localDB.getItem(profileUserID + "-Buddies"));
}

function UpdateBuddyList(){
    var filter = $("#txtFindBuddy").val();

    $("#myContacts").empty();

    // Show Lines
    var callCount = 0
    for(var l = 0; l < Lines.length; l++) {

        var classStr = (Lines[l].IsSelected)? "buddySelected" : "buddy";
        if(Lines[l].SipSession != null) classStr = (Lines[l].SipSession.isOnHold)? "buddyActiveCallHollding" : "buddyActiveCall";

        var html = "<div id=\"line-"+ Lines[l].LineNumber +"\" class="+ classStr +" onclick=\"SelectLine('"+ Lines[l].LineNumber +"')\">";
        if(Lines[l].IsSelected == false && Lines[l].SipSession && Lines[l].SipSession.data.started != true && Lines[l].SipSession.data.calldirection == "inbound"){
            html += "<span id=\"line-"+ Lines[l].LineNumber +"-ringing\" class=missedNotifyer style=\"padding-left: 5px; padding-right: 5px; width:unset\"><i class=\"fa fa-phone\"></i> "+ lang.state_ringing +"</span>";
        }
        html += "<div class=lineIcon>"+ (l + 1) +"</div>";
        html += "<div class=contactNameText><i class=\"fa fa-phone\"></i> "+ lang.line +" "+ (l + 1) +"</div>";
        html += "<div id=\"line-"+ Lines[l].LineNumber +"-datetime\" class=contactDate>&nbsp;</div>";
        html += "<div class=presenceText>"+ Lines[l].DisplayName +" <"+ Lines[l].DisplayNumber +">" +"</div>";
        html += "</div>";
        // SIP.Session.C.STATUS_TERMINATED
        if(Lines[l].SipSession && Lines[l].SipSession.data.earlyReject != true){
            $("#myContacts").append(html);
            callCount ++;
        }
    }

    // End here if they are not using the buddy system
    if(DisableBuddies == true){
        // If there are no calls, show the dial pad (if you are allowed)
        if(callCount == 0 && DisableFreeDial != true){
            if(UiCustomDialButton == true){
                if(typeof web_hook_dial_out !== 'undefined') {
                    web_hook_dial_out(null);
                }
            } else {
                ShowDial();
            }
        }
        return;
    }

    // Draw a line if there are calls
    if(callCount > 0){
        $("#myContacts").append("<hr class=hrline>");
    }

    // If there are no buddies, and no calls, then, show the dial pad (if you are allowed)
    if(Buddies.length == 0 && callCount == 0 && DisableFreeDial != true){
        console.warn("You have no buddies, will show the Dial Screen rather");
        if(UiCustomDialButton == true){
            if(typeof web_hook_dial_out !== 'undefined') {
                web_hook_dial_out(null);
            }
        } else {
            ShowDial();
        }
        return;
    }

    // Sort and filter
    SortBuddies();

    var hiddenBuddies = 0;

    // Display
    for(var b = 0; b < Buddies.length; b++) {
        var buddyObj = Buddies[b];

        if(filter && filter.length >= 1){
            // Perform Filter Display
            var display = false;
            if(buddyObj.CallerIDName && buddyObj.CallerIDName.toLowerCase().indexOf(filter.toLowerCase()) > -1 ) display = true;
            if(buddyObj.ExtNo && buddyObj.ExtNo.toLowerCase().indexOf(filter.toLowerCase()) > -1 ) display = true;
            if(buddyObj.Desc && buddyObj.Desc.toLowerCase().indexOf(filter.toLowerCase()) > -1 ) display = true;
            if(!display) continue;
        }

        var today = moment.utc();
        var lastActivity = moment.utc(buddyObj.lastActivity.replace(" UTC", ""));
        var displayDateTime = "";
        if(lastActivity.isSame(today, 'day'))
        {
            displayDateTime = lastActivity.local().format(DisplayTimeFormat);
        } 
        else {
            displayDateTime = lastActivity.local().format(DisplayDateFormat);
        }

        if(HideAutoDeleteBuddies){
            if(buddyObj.AllowAutoDelete) {
                hiddenBuddies++;
                continue;
            }
        }

        var classStr = (buddyObj.IsSelected)? "buddySelected" : "buddy";
        if(buddyObj.type == "extension") { 
            var friendlyState = buddyObj.presence;
            if(friendlyState == "Unknown") friendlyState = lang.state_unknown;
            if(friendlyState == "Not online") friendlyState = lang.state_not_online;
            if(friendlyState == "Ready") friendlyState = lang.state_ready;
            if(friendlyState == "On the phone") friendlyState = lang.state_on_the_phone;
            if(friendlyState == "Proceeding") friendlyState = lang.state_on_the_phone;
            if(friendlyState == "Ringing") friendlyState = lang.state_ringing;
            if(friendlyState == "On hold") friendlyState = lang.state_on_hold;
            if(friendlyState == "Unavailable") friendlyState = lang.state_unavailable;
            if(buddyObj.EnableSubscribe != true) friendlyState = (buddyObj.Desc)? buddyObj.Desc : "";
            var autDeleteStatus = "";
            if(buddyObj.AllowAutoDelete == true) autDeleteStatus = "<i class=\"fa fa-clock-o\"></i> ";
            var html = "<div id=\"contact-"+ buddyObj.identity +"\" class="+ classStr +" onclick=\"SelectBuddy('"+ buddyObj.identity +"', 'extension')\">";
            html += "<span id=\"contact-"+ buddyObj.identity +"-missed\" class=missedNotifyer style=\""+ ((buddyObj.missed && buddyObj.missed > 0)? "" : "display:none") +"\">"+ buddyObj.missed +"</span>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-picture\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity, buddyObj.type) +"')\"></div>";
            html += (buddyObj.Pinned)? "<span class=pinnedBuddy><i class=\"fa fa-thumb-tack\"></i></span>" : "";
            html += "<div class=contactNameText>";
            html += "<span id=\"contact-"+ buddyObj.identity +"-devstate\" class=\""+ ((buddyObj.EnableSubscribe)? buddyObj.devState : "dotDefault") +"\"></span>";
            html += (BuddyShowExtenNum == true)? " "+ buddyObj.ExtNo + " - " : " ";
            html += buddyObj.CallerIDName
            html += "</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-datetime\" class=contactDate>"+ autDeleteStatus + ""+ displayDateTime +"</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-presence\" class=presenceText>"+ friendlyState +"</div>";
            html += "</div>";
            $("#myContacts").append(html);
        } else if(buddyObj.type == "xmpp") { 
            var friendlyState = buddyObj.presenceText;
            var autDeleteStatus = "";
            if(buddyObj.AllowAutoDelete == true) autDeleteStatus = "<i class=\"fa fa-clock-o\"></i> ";
            // NOTE: Set by user could contain malicious code
            friendlyState = friendlyState.replace(/[<>"'\r\n&]/g, function(chr){
                let table = { '<': 'lt', '>': 'gt', '"': 'quot', '\'': 'apos', '&': 'amp', '\r': '#10', '\n': '#13' };
                return '&' + table[chr] + ';';
            });
            
            var html = "<div id=\"contact-"+ buddyObj.identity +"\" class="+ classStr +" onclick=\"SelectBuddy('"+ buddyObj.identity +"', 'extension')\">";
            html += "<span id=\"contact-"+ buddyObj.identity +"-missed\" class=missedNotifyer style=\""+ ((buddyObj.missed && buddyObj.missed > 0)? "" : "display:none") +"\">"+ buddyObj.missed +"</span>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-picture\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity, buddyObj.type) +"')\"></div>";
            html += (buddyObj.Pinned)? "<span class=pinnedBuddy><i class=\"fa fa-thumb-tack\"></i></span>" : "";
            html += "<div class=contactNameText>";
            html += "<span id=\"contact-"+ buddyObj.identity +"-devstate\" class=\""+ ((buddyObj.EnableSubscribe)? buddyObj.devState : "dotDefault") +"\"></span>";
            html += (BuddyShowExtenNum == true)? " "+ buddyObj.ExtNo + " - " : " ";
            html += buddyObj.CallerIDName;
            html += "</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-datetime\" class=contactDate>"+ autDeleteStatus + ""+ displayDateTime +"</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-presence\" class=presenceText><i class=\"fa fa-comments\"></i> "+ friendlyState +"</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-chatstate-menu\" class=presenceText style=\"display:none\"><i class=\"fa fa-commenting-o\"></i> "+ buddyObj.CallerIDName +" "+ lang.is_typing +"...</div>";
            html += "</div>";
            $("#myContacts").append(html);
        } else if(buddyObj.type == "contact") { 
            var autDeleteStatus = "";
            if(buddyObj.AllowAutoDelete == true) autDeleteStatus = "<i class=\"fa fa-clock-o\"></i> ";
            var html = "<div id=\"contact-"+ buddyObj.identity +"\" class="+ classStr +" onclick=\"SelectBuddy('"+ buddyObj.identity +"', 'contact')\">";
            html += "<span id=\"contact-"+ buddyObj.identity +"-missed\" class=missedNotifyer style=\""+ ((buddyObj.missed && buddyObj.missed > 0)? "" : "display:none") +"\">"+ buddyObj.missed +"</span>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-picture\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity, buddyObj.type) +"')\"></div>";
            html += (buddyObj.Pinned)? "<span class=pinnedBuddy><i class=\"fa fa-thumb-tack\"></i></span>" : "";
            html += "<div class=contactNameText><i class=\"fa fa-address-card\"></i> "+ buddyObj.CallerIDName +"</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-datetime\" class=contactDate>"+ autDeleteStatus + ""+ displayDateTime +"</div>";
            html += "<div class=presenceText>"+ buddyObj.Desc +"</div>";
            html += "</div>";
            $("#myContacts").append(html);
        } else if(buddyObj.type == "group"){ 
            var autDeleteStatus = "";
            if(buddyObj.AllowAutoDelete == true) autDeleteStatus = "<i class=\"fa fa-clock-o\"></i> ";
            var html = "<div id=\"contact-"+ buddyObj.identity +"\" class="+ classStr +" onclick=\"SelectBuddy('"+ buddyObj.identity +"', 'group')\">";
            html += "<span id=\"contact-"+ buddyObj.identity +"-missed\" class=missedNotifyer style=\""+ ((buddyObj.missed && buddyObj.missed > 0)? "" : "display:none") +"\">"+ buddyObj.missed +"</span>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-picture\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity, buddyObj.type) +"')\"></div>";
            html += (buddyObj.Pinned)? "<span class=pinnedBuddy><i class=\"fa fa-thumb-tack\"></i></span>" : "";
            html += "<div class=contactNameText><i class=\"fa fa-users\"></i> "+ buddyObj.CallerIDName +"</div>";
            html += "<div id=\"contact-"+ buddyObj.identity +"-datetime\" class=contactDate>"+ autDeleteStatus + ""+ displayDateTime +"</div>";
            html += "<div class=presenceText>"+ buddyObj.Desc +"</div>";
            html += "</div>";
            $("#myContacts").append(html);
        }
    }
    if(hiddenBuddies > 0){
        console.warn("Auto Delete Buddies not shown", hiddenBuddies);
        var html = "<div id=hiddenBuddies class=hiddenBuddiesText>("+ lang.sort_no_showing.replace("{0}", hiddenBuddies) +")</div>";
        $("#myContacts").append(html);
        $("#hiddenBuddies").on("click", function(){
            HideAutoDeleteBuddies = false;
            // Show now, but leave default set in storage
            UpdateBuddyList();
        });
    }


    // Make Select
    // ===========
    for(var b = 0; b < Buddies.length; b++) {
        if(Buddies[b].IsSelected) {
            SelectBuddy(Buddies[b].identity, Buddies[b].type);
            break;
        }
    }
}

function SortBuddies(){

    // Firstly: Type - Second: Last Activity
    if(BuddySortBy == "type"){
        Buddies.sort(function(a, b){
            var aMo = moment.utc(a.lastActivity.replace(" UTC", ""));
            var bMo = moment.utc(b.lastActivity.replace(" UTC", ""));
            // contact | extension | (group) | xmpp
            var aType = a.type;
            var bType = b.type;
            // No groups for now
            if(SortByTypeOrder == "c|e|x") {
                if(a.type == "contact") aType = "A";
                if(b.type == "contact") bType = "A";
                if(a.type == "extension") aType = "B";
                if(b.type == "extension") bType = "B";
                if(a.type == "xmpp") aType = "C";
                if(b.type == "xmpp") bType = "C";
            }
            if(SortByTypeOrder == "c|x|e") {
                if(a.type == "contact") aType = "A";
                if(b.type == "contact") bType = "A";
                if(a.type == "extension") aType = "C";
                if(b.type == "extension") bType = "C";
                if(a.type == "xmpp") aType = "B";
                if(b.type == "xmpp") bType = "B";
            }
            if(SortByTypeOrder == "x|e|c") {
                if(a.type == "contact") aType = "C";
                if(b.type == "contact") bType = "C";
                if(a.type == "extension") aType = "B";
                if(b.type == "extension") bType = "B";
                if(a.type == "xmpp") aType = "A";
                if(b.type == "xmpp") bType = "A";
            }
            if(SortByTypeOrder == "x|c|e") {
                if(a.type == "contact") aType = "B";
                if(b.type == "contact") bType = "B";
                if(a.type == "extension") aType = "C";
                if(b.type == "extension") bType = "C";
                if(a.type == "xmpp") aType = "A";
                if(b.type == "xmpp") bType = "A";
            }
            if(SortByTypeOrder == "e|x|c") {
                if(a.type == "contact") aType = "C";
                if(b.type == "contact") bType = "C";
                if(a.type == "extension") aType = "A";
                if(b.type == "extension") bType = "A";
                if(a.type == "xmpp") aType = "B";
                if(b.type == "xmpp") bType = "B";
            }
            if(SortByTypeOrder == "e|c|x") {
                if(a.type == "contact") aType = "B";
                if(b.type == "contact") bType = "A";
                if(a.type == "extension") aType = "A";
                if(b.type == "extension") bType = "A";
                if(a.type == "xmpp") aType = "C";
                if(b.type == "xmpp") bType = "C";
            }

            return (aType.localeCompare(bType) || (aMo.isSameOrAfter(bMo, "second")? -1 : 1));
        });
    }

    // Extension Number (or Contact Number) - Second: Last Activity
    if(BuddySortBy == "extension"){
        Buddies.sort(function(a, b){
            var aSortBy = (a.type == "extension" || a.type == "xmpp")? a.ExtNo : a.ContactNumber1;
            var bSortBy = (b.type == "extension" || b.type == "xmpp")? b.ExtNo : a.ContactNumber1;
            var aMo = moment.utc(a.lastActivity.replace(" UTC", ""));
            var bMo = moment.utc(b.lastActivity.replace(" UTC", ""));
            return (aSortBy.localeCompare(bSortBy) || (aMo.isSameOrAfter(bMo, "second")? -1 : 1));
        });
    }

    // Name Alphabetically - Second: Last Activity
    if(BuddySortBy == "alphabetical"){
        Buddies.sort(function(a, b){
            var aMo = moment.utc(a.lastActivity.replace(" UTC", ""));
            var bMo = moment.utc(b.lastActivity.replace(" UTC", ""));
            return (a.CallerIDName.localeCompare(b.CallerIDName) || (aMo.isSameOrAfter(bMo, "second")? -1 : 1));
        });
    }

    // Last Activity Only
    if(BuddySortBy == "activity"){
        Buddies.sort(function(a, b){
            var aMo = moment.utc(a.lastActivity.replace(" UTC", ""));
            var bMo = moment.utc(b.lastActivity.replace(" UTC", ""));
            return (aMo.isSameOrAfter(bMo, "second")? -1 : 1);
        });
    }

    // Second Sorts

    // Sort Auto Delete
    if(BuddyAutoDeleteAtEnd == true){
        Buddies.sort(function(a, b){
            return (a.AllowAutoDelete === b.AllowAutoDelete)? 0 : a.AllowAutoDelete? 1 : -1;
        });
    }
    // Sort Out Pinned
    Buddies.sort(function(a, b){
        return (a.Pinned === b.Pinned)? 0 : a.Pinned? -1 : 1;
    });
    
}

function getPicture(buddy, typestr, ignoreCache){
    var avatars = defaultAvatars.split(",");
    var rndInt = Math.floor(Math.random() * avatars.length);
    var defaultImg = hostingPrefix + "" + imagesDirectory + "" + avatars[rndInt].trim();
    if(buddy == "profilePicture"){
        // Special handling for profile image
        var dbImg = localDB.getItem("profilePicture");
        if(dbImg == null){
            return defaultImg;
        }
        else {
            return dbImg;
            // return URL.createObjectURL(base64toBlob(dbImg, 'image/png'));
        }
    }

    typestr = (typestr)? typestr : "extension";
    var buddyObj = FindBuddyByIdentity(buddy);
    if(buddyObj == null){
        return defaultImg
    }
    if(ignoreCache != true && buddyObj.imageObjectURL != ""){
        // Use Cache
        return buddyObj.imageObjectURL;
    }
    var dbImg = localDB.getItem("img-"+ buddy +"-"+ typestr);
    if(dbImg == null){
        buddyObj.imageObjectURL = defaultImg
        return buddyObj.imageObjectURL
    }
    else {
        buddyObj.imageObjectURL = URL.createObjectURL(base64toBlob(dbImg, 'image/webp')); // image/png
        return buddyObj.imageObjectURL;
    }
}

function FindBuddyByIdentity(identity){
    for(var b = 0; b < Buddies.length; b++){
        if(Buddies[b].identity == identity) return Buddies[b];
    }
    return null;
}

function AddBuddyMessageStream(buddyObj) {

    // Profile Etc Row
    // ----------------------------------------------------------
    var profileRow = "";
    profileRow += "<tr><td id=\"contact-"+ buddyObj.identity +"-ProfileCell\" class=\"streamSection highlightSection buddyProfileSection\" style=\"height: 50px; box-sizing: border-box;\">";

    // Left Content - Profile
    profileRow += "<table cellpadding=0 cellspacing=0 border=0 style=\"width:100%; table-layout: fixed;\">"
    profileRow += "<tr>"
    // Close|Return|Back Button
    profileRow += "<td style=\"width:38px; text-align: center;\">";
    profileRow += "<button id=\"contact-"+ buddyObj.identity +"-btn-back\" onclick=\"CloseBuddy('"+ buddyObj.identity +"')\" class=roundButtons style=\"margin-right:5px\" title=\""+ lang.back +"\"><i class=\"fa fa-chevron-left\"></i></button> ";
    profileRow += "</td>"
    
    // Profile UI
    profileRow += "<td style=\"width:100%\">";
    profileRow += "<div class=contact style=\"cursor: unset; padding:0px\">";
    if(buddyObj.type == "extension" || buddyObj.type == "xmpp") {
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-picture-main\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity) +"')\"></div>";
    }
    else if(buddyObj.type == "contact") {
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-picture-main\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity,"contact") +"')\"></div>";
    }
    else if(buddyObj.type == "group") {
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-picture-main\" class=buddyIcon style=\"background-image: url('"+ getPicture(buddyObj.identity,"group") +"')\"></div>";
    }
    // Caller ID
    if(buddyObj.type == "extension" || buddyObj.type == "xmpp") {
        profileRow += "<div class=contactNameText style=\"margin-right: 0px;\">";
        profileRow += "<span id=\"contact-"+ buddyObj.identity +"-devstate-main\" class=\""+ buddyObj.devState +"\"></span>";
        profileRow += " <span id=\"contact-"+ buddyObj.identity +"-name\">"+ buddyObj.CallerIDName +"</span>";
        profileRow += "</div>";
    }
    else if(buddyObj.type == "contact") {
        profileRow += "<div class=contactNameText style=\"margin-right: 0px;\">"
        profileRow += "<i class=\"fa fa-address-card\"></i>";
        profileRow += " <span id=\"contact-"+ buddyObj.identity +"-name\">"+ buddyObj.CallerIDName +"</span>";
        profileRow += "</div>";
    } 
    else if(buddyObj.type == "group") {
        profileRow += "<div class=contactNameText style=\"margin-right: 0px;\">"
        profileRow += "<i class=\"fa fa-users\"></i>";
        profileRow += " <span id=\"contact-"+ buddyObj.identity +"-name\">"+ buddyObj.CallerIDName +"</span>";
        profileRow += "</div>";
    }
    // Presence
    if(buddyObj.type == "extension") {
        var friendlyState = buddyObj.presence;
        if (friendlyState == "Unknown") friendlyState = lang.state_unknown;
        if (friendlyState == "Not online") friendlyState = lang.state_not_online;
        if (friendlyState == "Ready") friendlyState = lang.state_ready;
        if (friendlyState == "On the phone") friendlyState = lang.state_on_the_phone;
        if (friendlyState == "Ringing") friendlyState = lang.state_ringing;
        if (friendlyState == "On hold") friendlyState = lang.state_on_hold;
        if (friendlyState == "Unavailable") friendlyState = lang.state_unavailable;
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-presence-main\" class=presenceText>"+ friendlyState +"</div>";
    } 
    else if(buddyObj.type == "xmpp"){
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-presence-main\" class=presenceText><i class=\"fa fa-comments\"></i> "+ buddyObj.presenceText +"</div>";
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-chatstate-main\" class=presenceText style=\"display:none\"><i class=\"fa fa-commenting-o\"></i> "+ buddyObj.CallerIDName +" "+ lang.is_typing +"...</div>";
    }
    else{
        profileRow += "<div id=\"contact-"+ buddyObj.identity +"-presence-main\" class=presenceText>"+ buddyObj.Desc +"</div>";
    }
    profileRow += "</div>";
    profileRow += "</td>";

    // Right Content - Action Buttons
    var buttonsWidth = 80; // 1 button = 34px ~40px
    if((buddyObj.type == "extension" || buddyObj.type == "xmpp") && EnableVideoCalling == true) {
        buttonsWidth = 120;
    }
    var fullButtonsWidth = 200;
    if((buddyObj.type == "extension" || buddyObj.type == "xmpp") && EnableVideoCalling == true) {
        fullButtonsWidth = 240;
    }
    profileRow += "<td id=\"contact-"+ buddyObj.identity +"-action-buttons\" style=\"width: "+ buttonsWidth +"px; text-align: right\">";
    profileRow += "<button id=\"contact-"+ buddyObj.identity +"-btn-audioCall\" onclick=\"AudioCallMenu('"+ buddyObj.identity +"', this)\" class=roundButtons title=\""+ lang.audio_call +"\"><i class=\"fa fa-phone\"></i></button>";
    if((buddyObj.type == "extension" || buddyObj.type == "xmpp") && EnableVideoCalling == true) {
        profileRow += " <button id=\"contact-"+ buddyObj.identity +"-btn-videoCall\" onclick=\"DialByLine('video', '"+ buddyObj.identity +"', '"+ buddyObj.ExtNo +"');\" class=roundButtons title=\""+ lang.video_call +"\"><i class=\"fa fa-video-camera\"></i></button>";
    }
    profileRow += "<span id=\"contact-"+ buddyObj.identity +"-extra-buttons\" style=\"display:none\">"
    profileRow += " <button id=\"contact-"+ buddyObj.identity +"-btn-edit\" onclick=\"EditBuddyWindow('"+ buddyObj.identity +"')\" class=roundButtons title=\""+ lang.edit +"\"><i class=\"fa fa-pencil\"></i></button>";
    profileRow += " <button id=\"contact-"+ buddyObj.identity +"-btn-search\" onclick=\"FindSomething('"+ buddyObj.identity +"')\" class=roundButtons title=\""+ lang.find_something +"\"><i class=\"fa fa-search\"></i></button>";
    profileRow += " <button id=\"contact-"+ buddyObj.identity +"-btn-pin\" onclick=\"TogglePinned('"+ buddyObj.identity +"')\" class=roundButtons title=\""+ lang.pin_to_top +"\"><i class=\"fa fa-thumb-tack\"></i></button>";
    profileRow += "</span>"
    profileRow += " <button id=\"contact-"+ buddyObj.identity +"-btn-toggle-extra\" onclick=\"ToggleExtraButtons('"+ buddyObj.identity +"', "+ buttonsWidth +", "+ fullButtonsWidth +")\" class=roundButtons><i class=\"fa fa-ellipsis-h\"></i></button>";
    profileRow += "</td>";

    profileRow += "</tr></table>";
    profileRow += "</div>";

    // Separator
    profileRow += "<div style=\"clear:both; height:0px\"></div>"

    // Search & Related Elements
    profileRow += "<div id=\"contact-"+ buddyObj.identity +"-search\" style=\"margin-top:6px; display:none\">";
    profileRow += "<span class=searchClean style=\"width:100%\"><input type=text style=\"width: calc(100% - 40px);\" autocomplete=none oninput=SearchStream(this,'"+ buddyObj.identity +"') placeholder=\""+ lang.find_something_in_the_message_stream +"\"></span>";
    profileRow += "</div>";

    profileRow += "</td></tr>";

    // Messages Row
    // ----------------------------------------------------------
    var messagesRow = ""
    messagesRow += "<tr><td id=\"contact-"+ buddyObj.identity +"-MessagesCell\" class=\"streamSection streamSectionBackground wallpaperBackground buddyMessageSection\">";
    messagesRow += "<div id=\"contact-"+ buddyObj.identity +"-ChatHistory\" class=\"chatHistory cleanScroller\" ondragenter=\"setupDragDrop(event, '"+ buddyObj.identity +"')\" ondragover=\"setupDragDrop(event, '"+ buddyObj.identity +"')\" ondragleave=\"cancelDragDrop(event, '"+ buddyObj.identity +"')\" ondrop=\"onFileDragDrop(event, '"+ buddyObj.identity +"')\">";
    // Previous Chat messages
    messagesRow += "</div>";
    messagesRow += "</td></tr>";

    // Interaction row
    // ----------------------------------------------------------
    var textRow = ""
    if((buddyObj.type == "extension" || buddyObj.type == "xmpp" || buddyObj.type == "group") && EnableTextMessaging) {
        textRow += "<tr><td id=\"contact-"+ buddyObj.identity +"-InteractionCell\" class=\"streamSection highlightSection buddyInteractionSection\" style=\"height:80px\">";

        // Send Paste Image
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-imagePastePreview\" class=sendImagePreview style=\"display:none\" tabindex=0></div>";
        // Preview
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-msgPreview\" class=sendMessagePreview style=\"display:none\">"
        textRow += "<table class=sendMessagePreviewContainer cellpadding=0 cellspacing=0><tr>";
        textRow += "<td style=\"text-align:right\"><div id=\"contact-"+ buddyObj.identity +"-msgPreviewhtml\" class=\"sendMessagePreviewHtml cleanScroller\"></div></td>"
        textRow += "<td style=\"width:40px\"><button onclick=\"SendChatMessage('"+ buddyObj.identity +"')\" class=\"roundButtons\" title=\""+ lang.send +"\"><i class=\"fa fa-paper-plane\"></i></button></td>"
        textRow += "</tr></table>";
        textRow += "</div>";

        // Send File
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-fileShare\" style=\"display:none\">";
        textRow += "<input type=file multiple onchange=\"console.log(this)\" />";
        textRow += "</div>";

        // Send Audio Recording
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-audio-recording\" style=\"display:none\"></div>";

        // Send Video Recording
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-video-recording\" style=\"display:none\"></div>";

        // Dictate Message
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-dictate-message\" style=\"display:none\"></div>";

        // Emoji Menu Bar
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-emoji-menu\" style=\"display:none\"></div>";

        // ChatState
        textRow += "<div id=\"contact-"+ buddyObj.identity +"-chatstate\" style=\"display:none\"><i class=\"fa fa-commenting-o\"></i> "+ buddyObj.CallerIDName +" "+ lang.is_typing +"...</div>";

        // Type Area
        textRow += "<table class=sendMessageContainer cellpadding=0 cellspacing=0><tr>";
        textRow += "<td id=\"contact-"+ buddyObj.identity +"-add-menu\" class=MessageActions style=\"width:40px\"><button onclick=\"AddMenu(this, '"+ buddyObj.identity +"')\" class=roundButtons title=\""+ lang.menu +"\"><i class=\"fa fa-ellipsis-h\"></i></button></td>";
        textRow += "<td><textarea id=\"contact-"+ buddyObj.identity +"-ChatMessage\" class=\"chatMessage cleanScroller\" placeholder=\""+ lang.type_your_message_here +"\" onkeydown=\"chatOnkeydown(event, this,'"+ buddyObj.identity +"')\" oninput=\"chatOnInput(event, this,'"+ buddyObj.identity +"')\" onpaste=\"chatOnbeforepaste(event, this,'"+ buddyObj.identity +"')\"></textarea></td>";
        textRow += "<td id=\"contact-"+ buddyObj.identity +"-sendMessageButtons\" style=\"width:40px; display:none\"><button onclick=\"SendChatMessage('"+ buddyObj.identity +"')\" class=\"roundButtons\" title=\""+ lang.send +"\"><i class=\"fa fa-paper-plane\"></i></button></td>"
        textRow += "</tr></table>";
        
        textRow += "</td></tr>";
    }

    var html = "<table id=\"stream-"+ buddyObj.identity +"\" class=stream cellspacing=0 cellpadding=0>";
    if(UiMessageLayout == "top"){
        html += messagesRow;
        html += profileRow;
    } else {
        html += profileRow;
        html += messagesRow;
    }
    html += textRow;
    html += "</table>";

    $("#rightContent").append(html);
    if(UiMessageLayout == "top"){
        $("#contact-"+ buddyObj.identity +"-MessagesCell").addClass("")
        $("#contact-"+ buddyObj.identity +"-ProfileCell").addClass("sectionBorderTop")
        $("#contact-"+ buddyObj.identity +"-InteractionCell").addClass("")
    } else {
        $("#contact-"+ buddyObj.identity +"-ProfileCell").addClass("sectionBorderBottom")
        $("#contact-"+ buddyObj.identity +"-MessagesCell").addClass("")
        $("#contact-"+ buddyObj.identity +"-InteractionCell").addClass("sectionBorderTop")
    }


}


// Phone Lines
// ===========
var Line = function(lineNumber, displayName, displayNumber, buddyObj){
    this.LineNumber = lineNumber;
    this.DisplayName = displayName;
    this.DisplayNumber = displayNumber;
    this.IsSelected = false;
    this.BuddyObj = buddyObj;
    this.SipSession = null;
    this.LocalSoundMeter = null;
    this.RemoteSoundMeter = null;
}

function SelectLine(lineNum){
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null) return;
    
    var displayLineNumber = 0;
    for(var l = 0; l < Lines.length; l++) {
        if(Lines[l].LineNumber == lineObj.LineNumber) displayLineNumber = l+1;
        if(Lines[l].IsSelected == true && Lines[l].LineNumber == lineObj.LineNumber){
            // Nothing to do, you re-selected the same buddy;
            return;
        }
    }

    console.log("Selecting Line : "+ lineObj.LineNumber);

    // Can only display one thing on the Right
    $(".streamSelected").each(function () {
        $(this).prop('class', 'stream');
    });
    $("#line-ui-" + lineObj.LineNumber).prop('class', 'streamSelected');

    $("#line-ui-" + lineObj.LineNumber + "-DisplayLineNo").html("<i class=\"fa fa-phone\"></i> "+ lang.line +" "+ displayLineNumber);
    $("#line-ui-" + lineObj.LineNumber + "-LineIcon").html(displayLineNumber);

    // Switch the SIP Sessions
    SwitchLines(lineObj.LineNumber);

    // Update Lines List
    for(var l = 0; l < Lines.length; l++) {
        var classStr = (Lines[l].LineNumber == lineObj.LineNumber)? "buddySelected" : "buddy";
        if(Lines[l].SipSession != null) classStr = (Lines[l].SipSession.isOnHold)? "buddyActiveCallHollding" : "buddyActiveCall";

        $("#line-" + Lines[l].LineNumber).prop('class', classStr);
        Lines[l].IsSelected = (Lines[l].LineNumber == lineObj.LineNumber);
    }
    // Update Buddy List
    for(var b = 0; b < Buddies.length; b++) {
        $("#contact-" + Buddies[b].identity).prop("class", "buddy");
        Buddies[b].IsSelected = false;
    }

    // Change to Stream if in Narrow view
    UpdateUI();
}

function FindLineByNumber(lineNum) {
    for(var l = 0; l < Lines.length; l++) {
        if(Lines[l].LineNumber == lineNum) return Lines[l];
    }
    return null;
}

function CloseLine(lineNum){
    // Lines and Buddies (Left)
    $(".buddySelected").each(function () {
        $(this).prop('class', 'buddy');
    });
    // Streams (Right)
    $(".streamSelected").each(function () {
        $(this).prop('class', 'stream');
    });

    // SwitchLines(0);

    console.log("Closing Line: "+ lineNum);
    for(var l = 0; l < Lines.length; l++){
        Lines[l].IsSelected = false;
    }
    selectedLine = null;
    for(var b = 0; b < Buddies.length; b++){
        Buddies[b].IsSelected = false;
    }
    selectedBuddy = null;

    // Save Selected
    // localDB.setItem("SelectedBuddy", null);

    // Change to Stream if in Narrow view
    UpdateUI();
}
function SwitchLines(lineNum){
    $.each(userAgent.sessions, function (i, session) {
        // All the other calls, not on hold
        if(session.state == SIP.SessionState.Established){
            if(session.isOnHold == false && session.data.line != lineNum) {
                holdSession(session.data.line);
            }
        }
        session.data.IsCurrentCall = false;
    });

    var lineObj = FindLineByNumber(lineNum);
    if(lineObj != null && lineObj.SipSession != null) {
        var session = lineObj.SipSession;
        if(session.state == SIP.SessionState.Established){
            if(session.isOnHold == true) {
                unholdSession(lineNum)
            }
        }
        session.data.IsCurrentCall = true;
    }
    selectedLine = lineNum;

    RefreshLineActivity(lineNum);
}

function RefreshLineActivity(lineNum){
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) {
        return;
    }
    var session = lineObj.SipSession;

    $("#line-"+ lineNum +"-CallDetails").empty();

    var callDetails = [];

    var ringTime = 0;
    var CallStart = moment.utc(session.data.callstart.replace(" UTC", ""));
    var CallAnswer = null;
    if(session.data.startTime){
        CallAnswer = moment.utc(session.data.startTime);
        ringTime = moment.duration(CallAnswer.diff(CallStart));
    }
    CallStart = CallStart.format("YYYY-MM-DD HH:mm:ss UTC")
    CallAnswer = (CallAnswer)? CallAnswer.format("YYYY-MM-DD HH:mm:ss UTC") : null,
    ringTime = (ringTime != 0)? ringTime.asSeconds() : 0

    var srcCallerID = "";
    var dstCallerID = "";
    if(session.data.calldirection == "inbound") {
        srcCallerID = "<"+ session.remoteIdentity.uri.user +"> "+ session.remoteIdentity.displayName;
    } 
    else if(session.data.calldirection == "outbound") {
        dstCallerID = session.data.dst;
    }

    var withVideo = (session.data.withvideo)? "("+ lang.with_video +")" : "";
    var startCallMessage = (session.data.calldirection == "inbound")? lang.you_received_a_call_from + " " + srcCallerID  +" "+ withVideo : lang.you_made_a_call_to + " " + dstCallerID +" "+ withVideo;
    callDetails.push({ 
        Message: startCallMessage,
        TimeStr : CallStart
    });
    if(CallAnswer){
        var answerCallMessage = (session.data.calldirection == "inbound")? lang.you_answered_after + " " + ringTime + " " + lang.seconds_plural : lang.they_answered_after + " " + ringTime + " " + lang.seconds_plural;
        callDetails.push({ 
            Message: answerCallMessage,
            TimeStr : CallAnswer
        });
    }

    var Transfers = (session.data.transfer)? session.data.transfer : [];
    $.each(Transfers, function(item, transfer){
        var msg = (transfer.type == "Blind")? lang.you_started_a_blind_transfer_to +" "+ transfer.to +". " : lang.you_started_an_attended_transfer_to + " "+ transfer.to +". ";
        if(transfer.accept && transfer.accept.complete == true){
            msg += lang.the_call_was_completed
        }
        else if(transfer.accept.disposition != "") {
            msg += lang.the_call_was_not_completed +" ("+ transfer.accept.disposition +")"
        }
        callDetails.push({
            Message : msg,
            TimeStr : transfer.transferTime
        });
    });
    var Mutes = (session.data.mute)? session.data.mute : []
    $.each(Mutes, function(item, mute){
        callDetails.push({
            Message : (mute.event == "mute")? lang.you_put_the_call_on_mute : lang.you_took_the_call_off_mute,
            TimeStr : mute.eventTime
        });
    });
    var Holds = (session.data.hold)? session.data.hold : []
    $.each(Holds, function(item, hold){
        callDetails.push({
            Message : (hold.event == "hold")? lang.you_put_the_call_on_hold : lang.you_took_the_call_off_hold,
            TimeStr : hold.eventTime
        });
    });
    var ConfbridgeEvents = (session.data.ConfbridgeEvents)? session.data.ConfbridgeEvents : []
    $.each(ConfbridgeEvents, function(item, event){
        callDetails.push({
            Message : event.event,
            TimeStr : event.eventTime
        });
    });
    var Recordings = (session.data.recordings)? session.data.recordings : []
    $.each(Recordings, function(item, recording){
        var msg = lang.call_is_being_recorded;
        if(recording.startTime != recording.stopTime){
            msg += "("+ lang.now_stopped +")"
        }
        callDetails.push({
            Message : msg,
            TimeStr : recording.startTime
        });
    });
    var ConfCalls = (session.data.confcalls)? session.data.confcalls : []
    $.each(ConfCalls, function(item, confCall){
        var msg = lang.you_started_a_conference_call_to +" "+ confCall.to +". ";
        if(confCall.accept && confCall.accept.complete == true){
            msg += lang.the_call_was_completed
        }
        else if(confCall.accept.disposition != "") {
            msg += lang.the_call_was_not_completed +" ("+ confCall.accept.disposition +")"
        }
        callDetails.push({
            Message : msg,
            TimeStr : confCall.startTime
        });
    });

    callDetails.sort(function(a, b){
        var aMo = moment.utc(a.TimeStr.replace(" UTC", ""));
        var bMo = moment.utc(b.TimeStr.replace(" UTC", ""));
        if (aMo.isSameOrAfter(bMo, "second")) {
            return -1;
        } else return 1;
        return 0;
    });

    $.each(callDetails, function(item, detail){
        var Time = moment.utc(detail.TimeStr.replace(" UTC", "")).local().format(DisplayTimeFormat);
        var messageString = "<table class=timelineMessage cellspacing=0 cellpadding=0><tr>"
        messageString += "<td class=timelineMessageArea>"
        messageString += "<div class=timelineMessageDate><i class=\"fa fa-circle timelineMessageDot\"></i>"+ Time +"</div>"
        messageString += "<div class=timelineMessageText>"+ detail.Message +"</div>"
        messageString += "</td>"
        messageString += "</tr></table>";
        $("#line-"+ lineNum +"-CallDetails").prepend(messageString);
    });
}


// User Interface
// ==============
function UpdateUI(){
    var windowWidth = $(window).outerWidth()
    var windowHeight = $(window).outerHeight();
    if(windowWidth > UiMaxWidth){
        $("#leftContentTable").css("border-left-width", "1px");
        if(selectedBuddy == null && selectedLine == null) {
            $("#leftContentTable").css("border-right-width", "1px");
        } else {
            $("#rightContent").css("border-right-width", "1px");
        }
    } else {
        // Touching Edges
        $("#leftContentTable").css("border-left-width", "0px");
        if(selectedBuddy == null && selectedLine == null) {
            $("#leftContentTable").css("border-right-width", "0px");
        } else {
            $("#leftContentTable").css("border-right-width", "1px");
        }
        $("#rightContent").css("border-right-width", "0px");
    }

    if(windowWidth < 920){
        // Narrow Layout

        if(selectedBuddy == null & selectedLine == null) {
            // Nobody Selected (SHow Only Left Table)
            $("#rightContent").hide();

            $("#leftContent").css("width", "100%");
            $("#leftContent").show();
        }
        else {
            // Nobody Selected (SHow Only Buddy / Line)
            $("#rightContent").css("margin-left", "0px");
            $("#rightContent").show();

            $("#leftContent").hide();
            
            if(selectedBuddy != null) updateScroll(selectedBuddy.identity);
        }
    }
    else {
        // Wide Screen Layout
        if(selectedBuddy == null & selectedLine == null) {
            $("#leftContent").css("width", "100%");
            $("#rightContent").css("margin-left", "0px");
            $("#leftContent").show();
            $("#rightContent").hide();
        }
        else{
            $("#leftContent").css("width", "320px");
            $("#rightContent").css("margin-left", "320px");
            $("#leftContent").show();
            $("#rightContent").show();

            if(selectedBuddy != null) updateScroll(selectedBuddy.identity);
        }
    }
    for(var l=0; l<Lines.length; l++){
        updateLineScroll(Lines[l].LineNumber);
        RedrawStage(Lines[l].LineNumber, false);
    }

    if(windowObj != null){
        var offsetTextHeight = windowObj.parent().outerHeight();
        var width = windowObj.width();
        if(windowWidth <= width || windowHeight <= offsetTextHeight) {
            // First apply to dialog, then set css
            windowObj.dialog("option", "height", windowHeight);
            windowObj.dialog("option", "width", windowWidth - (1+1+2+2)); // There is padding and a border
            windowObj.parent().css('top', '0px');
            windowObj.parent().css('left', '0px');
        } 
        else {
            windowObj.parent().css('left', windowWidth/2 - width/2 + 'px');
            windowObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
        }
    }
    if(alertObj != null){
        var width = 300;
        var offsetTextHeight = alertObj.parent().outerHeight();
        if(windowWidth <= width || windowHeight <= offsetTextHeight) {
            if(windowWidth <= width){
                // First apply to dialog, then set css
                alertObj.dialog("option", "width", windowWidth - (1+1+2+2));
                alertObj.parent().css('left', '0px');
                alertObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
            }
            if(windowHeight <= offsetTextHeight){
                // First apply to dialog, then set css
                alertObj.dialog("option", "height", windowHeight);
                alertObj.parent().css('left', windowWidth/2 - width/2 + 'px');
                alertObj.parent().css('top', '0px');
            }
        }
        else {
            alertObj.parent().css('left', windowWidth/2 - width/2 + 'px');
            alertObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
        }
    }
    if(confirmObj != null){
        var width = 300;
        var offsetTextHeight = confirmObj.parent().outerHeight();
        if(windowWidth <= width || windowHeight <= offsetTextHeight) {
            if(windowWidth <= width){
                // First apply to dialog, then set css
                confirmObj.dialog("option", "width", windowWidth - (1+1+2+2));
                confirmObj.parent().css('left', '0px');
                confirmObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
            }
            if(windowHeight <= offsetTextHeight){
                // First apply to dialog, then set css
                confirmObj.dialog("option", "height", windowHeight);
                confirmObj.parent().css('left', windowWidth/2 - width/2 + 'px');
                confirmObj.parent().css('top', '0px');
            }
        }
        else {
            confirmObj.parent().css('left', windowWidth/2 - width/2 + 'px');
            confirmObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
        }
    }
    if(promptObj != null){
        var width = 300;
        var offsetTextHeight = promptObj.parent().outerHeight();
        if(windowWidth <= width || windowHeight <= offsetTextHeight) {
            if(windowWidth <= width){
                // First apply to dialog, then set css
                promptObj.dialog("option", "width", windowWidth - (1+1+2+2));
                promptObj.parent().css('left', '0px');
                promptObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
            }
            if(windowHeight <= offsetTextHeight){
                // First apply to dialog, then set css
                promptObj.dialog("option", "height", windowHeight);
                promptObj.parent().css('left', windowWidth/2 - width/2 + 'px');
                promptObj.parent().css('top', '0px');
            }
        }
        else {
            promptObj.parent().css('left', windowWidth/2 - width/2 + 'px');
            promptObj.parent().css('top', windowHeight/2 - offsetTextHeight/2 + 'px');
        }
    }
    HidePopup();
}

function updateLineScroll(lineNum) {
    RefreshLineActivity(lineNum);

    var element = $("#line-"+ lineNum +"-CallDetails").get(0);
    if(element) element.scrollTop = element.scrollHeight;
}
function updateScroll(buddy) {
    var history = $("#contact-"+ buddy +"-ChatHistory");
    try{
        if(history.children().length > 0) history.children().last().get(0).scrollIntoView(false);
        history.get(0).scrollTop = history.get(0).scrollHeight;
    } catch(e){}
}

// Video Conference Stage
// ======================
function RedrawStage(lineNum, videoChanged){
    var  stage = $("#line-" + lineNum + "-VideoCall");
    var container = $("#line-" + lineNum + "-stage-container");
    var previewContainer = $("#line-"+  lineNum +"-preview-container");
    var videoContainer = $("#line-" + lineNum + "-remote-videos");

    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null) return;
    var session = lineObj.SipSession;
    if(session == null) return;

    var isVideoPinned = false;
    var pinnedVideoID = "";

    // Preview Area
    previewContainer.find('video').each(function(i, video) {
        $(video).hide();
    });
    previewContainer.css("width",  "");

    // Count and Tag Videos
    var videoCount = 0;
    videoContainer.find('video').each(function(i, video) {
        var thisRemoteVideoStream = video.srcObject;
        var videoTrack = thisRemoteVideoStream.getVideoTracks()[0];
        var videoTrackSettings = videoTrack.getSettings();
        var srcVideoWidth = (videoTrackSettings.width)? videoTrackSettings.width : video.videoWidth;
        var srcVideoHeight = (videoTrackSettings.height)? videoTrackSettings.height : video.videoHeight;

        if(thisRemoteVideoStream.mid) {
            thisRemoteVideoStream.channel = "unknown"; // Asterisk Channel
            thisRemoteVideoStream.CallerIdName = "";
            thisRemoteVideoStream.CallerIdNumber = "";
            thisRemoteVideoStream.isAdminMuted = false;
            thisRemoteVideoStream.isAdministrator = false;
            if(session && session.data && session.data.videoChannelNames){
                session.data.videoChannelNames.forEach(function(videoChannelName){
                    if(thisRemoteVideoStream.mid == videoChannelName.mid){
                        thisRemoteVideoStream.channel = videoChannelName.channel;
                    }
                });
            }
            if(session && session.data && session.data.ConfbridgeChannels){
                session.data.ConfbridgeChannels.forEach(function(ConfbridgeChannel){
                    if(ConfbridgeChannel.id == thisRemoteVideoStream.channel){
                        thisRemoteVideoStream.CallerIdName = ConfbridgeChannel.caller.name;
                        thisRemoteVideoStream.CallerIdNumber = ConfbridgeChannel.caller.number;
                        thisRemoteVideoStream.isAdminMuted = ConfbridgeChannel.muted;
                        thisRemoteVideoStream.isAdministrator = ConfbridgeChannel.admin;
                    }
                });
            }
            // console.log("Track MID :", thisRemoteVideoStream.mid, thisRemoteVideoStream.channel);
        }

        // Remove any in the preview area
        if(videoChanged){
            $("#line-" + lineNum + "-preview-container").find('video').each(function(i, video) {
                if(video.id.indexOf("copy-") == 0){
                    video.remove();
                }
            });
        }

        // Prep Videos
        $(video).parent().off("click");
        $(video).parent().css("width", "1px");
        $(video).parent().css("height", "1px");
        $(video).hide();
        $(video).parent().hide();

        // Count Videos
        if(lineObj.pinnedVideo && lineObj.pinnedVideo == thisRemoteVideoStream.trackID && videoTrack.readyState == "live" && srcVideoWidth > 10 && srcVideoHeight >= 10){
            // A valid and live video is pinned
            isVideoPinned = true;
            pinnedVideoID = lineObj.pinnedVideo;
        }
        // Count All the videos
        if(videoTrack.readyState == "live" && srcVideoWidth > 10 && srcVideoHeight >= 10) {
            videoCount ++;
            console.log("Display Video - ", videoTrack.readyState, "MID:", thisRemoteVideoStream.mid, "channel:", thisRemoteVideoStream.channel, "src width:", srcVideoWidth, "src height", srcVideoHeight);
        }
        else{
            console.log("Hide Video - ", videoTrack.readyState ,"MID:", thisRemoteVideoStream.mid);
        }


    });
    if(videoCount == 0) {
        // If you are the only one in the conference, just display your self
        previewContainer.css("width",  previewWidth +"px");
        previewContainer.find('video').each(function(i, video) {
            $(video).show();
        });
        return;
    }
    if(isVideoPinned) videoCount = 1;

    if(!videoContainer.outerWidth() > 0) return;
    if(!videoContainer.outerHeight() > 0) return;

    // videoAspectRatio (1|1.33|1.77) is for the peer video, so can technically be used here
    // default ia 4:3
    var Margin = 3;
    var videoRatio = 0.750; // 0.5625 = 9/16 (16:9) | 0.75   = 3/4 (4:3)
    if(videoAspectRatio == "" || videoAspectRatio == "1.33") videoRatio = 0.750;  
    if(videoAspectRatio == "1.77") videoRatio = 0.5625;
    if(videoAspectRatio == "1") videoRatio = 1;
    var stageWidth = videoContainer.outerWidth() - (Margin * 2);
    var stageHeight = videoContainer.outerHeight() - (Margin * 2);
    var previewWidth = previewContainer.outerWidth();
    var maxWidth = 0;
    let i = 1;
    while (i < 5000) {
        let w = StageArea(i, videoCount, stageWidth, stageHeight, Margin, videoRatio);
        if (w === false) {
            maxWidth =  i - 1;
            break;
        }
        i++;
    }
    maxWidth = maxWidth - (Margin * 2);

    // Layout Videos
    videoContainer.find('video').each(function(i, video) {
        var thisRemoteVideoStream = video.srcObject;
        var videoTrack = thisRemoteVideoStream.getVideoTracks()[0];
        var videoTrackSettings = videoTrack.getSettings();
        var srcVideoWidth = (videoTrackSettings.width)? videoTrackSettings.width : video.videoWidth;
        var srcVideoHeight = (videoTrackSettings.height)? videoTrackSettings.height : video.videoHeight;

        var videoWidth = maxWidth;
        var videoHeight = maxWidth * videoRatio;

        // Set & Show
        if(isVideoPinned){
            // One of the videos are pinned
            if(pinnedVideoID == video.srcObject.trackID){
                $(video).parent().css("width", videoWidth+"px");
                $(video).parent().css("height", videoHeight+"px");
                $(video).show();
                $(video).parent().show();
                // Pinned Actions
                var unPinButton = $("<button />", {
                    class: "videoOverlayButtons",
                });
                unPinButton.html("<i class=\"fa fa-th-large\"></i>");
                unPinButton.on("click", function(){
                    UnPinVideo(lineNum, video);
                });
                $(video).parent().find(".Actions").empty();
                $(video).parent().find(".Actions").append(unPinButton);
            } else {
                // Put the videos in the preview area
                if(videoTrack.readyState == "live" && srcVideoWidth > 10 && srcVideoHeight >= 10) {
                    if(videoChanged){
                        var videoEl = $("<video />", {
                            id: "copy-"+ thisRemoteVideoStream.id,
                            muted: true,
                            autoplay: true,
                            playsinline: true,
                            controls: false
                        });
                        var videoObj = videoEl.get(0);
                        videoObj.srcObject = thisRemoteVideoStream;
                        $("#line-" + lineNum + "-preview-container").append(videoEl);
                    }
                }
            }
        }
        else {
            // None of the videos are pinned
            if(videoTrack.readyState == "live" && srcVideoWidth > 10 && srcVideoHeight >= 10) {
                // Unpinned 
                $(video).parent().css("width", videoWidth+"px");
                $(video).parent().css("height", videoHeight+"px");
                $(video).show();
                $(video).parent().show();
                // Unpinned Actions
                var pinButton = $("<button />", {
                    class: "videoOverlayButtons",
                });
                pinButton.html("<i class=\"fa fa-thumb-tack\"></i>");
                pinButton.on("click", function(){
                    PinVideo(lineNum, video, video.srcObject.trackID);
                });
                $(video).parent().find(".Actions").empty();
                if(videoCount > 1){
                    // More then one video, nothing pinned
                    $(video).parent().find(".Actions").append(pinButton);
                }

            }
        }

        // Populate Caller ID
        var adminMuteIndicator = "";
        var administratorIndicator = "";
        if(thisRemoteVideoStream.isAdminMuted == true){
            adminMuteIndicator = "<i class=\"fa fa-microphone-slash\" style=\"color:red\"></i>&nbsp;"
        }
        if(thisRemoteVideoStream.isAdministrator == true){
            administratorIndicator = "<i class=\"fa fa-user\" style=\"color:orange\"></i>&nbsp;"
        }
        if(thisRemoteVideoStream.CallerIdName == ""){
            thisRemoteVideoStream.CallerIdName = FindBuddyByIdentity(session.data.buddyId).CallerIDName;
        }
        $(video).parent().find(".callerID").html(administratorIndicator + adminMuteIndicator + thisRemoteVideoStream.CallerIdName);


    });

    // Preview Area
    previewContainer.css("width",  previewWidth +"px");
    previewContainer.find('video').each(function(i, video) {
        $(video).show();
    });

}

function HidePopup(timeout){
    if(timeout){
        window.setTimeout(function(){
            if(menuObj != null){
                menuObj.menu("destroy");
                try{
                    menuObj.empty();
                }
                catch(e){}
                try{
                    menuObj.remove();
                }
                catch(e){}
                menuObj = null;
            }
        }, timeout);
    } else {
        if(menuObj != null){
            menuObj.menu("destroy");
            try{
                menuObj.empty();
            }
            catch(e){}
            try{
                menuObj.remove();
            }
            catch(e){}
            menuObj = null;
        }
    }
}

function AudioCall(lineObj, dialledNumber, extraHeaders) {
    if(userAgent == null) return;
    if(userAgent.isRegistered() == false) return;
    if(lineObj == null) return;

    if(HasAudioDevice == false){
        Alert(lang.alert_no_microphone);
        return;
    }

    var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

    var spdOptions = {
        earlyMedia: true,
        sessionDescriptionHandlerOptions: {
            constraints: {
                audio: { deviceId : "default" },
                video: false
            }
        }
    }
    // Configure Audio
    var currentAudioDevice = getAudioSrcID();
    if(currentAudioDevice != "default"){
        var confirmedAudioDevice = false;
        for (var i = 0; i < AudioinputDevices.length; ++i) {
            if(currentAudioDevice == AudioinputDevices[i].deviceId) {
                confirmedAudioDevice = true;
                break;
            }
        }
        if(confirmedAudioDevice) {
            spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = { exact: currentAudioDevice }
        }
        else {
            console.warn("The audio device you used before is no longer available, default settings applied.");
            localDB.setItem("AudioSrcId", "default");
        }
    }
    // Add additional Constraints
    if(supportedConstraints.autoGainControl) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl = AutoGainControl;
    }
    if(supportedConstraints.echoCancellation) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation = EchoCancellation;
    }
    if(supportedConstraints.noiseSuppression) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression = NoiseSuppression;
    }
    // Added to the SIP Headers
    if(extraHeaders) {
        spdOptions.extraHeaders = extraHeaders;
    } else {
        spdOptions.extraHeaders = [];
    }
    if(InviteExtraHeaders && InviteExtraHeaders != "" && InviteExtraHeaders != "{}"){
        try{
            var inviteExtraHeaders = JSON.parse(InviteExtraHeaders);
            for (const [key, value] of Object.entries(inviteExtraHeaders)) {
                if(value == ""){
                    // This is a header, must be format: "Field: Value"
                } else {
                    spdOptions.extraHeaders.push(key + ": "+  value);
                }
            }
        } catch(e){}
    }

    $("#line-" + lineObj.LineNumber + "-msg").html(lang.starting_audio_call);
    $("#line-" + lineObj.LineNumber + "-timer").show();

    var startTime = moment.utc();

    // Invite
    console.log("INVITE (audio): " + dialledNumber + "@" + SipDomain);

    var targetURI = SIP.UserAgent.makeURI("sip:" + dialledNumber.replace(/#/g, "%23") + "@" + SipDomain);
    lineObj.SipSession = new SIP.Inviter(userAgent, targetURI, spdOptions);
    lineObj.SipSession.data = {}
    lineObj.SipSession.data.line = lineObj.LineNumber;
    lineObj.SipSession.data.buddyId = lineObj.BuddyObj.identity;
    lineObj.SipSession.data.calldirection = "outbound";
    lineObj.SipSession.data.dst = dialledNumber;
    lineObj.SipSession.data.callstart = startTime.format("YYYY-MM-DD HH:mm:ss UTC");
    lineObj.SipSession.data.callTimer = window.setInterval(function(){
        var now = moment.utc();
        var duration = moment.duration(now.diff(startTime)); 
        var timeStr = formatShortDuration(duration.asSeconds());
        $("#line-" + lineObj.LineNumber + "-timer").html(timeStr);
        $("#line-" + lineObj.LineNumber + "-datetime").html(timeStr);
    }, 1000);
    lineObj.SipSession.data.VideoSourceDevice = null;
    lineObj.SipSession.data.AudioSourceDevice = getAudioSrcID();
    lineObj.SipSession.data.AudioOutputDevice = getAudioOutputID();
    lineObj.SipSession.data.terminateby = "them";
    lineObj.SipSession.data.withvideo = false;
    lineObj.SipSession.data.earlyReject = false;
    lineObj.SipSession.isOnHold = false;
    lineObj.SipSession.delegate = {
        onBye: function(sip){
            onSessionReceivedBye(lineObj, sip);
        },
        onMessage: function(sip){
            onSessionReceivedMessage(lineObj, sip);
        },
        onInvite: function(sip){
            onSessionReinvited(lineObj, sip);
        },
        onSessionDescriptionHandler: function(sdh, provisional){
            onSessionDescriptionHandlerCreated(lineObj, sdh, provisional, false);
        }
    }
    var inviterOptions = {
        requestDelegate: { // OutgoingRequestDelegate
            onTrying: function(sip){
                onInviteTrying(lineObj, sip);
            },
            onProgress:function(sip){
                onInviteProgress(lineObj, sip);
            },
            onRedirect:function(sip){
                onInviteRedirected(lineObj, sip);
            },
            onAccept:function(sip){
                onInviteAccepted(lineObj, false, sip);
            },
            onReject:function(sip){
                onInviteRejected(lineObj, sip);
            }
        }
    }
    lineObj.SipSession.invite(inviterOptions).catch(function(e){
        console.warn("Failed to send INVITE:", e);
    });

    $("#line-" + lineObj.LineNumber + "-btn-settings").removeAttr('disabled');
    $("#line-" + lineObj.LineNumber + "-btn-audioCall").prop('disabled','disabled');
    $("#line-" + lineObj.LineNumber + "-btn-videoCall").prop('disabled','disabled');
    $("#line-" + lineObj.LineNumber + "-btn-search").removeAttr('disabled');

    $("#line-" + lineObj.LineNumber + "-progress").show();
    $("#line-" + lineObj.LineNumber + "-msg").show();

    UpdateUI();
    UpdateBuddyList();
    updateLineScroll(lineObj.LineNumber);

    // Custom Web hook
    if(typeof web_hook_on_invite !== 'undefined') web_hook_on_invite(lineObj.SipSession);    
}

function Alert(messageStr, TitleStr, onOk) {
    if (confirmObj != null) {
        confirmObj.dialog("close");
        confirmObj = null;
    }
    if (promptObj != null) {
        promptObj.dialog("close");
        promptObj = null;
    }
    if (alertObj != null) {
        console.error("Alert not null, while Alert called: " + TitleStr + ", saying:" + messageStr);
        return;
    }
    else {
        console.log("Alert called with Title: " + TitleStr + ", saying: " + messageStr);
    }

    var html = "<div class=NoSelect>";
    html += "<div class=UiText style=\"padding: 10px\" id=AllertMessageText>" + messageStr + "</div>";
    html += "</div>"

    alertObj = $('<div>').html(html).dialog({
        autoOpen: false,
        title: TitleStr,
        modal: true,
        width: 300,
        height: "auto",
        resizable: false,
        closeOnEscape : false,
        close: function(event, ui) {
            $(this).dialog("destroy");
            alertObj = null;
        }
    });

    var buttons = [];
    buttons.push({
        text: lang.ok,
        click: function(){
            console.log("Alert OK clicked");
            if (onOk) onOk();
            $(this).dialog("close");
            alertObj = null;
        }
    });
    alertObj.dialog( "option", "buttons", buttons);

    // Open the Window
    alertObj.dialog("open");

    alertObj.dialog({ dialogClass: 'no-close' });

     // Call UpdateUI to perform all the nesesary UI updates.
     UpdateUI();

}

function SubscribeBuddy(buddyObj) {
    if(!userAgent.isRegistered()) return;

    if((buddyObj.type == "extension" || buddyObj.type == "xmpp") && buddyObj.EnableSubscribe == true && buddyObj.SubscribeUser != "") {

        var targetURI = SIP.UserAgent.makeURI("sip:" + buddyObj.SubscribeUser + "@" + SipDomain);

        var options = { 
            expires: SubscribeBuddyExpires, 
            extraHeaders: ['Accept: '+ SubscribeBuddyAccept]
        }
        var blfSubscribe = new SIP.Subscriber(userAgent, targetURI, SubscribeBuddyEvent, options);
        blfSubscribe.data = {}
        blfSubscribe.data.buddyId = buddyObj.identity;
        blfSubscribe.delegate = {
            onNotify: function(sip) {
                ReceiveNotify(sip, false);
            }
        }
        console.log("SUBSCRIBE: "+ buddyObj.SubscribeUser +"@" + SipDomain);
        blfSubscribe.subscribe().catch(function(error){
            console.warn("Error subscribing to Buddy notifications:", error);
        });

        if(!userAgent.BlfSubs) userAgent.BlfSubs = [];
        userAgent.BlfSubs.push(blfSubscribe);
    }
}

function AnswerAudioCall(lineNumber) {
    // CloseWindow();

    var lineObj = FindLineByNumber(lineNumber);
    if(lineObj == null){
        console.warn("Failed to get line ("+ lineNumber +")");
        return;
    }
    var session = lineObj.SipSession;
    // Stop the ringtone
    if(session.data.ringerObj){
        session.data.ringerObj.pause();
        session.data.ringerObj.removeAttribute('src');
        session.data.ringerObj.load();
        session.data.ringerObj = null;
    }
    // Check vitals
    if(HasAudioDevice == false){
        Alert(lang.alert_no_microphone);
        $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_failed);
        $("#line-" + lineObj.LineNumber + "-AnswerCall").hide();
        return;
    }

    // Update UI
    $("#line-" + lineObj.LineNumber + "-AnswerCall").hide();

    // Start SIP handling
    var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    var spdOptions = {
        sessionDescriptionHandlerOptions: {
            constraints: {
                audio: { deviceId : "default" },
                video: false
            }
        }
    }

    // Configure Audio
    var currentAudioDevice = getAudioSrcID();
    if(currentAudioDevice != "default"){
        var confirmedAudioDevice = false;
        for (var i = 0; i < AudioinputDevices.length; ++i) {
            if(currentAudioDevice == AudioinputDevices[i].deviceId) {
                confirmedAudioDevice = true;
                break;
            }
        }
        if(confirmedAudioDevice) {
            spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = { exact: currentAudioDevice }
        }
        else {
            console.warn("The audio device you used before is no longer available, default settings applied.");
            localDB.setItem("AudioSrcId", "default");
        }
    }
    // Add additional Constraints
    if(supportedConstraints.autoGainControl) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl = AutoGainControl;
    }
    if(supportedConstraints.echoCancellation) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation = EchoCancellation;
    }
    if(supportedConstraints.noiseSuppression) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression = NoiseSuppression;
    }

    // Save Devices
    lineObj.SipSession.data.withvideo = false;
    lineObj.SipSession.data.VideoSourceDevice = null;
    lineObj.SipSession.data.AudioSourceDevice = getAudioSrcID();
    lineObj.SipSession.data.AudioOutputDevice = getAudioOutputID();

    // Send Answer
    lineObj.SipSession.accept(spdOptions).then(function(){
        onInviteAccepted(lineObj,false);
    }).catch(function(error){
        console.warn("Failed to answer call", error, lineObj.SipSession);
        lineObj.SipSession.data.reasonCode = 500;
        lineObj.SipSession.data.reasonText = "Client Error";
        teardownSession(lineObj);
    });
}
function AnswerVideoCall(lineNumber) {
    // CloseWindow();

    var lineObj = FindLineByNumber(lineNumber);
    if(lineObj == null){
        console.warn("Failed to get line ("+ lineNumber +")");
        return;
    }
    var session = lineObj.SipSession;
    // Stop the ringtone
    if(session.data.ringerObj){
        session.data.ringerObj.pause();
        session.data.ringerObj.removeAttribute('src');
        session.data.ringerObj.load();
        session.data.ringerObj = null;
    }
    // Check vitals
    if(HasAudioDevice == false){
        Alert(lang.alert_no_microphone);
        $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_failed);
        $("#line-" + lineObj.LineNumber + "-AnswerCall").hide();
        return;
    }

    // Update UI
    $("#line-" + lineObj.LineNumber + "-AnswerCall").hide();

    // Start SIP handling
    var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
    var spdOptions = {
        sessionDescriptionHandlerOptions: {
            constraints: {
                audio: { deviceId : "default" },
                video: { deviceId : "default" }
            }
        }
    }

    // Configure Audio
    var currentAudioDevice = getAudioSrcID();
    if(currentAudioDevice != "default"){
        var confirmedAudioDevice = false;
        for (var i = 0; i < AudioinputDevices.length; ++i) {
            if(currentAudioDevice == AudioinputDevices[i].deviceId) {
                confirmedAudioDevice = true;
                break;
            }
        }
        if(confirmedAudioDevice) {
            spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = { exact: currentAudioDevice }
        }
        else {
            console.warn("The audio device you used before is no longer available, default settings applied.");
            localDB.setItem("AudioSrcId", "default");
        }
    }
    // Add additional Constraints
    if(supportedConstraints.autoGainControl) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl = AutoGainControl;
    }
    if(supportedConstraints.echoCancellation) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation = EchoCancellation;
    }
    if(supportedConstraints.noiseSuppression) {
        spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression = NoiseSuppression;
    }

    // Configure Video
    var currentVideoDevice = getVideoSrcID();
    if(currentVideoDevice != "default"){
        var confirmedVideoDevice = false;
        for (var i = 0; i < VideoinputDevices.length; ++i) {
            if(currentVideoDevice == VideoinputDevices[i].deviceId) {
                confirmedVideoDevice = true;
                break;
            }
        }
        if(confirmedVideoDevice){
            spdOptions.sessionDescriptionHandlerOptions.constraints.video.deviceId = { exact: currentVideoDevice }
        }
        else {
            console.warn("The video device you used before is no longer available, default settings applied.");
            localDB.setItem("VideoSrcId", "default"); // resets for later and subsequent calls
        }
    }
    // Add additional Constraints
    if(supportedConstraints.frameRate && maxFrameRate != "") {
        spdOptions.sessionDescriptionHandlerOptions.constraints.video.frameRate = maxFrameRate;
    }
    if(supportedConstraints.height && videoHeight != "") {
        spdOptions.sessionDescriptionHandlerOptions.constraints.video.height = videoHeight;
    }
    if(supportedConstraints.aspectRatio && videoAspectRatio != "") {
        spdOptions.sessionDescriptionHandlerOptions.constraints.video.aspectRatio = videoAspectRatio;
    }

    // Save Devices
    lineObj.SipSession.data.withvideo = true;
    lineObj.SipSession.data.VideoSourceDevice = getVideoSrcID();
    lineObj.SipSession.data.AudioSourceDevice = getAudioSrcID();
    lineObj.SipSession.data.AudioOutputDevice = getAudioOutputID();

    if(StartVideoFullScreen) ExpandVideoArea(lineObj.LineNumber);

    // Send Answer
    lineObj.SipSession.accept(spdOptions).then(function(){
        onInviteAccepted(lineObj,true);
    }).catch(function(error){
        console.warn("Failed to answer call", error, lineObj.SipSession);
        lineObj.SipSession.data.reasonCode = 500;
        lineObj.SipSession.data.reasonText = "Client Error";
        teardownSession(lineObj);
    });
}
function RejectCall(lineNumber) {
    var lineObj = FindLineByNumber(lineNumber);
    if (lineObj == null) {
        console.warn("Unable to find line ("+ lineNumber +")");
        return;
    }
    var session = lineObj.SipSession;
    if (session == null) {
        console.warn("Reject failed, null session");
        $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_failed);
        $("#line-" + lineObj.LineNumber + "-AnswerCall").hide();
    }
    if(session.state == SIP.SessionState.Established){
        session.bye().catch(function(e){
            console.warn("Problem in RejectCall(), could not bye() call", e, session);
        });
    }
    else {
        session.reject({ 
            statusCode: 486, 
            reasonPhrase: "Busy Here" 
        }).catch(function(e){
            console.warn("Problem in RejectCall(), could not reject() call", e, session);
        });
    }
    $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_rejected);

    session.data.terminateby = "us";
    session.data.reasonCode = 486;
    session.data.reasonText = "Busy Here";
    teardownSession(lineObj);
}
// In-Session Call Functionality
// =============================

function cancelSession(lineNum) {
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;

    lineObj.SipSession.data.terminateby = "us";
    lineObj.SipSession.data.reasonCode = 0;
    lineObj.SipSession.data.reasonText = "Call Cancelled";

    console.log("Cancelling session : "+ lineNum);
    if(lineObj.SipSession.state == SIP.SessionState.Initial || lineObj.SipSession.state == SIP.SessionState.Establishing){
        lineObj.SipSession.cancel();
    }
    else {
        console.warn("Session not in correct state for cancel.", lineObj.SipSession.state);
        console.log("Attempting teardown : "+ lineNum);
        teardownSession(lineObj);
    }

    $("#line-" + lineNum + "-msg").html(lang.call_cancelled);
}
function holdSession(lineNum) {
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;
    var session = lineObj.SipSession;
    if(session.isOnHold == true) {
        console.log("Call is is already on hold:", lineNum);
        return;
    }
    console.log("Putting Call on hold:", lineNum);
    session.isOnHold = true;

    var sessionDescriptionHandlerOptions = session.sessionDescriptionHandlerOptionsReInvite;
    sessionDescriptionHandlerOptions.hold = true;
    session.sessionDescriptionHandlerOptionsReInvite = sessionDescriptionHandlerOptions;

    var options = {
        requestDelegate: {
            onAccept: function(){
                if(session && session.sessionDescriptionHandler && session.sessionDescriptionHandler.peerConnection){
                    var pc = session.sessionDescriptionHandler.peerConnection;
                    // Stop all the inbound streams
                    pc.getReceivers().forEach(function(RTCRtpReceiver){
                        if (RTCRtpReceiver.track) RTCRtpReceiver.track.enabled = false;
                    });
                    // Stop all the outbound streams (especially useful for Conference Calls!!)
                    pc.getSenders().forEach(function(RTCRtpSender){
                        // Mute Audio
                        if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio") {
                            if(RTCRtpSender.track.IsMixedTrack == true){
                                if(session.data.AudioSourceTrack && session.data.AudioSourceTrack.kind == "audio"){
                                    console.log("Muting Mixed Audio Track : "+ session.data.AudioSourceTrack.label);
                                    session.data.AudioSourceTrack.enabled = false;
                                }
                            }
                            console.log("Muting Audio Track : "+ RTCRtpSender.track.label);
                            RTCRtpSender.track.enabled = false;
                        }
                        // Stop Video
                        else if(RTCRtpSender.track && RTCRtpSender.track.kind == "video"){
                            RTCRtpSender.track.enabled = false;
                        }
                    });
                }
                session.isOnHold = true;
                console.log("Call is is on hold:", lineNum);

                $("#line-" + lineNum + "-btn-Hold").hide();
                $("#line-" + lineNum + "-btn-Unhold").show();
                $("#line-" + lineNum + "-msg").html(lang.call_on_hold);

                // Log Hold
                if(!session.data.hold) session.data.hold = [];
                session.data.hold.push({ event: "hold", eventTime: utcDateNow() });

                updateLineScroll(lineNum);

                // Custom Web hook
                if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("hold", session);
            },
            onReject: function(){
                session.isOnHold = false;
                console.warn("Failed to put the call on hold:", lineNum);
            }
        }
    };
    session.invite(options).catch(function(error){
        session.isOnHold = false;
        console.warn("Error attempting to put the call on hold:", error);
    });
}
function unholdSession(lineNum) {
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;
    var session = lineObj.SipSession;
    if(session.isOnHold == false) {
        console.log("Call is already off hold:", lineNum);
        return;
    }
    console.log("Taking call off hold:", lineNum);
    session.isOnHold = false;

    var sessionDescriptionHandlerOptions = session.sessionDescriptionHandlerOptionsReInvite;
    sessionDescriptionHandlerOptions.hold = false;
    session.sessionDescriptionHandlerOptionsReInvite = sessionDescriptionHandlerOptions;

    var options = {
        requestDelegate: {
            onAccept: function(){
                if(session && session.sessionDescriptionHandler && session.sessionDescriptionHandler.peerConnection){
                    var pc = session.sessionDescriptionHandler.peerConnection;
                    // Restore all the inbound streams
                    pc.getReceivers().forEach(function(RTCRtpReceiver){
                        if (RTCRtpReceiver.track) RTCRtpReceiver.track.enabled = true;
                    });
                    // Restore all the outbound streams
                    pc.getSenders().forEach(function(RTCRtpSender){
                        // Unmute Audio
                        if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio") {
                            if(RTCRtpSender.track.IsMixedTrack == true){
                                if(session.data.AudioSourceTrack && session.data.AudioSourceTrack.kind == "audio"){
                                    console.log("Unmuting Mixed Audio Track : "+ session.data.AudioSourceTrack.label);
                                    session.data.AudioSourceTrack.enabled = true;
                                }
                            }
                            console.log("Unmuting Audio Track : "+ RTCRtpSender.track.label);
                            RTCRtpSender.track.enabled = true;
                        }
                        else if(RTCRtpSender.track && RTCRtpSender.track.kind == "video") {
                            RTCRtpSender.track.enabled = true;
                        }
                    });
                }
                session.isOnHold = false;
                console.log("Call is off hold:", lineNum);

                $("#line-" + lineNum + "-btn-Hold").show();
                $("#line-" + lineNum + "-btn-Unhold").hide();
                $("#line-" + lineNum + "-msg").html(lang.call_in_progress);

                // Log Hold
                if(!session.data.hold) session.data.hold = [];
                session.data.hold.push({ event: "unhold", eventTime: utcDateNow() });

                updateLineScroll(lineNum);

                // Custom Web hook
                if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("unhold", session);
            },
            onReject: function(){
                session.isOnHold = true;
                console.warn("Failed to put the call on hold", lineNum);
            }
        }
    };
    session.invite(options).catch(function(error){
        session.isOnHold = true;
        console.warn("Error attempting to take to call off hold", error);
    });
}
function MuteSession(lineNum){
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;

    $("#line-"+ lineNum +"-btn-Unmute").show();
    $("#line-"+ lineNum +"-btn-Mute").hide();

    var session = lineObj.SipSession;
    var pc = session.sessionDescriptionHandler.peerConnection;
    pc.getSenders().forEach(function (RTCRtpSender) {
        if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio") {
            if(RTCRtpSender.track.IsMixedTrack == true){
                if(session.data.AudioSourceTrack && session.data.AudioSourceTrack.kind == "audio"){
                    console.log("Muting Mixed Audio Track : "+ session.data.AudioSourceTrack.label);
                    session.data.AudioSourceTrack.enabled = false;
                }
            }
            console.log("Muting Audio Track : "+ RTCRtpSender.track.label);
            RTCRtpSender.track.enabled = false;
        }
    });

    if(!session.data.mute) session.data.mute = [];
    session.data.mute.push({ event: "mute", eventTime: utcDateNow() });
    session.data.ismute = true;

    $("#line-" + lineNum + "-msg").html(lang.call_on_mute);

    updateLineScroll(lineNum);

    // Custom Web hook
    if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("mute", session);
}
function UnmuteSession(lineNum){
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;

    $("#line-"+ lineNum +"-btn-Unmute").hide();
    $("#line-"+ lineNum +"-btn-Mute").show();

    var session = lineObj.SipSession;
    var pc = session.sessionDescriptionHandler.peerConnection;
    pc.getSenders().forEach(function (RTCRtpSender) {
        if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio") {
            if(RTCRtpSender.track.IsMixedTrack == true){
                if(session.data.AudioSourceTrack && session.data.AudioSourceTrack.kind == "audio"){
                    console.log("Unmuting Mixed Audio Track : "+ session.data.AudioSourceTrack.label);
                    session.data.AudioSourceTrack.enabled = true;
                }
            }
            console.log("Unmuting Audio Track : "+ RTCRtpSender.track.label);
            RTCRtpSender.track.enabled = true;
        }
    });

    if(!session.data.mute) session.data.mute = [];
    session.data.mute.push({ event: "unmute", eventTime: utcDateNow() });
    session.data.ismute = false;

    $("#line-" + lineNum + "-msg").html(lang.call_off_mute);

    updateLineScroll(lineNum);

    // Custom Web hook
    if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("unmute", session);
}
function endSession(lineNum) {
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;

    console.log("Ending call with: "+ lineNum);
    lineObj.SipSession.data.terminateby = "us";
    lineObj.SipSession.data.reasonCode = 16;
    lineObj.SipSession.data.reasonText = "Normal Call clearing";

    lineObj.SipSession.bye().catch(function(e){
        console.warn("Failed to bye the session!", e);
    });

    $("#line-" + lineNum + "-msg").html(lang.call_ended);
    $("#line-" + lineNum + "-ActiveCall").hide();

    teardownSession(lineObj);

    updateLineScroll(lineNum);
}
function sendDTMF(lineNum, itemStr) {
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;

    // https://developer.mozilla.org/en-US/docs/Web/API/RTCDTMFSender/insertDTMF
    var options = {
        duration: 100,
        interToneGap: 70
    }
    
    if(lineObj.SipSession.isOnHold == true){
        if(lineObj.SipSession.data.childsession){
            if(lineObj.SipSession.data.childsession.state == SIP.SessionState.Established){
                console.log("Sending DTMF ("+ itemStr +"): "+ lineObj.LineNumber + " child session");

                var result = lineObj.SipSession.data.childsession.sessionDescriptionHandler.sendDtmf(itemStr, options);
                if(result){
                    console.log("Sent DTMF ("+ itemStr +") child session");
                }
                else{
                    console.log("Failed to send DTMF ("+ itemStr +") child session");
                }
            }
            else {
                console.warn("Cannot Send DTMF ("+ itemStr +"): "+ lineObj.LineNumber + " is on hold, and the child session is not established");
            }
        } 
        else {
            console.warn("Cannot Send DTMF ("+ itemStr +"): "+ lineObj.LineNumber + " is on hold, and there is no child session");
        }
    } 
    else {
        if(lineObj.SipSession.state == SIP.SessionState.Established || lineObj.SipSession.state == SIP.SessionState.Establishing){
            console.log("Sending DTMF ("+ itemStr +"): "+ lineObj.LineNumber);

            var result = lineObj.SipSession.sessionDescriptionHandler.sendDtmf(itemStr, options);
            if(result){
                console.log("Sent DTMF ("+ itemStr +")");
            }
            else{
                console.log("Failed to send DTMF ("+ itemStr +")");
            }
        
            $("#line-" + lineNum + "-msg").html(lang.send_dtmf + ": "+ itemStr);
        
            updateLineScroll(lineNum);
    
            // Custom Web hook
            if(typeof web_hook_on_dtmf !== 'undefined') web_hook_on_dtmf(itemStr, lineObj.SipSession);
        } 
        else {
            console.warn("Cannot Send DTMF ("+ itemStr +"): "+ lineObj.LineNumber + " session is not establishing or established");
        }
    }
}

// Call Transfer & Conference
// ============================
function QuickFindBuddy(obj){
    var filter = obj.value;
    if(filter == "") {
        HidePopup();
        return;
    }

    console.log("Find Buddy: ", filter);

    Buddies.sort(function(a, b){
        if(a.CallerIDName < b.CallerIDName) return -1;
        if(a.CallerIDName > b.CallerIDName) return 1;
        return 0;
    });

    var items = [];
    var visibleItems = 0;
    for(var b = 0; b < Buddies.length; b++){
        var buddyObj = Buddies[b];

        // Perform Filter Display
        var display = false;
        if(buddyObj.CallerIDName && buddyObj.CallerIDName.toLowerCase().indexOf(filter.toLowerCase()) > -1) display = true;
        if(buddyObj.ExtNo && buddyObj.ExtNo.toLowerCase().indexOf(filter.toLowerCase()) > -1) display = true;
        if(buddyObj.Desc && buddyObj.Desc.toLowerCase().indexOf(filter.toLowerCase()) > -1) display = true;
        if(buddyObj.MobileNumber && buddyObj.MobileNumber.toLowerCase().indexOf(filter.toLowerCase()) > -1) display = true;
        if(buddyObj.ContactNumber1 && buddyObj.ContactNumber1.toLowerCase().indexOf(filter.toLowerCase()) > -1) display = true;
        if(buddyObj.ContactNumber2 && buddyObj.ContactNumber2.toLowerCase().indexOf(filter.toLowerCase()) > -1) display = true;
        if(display) {
            // Filtered Results
            var iconClass = "dotDefault";
            if(buddyObj.type == "extension" && buddyObj.EnableSubscribe == true) {
                iconClass = buddyObj.devState;
            } else if(buddyObj.type == "xmpp" && buddyObj.EnableSubscribe == true) {
                iconClass = buddyObj.devState;
            }
            if(visibleItems > 0) items.push({ value: null, text: "-"});
            items.push({ value: null, text: buddyObj.CallerIDName, isHeader: true });
            if(buddyObj.ExtNo != "") {
                items.push({ icon : "fa fa-phone-square "+ iconClass, text: lang.extension +" ("+ buddyObj.presence +"): "+ buddyObj.ExtNo, value: buddyObj.ExtNo });
            }
            if(buddyObj.MobileNumber != "") {
                items.push({ icon : "fa fa-mobile", text: lang.mobile +": "+ buddyObj.MobileNumber, value: buddyObj.MobileNumber });
            }
            if(buddyObj.ContactNumber1 != "") {
                items.push({ icon : "fa fa-phone", text: lang.call +": "+ buddyObj.ContactNumber1, value: buddyObj.ContactNumber1 });
            }
            if(buddyObj.ContactNumber2 != "") {
                items.push({ icon : "fa fa-phone", text: lang.call +": "+ buddyObj.ContactNumber2, value: buddyObj.ContactNumber2 });
            }
            visibleItems++;
        }
        if(visibleItems >= 5) break;
    }

    if(items.length > 1){
        var menu = {
            selectEvent : function( event, ui ) {
                var number = ui.item.attr("value");
                if(number == null) HidePopup();
                if(number != "null" && number != "" && number != undefined) {
                    HidePopup();
                    obj.value = number;
                }
            },
            createEvent : null,
            autoFocus : false,
            items : items
        }
        PopupMenu(obj, menu);
    } 
    else {
        HidePopup();
    }
}

function AudioCallMenu(buddy, obj){
    var buddyObj = FindBuddyByIdentity(buddy);
    if(buddyObj == null) return;

    var items = [];
    if(buddyObj.type == "extension" || buddyObj.type == "xmpp") {
        items.push({icon: "fa fa-phone-square", text: lang.call_extension + " ("+ buddyObj.ExtNo +")", value: buddyObj.ExtNo});
        if(buddyObj.MobileNumber != null && buddyObj.MobileNumber != "") {
            items.push({icon: "fa fa-mobile", text: lang.call_mobile + " ("+ buddyObj.MobileNumber +")", value: buddyObj.MobileNumber});
        }
        if(buddyObj.ContactNumber1 != null && buddyObj.ContactNumber1 != "") {
            items.push({icon: "fa fa-phone", text: lang.call_number + " ("+ buddyObj.ContactNumber1 +")", value: buddyObj.ContactNumber1});
        }
        if(buddyObj.ContactNumber2 != null && buddyObj.ContactNumber2 != "") {
            items.push({icon: "fa fa-phone", text: lang.call_number + " ("+ buddyObj.ContactNumber2 +")", value: buddyObj.ContactNumber2});
        }
    }
    else if(buddyObj.type == "contact") {
        if(buddyObj.MobileNumber != null && buddyObj.MobileNumber != "") {
            items.push({icon: "fa fa-mobile", text: lang.call_mobile + " ("+ buddyObj.MobileNumber +")", value: buddyObj.MobileNumber});
        }
        if(buddyObj.ContactNumber1 != null && buddyObj.ContactNumber1 != "") {
            items.push({icon: "fa fa-phone", text: lang.call_number + " ("+ buddyObj.ContactNumber1 +")", value: buddyObj.ContactNumber1});
        }
        if(buddyObj.ContactNumber2 != null && buddyObj.ContactNumber2 != "") {
            items.push({icon: "fa fa-phone", text: lang.call_number + " ("+ buddyObj.ContactNumber2 +")", value: buddyObj.ContactNumber2});
        }
    }
    else if(buddyObj.type == "group") {
        if(buddyObj.MobileNumber != null && buddyObj.MobileNumber != "") {
            items.push({icon: "fa fa-users", text: lang.call_group, value: buddyObj.ExtNo });
        }
    }
    if(items.length == 0) {
        console.error("No numbers to dial");
        EditBuddyWindow(buddy);
        return;
    }
    if(items.length == 1) {
        // only one number provided, call it
        console.log("Automatically calling only number - AudioCall("+ buddy +", "+ items[0].value +")");

        DialByLine("audio", buddy, items[0].value);
    }
    else {
        // Show numbers to dial

        var menu = {
            selectEvent : function( event, ui ) {
                var number = ui.item.attr("value");
                HidePopup();
                if(number != null) {
                    console.log("Menu click AudioCall("+ buddy +", "+ number +")");
                    DialByLine("audio", buddy, number);
                }
            },
            createEvent : null,
            autoFocus : true,
            items : items
        }
        PopupMenu(obj, menu);
    }
}

function EditBuddyWindow(buddy){

    var buddyObj = FindBuddyByIdentity(buddy);
    if(buddyObj == null){
        Alert(lang.alert_not_found, lang.error);
        return;
    }
    var buddyJson = {};
    var itemId = -1;
    var json = JSON.parse(localDB.getItem(profileUserID + "-Buddies"));
    $.each(json.DataCollection, function (i, item) {
        if(item.uID == buddy || item.cID == buddy || item.gID == buddy){
            buddyJson = item;
            itemId = i;
            return false;
        }
    });

    if(buddyJson == {}){
        Alert(lang.alert_not_found, lang.error);
        return;
    }
    if(UiCustomEditBuddy == true){
        if(typeof web_hook_on_edit_buddy !== 'undefined') {
            web_hook_on_edit_buddy(buddyJson);
        }
        return;
    }

    var cropper;

    var html = "<div border=0 class='UiWindowField'>";

    html += "<div id=ImageCanvas style=\"width:150px; height:150px\"></div>";
    html += "<div style=\"float:left; margin-left:200px;\"><input id=fileUploader type=file></div>";
    html += "<div style=\"margin-top: 50px\"></div>";
    
    html += "<div class=UiText>"+ lang.full_name +":</div>";
    html += "<div><input id=AddSomeone_Name class=UiInputText type=text placeholder='"+ lang.eg_full_name +"' value='"+ ((buddyJson.DisplayName && buddyJson.DisplayName != "null" && buddyJson.DisplayName != "undefined")? buddyJson.DisplayName : "") +"'></div>";
    html += "<div><input type=checkbox id=AddSomeone_Dnd "+ ((buddyJson.EnableDuringDnd == true)? "checked" : "" ) +"><label for=AddSomeone_Dnd>Allow calls while on Do Not Disturb</label></div>";

    html += "<div class=UiText>"+ lang.title_description +":</div>";
    html += "<div><input id=AddSomeone_Desc class=UiInputText type=text placeholder='"+ lang.eg_general_manager +"' value='"+ ((buddyJson.Description && buddyJson.Description != "null" && buddyJson.Description != "undefined")? buddyJson.Description : "") +"'></div>";

    if(buddyJson.Type == "extension" || buddyJson.Type == "xmpp"){
        html += "<div class=UiText>"+ lang.extension_number +": </div>";
        html += "<div><input id=AddSomeone_Exten class=UiInputText type=text value="+ buddyJson.ExtensionNumber +"></div>";
        html += "<div><input type=checkbox id=AddSomeone_Subscribe "+ ((buddyJson.Subscribe == true)? "checked" : "" ) +"><label for=AddSomeone_Subscribe>Subscribe to Device State Notifications</label></div>";
        html += "<div id=RowSubscribe style=\"display:"+ ((buddyJson.Subscribe == true)? "unset" : "none" ) +";\">";
        html += "<div class=UiText style=\"margin-left:30px\">"+ lang.internal_subscribe_extension +":</div>";
        html += "<div style=\"margin-left:30px\"><input id=AddSomeone_SubscribeUser class=UiInputText type=text placeholder='"+ lang.eg_internal_subscribe_extension +"' value='"+ ((buddyJson.SubscribeUser && buddyJson.SubscribeUser != "null" && buddyJson.SubscribeUser != "undefined")? buddyJson.SubscribeUser : "") +"'></div>";
        html += "</div>";
    }
    else {
        html += "<input type=checkbox id=AddSomeone_Subscribe style=\"display:none\">";
    }
    html += "<div class=UiText>"+ lang.mobile_number +":</div>";
    html += "<div><input id=AddSomeone_Mobile class=UiInputText type=text placeholder='"+ lang.eg_mobile_number +"' value='"+ ((buddyJson.MobileNumber && buddyJson.MobileNumber != "null" && buddyJson.MobileNumber != "undefined")? buddyJson.MobileNumber : "") +"'></div>";

    html += "<div class=UiText>"+ lang.email +":</div>";
    html += "<div><input id=AddSomeone_Email class=UiInputText type=text placeholder='"+ lang.eg_email +"' value='"+ ((buddyJson.Email && buddyJson.Email != "null" && buddyJson.Email != "undefined")? buddyJson.Email : "") +"'></div>";

    html += "<div class=UiText>"+ lang.contact_number_1 +":</div>";
    html += "<div><input id=AddSomeone_Num1 class=UiInputText type=text placeholder='"+ lang.eg_contact_number_1 +"' value='"+((buddyJson.ContactNumber1 && buddyJson.ContactNumber1 != "null" && buddyJson.ContactNumber1 != "undefined")? buddyJson.ContactNumber1 : "") +"'></div>";

    html += "<div class=UiText>"+ lang.contact_number_2 +":</div>";
    html += "<div><input id=AddSomeone_Num2 class=UiInputText type=text placeholder='"+ lang.eg_contact_number_2 +"' value='"+ ((buddyJson.ContactNumber2 && buddyJson.ContactNumber2 != "null" && buddyJson.ContactNumber2 != "undefined")? buddyJson.ContactNumber2 : "") +"'></div>";

    html += "<div class=UiText>Auto Delete:</div>";
    html += "<div><input type=checkbox id=AddSomeone_AutoDelete "+ ((buddyJson.AutoDelete == true)? "checked" : "" ) +"><label for=AddSomeone_AutoDelete>"+ lang.yes +"</label></div>";

    // TODO, add option to delete data, etc, etc
    html += "<div class=UiText><button onclick=\"RemoveBuddy('"+ buddyObj.identity +"')\" class=\"UiDeleteButton\"><i class=\"fa fa-trash\"></i> "+ lang.delete_buddy +"</button></div>";

    html += "</div>"

    OpenWindow(html, lang.edit, 480, 640, false, true, lang.save, function(){

        if($("#AddSomeone_Name").val() == "") return;
        if($("#AddSomeone_Subscribe").is(':checked')){
            if($("#AddSomeone_Exten").val() != "" && $("#AddSomeone_SubscribeUser").val() == ""){
                $("#AddSomeone_SubscribeUser").val($("#AddSomeone_Exten").val());
            }
        }

        buddyJson.LastActivity = utcDateNow();
        buddyObj.lastActivity = buddyJson.LastActivity;

        buddyJson.DisplayName = $("#AddSomeone_Name").val();
        buddyObj.CallerIDName = buddyJson.DisplayName;

        buddyJson.Description = $("#AddSomeone_Desc").val();
        buddyObj.Desc = buddyJson.Description;

        buddyJson.MobileNumber = $("#AddSomeone_Mobile").val();
        buddyObj.MobileNumber = buddyJson.MobileNumber;

        buddyJson.Email = $("#AddSomeone_Email").val();
        buddyObj.Email = buddyJson.Email;

        buddyJson.ContactNumber1 = $("#AddSomeone_Num1").val();
        buddyObj.ContactNumber1 = buddyJson.ContactNumber1;

        buddyJson.ContactNumber2 = $("#AddSomeone_Num2").val();
        buddyObj.ContactNumber2 = buddyJson.ContactNumber2;

        buddyJson.EnableDuringDnd = $("#AddSomeone_Dnd").is(':checked');
        buddyObj.EnableDuringDnd = buddyJson.EnableDuringDnd;

        buddyJson.AutoDelete = $("#AddSomeone_AutoDelete").is(':checked');
        buddyObj.AllowAutoDelete = buddyJson.AutoDelete;

        if(buddyJson.Type == "extension" || buddyJson.Type == "xmpp"){
            // First Unsubscribe old information
            UnsubscribeBuddy(buddyObj);

            buddyJson.ExtensionNumber = $("#AddSomeone_Exten").val();
            buddyObj.ExtNo = buddyJson.ExtensionNumber;

            buddyJson.Subscribe = $("#AddSomeone_Subscribe").is(':checked');
            buddyObj.EnableSubscribe = buddyJson.Subscribe;

            if(buddyJson.Subscribe == true){
                var SubscribeUser = $("#AddSomeone_SubscribeUser").val();
                buddyJson.SubscribeUser = SubscribeUser;
                buddyObj.SubscribeUser = SubscribeUser;

                // Subscribe Actions
                SubscribeBuddy(buddyObj);
            }
        }

        // Update Visible Elements
        UpdateBuddyList();

        // Update Image
        var constraints = { 
            type: 'base64', 
            size: 'viewport', 
            format: 'webp',  // png
            quality: 0.5, 
            circle: false 
        }
        $("#ImageCanvas").croppie('result', constraints).then(function(base64) {
            // Image processing done
            if(buddyJson.Type == "extension"){
                console.log("Saving image for extension buddy:", buddyJson.uID)
                localDB.setItem("img-"+ buddyJson.uID +"-extension", base64);
                // Update Images
                $("#contact-"+ buddyJson.uID +"-picture").css("background-image", 'url('+ getPicture(buddyJson.uID, 'extension', true) +')');
                $("#contact-"+ buddyJson.uID +"-picture-main").css("background-image", 'url('+ getPicture(buddyJson.uID, 'extension', true) +')');
            }
            else if(buddyJson.Type == "contact") {
                console.log("Saving image for contact buddy:", buddyJson.cID)
                localDB.setItem("img-"+ buddyJson.cID +"-contact", base64);
                // Update Images
                $("#contact-"+ buddyJson.cID +"-picture").css("background-image", 'url('+ getPicture(buddyJson.cID, 'contact', true) +')');
                $("#contact-"+ buddyJson.cID +"-picture-main").css("background-image", 'url('+ getPicture(buddyJson.cID, 'contact', true) +')');
            }
            else if(buddyJson.Type == "group") {
                console.log("Saving image for group buddy:", buddyJson.gID)
                localDB.setItem("img-"+ buddyJson.gID +"-group", base64);
                // Update Images
                $("#contact-"+ buddyJson.gID +"-picture").css("background-image", 'url('+ getPicture(buddyJson.gID, 'group', true) +')');
                $("#contact-"+ buddyJson.gID +"-picture-main").css("background-image", 'url('+ getPicture(buddyJson.gID, 'group', true) +')');
            }
            // Update
            UpdateBuddyList();
        });

        // Update: 
        json.DataCollection[itemId] = buddyJson;

        // Save To DB
        localDB.setItem(profileUserID + "-Buddies", JSON.stringify(json));

        CloseWindow();
    }, lang.cancel, function(){
        CloseWindow();
    }, function(){
        // DoOnLoad
        cropper = $("#ImageCanvas").croppie({
            viewport: { width: 150, height: 150, type: 'circle' }
        });

        // Preview Existing Image
        if(buddyJson.Type == "extension"){
            $("#ImageCanvas").croppie('bind', { url: getPicture(buddyJson.uID, "extension") }).then();


        }
        if(buddyJson.Type == "xmpp"){
            $("#ImageCanvas").croppie('bind', { url: getPicture(buddyJson.uID, "xmpp") }).then();

            $("#fileUploader").hide();
            $("#AddSomeone_Name").attr("disabled", true);
            $("#AddSomeone_Desc").attr("disabled", true);
            $("#AddSomeone_Mobile").attr("disabled", true);
            $("#AddSomeone_Email").attr("disabled", true);
            $("#AddSomeone_Num1").attr("disabled", true);
            $("#AddSomeone_Num2").attr("disabled", true);
        }
        else if(buddyJson.Type == "contact") {
            $("#ImageCanvas").croppie('bind', { url: getPicture(buddyJson.cID, "contact") }).then();
        }
        else if(buddyJson.Type == "group") {
            $("#ImageCanvas").croppie('bind', { url: getPicture(buddyJson.gID, "group") }).then();
        }

        $("#AddSomeone_Subscribe").change(function(){
            if($("#AddSomeone_Subscribe").is(':checked')){
                if($("#AddSomeone_Exten").val() != "" && $("#AddSomeone_SubscribeUser").val() == ""){
                    $("#AddSomeone_SubscribeUser").val($("#AddSomeone_Exten").val());
                }
                $("#RowSubscribe").show();
            } else {
                $("#RowSubscribe").hide();
            }
        });

        // Wire-up File Change
        $("#fileUploader").change(function () {
            var filesArray = $(this).prop('files');
        
            if (filesArray.length == 1) {
                var uploadId = Math.floor(Math.random() * 1000000000);
                var fileObj = filesArray[0];
                var fileName = fileObj.name;
                var fileSize = fileObj.size;
        
                if (fileSize <= 52428800) {
                    console.log("Adding (" + uploadId + "): " + fileName + " of size: " + fileSize + "bytes");
        
                    var reader = new FileReader();
                    reader.Name = fileName;
                    reader.UploadId = uploadId;
                    reader.Size = fileSize;
                    reader.onload = function (event) {
                        $("#ImageCanvas").croppie('bind', {
                            url: event.target.result
                        });
                    }
                    reader.readAsDataURL(fileObj);
                }
                else {
                    Alert(lang.alert_file_size, lang.error);
                }
            }
            else {
                Alert(lang.alert_single_file, lang.error);
            }
        });
    });
}

function onSessionDescriptionHandlerCreated(lineObj, sdh, provisional, includeVideo){
    if (sdh) {
        if(sdh.peerConnection){
            // console.log(sdh);
            sdh.peerConnection.ontrack = function(event){
                // console.log(event);
                onTrackAddedEvent(lineObj, includeVideo);
            }
            // sdh.peerConnectionDelegate = {
            //     ontrack: function(event){
            //         console.log(event);
            //         onTrackAddedEvent(lineObj, includeVideo);
            //     }
            // }
        }
        else{
            console.warn("onSessionDescriptionHandler fired without a peerConnection");
        }
    }
    else{
        console.warn("onSessionDescriptionHandler fired without a sessionDescriptionHandler");
    }
}
function onTrackAddedEvent(lineObj, includeVideo){
    console.log("line obj: ",lineObj)
    // Gets remote tracks
    var session = lineObj.SipSession;
    // TODO: look at detecting video, so that UI switches to audio/video automatically.

    var pc = session.sessionDescriptionHandler.peerConnection;

    var remoteAudioStream = new MediaStream();
    var remoteVideoStream = new MediaStream();

    pc.getTransceivers().forEach(function (transceiver) {
        // Add Media
        var receiver = transceiver.receiver;
        if(receiver.track){
            if(receiver.track.kind == "audio"){
                console.log("Adding Remote Audio Track");
                remoteAudioStream.addTrack(receiver.track);
            }
            if(includeVideo && receiver.track.kind == "video"){
                if(transceiver.mid){
                    receiver.track.mid = transceiver.mid;
                    console.log("Adding Remote Video Track - ", receiver.track.readyState , "MID:", receiver.track.mid);
                    remoteVideoStream.addTrack(receiver.track);
                }
            }
        }
    });

    // Attach Audio
    if(remoteAudioStream.getAudioTracks().length >= 1){
        var remoteAudio = $("#line-" + lineObj.DisplayNumber + "-remoteAudio").get(0);

        remoteAudio.srcObject = remoteAudioStream;
        remoteAudio.onloadedmetadata = function(e) {
            if (typeof remoteAudio.sinkId !== 'undefined') {
                remoteAudio.setSinkId(getAudioOutputID()).then(function(){
                    console.log("sinkId applied: "+ getAudioOutputID());
                }).catch(function(e){
                    console.warn("Error using setSinkId: ", e);
                });
            }
            remoteAudio.play();
        }
    }

    if(includeVideo){
        // Single Or Multiple View
        $("#line-" + lineObj.LineNumber + "-remote-videos").empty();
        if(remoteVideoStream.getVideoTracks().length >= 1){
            var remoteVideoStreamTracks = remoteVideoStream.getVideoTracks();
            remoteVideoStreamTracks.forEach(function(remoteVideoStreamTrack) {
                var thisRemoteVideoStream = new MediaStream();
                thisRemoteVideoStream.trackID = remoteVideoStreamTrack.id;
                thisRemoteVideoStream.mid = remoteVideoStreamTrack.mid;
                remoteVideoStreamTrack.onended = function() {
                    console.log("Video Track Ended: ", this.mid);
                    RedrawStage(lineObj.LineNumber, true);
                }
                thisRemoteVideoStream.addTrack(remoteVideoStreamTrack);

                var wrapper = $("<span />", {
                    class: "VideoWrapper",
                });
                wrapper.css("width", "1px");
                wrapper.css("heigh", "1px");
                wrapper.hide();

                var callerID = $("<div />", {
                    class: "callerID"
                });
                wrapper.append(callerID);

                var Actions = $("<div />", {
                    class: "Actions"
                });
                wrapper.append(Actions);

                var videoEl = $("<video />", {
                    id: remoteVideoStreamTrack.id,
                    mid: remoteVideoStreamTrack.mid,
                    muted: true,
                    autoplay: true,
                    playsinline: true,
                    controls: false
                }); 
                videoEl.hide();

                var videoObj = videoEl.get(0);
                videoObj.srcObject = thisRemoteVideoStream;
                videoObj.onloadedmetadata = function(e) {
                    // videoObj.play();
                    videoEl.show();
                    videoEl.parent().show();
                    console.log("Playing Video Stream MID:", thisRemoteVideoStream.mid);
                    RedrawStage(lineObj.LineNumber, true);
                }
                wrapper.append(videoEl);

                $("#line-" + lineObj.LineNumber + "-remote-videos").append(wrapper);

                console.log("Added Video Element MID:", thisRemoteVideoStream.mid);
            });
        }
        else {
            console.log("No Video Streams");
            RedrawStage(lineObj.LineNumber, true);
        }
    }

    // Custom Web hook
    if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("trackAdded", session);
}

// Both Incoming an outgoing INVITE
function onInviteAccepted(lineObj, includeVideo, response){
    // Call in progress
    var session = lineObj.SipSession;

    if(session.data.earlyMedia){
        session.data.earlyMedia.pause();
        session.data.earlyMedia.removeAttribute('src');
        session.data.earlyMedia.load();
        session.data.earlyMedia = null;
    }

    window.clearInterval(session.data.callTimer);
    $("#line-" + lineObj.LineNumber + "-timer").show();
    var startTime = moment.utc();
    session.data.startTime = startTime;
    session.data.callTimer = window.setInterval(function(){
        var now = moment.utc();
        var duration = moment.duration(now.diff(startTime));
        var timeStr = formatShortDuration(duration.asSeconds());
        $("#line-" + lineObj.LineNumber + "-timer").html(timeStr);
        $("#line-" + lineObj.LineNumber + "-datetime").html(timeStr);
    }, 1000);
    session.isOnHold = false;
    session.data.started = true;

    if(includeVideo){
        // Preview our stream from peer connection
        var localVideoStream = new MediaStream();
        var pc = session.sessionDescriptionHandler.peerConnection;
        pc.getSenders().forEach(function (sender) {
            if(sender.track && sender.track.kind == "video"){
                localVideoStream.addTrack(sender.track);
            }
        });
        var localVideo = $("#line-" + lineObj.LineNumber + "-localVideo").get(0);
        localVideo.srcObject = localVideoStream;
        localVideo.onloadedmetadata = function(e) {
            localVideo.play();
        }

        // Apply Call Bandwidth Limits
        if(MaxVideoBandwidth > -1){
            pc.getSenders().forEach(function (sender) {
                if(sender.track && sender.track.kind == "video"){

                    var parameters = sender.getParameters();
                    if(!parameters.encodings) parameters.encodings = [{}];
                    parameters.encodings[0].maxBitrate = MaxVideoBandwidth * 1000;

                    console.log("Applying limit for Bandwidth to: ", MaxVideoBandwidth + "kb per second")

                    // Only going to try without re-negotiations
                    sender.setParameters(parameters).catch(function(e){
                        console.warn("Cannot apply Bandwidth Limits", e);
                    });

                }
            });
        }

    }

    // Start Call Recording
    if(RecordAllCalls || CallRecordingPolicy == "enabled") {
        StartRecording(lineObj.LineNumber);
    }

    if(includeVideo){
        // Layout for Video Call
        $("#line-"+ lineObj.LineNumber +"-progress").hide();
        $("#line-"+ lineObj.LineNumber +"-VideoCall").show();
        $("#line-"+ lineObj.LineNumber +"-ActiveCall").show();

        $("#line-"+ lineObj.LineNumber +"-btn-Conference").hide(); // Cannot conference a Video Call (Yet...)
        $("#line-"+ lineObj.LineNumber +"-btn-CancelConference").hide();
        $("#line-"+ lineObj.LineNumber +"-Conference").hide();

        $("#line-"+ lineObj.LineNumber +"-btn-Transfer").hide(); // Cannot transfer a Video Call (Yet...)
        $("#line-"+ lineObj.LineNumber +"-btn-CancelTransfer").hide();
        $("#line-"+ lineObj.LineNumber +"-Transfer").hide();

        // Default to use Camera
        $("#line-"+ lineObj.LineNumber +"-src-camera").prop("disabled", true);
        $("#line-"+ lineObj.LineNumber +"-src-canvas").prop("disabled", false);
        $("#line-"+ lineObj.LineNumber +"-src-desktop").prop("disabled", false);
        $("#line-"+ lineObj.LineNumber +"-src-video").prop("disabled", false);
    }
    else {
        // Layout for Audio Call
        $("#line-" + lineObj.LineNumber + "-progress").hide();
        $("#line-" + lineObj.LineNumber + "-VideoCall").hide();
        $("#line-" + lineObj.LineNumber + "-AudioCall").show();
        // Call Control
        $("#line-"+ lineObj.LineNumber +"-btn-Mute").show();
        $("#line-"+ lineObj.LineNumber +"-btn-Unmute").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-start-recording").show();
        $("#line-"+ lineObj.LineNumber +"-btn-stop-recording").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-Hold").show();
        $("#line-"+ lineObj.LineNumber +"-btn-Unhold").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-Transfer").show();
        $("#line-"+ lineObj.LineNumber +"-btn-CancelTransfer").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-Conference").show();
        $("#line-"+ lineObj.LineNumber +"-btn-CancelConference").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-ShowDtmf").show();
        $("#line-"+ lineObj.LineNumber +"-btn-settings").show();
        $("#line-"+ lineObj.LineNumber +"-btn-ShowCallStats").show();
        $("#line-"+ lineObj.LineNumber +"-btn-HideCallStats").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-ShowTimeline").show();
        $("#line-"+ lineObj.LineNumber +"-btn-HideTimeline").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-present-src").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-expand").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-restore").hide();
        $("#line-"+ lineObj.LineNumber +"-btn-End").show();
        // Show the Call
        $("#line-" + lineObj.LineNumber + "-ActiveCall").show();
    }

    UpdateBuddyList()
    updateLineScroll(lineObj.LineNumber);

    // Start Audio Monitoring
    lineObj.LocalSoundMeter = StartLocalAudioMediaMonitoring(lineObj.LineNumber, session);
    lineObj.RemoteSoundMeter = StartRemoteAudioMediaMonitoring(lineObj.LineNumber, session);

    $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_in_progress);

    if(includeVideo && StartVideoFullScreen) ExpandVideoArea(lineObj.LineNumber);

    // Custom Web hook
    if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("accepted", session);
}


// Outgoing INVITE
function onInviteTrying(lineObj, response){
    $("#line-" + lineObj.LineNumber + "-msg").html(lang.trying);

    // Custom Web hook
    if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("trying", lineObj.SipSession);
}
function onInviteProgress(lineObj, response){
    console.log("Call Progress:", response.message.statusCode);
    
    // Provisional 1xx
    // response.message.reasonPhrase
    if(response.message.statusCode == 180){
        $("#line-" + lineObj.LineNumber + "-msg").html(lang.ringing);
        
        var soundFile = audioBlobs.EarlyMedia_European;
        if(UserLocale().indexOf("us") > -1) soundFile = audioBlobs.EarlyMedia_US;
        if(UserLocale().indexOf("gb") > -1) soundFile = audioBlobs.EarlyMedia_UK;
        if(UserLocale().indexOf("au") > -1) soundFile = audioBlobs.EarlyMedia_Australia;
        if(UserLocale().indexOf("jp") > -1) soundFile = audioBlobs.EarlyMedia_Japan;

        // Play Early Media
        console.log("Audio:", soundFile.url);
        if(lineObj.SipSession.data.earlyMedia){
            // There is already early media playing
            // onProgress can be called multiple times
            // Don't add it again
            console.log("Early Media already playing");
        }
        else {
            var earlyMedia = new Audio(soundFile.blob);
            earlyMedia.preload = "auto";
            earlyMedia.loop = true;
            earlyMedia.oncanplaythrough = function(e) {
                if (typeof earlyMedia.sinkId !== 'undefined' && getAudioOutputID() != "default") {
                    earlyMedia.setSinkId(getAudioOutputID()).then(function() {
                        console.log("Set sinkId to:", getAudioOutputID());
                    }).catch(function(e){
                        console.warn("Failed not apply setSinkId.", e);
                    });
                }
                earlyMedia.play().then(function(){
                    // Audio Is Playing
                }).catch(function(e){
                    console.warn("Unable to play audio file.", e);
                }); 
            }
            lineObj.SipSession.data.earlyMedia = earlyMedia;
        }
    }
    else if(response.message.statusCode === 183){
        $("#line-" + lineObj.LineNumber + "-msg").html(response.message.reasonPhrase + "...");

        // Add UI to allow DTMF
        $("#line-" + lineObj.LineNumber + "-early-dtmf").show();
    }
    else {
        // 181 = Call is Being Forwarded
        // 182 = Call is queued (Busy server!)
        // 199 = Call is Terminated (Early Dialog)

        $("#line-" + lineObj.LineNumber + "-msg").html(response.message.reasonPhrase + "...");
    }

    // Custom Web hook
    if(typeof web_hook_on_modify !== 'undefined') web_hook_on_modify("progress", lineObj.SipSession);
}
function onInviteRejected(lineObj, response){
    console.log("INVITE Rejected:", response.message.reasonPhrase);

    lineObj.SipSession.data.terminateby = "them";
    lineObj.SipSession.data.reasonCode = response.message.statusCode;
    lineObj.SipSession.data.reasonText = response.message.reasonPhrase;

    teardownSession(lineObj);
}
function onInviteRedirected(response){
    console.log("onInviteRedirected", response);
    // Follow???
}

function StartLocalAudioMediaMonitoring(lineNum, session) {
    console.log("Creating LocalAudio AudioContext on line " + lineNum);

    // Create local SoundMeter
    var soundMeter = new SoundMeter(session.id, lineNum);
    if(soundMeter == null){
        console.warn("AudioContext() LocalAudio not available... its fine.")
        return null;
    }

    // Ready the getStats request
    var localAudioStream = new MediaStream();
    var audioSender = null;
    var pc = session.sessionDescriptionHandler.peerConnection;
    pc.getSenders().forEach(function (RTCRtpSender) {
        if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio"){
            if(audioSender == null){
                console.log("Adding Track to Monitor: ", RTCRtpSender.track.label);
                localAudioStream.addTrack(RTCRtpSender.track);
                audioSender = RTCRtpSender;
            }
            else {
                console.log("Found another Track, but audioSender not null");
                console.log(RTCRtpSender);
                console.log(RTCRtpSender.track);
            }
        }
    });

    // Setup Charts
    var maxDataLength = 100;
    soundMeter.startTime = Date.now();
    Chart.defaults.global.defaultFontSize = 12;
    var ChatHistoryOptions = { 
        responsive: true,    
        maintainAspectRatio: false,
        // devicePixelRatio: 1,
        animation: false,
        scales: {
            yAxes: [{
                ticks: { beginAtZero: true }
            }],
            xAxes: [{
                display: false
            }]
        }, 
    }

    // Send Kilobits Per Second
    soundMeter.SendBitRateChart = new Chart($("#line-"+ lineNum +"-AudioSendBitRate"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.send_kilobits_per_second,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(0, 121, 19, 0.5)',
                borderColor: 'rgba(0, 121, 19, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });
    soundMeter.SendBitRateChart.lastValueBytesSent = 0;
    soundMeter.SendBitRateChart.lastValueTimestamp = 0;

    console.log("line number: ",lineNum)
    

    // Send Packets Per Second
    soundMeter.SendPacketRateChart = new Chart($("#line-"+ lineNum +"-AudioSendPacketRate"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.send_packets_per_second,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(0, 121, 19, 0.5)',
                borderColor: 'rgba(0, 121, 19, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });
    soundMeter.SendPacketRateChart.lastValuePacketSent = 0;
    soundMeter.SendPacketRateChart.lastValueTimestamp = 0;    

    // Connect to Source
    soundMeter.connectToSource(localAudioStream, function (e) {
        if (e != null) return;

        console.log("SoundMeter for LocalAudio Connected, displaying levels for Line: " + lineNum);
        soundMeter.levelsInterval = window.setInterval(function () {
            // Calculate Levels (0 - 255)
            var instPercent = (soundMeter.instant/255) * 100;
            $("#line-" + lineNum + "-Mic").css("height", instPercent.toFixed(2) +"%");
        }, 50);
        soundMeter.networkInterval = window.setInterval(function (){
            // Calculate Network Conditions
            // Sending Audio Track
            if(audioSender != null) {
                audioSender.getStats().then(function(stats) {
                    stats.forEach(function(report){

                        var theMoment = utcDateNow();
                        var SendBitRateChart = soundMeter.SendBitRateChart;
                        var SendPacketRateChart = soundMeter.SendPacketRateChart;
                        var elapsedSec = Math.floor((Date.now() - soundMeter.startTime)/1000);

                        if(report.type == "outbound-rtp"){
                            if(SendBitRateChart.lastValueTimestamp == 0) {
                                SendBitRateChart.lastValueTimestamp = report.timestamp;
                                SendBitRateChart.lastValueBytesSent = report.bytesSent;

                                SendPacketRateChart.lastValueTimestamp = report.timestamp;
                                SendPacketRateChart.lastValuePacketSent = report.packetsSent;
                                return;
                            }

                            // Send Kilobits Per second
                            var kbitsPerSec = (8 * (report.bytesSent - SendBitRateChart.lastValueBytesSent))/1000;

                            SendBitRateChart.lastValueTimestamp = report.timestamp;
                            SendBitRateChart.lastValueBytesSent = report.bytesSent;

                            soundMeter.SendBitRate.push({ value: kbitsPerSec, timestamp : theMoment});
                            SendBitRateChart.data.datasets[0].data.push(kbitsPerSec);
                            SendBitRateChart.data.labels.push("");
                            if(SendBitRateChart.data.datasets[0].data.length > maxDataLength) {
                                SendBitRateChart.data.datasets[0].data.splice(0,1);
                                SendBitRateChart.data.labels.splice(0,1);
                            }
                            // SendBitRateChart.update();

                            // Send Packets Per Second
                            var PacketsPerSec = report.packetsSent - SendPacketRateChart.lastValuePacketSent;

                            SendPacketRateChart.lastValueTimestamp = report.timestamp;
                            SendPacketRateChart.lastValuePacketSent = report.packetsSent;

                            soundMeter.SendPacketRate.push({ value: PacketsPerSec, timestamp : theMoment});
                            SendPacketRateChart.data.datasets[0].data.push(PacketsPerSec);
                            SendPacketRateChart.data.labels.push("");
                            if(SendPacketRateChart.data.datasets[0].data.length > maxDataLength) {
                                SendPacketRateChart.data.datasets[0].data.splice(0,1);
                                SendPacketRateChart.data.labels.splice(0,1);
                            }
                            // SendPacketRateChart.update();
                        }
                        if(report.type == "track") {
                            // Bug/security concern... this seems always to report "0"
                            // Possible reason: When applied to isolated streams, media metrics may allow an application to infer some characteristics of the isolated stream, such as if anyone is speaking (by watching the audioLevel statistic).
                            // console.log("Audio Sender: " + report.audioLevel);
                        }
                    });
                });
            }
        } ,1000);
    });

    return soundMeter;
}
// Mic and Speaker Levels
// ======================
function StartRemoteAudioMediaMonitoring(lineNum, session) {
    console.log("Creating RemoteAudio AudioContext on Line:" + lineNum);

    // Create local SoundMeter
    var soundMeter = new SoundMeter(session.id, lineNum);
    if(soundMeter == null){
        console.warn("AudioContext() RemoteAudio not available... it fine.");
        return null;
    }

    // Ready the getStats request
    var remoteAudioStream = new MediaStream();
    var audioReceiver = null;
    var pc = session.sessionDescriptionHandler.peerConnection;
    pc.getReceivers().forEach(function (RTCRtpReceiver) {
        if(RTCRtpReceiver.track && RTCRtpReceiver.track.kind == "audio"){
            if(audioReceiver == null) {
                remoteAudioStream.addTrack(RTCRtpReceiver.track);
                audioReceiver = RTCRtpReceiver;
            }
            else {
                console.log("Found another Track, but audioReceiver not null");
                console.log(RTCRtpReceiver);
                console.log(RTCRtpReceiver.track);
            }
        }
    });


    // Setup Charts
    var maxDataLength = 100;
    soundMeter.startTime = Date.now();
    Chart.defaults.global.defaultFontSize = 12;

    var ChatHistoryOptions = { 
        responsive: true,
        maintainAspectRatio: false,
        // devicePixelRatio: 1,
        animation: false,
        scales: {
            yAxes: [{
                ticks: { beginAtZero: true } //, min: 0, max: 100
            }],
            xAxes: [{
                display: false
            }]
        }, 
    }

    // Receive Kilobits per second
    soundMeter.ReceiveBitRateChart = new Chart($("#line-"+ lineNum +"-AudioReceiveBitRate"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.receive_kilobits_per_second,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(168, 0, 0, 0.5)',
                borderColor: 'rgba(168, 0, 0, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });
    soundMeter.ReceiveBitRateChart.lastValueBytesReceived = 0;
    soundMeter.ReceiveBitRateChart.lastValueTimestamp = 0;

    // Receive Packets per second
    soundMeter.ReceivePacketRateChart = new Chart($("#line-"+ lineNum +"-AudioReceivePacketRate"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.receive_packets_per_second,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(168, 0, 0, 0.5)',
                borderColor: 'rgba(168, 0, 0, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });
    soundMeter.ReceivePacketRateChart.lastValuePacketReceived = 0;
    soundMeter.ReceivePacketRateChart.lastValueTimestamp = 0;

    // Receive Packet Loss
    soundMeter.ReceivePacketLossChart = new Chart($("#line-"+ lineNum +"-AudioReceivePacketLoss"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.receive_packet_loss,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(168, 99, 0, 0.5)',
                borderColor: 'rgba(168, 99, 0, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });
    soundMeter.ReceivePacketLossChart.lastValuePacketLoss = 0;
    soundMeter.ReceivePacketLossChart.lastValueTimestamp = 0;

    // Receive Jitter
    soundMeter.ReceiveJitterChart = new Chart($("#line-"+ lineNum +"-AudioReceiveJitter"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.receive_jitter,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(0, 38, 168, 0.5)',
                borderColor: 'rgba(0, 38, 168, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });

    // Receive Audio Levels
    soundMeter.ReceiveLevelsChart = new Chart($("#line-"+ lineNum +"-AudioReceiveLevels"), {
        type: 'line',
        data: {
            labels: MakeDataArray("", maxDataLength),
            datasets: [{
                label: lang.receive_audio_levels,
                data: MakeDataArray(0, maxDataLength),
                backgroundColor: 'rgba(140, 0, 168, 0.5)',
                borderColor: 'rgba(140, 0, 168, 1)',
                borderWidth: 1,
                pointRadius: 1
            }]
        },
        options: ChatHistoryOptions
    });

    // Connect to Source
    soundMeter.connectToSource(remoteAudioStream, function (e) {
        if (e != null) return;

        // Create remote SoundMeter
        console.log("SoundMeter for RemoteAudio Connected, displaying levels for Line: " + lineNum);
        soundMeter.levelsInterval = window.setInterval(function () {
            // Calculate Levels (0 - 255)
            var instPercent = (soundMeter.instant/255) * 100;
            $("#line-" + lineNum + "-Speaker").css("height", instPercent.toFixed(2) +"%");
        }, 50);
        soundMeter.networkInterval = window.setInterval(function (){
            // Calculate Network Conditions
            if(audioReceiver != null) {
                audioReceiver.getStats().then(function(stats) {
                    stats.forEach(function(report){

                        var theMoment = utcDateNow();
                        var ReceiveBitRateChart = soundMeter.ReceiveBitRateChart;
                        var ReceivePacketRateChart = soundMeter.ReceivePacketRateChart;
                        var ReceivePacketLossChart = soundMeter.ReceivePacketLossChart;
                        var ReceiveJitterChart = soundMeter.ReceiveJitterChart;
                        var ReceiveLevelsChart = soundMeter.ReceiveLevelsChart;
                        var elapsedSec = Math.floor((Date.now() - soundMeter.startTime)/1000);

                        if(report.type == "inbound-rtp"){

                            if(ReceiveBitRateChart.lastValueTimestamp == 0) {
                                ReceiveBitRateChart.lastValueTimestamp = report.timestamp;
                                ReceiveBitRateChart.lastValueBytesReceived = report.bytesReceived;

                                ReceivePacketRateChart.lastValueTimestamp = report.timestamp;
                                ReceivePacketRateChart.lastValuePacketReceived = report.packetsReceived;

                                ReceivePacketLossChart.lastValueTimestamp = report.timestamp;
                                ReceivePacketLossChart.lastValuePacketLoss = report.packetsLost;

                                return;
                            }
                            // Receive Kilobits Per second
                            var kbitsPerSec = (8 * (report.bytesReceived - ReceiveBitRateChart.lastValueBytesReceived))/1000;

                            ReceiveBitRateChart.lastValueTimestamp = report.timestamp;
                            ReceiveBitRateChart.lastValueBytesReceived = report.bytesReceived;

                            soundMeter.ReceiveBitRate.push({ value: kbitsPerSec, timestamp : theMoment});
                            ReceiveBitRateChart.data.datasets[0].data.push(kbitsPerSec);
                            ReceiveBitRateChart.data.labels.push("");
                            if(ReceiveBitRateChart.data.datasets[0].data.length > maxDataLength) {
                                ReceiveBitRateChart.data.datasets[0].data.splice(0,1);
                                ReceiveBitRateChart.data.labels.splice(0,1);
                            }
                            // ReceiveBitRateChart.update();

                            // Receive Packets Per Second
                            var PacketsPerSec = (report.packetsReceived - ReceivePacketRateChart.lastValuePacketReceived);

                            ReceivePacketRateChart.lastValueTimestamp = report.timestamp;
                            ReceivePacketRateChart.lastValuePacketReceived = report.packetsReceived;

                            soundMeter.ReceivePacketRate.push({ value: PacketsPerSec, timestamp : theMoment});
                            ReceivePacketRateChart.data.datasets[0].data.push(PacketsPerSec);
                            ReceivePacketRateChart.data.labels.push("");
                            if(ReceivePacketRateChart.data.datasets[0].data.length > maxDataLength) {
                                ReceivePacketRateChart.data.datasets[0].data.splice(0,1);
                                ReceivePacketRateChart.data.labels.splice(0,1);
                            }
                            // ReceivePacketRateChart.update();

                            // Receive Packet Loss
                            var PacketsLost = (report.packetsLost - ReceivePacketLossChart.lastValuePacketLoss);

                            ReceivePacketLossChart.lastValueTimestamp = report.timestamp;
                            ReceivePacketLossChart.lastValuePacketLoss = report.packetsLost;

                            soundMeter.ReceivePacketLoss.push({ value: PacketsLost, timestamp : theMoment});
                            ReceivePacketLossChart.data.datasets[0].data.push(PacketsLost);
                            ReceivePacketLossChart.data.labels.push("");
                            if(ReceivePacketLossChart.data.datasets[0].data.length > maxDataLength) {
                                ReceivePacketLossChart.data.datasets[0].data.splice(0,1);
                                ReceivePacketLossChart.data.labels.splice(0,1);
                            }
                            // ReceivePacketLossChart.update();

                            // Receive Jitter
                            soundMeter.ReceiveJitter.push({ value: report.jitter, timestamp : theMoment});
                            ReceiveJitterChart.data.datasets[0].data.push(report.jitter);
                            ReceiveJitterChart.data.labels.push("");
                            if(ReceiveJitterChart.data.datasets[0].data.length > maxDataLength) {
                                ReceiveJitterChart.data.datasets[0].data.splice(0,1);
                                ReceiveJitterChart.data.labels.splice(0,1);
                            }
                            // ReceiveJitterChart.update();
                        }
                        if(report.type == "track") {

                            // Receive Audio Levels
                            var levelPercent = (report.audioLevel * 100);
                            soundMeter.ReceiveLevels.push({ value: levelPercent, timestamp : theMoment});
                            ReceiveLevelsChart.data.datasets[0].data.push(levelPercent);
                            ReceiveLevelsChart.data.labels.push("");
                            if(ReceiveLevelsChart.data.datasets[0].data.length > maxDataLength)
                            {
                                ReceiveLevelsChart.data.datasets[0].data.splice(0,1);
                                ReceiveLevelsChart.data.labels.splice(0,1);
                            }
                            // ReceiveLevelsChart.update();
                        }
                    });
                });
            }
        } ,1000);
    });

    return soundMeter;
}


// General Session delegates
function onSessionReceivedBye(lineObj, response){
    // They Ended the call
    $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_ended);
    console.log("Call ended, bye!");

    lineObj.SipSession.data.terminateby = "them";
    lineObj.SipSession.data.reasonCode = 16;
    lineObj.SipSession.data.reasonText = "Normal Call clearing";

    response.accept(); // Send OK

    teardownSession(lineObj);
}

// General end of Session
function teardownSession(lineObj) {
    if(lineObj == null || lineObj.SipSession == null) return;

    var session = lineObj.SipSession;
    if(session.data.teardownComplete == true) return;
    session.data.teardownComplete = true; // Run this code only once

    // Call UI
    if(session.data.earlyReject != true){
        HidePopup();
    }

    // End any child calls
    if(session.data.childsession){
        session.data.childsession.dispose().then(function(){
            session.data.childsession = null;
        }).catch(function(error){
            session.data.childsession = null;
            // Suppress message
        });
    }

    // Mixed Tracks
    if(session.data.AudioSourceTrack && session.data.AudioSourceTrack.kind == "audio"){
        session.data.AudioSourceTrack.stop();
        session.data.AudioSourceTrack = null;
    }
    // Stop any Early Media
    if(session.data.earlyMedia){
        session.data.earlyMedia.pause();
        session.data.earlyMedia.removeAttribute('src');
        session.data.earlyMedia.load();
        session.data.earlyMedia = null;
    }
    // Stop any ringing calls
    if(session.data.ringerObj){
        session.data.ringerObj.pause();
        session.data.ringerObj.removeAttribute('src');
        session.data.ringerObj.load();
        session.data.ringerObj = null;
    }
    
    // Stop Recording if we are
    StopRecording(lineObj.LineNumber,true);

    // Audio Meters
    if(lineObj.LocalSoundMeter != null){
        lineObj.LocalSoundMeter.stop();
        lineObj.LocalSoundMeter = null;
    }
    if(lineObj.RemoteSoundMeter != null){
        lineObj.RemoteSoundMeter.stop();
        lineObj.RemoteSoundMeter = null;
    }

    // Make sure you have released the microphone
    if(session && session.sessionDescriptionHandler && session.sessionDescriptionHandler.peerConnection){
        var pc = session.sessionDescriptionHandler.peerConnection;
        pc.getSenders().forEach(function (RTCRtpSender) {
            if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio") {
                RTCRtpSender.track.stop();
            }
        });
    }

    // End timers
    window.clearInterval(session.data.videoResampleInterval);
    window.clearInterval(session.data.callTimer);

    // Add to stream
    AddCallMessage(lineObj.BuddyObj.identity, session);

    // Check if this call was missed
    if (session.data.calldirection == "inbound"){
        if(session.data.earlyReject){
            // Call was rejected without even ringing
            IncreaseMissedBadge(session.data.buddyId);
        } else if (session.data.terminateby == "them" && session.data.startTime == null){
            // Call Terminated by them during ringing
            if(session.data.reasonCode == 0){
                // Call was canceled, and not answered elsewhere 
                IncreaseMissedBadge(session.data.buddyId);
            }
        }
    }
    
    // Close up the UI
    window.setTimeout(function () {
        RemoveLine(lineObj);
    }, 1000);

    UpdateBuddyList();
    if(session.data.earlyReject != true){
        UpdateUI();
    }

    // Custom Web hook
    if(typeof web_hook_on_terminate !== 'undefined') web_hook_on_terminate(session);
}

function StopRecording(lineNum, noConfirm){
    var lineObj = FindLineByNumber(lineNum);
    if(lineObj == null || lineObj.SipSession == null) return;

    var session = lineObj.SipSession;
    if(noConfirm == true){
        // Called at the end of a call
        $("#line-"+ lineObj.LineNumber +"-btn-start-recording").show();
        $("#line-"+ lineObj.LineNumber +"-btn-stop-recording").hide();

        if(session.data.mediaRecorder){
            if(session.data.mediaRecorder.state == "recording"){
                console.log("Stopping Call Recording");
                session.data.mediaRecorder.stop();
                session.data.recordings[session.data.recordings.length-1].stopTime = utcDateNow();
                window.clearInterval(session.data.recordingRedrawInterval);

                $("#line-" + lineObj.LineNumber + "-msg").html(lang.call_recording_stopped);

                updateLineScroll(lineNum);
            } 
            else{
                console.warn("Recorder is in an unknown state");
            }
        }
        return;
    }
    else {
        // User attempts to end call recording
        if(CallRecordingPolicy == "enabled"){
            console.warn("Policy Enabled: Call Recording");
            return;
        }

        Confirm(lang.confirm_stop_recording, lang.stop_recording, function(){
            StopRecording(lineNum, true);
        });
    }
}
// QOS
// ===
function SaveQosData(QosData, sessionId, buddy){
    if(CallQosDataIndexDb != null){

        // Prepare data to write
        var data = {
            uID: uID(),
            sessionid: sessionId,
            buddy: buddy,
            QosData: QosData
        }
        // Commit Transaction
        var transaction = CallQosDataIndexDb.transaction(["CallQos"], "readwrite");
        var objectStoreAdd = transaction.objectStore("CallQos").add(data);
        objectStoreAdd.onsuccess = function(event) {
            console.log("Call CallQos Success: ", sessionId);
        }
    }
    else {
        console.warn("CallQosDataIndexDb is null.");
    }
}

function AddCallMessage(buddy, session) {

    var currentStream = JSON.parse(localDB.getItem(buddy + "-stream"));
    if(currentStream == null) currentStream = InitialiseStream(buddy);

    var CallEnd = moment.utc(); // Take Now as the Hangup Time
    var callDuration = 0;
    var totalDuration = 0;
    var ringTime = 0;

    var CallStart = moment.utc(session.data.callstart.replace(" UTC", "")); // Actual start (both inbound and outbound)
    var CallAnswer = null; // On Accept when inbound, Remote Side when Outbound
    if(session.data.startTime){
        // The time when WE answered the call (May be null - no answer)
        // or
        // The time when THEY answered the call (May be null - no answer)
        CallAnswer = moment.utc(session.data.startTime);  // Local Time gets converted to UTC 

        callDuration = moment.duration(CallEnd.diff(CallAnswer));
        ringTime = moment.duration(CallAnswer.diff(CallStart));
    } 
    else {
        // There was no start time, but on inbound/outbound calls, this would indicate the ring time
        ringTime = moment.duration(CallEnd.diff(CallStart));
    }
    totalDuration = moment.duration(CallEnd.diff(CallStart));

    var srcId = "";
    var srcCallerID = "";
    var dstId = ""
    var dstCallerID = "";
    if(session.data.calldirection == "inbound") {
        srcId = buddy;
        dstId = profileUserID;
        srcCallerID = session.remoteIdentity.displayName;
        dstCallerID = profileName;
    } else if(session.data.calldirection == "outbound") {
        srcId = profileUserID;
        dstId = buddy;
        srcCallerID = profileName;
        dstCallerID = session.data.dst;
    }

    var callDirection = session.data.calldirection;
    var withVideo = session.data.withvideo;
    var sessionId = session.id;
    var hangupBy = session.data.terminateby;

    var newMessageJson = {
        CdrId: uID(),
        ItemType: "CDR",
        ItemDate: CallStart.format("YYYY-MM-DD HH:mm:ss UTC"),
        CallAnswer: (CallAnswer)? CallAnswer.format("YYYY-MM-DD HH:mm:ss UTC") : null,
        CallEnd: CallEnd.format("YYYY-MM-DD HH:mm:ss UTC"),
        SrcUserId: srcId,
        Src: srcCallerID,
        DstUserId: dstId,
        Dst: dstCallerID,
        RingTime: (ringTime != 0)? ringTime.asSeconds() : 0,
        Billsec: (callDuration != 0)? callDuration.asSeconds() : 0,
        TotalDuration: (totalDuration != 0)? totalDuration.asSeconds() : 0,
        ReasonCode: session.data.reasonCode,
        ReasonText: session.data.reasonText,
        WithVideo: withVideo,
        SessionId: sessionId,
        CallDirection: callDirection,
        Terminate: hangupBy,
        // CRM
        MessageData: null,
        Tags: [],
        //Reporting
        Transfers: (session.data.transfer)? session.data.transfer : [],
        Mutes: (session.data.mute)? session.data.mute : [],
        Holds: (session.data.hold)? session.data.hold : [],
        Recordings: (session.data.recordings)? session.data.recordings : [],
        ConfCalls: (session.data.confcalls)? session.data.confcalls : [],
        ConfbridgeEvents: (session.data.ConfbridgeEvents)? session.data.ConfbridgeEvents : [],
        QOS: []
    }

    console.log("New CDR", newMessageJson);

    currentStream.DataCollection.push(newMessageJson);
    currentStream.TotalRows = currentStream.DataCollection.length;
    localDB.setItem(buddy + "-stream", JSON.stringify(currentStream));

    UpdateBuddyActivity(buddy);

    // Data Cleanup
    if(MaxDataStoreDays && MaxDataStoreDays > 0){
        console.log("Cleaning up data: ", MaxDataStoreDays);
        RemoveBuddyMessageStream(FindBuddyByIdentity(buddy), MaxDataStoreDays);
    }

}
// Buddy: Chat / Instant Message / XMPP
// ====================================
function InitialiseStream(buddy){
    var template = { TotalRows:0, DataCollection:[] }
    localDB.setItem(buddy + "-stream", JSON.stringify(template));
    return JSON.parse(localDB.getItem(buddy + "-stream"));
}

function UpdateBuddyActivity(buddy, lastAct){
    var buddyObj = FindBuddyByIdentity(buddy);
    if(buddyObj == null) return;

    // Update Last Activity Time
    // =========================
    if(lastAct){
        buddyObj.lastActivity = lastAct;
    } 
    else {
        var timeStamp = utcDateNow();
        buddyObj.lastActivity = timeStamp;
    }
    console.log("Last Activity for "+  buddyObj.CallerIDName +" is now: "+ buddyObj.lastActivity);

    // Take Out
    var json = JSON.parse(localDB.getItem(profileUserID + "-Buddies"));
    if(json != null) {
        $.each(json.DataCollection, function (i, item) {
            if(item.uID == buddy || item.cID == buddy || item.gID == buddy){
                item.LastActivity = timeStamp;
                return false;
            }
        });
        // Put Back
        localDB.setItem(profileUserID + "-Buddies", JSON.stringify(json));
    }

    // List Update
    // ===========
    UpdateBuddyList();
}

function RemoveLine(lineObj){
    if(lineObj == null) return;

    var earlyReject = lineObj.SipSession.data.earlyReject;
    for(var l = 0; l < Lines.length; l++) {
        if(Lines[l].LineNumber == lineObj.LineNumber) {
            Lines.splice(l,1);
            break;
        }
    }

    if(earlyReject != true){
        CloseLine(lineObj.LineNumber);
        $("#line-ui-"+ lineObj.LineNumber).remove();
    }

    UpdateBuddyList();

    if(earlyReject != true){
        // Rather than showing nothing, go to the last Buddy Selected
        // Select Last user
        if(localDB.getItem("SelectedBuddy") != null){
            console.log("Selecting previously selected buddy...", localDB.getItem("SelectedBuddy"));
            SelectBuddy(localDB.getItem("SelectedBuddy"));
            UpdateUI();
        }
    } 
}
function CloseLine(lineNum){
    // Lines and Buddies (Left)
    $(".buddySelected").each(function () {
        $(this).prop('class', 'buddy');
    });
    // Streams (Right)
    $(".streamSelected").each(function () {
        $(this).prop('class', 'stream');
    });

    // SwitchLines(0);

    console.log("Closing Line: "+ lineNum);
    for(var l = 0; l < Lines.length; l++){
        Lines[l].IsSelected = false;
    }
    selectedLine = null;
    for(var b = 0; b < Buddies.length; b++){
        Buddies[b].IsSelected = false;
    }
    selectedBuddy = null;

    // Save Selected
    // localDB.setItem("SelectedBuddy", null);

    // Change to Stream if in Narrow view
    UpdateUI();
}

