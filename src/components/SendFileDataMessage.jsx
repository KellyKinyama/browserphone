function SendFileDataMessage({ buddy, FileDataUrl, fileName, fileSize }) {
    if (userAgent == null) return;
    if (!userAgent.isRegistered()) return;

    var fileID = uID();

    // Ajax Upload
    // ===========
    $.ajax({
        type: 'POST',
        url: '/api/',
        data: "<XML>" + FileDataUrl + "</XML>",
        xhr: function (e) {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function (event) {
                    var percent = (event.loaded / event.total) * 100;
                    console.log("Progress for upload to " + buddy + " (" + fileID + "):" + percent);
                    $("#FileProgress-Bar-" + fileID).css("width", percent + "%");
                }, false);
            }
            return myXhr;
        },
        success: function (data, status, jqXHR) {
            // console.log(data);
            $("#FileUpload-" + fileID).html("Sent");
            $("#FileProgress-" + fileID).hide();
            $("#FileProgress-Bar-" + fileID).css("width", "0%");
        },
        error: function (data, status, error) {
            // console.log(data);
            $("#FileUpload-" + fileID).html("Failed (" + data.status + ")");
            $("#FileProgress-" + fileID).hide();
            $("#FileProgress-Bar-" + fileID).css("width", "100%");
        }
    });

    // Add To Message Stream
    // =====================
    var DateTime = utcDateNow();

    var showReview = false;
    var fileIcon = '<i class="fa fa-file"></i>';
    // Image Icons
    if (fileName.toLowerCase().endsWith(".png")) {
        fileIcon = '<i class="fa fa-file-image-o"></i>';
        showReview = true;
    }
    if (fileName.toLowerCase().endsWith(".jpg")) {
        fileIcon = '<i class="fa fa-file-image-o"></i>';
        showReview = true;
    }
    if (fileName.toLowerCase().endsWith(".jpeg")) {
        fileIcon = '<i class="fa fa-file-image-o"></i>';
        showReview = true;
    }
    if (fileName.toLowerCase().endsWith(".bmp")) {
        fileIcon = '<i class="fa fa-file-image-o"></i>';
        showReview = true;
    }
    if (fileName.toLowerCase().endsWith(".gif")) {
        fileIcon = '<i class="fa fa-file-image-o"></i>';
        showReview = true;
    }
    // video Icons
    if (fileName.toLowerCase().endsWith(".mov")) fileIcon = '<i class="fa fa-file-video-o"></i>';
    if (fileName.toLowerCase().endsWith(".avi")) fileIcon = '<i class="fa fa-file-video-o"></i>';
    if (fileName.toLowerCase().endsWith(".mpeg")) fileIcon = '<i class="fa fa-file-video-o"></i>';
    if (fileName.toLowerCase().endsWith(".mp4")) fileIcon = '<i class="fa fa-file-video-o"></i>';
    if (fileName.toLowerCase().endsWith(".mvk")) fileIcon = '<i class="fa fa-file-video-o"></i>';
    if (fileName.toLowerCase().endsWith(".webm")) fileIcon = '<i class="fa fa-file-video-o"></i>';
    // Audio Icons
    if (fileName.toLowerCase().endsWith(".wav")) fileIcon = '<i class="fa fa-file-audio-o"></i>';
    if (fileName.toLowerCase().endsWith(".mp3")) fileIcon = '<i class="fa fa-file-audio-o"></i>';
    if (fileName.toLowerCase().endsWith(".ogg")) fileIcon = '<i class="fa fa-file-audio-o"></i>';
    // Compressed Icons
    if (fileName.toLowerCase().endsWith(".zip")) fileIcon = '<i class="fa fa-file-archive-o"></i>';
    if (fileName.toLowerCase().endsWith(".rar")) fileIcon = '<i class="fa fa-file-archive-o"></i>';
    if (fileName.toLowerCase().endsWith(".tar.gz")) fileIcon = '<i class="fa fa-file-archive-o"></i>';
    // Pdf Icons
    if (fileName.toLowerCase().endsWith(".pdf")) fileIcon = '<i class="fa fa-file-pdf-o"></i>';

    var formattedMessage = "<DIV><SPAN id=\"FileUpload-" + fileID + "\">Sending</SPAN>: " + fileIcon + " " + fileName + "</DIV>"
    formattedMessage += "<DIV id=\"FileProgress-" + fileID + "\" class=\"progressBarContainer\"><DIV id=\"FileProgress-Bar-" + fileID + "\" class=\"progressBarTrack\"></DIV></DIV>"
    if (showReview) {
        formattedMessage += "<DIV><IMG class=previewImage onClick=\"PreviewImage(this)\" src=\"" + FileDataUrl + "\"></DIV>";
    }

    var messageString = "<table class=ourChatMessage cellspacing=0 cellpadding=0><tr><td style=\"width: 80px\">"
        + "<div class=messageDate>" + DateTime + "</div>"
        + "</td><td>"
        + "<div class=ourChatMessageText>" + formattedMessage + "</div>"
        + "</td></tr></table>";
    $("#contact-" + buddy + "-ChatHistory").append(messageString);
    updateScroll(buddy);

    ImageEditor_Cancel(buddy);

    // Update Last Activity
    // ====================
    UpdateBuddyActivity(buddy);

    return (
        <div id={`contact-${buddy}-ChatHistory`}>

            <div><span id={`FileUpload-${fileID}`}>Sending</span>: {fileIcon + " " + fileName}</div>
            <div id={`FileProgress-${fileID}`} className="progressBarContainer"><div id={`FileProgress-Bar-${fileID}`} className="progressBarTrack"></div></div>
            {showReview}
            (<div><img className="previewImage" onClick="PreviewImage(this)" src={FileDataUrl + ""} /></div>)


            <table className="ourChatMessage" cellspacing="0" cellpadding="0"><tr><td style="width: 80px">
                <div className="messageDate">{DateTime}</div>
            </td><td>
                    <div className="ourChatMessageText">{formattedMessage}</div>
                </td></tr></table>

        </div>
    )
}