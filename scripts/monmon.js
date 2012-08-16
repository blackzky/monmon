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
	$('#tile_options').hide();
	var coordinate = "";
	var image = "";
	var layer = 0 ;
	var map_x = 0;
	var map_y = 0;
	$("div.row div.column div").live('click', function(){
		$('#tile_options').show();
		coordinate = ($(this).attr("id")).split(":");
		map_x = coordinate[0];
		map_y = coordinate[1];
		$('#tile_options #tile_info').text('Tile options for [X:' + map_x + '][Y:' + map_y + ']');
		$("#tile_options #tile_image").focus();
	});
	
	$("#set_tile_btn").live('click', function(){
		image = $("#tile_options #tile_image").val();
		layer = $("#tile_options #tile_layer").val() * 1;
		setTile(MAP[map_x][map_y], image, layer);
		$('#tile_options').hide();
		redrawMap();
	});
	
	$("#cancel_set_tile_btn").live('click', function(){
		$('#tile_options').hide();
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
				tile_layer_0	: "empty",
				tile_layer_1	: "empty",
				tile_layer_2	: "empty"
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

    for( var i = 0 ; i < SETTINGS.MAP.MAX_Y ; i++ ){
        out += '<div class="row">';
        for( var j = 0 ; j < SETTINGS.MAP.MAX_X ; j++ ){
            out += '<div class="column">' +
            "<div id="+i+":"+j+" class='" + 'empty' + "'>" + 
			"<img src='images/" + MAP[i][j].tile_layer_0 + ".png' id='tile_layer_0' class='tile_container'></img>" + 
			"<img src='images/" + MAP[i][j].tile_layer_1 + ".png' id='tile_layer_1' class='tile_container'></img>" + 
			"<img src='images/" + MAP[i][j].tile_layer_2 + ".png' id='tile_layer_2' class='tile_container'></img>" + 
			"</div>" +
            '</div>';
        }
        out += '</div>';
    }
    $('#player_map').html(out);
}

function setTile(map, image, layer){
	switch(layer){
			case 0:	map.tile_layer_0 = image;	break;
			case 1:	map.tile_layer_1 = image;	break;
			case 2:	map.tile_layer_2 = image;	break;
		}
}