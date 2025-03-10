import React from "react"



const KeyPress=(num)=>{
    console.log("Pressed: ",num)
}
export const ShowDial = () => {
    return (
        <div id="actionArea">
            <div style={{ textAlign: "right" }}><button className="roundButtons"
            // onclick={ShowContacts()}
            ><i className="fa fa-close"></i></button></div>
            <div style={{ textAlign: "center", marginTop: "15px" }}><input id="dialText" className="dialTextInput"
                //  oninput={handleDialInput(this, event)} 
                //  onkeydown={dialOnkeydown(event, this)}
                style={{ width: "170px", height: "32px" }} /><button id="dialDeleteKey" className="roundButtons"
                //  onClick={KeyPress('del')}
                 >⌫</button></div>
            <table cellSpacing="10" cellPadding="0" style={{ marginLeft: "auto", marginRight: "auto" }}>
                <tbody>
                    <tr><td><button className="dialButtons" onClick={()=>KeyPress('1')}><div>1</div><span>&nbsp;</span></button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('2')}><div>2</div><span>ABC</span></button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('3')}><div>3</div><span>DEF</span></button></td></tr>
                    <tr><td><button className="dialButtons" onClick={()=>KeyPress('4')}><div>4</div><span>GHI</span></button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('5')}><div>5</div><span>JKL</span></button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('6')}><div>6</div><span>MNO</span></button></td></tr>
                    <tr><td><button className="dialButtons" onClick={()=>KeyPress('7')}><div>7</div><span>PQRS</span></button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('8')}><div>8</div><span>TUV</span></button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('9')}><div>9</div><span>WXYZ</span></button></td></tr>
                    <tr><td><button className="dialButtons" onClick={()=>KeyPress('*')}>*</button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('0')}>0</button></td>
                        <td><button className="dialButtons" onClick={()=>KeyPress('#')}>#</button></td></tr>
                </tbody>
            </table>
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
                <button className="dialButtons dialButtonsDial" id="dialAudio" title={lang.audio_call} 
                // onClick="DialByLine('audio')"
                ><i className="fa fa-phone"></i></button>
                {EnableVideoCalling} {
                    <button className="dialButtons dialButtonsDial" id="dialVideo" style={{ marginLeft: "20px" }} title={lang.video_call}
                    // onclick={DialByLine('video')}
                    ><i className="fa fa-video-camera"></i></button>
                }
            </div>";
        </div>
    )
}
//  ShowDial