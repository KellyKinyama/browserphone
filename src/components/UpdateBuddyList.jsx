export function UpdateBuddyList(){
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
