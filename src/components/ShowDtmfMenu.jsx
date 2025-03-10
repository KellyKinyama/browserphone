const ShowDtmfMenu = () => {
    return (

        <div id="ActionArea">
            <table cellspacing="10" cellPadding="0" style={{ marginLeft: auto, marginRight: auto }}>
                <tbody>
                    <tr><td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '1')}><div>1</div><span>&nbsp;</span></button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '2')}><div>2</div><span>ABC</span></button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '3')}><div>3</div><span>DEF</span></button></td></tr>
                    <tr><td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '4')}><div>4</div><span>GHI</span></button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '5')}><div>5</div><span>JKL</span></button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '6')}><div>6</div><span>MNO</span></button></td></tr>
                    <tr><td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '7')}><div>7</div><span>PQRS</span></button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '8')}><div>8</div><span>TUV</span></button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '9')}><div>9</div><span>WXYZ</span></button></td></tr>
                    <tr><td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '*')}>*</button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '0')}>0</button></td>
                        <td><button class="dialButtons" onclick={sendDTMF('" + lineNum + "', '#')}>#</button></td></tr>
                </tbody>
            </table>
        </div>
    )
}