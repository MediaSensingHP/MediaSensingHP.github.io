function initialize() {
	var latlng = new google.maps.LatLng(34.980,135.9615293,17);
	var myOptions = {
		zoom: 17, /*拡大比率*/
		center: latlng, /*表示枠内の中心点*/
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		zoomControl: false,
	};

	var map = new google.maps.Map(document.getElementById('info-map-img'), myOptions);

	/*取得スタイルの貼り付け*/
	var styleOptions = [
		{
		    "elementType": "labels",
		    "stylers": [
				{ "visibility": "off" }
		    ]
		}
	];
	var iconPosition = new google.maps.LatLng(34.9794, 135.9647);
	new google.maps.Marker({
	  position: iconPosition,
	  map: map,
	  icon: "icon.png"
	});
	var styledMapOptions = { name: 'Lab.' }
	var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
	map.mapTypes.set('sample', sampleType);
	map.setMapTypeId('sample');
}

var OpenPopup = {
	Click: function(){
		if (this.statu) {
			$("#popup").animate({
				right: "-350px"
			}, 700);
			$("#menu-btn").animate({
				opacity: "1"
			}, 700);
			$("#menu-btnclose").animate({
				opacity: "0"
			}, 700);
			this.statu = false;
		}else{
			$("#popup").animate({
				right: "0px"
			}, 700);
			$("#menu-btn").animate({
				opacity: "0"
			}, 700);
			$("#menu-btnclose").animate({
				opacity: "1"
			}, 700);
			this.statu = true;
		}
	},
	statu: false,
}

$("#menu-btn").click(function(){
	OpenPopup.Click();
});

$("#menu-btnclose").click(function(){
	OpenPopup.Click();
});

