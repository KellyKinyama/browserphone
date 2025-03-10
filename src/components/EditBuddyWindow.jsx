const EditBuddyWindow = () => {
    return (
        <div border="0" className='UiWindowField'>

            <div id="ImageCanvas" style={{ width: "150px", height: "150px" }}></div>
            <div style={{ float: left, marginLeft: "200px" }}><input id="fileUploader" type="file" /></div>
            <div style={{ marginTop: "50px" }}></div>

            <div className="UiText">{lang.full_name}:</div>
            <div><input id="AddSomeone_Name" className="UiInputText" type="text" placeholder='" + lang.eg_full_name + "' value={((buddyJson.DisplayName && buddyJson.DisplayName != "null" && buddyJson.DisplayName != "undefined") ? buddyJson.DisplayName : "")} /></div>
            <div><input type="checkbox" id="AddSomeone_Dnd" checked={buddyJson.EnableDuringDnd == true} /><label for="AddSomeone_Dnd">Allow calls while on Do Not Disturb</label></div>

            <div className="UiText">{lang.title_description}:</div>
            <div><input id="AddSomeone_Desc" className="UiInputText" type="text" placeholder={lang.eg_general_manager} value={(buddyJson.Description && buddyJson.Description != "null" && buddyJson.Description != "undefined") ? buddyJson.Description : ""} /></div>

            {buddyJson.Type == "extension" || buddyJson.Type == "xmpp" ? (
                <>
                    <div className="UiText">{lang.extension_number}: </div>
                    <div><input id="AddSomeone_Exten" className="UiInputText" type="text" value={buddyJson.ExtensionNumber} /></div>
                    <div><input type="checkbox" id="AddSomeone_Subscribe" checked={buddyJson.Subscribe == true} /><label for="AddSomeone_Subscribe">Subscribe to Device State Notifications</label></div>
                    <div id="RowSubscribe" style={{ display: buddyJson.Subscribe == true ? "unset" : "none" }}>
                        <div className="UiText" style={{ marginLeft: "30px" }}>{internal_subscribe_extension}:</div>
                        <div style={{ marginLeft: "30px" }}><input id="AddSomeone_SubscribeUser" className="UiInputText" type="text" placeholder={lang.eg_internal_subscribe_extension} value={(buddyJson.SubscribeUser && buddyJson.SubscribeUser != "null" && buddyJson.SubscribeUser != "undefined") ? buddyJson.SubscribeUser : ""} /></div>
                    </div>
                </>
            )
                : (
                    <input type="checkbox" id="AddSomeone_Subscribe" style={{ display: "none" }} />
                )}
            <div className="UiText">{lang.mobile_number}:</div>
            <div><input id="AddSomeone_Mobile" className="UiInputText" type="text" placeholder={lang.eg_mobile_number} value={((buddyJson.MobileNumber && buddyJson.MobileNumber != "null" && buddyJson.MobileNumber != "undefined") ? buddyJson.MobileNumber : "")} /></div>

            <div className="UiText">{lang.email}:</div>
            <div><input id="AddSomeone_Email" className="UiInputText" type="text" placeholder={lang.eg_email} value={((buddyJson.Email && buddyJson.Email != "null" && buddyJson.Email != "undefined") ? buddyJson.Email : "")} /></div>

            <div className="UiText">{lang.contact_number_1}:</div>
            <div><input id="AddSomeone_Num1" className="UiInputText" type="text" placeholder={lang.eg_contact_number_1} value={((buddyJson.ContactNumber1 && buddyJson.ContactNumber1 != "null" && buddyJson.ContactNumber1 != "undefined") ? buddyJson.ContactNumber1 : "")} /></div>

            <div className="UiText">{lang.contact_number_2}:</div>
            <div><input id="AddSomeone_Num2" className="UiInputText" type="text" placeholder={lang.eg_contact_number_2} value={((buddyJson.ContactNumber2 && buddyJson.ContactNumber2 != "null" && buddyJson.ContactNumber2 != "undefined") ? buddyJson.ContactNumber2 : "")} /></div>

            <div className="UiText">Auto Delete:</div>
            <div><input type="checkbox" id="AddSomeone_AutoDelete" checked={buddyJson.AutoDelete == true} /><label for="AddSomeone_AutoDelete">{lang.yes}</label></div>

            {/* // add option to delete data, etc, etc */}
            <div className="UiText"><button onclick={RemoveBuddy(buddyObj.identity)} className="UiDeleteButton"><i className="fa fa-trash"></i> {lang.delete_buddy}</button></div>

        </div>
    )
}