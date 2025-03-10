const ShowSortAnfFilter = () => {
    return (
        <div id="actionArea">
            <div style={{textAlign:right}}><button className="roundButtons" onclick="ShowContacts()"><i className="fa fa-close"></i></button></div>
            <table cellspacing="10" cellpadding="0" style={{marginLeft:auto, marginRight: auto}}>
                {/* e (and what order) */}
                <tr><td><div><input disabled type="radio" name="sort_by" id="sort_by_type" /><label for="sort_by_type">{lang.sort_type}</label></div>
                    <div style={{marginLeft:"20px"}}><input type="radio" name="sort_by_type" id="sort_by_type_cex" /><label for="sort_by_type_cex">{lang.sort_type_cex}</label></div>
                    <div style={{marginLeft:"20px"}}><input type="radio" name="sort_by_type" id="sort_by_type_cxe" /><label for="sort_by_type_cxe">{lang.sort_type_cxe}</label></div>
                    <div style={{marginLeft:"20px"}}><input type="radio" name="sort_by_type" id="sort_by_type_xec" /><label for="sort_by_type_xec">{lang.sort_type_xec}</label></div>
                    <div style={{marginLeft:"20px"}}><input type="radio" name="sort_by_type" id="sort_by_type_xce" /><label for="sort_by_type_xce">{lang.sort_type_xce}</label></div>
                    <div style={{marginLeft:"20px"}}><input type="radio" name="sort_by_type" id="sort_by_type_exc" /><label for="sort_by_type_exc">{lang.sort_type_exc}</label></div>
                    <div style={{marginLeft:"20px"}}><input type="radio" name="sort_by_type" id="sort_by_type_ecx" /><label for="sort_by_type_ecx">{lang.sort_type_ecx}</label></div>
                </td></tr>
                {/* ension */}
                <tr><td><div><input type="radio" name="sort_by" id="sort_by_exten" /><label for="sort_by_exten">{lang.sort_exten}</label></div></td></tr>
                {/* habetical  */}
                <tr><td><div><input type="radio" name="sort_by" id="sort_by_alpha" /><label for="sort_by_alpha">{lang.sort_alpha}</label></div></td></tr>
                {/* ast Activity */}
                <tr><td><div><input type="radio" name="sort_by" id="sort_by_activity" /><label for="sort_by_activity">{lang.sort_activity}</label></div></td></tr>

                {/* ary Options */}
                <tr><td><div><input type="checkbox" id="sort_auto_delete_at_end" /><label for="sort_auto_delete_at_end">{lang.sort_auto_delete_at_end}</label></div></td></tr>
                <tr><td><div><input type="checkbox" id="sort_auto_delete_hide" /><label for="sort_auto_delete_hide">{lang.sort_auto_delete_hide}</label></div></td></tr>
                <tr><td><div><input type="checkbox" id="sort_show_exten_num" /><label for="sort_show_exten_num">{lang.sort_show_exten_num}</label></div></td></tr>

            </table>
        </div>
    )
}