const AddLineHtml = () => {
    return (
        <div id="rightContent">

            <table id={`line-ui-${lineObj.LineNumber}`} className="stream" cellspacing="0" cellpadding="0">
                <tbody>
                    <tr><td className="streamSection highlightSection" style={{ height: "85px" }}>

                        <div style={{ float: "left", margin: "0px", padding: "5px", height: "38px", lineHeight: "38px" }}>
                            <button id={`line-${lineObj.LineNumber}-btn-back`} onclick={CloseLine(lineObj.LineNumber)} className="roundButtons" title={lang.back}><i className="fa fa-chevron-left"></i></button>
                        </div>


                        <div className="contact" style={{ cursor: unset, float: "left" }}>
                            <div id={`line-ui-${lineObj.LineNumber}-LineIcon`} className="lineIcon">{lineObj.LineNumber}</div>
                            <div id={`line-ui-${lineObj.LineNumber}-DisplayLineNo`} className="contactNameText"><i className="fa fa-phone"></i>{lang.line + " " + lineObj.LineNumber}</div>
                            <div className="presenceText" style={{ maxWidth: "150px" }}>{lineObj.DisplayNumber}</div>
                        </div>


                        <div style={{ float: "right", lineHeight: "46px" }}>
                            <div id={`line-${lineObj.LineNumber}-monitoring`} style={{ marginRight: "10px" }}>
                                <span style={{ verticalAlign: "middle" }}><i className="fa fa-microphone"></i></span>
                                <span className="meterContainer" title={lang.microphone_levels}>
                                    <span id={`line-${lineObj.LineNumber}-Mic`} className="meterLevel" style={{ height: "0%" }}></span>
                                </span>
                                <span style={{ verticalAlign: "middle" }}><i className="fa fa-volume-up"></i></span>
                                <span className="meterContainer" title={lang.speaker_levels}>
                                    <span id={`line-${lineObj.LineNumber}-Speaker`} className="meterLevel" style={{ height: "0%" }}></span>
                                </span>
                            </div>

                        </div>

                        <div style={{ clear: "both", height: "0px" }}></div>


                        <div id={`line-${lineObj.LineNumber}-timer`} className="CallTimer"></div>
                        <div id={`line-${lineObj.LineNumber}-msg`} className="callStatus" style={{ display: "none" }}>...</div>

                        <div sstyle={{ display: "none" }}>
                            <audio id={`line-${lineObj.LineNumber}-remoteAudio`}></audio>
                        </div>

                    </td></tr>

                    <tr><td id={`line-${lineObj.LineNumber}-call-fullscreen`} className="streamSection highlightSection">


                        <div id={`line-${lineObj.LineNumber}-AnswerCall`} style={{ display: "none" }}>
                            <div className="CallPictureUnderlay" style={{ backgroundImage: `url(${avatar})` }}></div>
                            <div className="CallColorUnderlay"></div>
                            <div className="CallUi">
                                <div className="callingDisplayName">{lineObj.DisplayName}</div>
                                <div className="callingDisplayNumber">{lineObj.DisplayNumber}</div>
                                <div id={`"line-${lineObj.LineNumber}-in-avatar`} className="inCallAvatar" style={{ backgroundImage: `url(${avatar})` }}></div>
                                <div className="answerCall">";
                                    <button onclick={AnswerAudioCall(lineObj.LineNumber)} className="answerButton"><i className="fa fa-phone"></i> {lang.answer_call}</button>
                                    {EnableVideoCalling}
                                    (<button id={`line-${lineObj.LineNumber}-answer-video`} onclick={AnswerVideoCall(lineObj.LineNumber)} className="answerButton"><i className="fa fa-video-camera"></i> {lang.answer_call_with_video}</button> )

                                    <button onclick={RejectCall('" + lineObj.LineNumber + "')} className="rejectButton"><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i> {lang.reject_call}</button>
                                    {/* // CRM */}
                                    <div id={`line-${lineObj.LineNumber}-answer-crm-space`}>
                                        {/* // Use this DIV for anything really. Call your own CRM, and have the results display here */}
                                    </div>
                                    {/* // crm */}
                                </div>
                                {/* //.answerCall */}

                            </div>
                            {/* //.CallUi */}
                        </div>
                        {/* //-AnswerCall */}

                        {/* g Out Progress */}
                        <div id={`line-${lineObj.LineNumber}-progress`} style={{ display: "none" }}>
                            <div className="CallPictureUnderlay" style={{ backgroundImage: `url(${avatar})` }}></div>
                            <div className="CallColorUnderlay"></div>
                            <div className="CallUi">
                                <div className="callingDisplayName">{lineObj.DisplayName}</div>
                                <div className="callingDisplayNumber">{lineObj.DisplayNumber}</div>
                                <div id={`line-" + lineObj.LineNumber + "-out-avatar`} className="inCallAvatar" style={{ backgroundImage: `url(${avatar})` }}></div>
                                <div className="progressCall">"
                                    <button onclick={cancelSession('" + lineObj.LineNumber + "')} className="rejectButton"><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i> {lang.cancel}</button>
                                    <button id={`line-${lineObj.LineNumber}-early-dtmf`} onclick={ShowDtmfMenu(lineObj.LineNumber)} style={{ display: "none" }}><i className="fa fa-keyboard-o"></i> {lang.send_dtmf}</button>
                                </div>
                                {/* //.progressCall */}
                            </div>
                            {/* //.CallUi */}
                        </div>
                        {/* // -progress */}

                        {/* Call UI */}
                        <div id={`line-" + lineObj.LineNumber + "-ActiveCall`} className="cleanScroller" style={{ display: "none", position: "absolute", top: "0px", left: "0px", height: "100%", width: "100%" }}>

                            {/* or Video Call (gets changed with InCallControls) */}
                            <div id={`line-${lineObj.LineNumber}-AudioOrVideoCall`} style={{ height: "100%" }}>

                                {/* Call UI */}
                                <div id={`line-${lineObj.LineNumber}-AudioCall`} style={{ height: "100%", display: "none" }}>
                                    <div className="CallPictureUnderlay" style={{ backgroundImage: `url(${avatar})` }}></div>
                                    <div className="CallColorUnderlay"></div>
                                    <div className="CallUi">
                                        <div className="callingDisplayName">{lineObj.DisplayName}</div>
                                        <div className="callingDisplayNumber">{lineObj.DisplayNumber}</div>
                                        <div id={`line-${lineObj.LineNumber}-session-avatar`} className="inCallAvatar" style={{ backgroundImage: `url(${avatar})` }}></div>

                                        {/* ransfer */}
                                        <div id={`line-${lineObj.LineNumber}-Transfer`} style={{ textAlign: "center", lineHeight: "40px", display: "none" }}>
                                            <div style={{ marginTop: "10px" }}>
                                                <span className="searchClean"><input id={`line-${lineObj.LineNumber}-txt-FindTransferBuddy`} oninput={QuickFindBuddy(this, lineObj.LineNumber)} onkeydown={transferOnkeydown(event, this, lineObj.LineNumber)} type="text" autoComplete="none" style={{ width: "150px" }} placeholder={lang.search_or_enter_number} /></span>
                                                <br />
                                                <button id={`line-${lineObj.LineNumber}-btn-blind-transfer`} onclick={BlindTransfer(lineObj.LineNumber)}><i className="fa fa-reply" style={{ transform: "rotateY(180deg)" }}></i> {lang.blind_transfer}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-attended-transfer`} onclick={AttendedTransfer(lineObj.LineNumber)}><i className="fa fa-reply-all" style={{ transform: "rotateY(180deg)" }}></i> {lang.attended_transfer}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-complete-attended-transfer`} style={{ display: "none" }}><i className="fa fa-reply-all" style={{ transform: "rotateY(180deg)}" }}></i> {lang.complete_transfer}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-cancel-attended-transfer`} style={{ display: "none" }}><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i> {lang.cancel_transfer}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-terminate-attended-transfer`} style={{ display: none }}><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i> {lang.end_transfer_call}</button>
                                            </div>
                                            <div id={`line-${lineObj.LineNumber}-transfer-status`} className="callStatus" style={{ marginTop: "10px", display: "none" }}>...</div>
                                            <audio id={`line-${lineObj.LineNumber}-transfer-remoteAudio`} style={{ display: "none" }}></audio>
                                        </div>
                                        {/* //-Transfer */}

                                        {/* onference */}
                                        <div id={`line-${lineObj.LineNumber}-Conference`} style={{ textAlign: center, lineHeight: "40px", display: "none" }}>
                                            <div style={{ marginTop: "10px" }}>
                                                <span className="searchClean"><input id={`line-${lineObj.LineNumber}-txt-FindConferenceBuddy`} oninput={QuickFindBuddy(this, lineObj.LineNumber)} onkeydown={conferenceOnkeydown(event, this, lineObj.LineNumber)} type="text" autoComplete="none" style={{ width: "150px" }} placeholder={lang.search_or_enter_number} /></span>
                                                <br />"
                                                <button id={`line-${lineObj.LineNumber}-btn-conference-dial`} onclick={ConferenceDial(lineObj.LineNumber)}><i className="fa fa-phone"></i> {lang.call}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-cancel-conference-dial`} style={{ display: "none" }}><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i> {lang.cancel_call}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-join-conference-call`} style={{ display: "none" }}><i className="fa fa-users"></i> {lang.join_conference_call}</button>
                                                <button id={`line-${lineObj.LineNumber}-btn-terminate-conference-call`} style={{ display: none }}><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i>{lang.end_conference_call}</button>";
                                            </div>
                                            <div id={`line-${lineObj.LineNumber}-conference-status`} className="callStatus" style={{ marginTop: "10px", display: "none" }}>...</div>
                                            <audio id={`line-${lineObj.LineNumber}-conference-remoteAudio`} style={{ display: "none" }}></audio>
                                        </div>
                                        {/* //-Conference */}


                                        <div id={`line-${lineObj.LineNumber}-active-audio-call-crm-space`}>
                                            {/* is DIV for anything really. Call your own CRM, and have the results display here */}
                                        </div>
                                        {/* // crm */}

                                    </div>
                                    {/* //.CallUi */}
                                </div>
                                {/* //AudioCall */}

                                {/* Call UI */}
                                <div id={`line-${lineObj.LineNumber}-VideoCall`} style={{ height: "100%", display: "none" }}>
                                    {/* Preview */}
                                    <div id={`line-${lineObj.LineNumber}-preview-container`} className="PreviewContainer cleanScroller">";
                                        <video id={`line-${lineObj.LineNumber}-localVideo`} muted playsinline></video>
                                        {/* // Default Display */}
                                    </div>


                                    <div id={`line-${lineObj.LineNumber}-stage-container`} className="StageContainer">
                                        <div id={`line-${lineObj.LineNumber}-remote-videos`} className="VideosContainer"></div>
                                        <div id={`line-${lineObj.LineNumber}-scratchpad-container`} className="ScratchpadContainer" style={{ display: "none" }}></div>
                                        <video id={`line-${lineObj.LineNumber}-sharevideo`} controls muted playsinline style={{ display: "none", objectFit: "contain", width: "100%" }}></video>
                                    </div>
                                </div>
                                {/* //-VideoCall */}
                            </div>
                            {/* //-AudioOrVideoCall */}

                            {/* l Control
        ========= */}
                            <div className="CallControlContainer">
                                <div className="CallControl">
                                    <div><button id={`line-${lineObj.LineNumber}-btn-ControlToggle`} onclick={ToggleMoreButtons(lineObj.LineNumber)} style={{ fontSize: "24px", width: "80px" }}><i className="fa fa-chevron-up"></i></button></div>";
                                    {/* e Row */}
                                    <div>

                                        <button id={`line-${lineObj.LineNumber}-btn-Mute`} onclick={MuteSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.mute}><i className="fa fa-microphone-slash"></i></button>";
                                        <button id={`line-${lineObj.LineNumber}-btn-Unmute`} onclick={UnmuteSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.unmute} style={{ color: "red", display: "none" }}><i className="fa fa-microphone"></i></button>";

                                        <button id={`line-${lineObj.LineNumber}-btn-Hold`} onclick={holdSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.hold_call}><i className="fa fa-pause-circle"></i></button>";
                                        <button id={`line-${lineObj.LineNumber}-btn-Unhold`} onclick={unholdSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.resume_call} style={{ color: "red", display: "none" }}><i className="fa fa-play-circle"></i></button>";

                                        {direction === "outbound" ? (
                                            <button
                                                id={`line-${lineObj.LineNumber}-btn-ShowDtmf`}
                                                onClick={() => ShowDtmfMenu(lineObj.LineNumber)}
                                                className="roundButtons dialButtons inCallButtons"
                                                title={lang.send_dtmf}
                                            >
                                                <i className="fa fa-keyboard-o"></i>
                                            </button>
                                        ) : (
                                            EnableTransfer && (
                                                <>
                                                    <button
                                                        id={`line-${lineObj.LineNumber}-btn-Transfer`}
                                                        onClick={() => StartTransferSession(lineObj.LineNumber)}
                                                        className="roundButtons dialButtons inCallButtons"
                                                        title={lang.transfer_call}
                                                    >
                                                        <i className="fa fa-reply" style={{ transform: "rotateY(180deg)" }}></i>
                                                    </button>
                                                    <button
                                                        id={`line-${lineObj.LineNumber}-btn-CancelTransfer`}
                                                        onClick={() => CancelTransferSession(lineObj.LineNumber)}
                                                        className="roundButtons dialButtons inCallButtons"
                                                        title={lang.cancel_transfer}
                                                        style={{ color: "red", display: "none" }}
                                                    >
                                                        <i className="fa fa-reply" style={{ transform: "rotateY(180deg)" }}></i>
                                                    </button>
                                                </>
                                            )
                                        )}
                                        {/* // Expand UI (Video Only) */}
                                        <button id={`line-${lineObj.LineNumber}-btn-expand`} onclick={ExpandVideoArea(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons"><i className="fa fa-expand"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-restore`} onclick={RestoreVideoArea(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" style={{ display: "none" }}><i className="fa fa-compress"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-End`} onclick={endSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons hangupButton" title={lang.end_call}><i className="fa fa-phone" style={{ transform: "rotate(135deg)" }}></i></button>
                                    </div>
                                    {/* // o (Hidden By Default) */}
                                    <div id={`line-${lineObj.LineNumber}-btn-more`} style={{ display: "none" }}>
                                        {/* // Record */}
                                        {typeof MediaRecorder != "undefined" && (CallRecordingPolicy == "allow" || CallRecordingPolicy == "enabled")}(
                                        {/* // Safari: must enable in Develop > Experimental Features > MediaRecorder */}
                                        <button id={`line-${lineObj.LineNumber}-btn-start-recording`} onclick={StartRecording(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.start_call_recording}><i className="fa fa-dot-circle-o"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-stop-recording`} onclick={StopRecording(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.stop_call_recording} style={{ color: "red", display: "none" }}><i className="fa fa-circle"></i></button>
                                        )
                                        {/* // Conference */}
                                        {EnableConference} (
                                        <button id={`line-${lineObj.LineNumber}-btn-Conference`} onclick={StartConferenceCall(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.conference_call}><i className="fa fa-users"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-CancelConference`} onclick={CancelConference(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.cancel_conference} style={{ color: red, display: "none" }}><i className="fa fa-users"></i></button>
                                        )
                                        {/* {direction == "outbound" ? */}
                                        {/* // Transfer (Audio Only) */}
                                        {EnableTransfer}
                                        (<button id={`line-${lineObj.LineNumber}-btn-Transfer`} onclick={StartTransferSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.transfer_call}><i className="fa fa-reply" style={{ transform: "rotateY(180deg)" }}></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-CancelTransfer`} onclick={CancelTransferSession(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.cancel_transfer} style={{ color: "red", display: "none" }}><i className="fa fa-reply" style={{ transform: "rotateY(180deg)" }}></i></button>

                                        ):(
                                        // DTMF
                                        <button id={`line-${lineObj.LineNumber}-btn-ShowDtmf`} onclick={ShowDtmfMenu(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.send_dtmf}><i className="fa fa-keyboard-o"></i></button>
                                        )
                                        {/* } */}

                                        <button id={`line-${lineObj.LineNumber}-btn-settings`} onclick={ChangeSettings(lineObj.LineNumber, this)} className="roundButtons dialButtons inCallButtons" title={lang.device_settings}><i className="fa fa-volume-up"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-present-src`} onclick={ShowPresentMenu(this, lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.camera}><i className="fa fa-video-camera"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-ShowCallStats`} onclick={ShowCallStats(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.call_stats}><i className="fa fa-area-chart"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-HideCallStats`} onclick={HideCallStats(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.call_stats} style={{ color: "red", display: "none" }}><i className="fa fa-area-chart"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-ShowTimeline`} onclick={ShowCallTimeline(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.activity_timeline}><i className="fa fa-list-ul"></i></button>
                                        <button id={`line-${lineObj.LineNumber}-btn-HideTimeline`} onclick={HideCallTimeline(lineObj.LineNumber)} className="roundButtons dialButtons inCallButtons" title={lang.activity_timeline} style={{ color: "red", display: "none" }}><i className="fa fa-list-ul"></i></button>

                                    </div>
                                </div>
                            </div>

                            <div id={`line-${lineObj.LineNumber}-AudioStats`} className="audioStats cleanScroller" style={{ display: "none" }}>
                                <div>
                                    <div>{lang.send_statistics}</div>
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioSendBitRate`} className="audioGraph"></canvas></div>
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioSendPacketRate`} className="audioGraph"></canvas></div>
                                </div>
                                <div>
                                    <div>{lang.receive_statistics}</div>
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioReceiveBitRate`} className="audioGraph"></canvas></div>";
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioReceivePacketRate`} className="audioGraph"></canvas></div>";
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioReceivePacketLoss`} className="audioGraph"></canvas></div>";
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioReceiveJitter`} className="audioGraph"></canvas></div>";
                                    <div style={{ position: "relative", margin: "auto", height: "160px", width: "100%" }}><canvas id={`line-${lineObj.LineNumber}-AudioReceiveLevels`} className="audioGraph"></canvas></div>";
                                </div>
                            </div>


                            <div id={`line-${lineObj.LineNumber}-CallDetails`} className="callTimeline cleanScroller" style={{ display: "none" }}>

                            </div>

                        </div>


                    </td></tr>
                </tbody>
            </table>
        </div>

    )
}