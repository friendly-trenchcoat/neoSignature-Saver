// ==UserScript==
// @author         friendly-trenchcoat
// @name           Neopets - Neosignature Saver
// @description    Lets you save fonts and easily switch between them.
// @namespace      https://github.com/friendly-trenchcoat
// @include        http://www.neopets.com/neoboards/preferences.phtml*
// @grant          GM_getValue
// @grant          GM_setValue
// @require	       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
/*jshint multistr: true */

/*
Should work with any browser with Tampermonkey
If you encounter any bugs please contact me at https://www.reddit.com/message/compose/?to=friendly-trenchcoat
*/

// initialize values
if(typeof GM_getValue("offset") === 'undefined') GM_setValue("offset", 0);
var presets = JSON.parse(localStorage.getItem("presets"));
var offset = GM_getValue("offset");

// inject HTML
function main() {
    $("table[cellpadding='4']").first().before(' \
		<table width="*" cellpadding="4" cellspacing="0" border="0" style="border: 1px solid #000000;"> \
			<tbody> \
				<tr> \
					<td colspan="3" class="contentModuleHeaderAlt" style="border-bottom: 1px solid #000000;"><strong>Preset Font</strong></td> \
				</tr> \
				<tr> \
					<td><span style="font-size:11px;"> \
						Save as many fonts as you want! I really dont know the limit!<br>Saves avatar, neoTitle, neoHTML, and neoSignature.<br><br> \
						<strong style="font-size:11px;">Choose from your preset fonts:</strong> \
						<select id="activeFont"> \
							<option value="none">No change</option> \
						</select>                               \
						<button type="button" id="selectButton">select</button> \
						<button id="deleteButton">delete</button> \
						<button id="saveButton">save new</button> \
					</span></td> \
				</tr> \
			</tbody> \
		</table><br><br>\
    ');
    $( '#selectButton' ).on( 'click', function( e ) {
        // get value of drop down
        // apply associated preset
        selectPS();
    });
    $( '#deleteButton' ).on( 'click', function( e ) {
        // get value of drop down
        // clear associated preset
        deletePS();
    });
    $( '#saveButton' ).on( 'click', function( e ) {
        // prompt for name
        // save preset with JSON
        saveNewPS();
    });
    var options = '';
    for (var i=0; i<offset; i += 6) options += '<option value='+i+'>'+presets[i]+'</option>';
    $('#activeFont').append(options);
}

// button functions
var selected, newName;
function selectPS() {
    selected = $( "#activeFont option:selected" ).val();
    selected++;
    document.images.avatar.src = 'http://images.neopets.com/neoboards/avatars/' + presets[selected] + '.gif';
    $( "select[name='activeAv'] option:selected" ).val(presets[selected++]);
    $( "select[name='neoTitle'] option:selected" ).val(presets[selected++]);
    $( "select[name='neoTitle'] option:selected" ).text(presets[selected++]);
    $( "input[name='neoHTML']" ).val(presets[selected++]);
    $( "input[name='neoSig']" ).val(presets[selected]);
}
function deletePS() {
    selected = $( "#activeFont option:selected" ).val();
    presets.splice(selected, 6);
    localStorage.setItem("presets", JSON.stringify(presets));
    GM_setValue("offset", offset-6);
}
function saveNewPS() {
    newName = prompt("New preset name?");
    if (newName) { // if they actually entered a name, store the font
        presets[0 + offset] = newName;
        presets[1 + offset] = $( "select[name='activeAv'] option:selected" ).val();
        presets[2 + offset] = $( "select[name='neoTitle'] option:selected" ).val();
        presets[3 + offset] = $( "select[name='neoTitle'] option:selected" ).text();
        presets[4 + offset] = $( "input[name='neoHTML']" ).val();
        presets[5 + offset] = $( "input[name='neoSig']" ).val();
        localStorage.setItem("presets", JSON.stringify(presets));
        GM_setValue("offset", offset+6);
    }
}
main();




