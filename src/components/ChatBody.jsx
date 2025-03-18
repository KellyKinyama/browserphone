export const ChatBody = () => {

    return(
    <div id="rightContent" className="rightContent" style={{ marginLeft: "320px", height: "100%" }}>
        <table id="stream-17420180671131F15" className="streamSelected" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td id="contact-17420180671131F15-ProfileCell" className="streamSection highlightSection buddyProfileSection sectionBorderBottom" style="height: 50px; box-sizing: border-box;">
                        <table cellpadding="0" cellspacing="0" border="0" style="width:100%; table-layout: fixed;">
                            <tbody>
                                <tr>
                                    <td style="width:38px; text-align: center;">
                                        <button id="contact-17420180671131F15-btn-back" onClick={()=>CloseBuddy('17420180671131F15')} className="roundButtons" style="margin-right:5px" title="Back"><i className="fa fa-chevron-left"></i>
                                        </button>
                                    </td>
                                    <td style="width:100%">
                                        <div className="contact" style="cursor: unset; padding:0px">
                                            <div id="contact-17420180671131F15-picture-main" className="buddyIcon" style="background-image: url('avatars/default.1.webp')">
                                            </div>
                                            <div className="contactNameText" style="margin-right: 0px;">
                                                <span id="contact-17420180671131F15-devstate-main" className="dotOffline"></span>
                                                <span id="contact-17420180671131F15-name">2056</span>
                                            </div>
                                            <div id="contact-17420180671131F15-presence-main" className="presenceText">
                                            </div>
                                        </div>
                                    </td>
                                    <td id="contact-17420180671131F15-action-buttons" style="width: 120px; text-align: right">
                                        <button id="contact-17420180671131F15-btn-audioCall" onClick={AudioCallMenu('17420180671131F15', this)} className="roundButtons" title="Audio Call"><i className="fa fa-phone"></i></button>
                                        <button id="contact-17420180671131F15-btn-videoCall" onClick="DialByLine('video', '17420180671131F15', '2056');" className="roundButtons" title="Video Call"><i className="fa fa-video-camera"></i></button>
                                        <span id="contact-17420180671131F15-extra-buttons" style="display:none">
                                            <button id="contact-17420180671131F15-btn-edit" onClick={EditBuddyWindow('17420180671131F15')} className="roundButtons" title="Edit">
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button id="contact-17420180671131F15-btn-search" onClick={FindSomething('17420180671131F15')} className="roundButtons" title="Find Something">
                                                <i className="fa fa-search"></i>
                                            </button>
                                            <button id="contact-17420180671131F15-btn-pin" onClick={TogglePinned('17420180671131F15')} className="roundButtons" title="Pinned">
                                                <i className="fa fa-thumb-tack"></i>
                                            </button>

                                        </span>
                                        <button id="contact-17420180671131F15-btn-toggle-extra" onClick={ToggleExtraButtons('17420180671131F15', 120, 240)} className="roundButtons">
                                            <i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div style="clear:both; height:0px">
                        </div>
                        <div id="contact-17420180671131F15-search" style="margin-top:6px; display:none"><span className="searchClean" style="width:100%">
                            <input type="text" style="width: calc(100% - 40px);" autocomplete="none" onInput={SearchStream(this,'17420180671131F15')} placeholder="Find something in the message stream..." />
                        </span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td id="contact-17420180671131F15-MessagesCell" className="streamSection streamSectionBackground wallpaperBackground buddyMessageSection">
                        <div id="contact-17420180671131F15-ChatHistory" className="chatHistory cleanScroller" ondragenter="setupDragDrop(event, '17420180671131F15')" ondragover="setupDragDrop(event, '17420180671131F15')" ondragleave="cancelDragDrop(event, '17420180671131F15')" ondrop="onFileDragDrop(event, '17420180671131F15')">
                            <table className="ourChatMessage" cellspacing="0" cellpadding="0">
                                <tbody>
                                    <tr>
                                        <td style="padding-right:4px;"><span id="cdr-flagged-17420180916832521" style="display:none"><i className="fa fa-flag FlagCall"></i> </span>
                                        </td>
                                        <td className="ourChatMessageText" onmouseenter="ShowChatMenu(this)" onmouseleave="HideChatMenu(this)">
                                            <span onClick="ShowMessageMenu(this,'CDR','17420180916832521', '17420180671131F15')" className="chatMessageDropdown" style="display: none;">
                                                <i className="fa fa-chevron-down">
                                                </i>
                                            </span>
                                            <div>
                                                <i className="fa fa-phone" style="color:red"></i> You tried to make an audio call (Call Cancelled).</div>
                                            <div>
                                                <ul id="cdr-tags-17420180916832521" className="tags" style="display:none">
                                                    <li className="tagText">
                                                        <input maxlength="24" type="text" onkeypress="TagKeyPress(event, this, '17420180916832521', '17420180671131F15')" onfocus="TagFocus(this)"/>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div id="cdr-comment-17420180916832521" className="cdrComment">
                                            </div>
                                            <div className="callRecordings">
                                            </div>
                                            <div className="messageDate">7:54:27 AM
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td id="contact-17420180671131F15-InteractionCell" className="streamSection highlightSection buddyInteractionSection sectionBorderTop" style="height:80px">
                        <div id="contact-17420180671131F15-imagePastePreview" className="sendImagePreview" style="display:none" tabindex="0">
                        </div>
                        <div id="contact-17420180671131F15-msgPreview" className="sendMessagePreview" style="display:none">
                            <table className="sendMessagePreviewContainer" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="text-align:right">
                                            <div id="contact-17420180671131F15-msgPreviewhtml" className="sendMessagePreviewHtml cleanScroller">
                                            </div>
                                        </td>
                                        <td style="width:40px">
                                            <button onClick="SendChatMessage('17420180671131F15')" className="roundButtons" title="Send">
                                                <i className="fa fa-paper-plane"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="contact-17420180671131F15-fileShare" style="display:none">
                            <input type="file" multiple="" onchange="console.log(this)" />
                        </div>
                        <div id="contact-17420180671131F15-audio-recording" style="display:none">
                        </div>
                        <div id="contact-17420180671131F15-video-recording" style="display:none">
                        </div>
                        <div id="contact-17420180671131F15-dictate-message" style="display:none">
                        </div>
                        <div id="contact-17420180671131F15-emoji-menu" style="display:none">
                        </div>
                        <div id="contact-17420180671131F15-chatstate" style="display:none">
                            <i className="fa fa-commenting-o"></i> 2056 is typing...
                        </div>
                        <table className="sendMessageContainer" cellpadding="0" cellspacing="0">
                            <tbody>
                                <tr>
                                    <td id="contact-17420180671131F15-add-menu" className="MessageActions" style="width:40px">
                                        <button onClick="AddMenu(this, '17420180671131F15')" className="roundButtons" title="Menu"><i className="fa fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <textarea id="contact-17420180671131F15-ChatMessage" className="chatMessage cleanScroller" placeholder="Type your message here..." onkeydown="chatOnkeydown(event, this,'17420180671131F15')" oninput="chatOnInput(event, this,'17420180671131F15')" onpaste="chatOnbeforepaste(event, this,'17420180671131F15')">
                                        </textarea>
                                    </td>
                                    <td id="contact-17420180671131F15-sendMessageButtons" style="width:40px; display:none">
                                        <button onclick="SendChatMessage('17420180671131F15')" className="roundButtons" title="Send"><i className="fa fa-paper-plane"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}