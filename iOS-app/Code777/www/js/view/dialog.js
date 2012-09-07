/** @fileOverview <tt>Dialog</tt>.

    @author <a href='mailto:nxa1884@g.rit.edu'> Nithin Anand Gangadharan </a>
    @version 1.0
*/

function Dialog(_aQuestion){
	$('#dialog_alert_head').html(_aQuestion.player.playerName + " <i>answered</i>");
	$('#dialog_alert_message').html("\"" + _aQuestion.question.questionText + "\" <i>As</i> \"" + _aQuestion.answer + "\"");
	//$.mobile.changePage($('#dialog_alert'), 'pop', false, true);
	$('#link_dialog_alert').click();

	//alert using Simple Dialog plugin; facing problems in smallscreen
	/*var msg = _aQuestion.player.playerName + " <i>answered</i> \"" + _aQuestion.question.questionText + "\" <i>with</i> \"" + _aQuestion.answer + "\"";
	$("#next_button").simpledialog({
	    'mode' : 'bool',
	    'prompt' : msg,
	    'useModal': true,
	    'buttons' : {
	      'OK': {
	        click: function () {
	         // $('#dialogoutput').text('OK');
	        }
	      }
	    }
	  });*/
}
