/*global Audio */
// var scenes;
// var currentScenePos = 0;
// var playing = true;
// var playerBG;
// var isMuted = false;

// tvStatic = new Audio('./media/static.ogg'); 
// tvStatic.volume = 0.2;

// if (typeof tvStatic.loop == 'boolean') {
//     tvStatic.loop = true;
// } else {
//     tvStatic.addEventListener('ended', function() {
//         this.currentTime = 0;
//         this.play();
//     }, false);
// }
// tvStatic.play();

$(document).ready(function(){
	// getScenes();
})

// function getScenes(){
// 	$.get('http://165.225.129.212/theLatest', function(data){
// 		scenes = data;
// 	}).done(function(){
// 		shuffle(scenes);
// 		createPlayer();
// 	});
// }

/*----controls------*/
// function playBtn() {
// 	if (playing == false) {
// 		playerBG.playVideo();
// 		$('.play').addClass('pause');
// 		playing = true;
// 	} else if (playing == true){
// 		playerBG.pauseVideo();
// 		$('.play').removeClass('pause');
// 		playing = false;
// 	}
// }

// /*----------------- YOUTUBE ------------*/
// function createPlayer() {
// 	playerBG = new YT.Player('videoContainer', {
// 		height: '125%',
// 		width: '125%',
// 		playerVars: {
// 			'autoplay': 1,
//             'controls': 0,
//             'rel': 0,
//             'autohide':1,
//             'showinfo': 0,
//             'modestbranding': 1,
//             'playsinline': 1,
//             'enablejsapi': 1,
//             'wmode':'opaque',
//             // 'origin': 'http://tv.galoremag.com',
//             'loop': 1
// 		},
// 		videoId: '',
// 		events: {
// 			'onReady': onPlayerReady,
// 			'onStateChange': onPlayerStateChange
// 		}
// 	});
// }

// function onPlayerReady(event) {
// 	loadYt(scenes[0].url)
// 	if (playerBG.getDuration() < 1){
//         skipScene();
//    	} else {
//     	event.target.playVideo();

//     }

//     // SOUNDCHECK
// 	if (playerBG.isMuted(true)) {
// 		$('#mute').removeClass('lit') && playerBG.unMute();
// 	}
// }

// function onPlayerStateChange(event) {
// 	if (event.data == 0){
// 		skipScene();
// 	}
// 	if (event.data == YT.PlayerState.PLAYING) {
// 		tvStatic.pause();
// 		$('#videoHero').css({'opacity' : '1'});
// 	}
// }

// function loadYt(sceneId){
//     window.currentSceneId = sceneId;
// 	playerBG.loadVideoById(sceneId);
// }

// function skipScene(){
// 	tvStatic.play();
// 	$('#videoHero').css({'opacity' : '0'});
// 	if (currentScenePos < (scenes.length - 1)){
// 		currentScenePos ++
// 		loadYt (scenes[currentScenePos].url)
// 	} else {
// 		currentScenePos = 0;
// 		loadYt (scenes[currentScenePos].url)
// 	}
// }

// function muteToggle() {
// 	if (isMuted) {
//         tvStatic.volume = 0.2;
// 		$('#mute').removeClass('lit')
//         if (playerBG && playerBG.unMute) {
//             playerBG.unMute();
//         }
//         isMuted = false;
// 	} else {
//         tvStatic.volume = 0;
// 		$('#mute').addClass('lit');
//         if (playerBG && playerBG.mute) {
//             playerBG.mute();
//         }
//         isMuted = true;
// 	}
// }

// function loader(){
// 	$('.title').hide();
// 	$('.loader').show();
//     $('.loaderBg').animate({'top':'1px'}, 2000);
// 	setTimeout(function(){
// 	    $('.loader').hide();
// 	    $('.title').show();
// 	    $('.loaderBg').animate({'top':'100px'}, 100);
//     },1500);
// }

// function shuffle(array) {
//   var currentIndex = array.length,
//       temporaryValue,
//       randomIndex;

//   while (0 !== currentIndex) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   return array;
// }

// function fullScreen(){
//     if(document.documentElement.requestFullscreen) {
//       document.documentElement.requestFullscreen();
//     } else if(document.documentElement.mozRequestFullScreen) {
//       document.documentElement.mozRequestFullScreen();
//     } else if(document.documentElement.webkitRequestFullscreen) {
//       document.documentElement.webkitRequestFullscreen();
//     } else if(document.documentElement.msRequestFullscreen) {
//       document.documentElement.msRequestFullscreen();
//     }
// }