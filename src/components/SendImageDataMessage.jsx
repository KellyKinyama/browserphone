const SendImageDataMessage = () => {
    if (userAgent == null) return;
    if (!userAgent.isRegistered()) return;

    // Ajax Upload
    // ===========

    var DateTime = moment.utc().format("YYYY-MM-DD HH:mm:ss UTC");
    var formattedMessage = (<img class="previewImage" onClick="PreviewImage(this)" src={ImgDataUrl} />)
    var messageString = (<table class="ourChatMessage" cellspacing="0" cellpadding="0"><tr><td style="width: 80px">
        <div class="messageDate">{DateTime}</div>
    </td><td>
            <div class="ourChatMessageText">{formattedMessage}</div>
        </td></tr></table>)

    ImageEditor_Cancel(buddy);

    UpdateBuddyActivity(buddy);
    return (
        <div id={`contact-${buddy}-ChatHistory`}>
            {messageString}
        </div>
    )

}