$(function(){
	var KEY = {
		"w" : 87,
		"a" : 65,
		"s" : 83,
		"d" : 68
	}
	var SETTINGS = {
		"MAP" : {
			"MAX_X" : 3,
			"MAX_Y" : 3,
		}
	};
	var player = {
		x : 1,
		y : 1
	};
	
	var map = [SETTINGS.MAP.MAX_X][SETTINGS.MAP.MAX_Y];
	
    renderMap(map, player);
    
	$(document).keydown(function(event) {
		switch(event.keyCode){
			case KEY.w:
				if(--player.y < 0){
					player.y++;
				}else{
					renderMap(map, player);
				}
			break;
			case KEY.a:
				if(--player.x < 0){
					player.x++;
				}else{
					renderMap(map, player);
				}
			break;
			case KEY.s:
				if(++player.y >= SETTINGS.MAP.MAX_Y){
					player.y--;
				}else{
					renderMap(map, player);
				}
			break;
			case KEY.d:
				if(++player.x >= SETTINGS.MAP.MAX_X){
					player.x--;
				}else{
					renderMap(map, player);
				}
			break;
		}
	});


});


function renderMap(map, player){
    var out = '';
    for( var i = 0 ; i < 3 ; i++ ){
        out += '<div class="row">';
        for( var j = 0 ; j < 3 ; j++ ){
            out += '<div class="column">' +
            "<div class='" + 'empty' + "'><img src='images/"+((player.x == j && player.y == i) ? 'player': 'empty' )+ ".png'></img></div>" +
            '</div>';
        }
        out += '</div>';
    }
    $('#player_map').html(out);
}