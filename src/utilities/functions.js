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
let EnableVideoCalling = (getDbItem("EnableVideoCalling", "1") == "1");                 // Enables Video during a call
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
