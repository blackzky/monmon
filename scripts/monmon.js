/*
[row][col]
----------------
[[row]:[col],[row]:[col]]
[[row]:[col],[row]:[col]]

*/

var SETTINGS = {
	"MAP" : {
		"MAX_COL" : 3,
		"MAX_ROW" : 3,
		"TILE_SIZE" : 32
	},
	"TILE_TYPE" : {
		"BACKGROUND" : "BACKGROUND",
		"SOLID" : true
	},
	"TILES" : [
		'empty',
		'grass',
		'rock',
		'player'
	],
	"LAYERS" : [0, 1, 2],
	"LAYER_NAME" : ['Background', 'Middle', 'Foreground']
};

var TILE = {
	COORDINATES : '',
	ROW : 0,
	COL : 0,
	IMAGE : '',
	LAYER : 0
}

var MAP;

function loadTileImageOptions(){
	var html = "";
	for(index in SETTINGS.TILES){
		html += "<option value='" + SETTINGS.TILES[index] + "'>" + SETTINGS.TILES[index] + "</option>";
	}
	$("#tile_options #tile_tile").html(html);
}
function loadTileLayerOptions(){
	var html = "";
	for(index in SETTINGS.LAYERS){
		html += "<option value='" + SETTINGS.LAYERS[index] + "'>" + SETTINGS.LAYER_NAME[index] + "</option>";
	}
	$("#tile_options #tile_layer").html(html);
}

function tileClicked(tile_coordinates){
	loadTileImageOptions();
	loadTileLayerOptions();
	TILE.COORDINATES = tile_coordinates.split(":");
	TILE.ROW = TILE.COORDINATES[0];
	TILE.COL = TILE.COORDINATES[1];
	$('#tile_options').show();
	$('#tile_options #tile_info').text('Tile options for [ ROW:' + TILE.ROW + ' ][ COL:' + TILE.COL + ' ]');
	$("#tile_options #tile_tile").focus();
}
function setTileClicked(){
	TILE.IMAGE = $("#tile_options #tile_tile").val();
	TILE.LAYER = $("#tile_options #tile_layer").val() * 1;
	setTile(MAP[TILE.ROW][TILE.COL], TILE.IMAGE, TILE.LAYER);
	$("#tile_options #tile_tile").val('');
	$("#tile_options #tile_layer").val('');
	$('#tile_options').hide();
	redrawMap();
}

function exportMap(){
	var map_str = "";
	$("#map_options #map_data").val('');
	for(map_row in MAP){
		for(tile_col in MAP[map_row]){
			map_str += "0:" + MAP[map_row][tile_col].tile_layer_0 + ",";
			map_str += "1:" + MAP[map_row][tile_col].tile_layer_1 + ",";
			map_str += "2:" + MAP[map_row][tile_col].tile_layer_2 + "|";
		}
	}
	$("#map_options #map_data").val(map_str);
}
function importMap(){
	var row_str_line = ($("#map_options #map_data").val()).split('|');
	var col_str_line = "";
	var tile_str = "";
	var row_x = 0;
  
	var col_str = ($("#map_options #map_data").val()).split('|');
	var layer_str, data_str, row, col, image, layer;
	var b = 0;
	for(col_index in col_str){
		if(col_str[col_index] == '') break;
		layer_str = col_str[col_index].split(',');
		for(layer_index in layer_str){
			data_str = layer_str[layer_index].split(':');
			row = parseInt(col_index / 3);
			col = col_index % 3;
			layer = data_str[0] * 1;
			image = data_str[1];
			
			setTile(MAP[row][col], image, layer);
		}
	}
	redrawMap();
}

$(function(){
	initMap();
	$('#tile_options').hide();
	$("div.row div.column div").live('click', function(){
		tileClicked($(this).attr("id"));
	});
	
	$("#set_tile_btn").live('click', function(){
		setTileClicked();
	});
	
	$("#cancel_set_tile_btn").live('click', function(){
		$('#tile_options').hide();
	});
	
	$("#map_options #import_btn").click(function(){
		importMap();
	});
	
	$("#map_options #export_btn").click(function(){
		exportMap();
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
			"MAX_COL" : 3,
			"MAX_ROW" : 3,
		}
	};
	
	var player = {
		x : 1,
		y : 1
	};
	
	var map = [SETTINGS.MAP.MAX_COL][SETTINGS.MAP.MAX_ROW];
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
				if(++player.y >= SETTINGS.MAP.MAX_ROW){
					player.y--;
				}else{
					renderMap(map, player);
				}
			break;
			case KEY.d:
				if(++player.x >= SETTINGS.MAP.MAX_COL){
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
	MAP = Array(SETTINGS.MAP.MAX_ROW);
	for( var row = 0 ; row < SETTINGS.MAP.MAX_ROW ; row++ ){
        MAP[row] = Array(SETTINGS.MAP.MAX_COL);
		for( var col = 0 ; col < SETTINGS.MAP.MAX_COL ; col++ ){
			MAP[row][col] = {
				tile_layer_0	: "empty",
				tile_layer_1	: "empty",
				tile_layer_2	: "empty"
			};
		}
    }
	
	redrawMap();
	$('#player_map').width(SETTINGS.MAP.TILE_SIZE * SETTINGS.MAP.MAX_COL);
	$('#player_map').height(SETTINGS.MAP.TILE_SIZE * SETTINGS.MAP.MAX_ROW);
	$('#player_map').css("margin", "0 auto");
}

function redrawMap(){
	var out = '';

    for( var row = 0 ; row < SETTINGS.MAP.MAX_ROW ; row++ ){
        out += '<div class="row">';
        for( var col = 0 ; col < SETTINGS.MAP.MAX_COL ; col++ ){
            out += '<div class="column">' +
            "<div id="+row+":"+col+" class='" + 'empty' + "'>" + 
			"<img src='images/" + MAP[row][col].tile_layer_0 + ".png' id='tile_layer_0' class='tile_container'></img>" + 
			"<img src='images/" + MAP[row][col].tile_layer_1 + ".png' id='tile_layer_1' class='tile_container'></img>" + 
			"<img src='images/" + MAP[row][col].tile_layer_2 + ".png' id='tile_layer_2' class='tile_container'></img>" + 
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
