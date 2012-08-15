var SETTINGS = {
	"MAP" : {
		"MAX_X" : 3,
		"MAX_Y" : 3,
		"TILE_SIZE" : 32
	},
	"TILE_TYPE" : {
		"BACKGROUND" : "BACKGROUND",
		"SOLID" : true
	}
};
var MAP;


$(function(){
	initMap();
	var coordinate = "";
	var map_str = "";
	var value = "";
	$("div.row div.column div").live('click', function(){
		coordinate = ($(this).attr("id")).split(":");
		value = (prompt("Enter [image]:[layer]")).split(":");
		MAP[coordinate[0]][coordinate[1]].image = value[0];
		MAP[coordinate[0]][coordinate[1]].layer = value[1];
		redrawMap();
		
	});
	/*
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
	*/
    //renderMap(map, player);
    /*
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
	*/
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


function initMap(){
	MAP = Array(SETTINGS.MAP.MAX_Y);
	for( var i = 0 ; i < SETTINGS.MAP.MAX_Y ; i++ ){
        MAP[i] = Array(SETTINGS.MAP.MAX_X);
		for( var j = 0 ; j < SETTINGS.MAP.MAX_X ; j++ ){
			MAP[i][j] = {
				image	: "empty",
				layer 	: 0
				
			};
		}
    }
	
	redrawMap();
	$('#player_map').width(SETTINGS.MAP.TILE_SIZE * SETTINGS.MAP.MAX_X);
	$('#player_map').height(SETTINGS.MAP.TILE_SIZE * SETTINGS.MAP.MAX_Y);
	$('#player_map').css("margin", "0 auto");
}

function redrawMap(){
	var out = '';
	var prev_tile_0 = $("#tile_layer_0").attr('src');
	var prev_tile_1 = $("#tile_layer_1").attr('src');
	var prev_tile_2 = $("#tile_layer_2").attr('src');

    for( var i = 0 ; i < SETTINGS.MAP.MAX_Y ; i++ ){
        out += '<div class="row">';
        for( var j = 0 ; j < SETTINGS.MAP.MAX_X ; j++ ){
			prev_tile_0 = (prev_tile_0 == null) ? 'images/empty.png' : prev_tile_0;
			prev_tile_1 = (prev_tile_1 == null) ? 'images/empty.png' : prev_tile_1;
			prev_tile_2 = (prev_tile_2 == null) ? 'images/empty.png' : prev_tile_2;
			
            out += '<div class="column">' +
            "<div id="+i+":"+j+" class='" + 'empty' + "'>" + 
			"<img src='" + ((MAP[i][j].layer == 0) ? ('images/' + MAP[i][j].image + '.png') : prev_tile_0) + "' id='tile_layer_0' class='tile_container'></img>" + 
			"<img src='" + ((MAP[i][j].layer == 1) ? ('images/' + MAP[i][j].image + '.png') : prev_tile_1) + "' id='tile_layer_1' class='tile_container'></img>" + 
			"<img src='" + ((MAP[i][j].layer == 2) ? ('images/' + MAP[i][j].image + '.png') : prev_tile_2) + "' id='tile_layer_2' class='tile_container'></img>" + 
			"</div>" +
            '</div>';
        }
        out += '</div>';
    }
    $('#player_map').html(out);
	
}