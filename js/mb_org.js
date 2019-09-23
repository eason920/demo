//nglEq0nxEdg // galaxy
//CZoYuWA21SU // bird
const videoId = 'nglEq0nxEdg';
let yBoxCover;
let yBoxInner;
const youtube = function(videoId){
	// append script
	const tag = document.createElement('script');
	tag.src = "./js/youtube_iframe_api.js";
	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
	function onYouTubeIframeAPIReady() {
		yBoxCover = new YT.Player('y-box', {
			videoId,
			playerVars: {
				autoplay: 1,
				playsinline: 1,
				loop: 1,
				rel: 0,
				controls: 0,
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		yBoxInner = new YT.Player('y-box-inner', {
			videoId,
			playerVars: {
				autoplay: 1,
				playsinline: 1,
				loop: 1,
				rel: 0,
				controls: 0,
				mute: 1
			},
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		
	}
	function onPlayerReady(event) {
		// event.target.mute();
		event.target.playVideo();
	}
	function onPlayerStateChange(evt) {
		if (evt.data === YT.PlayerState.ENDED) {
			evt.target.playVideo();
		}
	}
	window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
}
$(function () {
	const popContent = '<div class="translation_Font">KK[ˈrɛrlɪ]  DJ[ˈrɛəli]<br>ad.<br>很少，難得<br>異乎尋常地，極度</div>';
	// v START
	let layoutType = layout
	const $videoCover = $('.video-cover');
	// const videoCoverHeight = Math.floor($videoCover.width() * 0.56);
	// const $yBoxCover = $('#y-box');// 使用了會導至失效，怪
	const $yStart = $('.y-start');
	const $ySmall = $('.y-small');

	const scaleUp = function(){
		$('#y-box').addClass('action');
		$yStart.fadeOut();
		$ySmall.fadeIn();
	}
	
	$yStart.click(function () {
		if( !$('#y-box').hasClass('is-not-play')){
			yBoxCover.playVideo();
			scaleUp();
		}else{
			youtube(videoId);
			$('#y-box').removeClass('is-not-play')
			setTimeout(function () {
				yBoxCover.playVideo();
				scaleUp();
			}, 700);			
		}
	});
	$ySmall.click(function () {
		yBoxCover.pauseVideo();
		$('#y-box').removeClass('action');
		$(this).fadeOut();
		$yStart.fadeIn();
	});

	$('.Read_More_btn').click(function () {
		// YOUTUBE FOR LAYOUT A
		if(layoutType == 'a'){
			$videoCover.css({display: 'none'});
			$('.video-bg').css({display: 'block', height: $(window).width() * 0.6});
			if( $('#y-box').hasClass('is-not-play') ){
				youtube(videoId);
				setTimeout(function(){
					yBoxInner.playVideo();
					// yBoxInner.mute(); not work
					// yBoxInner.setVolume(0); not work
					console.log('do mute');
					
					
				}, 700);
				setTimeout(function(){
					console.log('got delay');
					// API PROPERTY : not work
					// yBoxInner.mute();

					//	ALLOW : not work
					// const muteAttr = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; mute'
					// $('#y-box-inner').attr('allow', muteAttr);

					// volume="0" : not work
					// $('#y-box-inner').attr('volume', 0);

					// URL : not work
					// const muteUrl = $('#y-box-inner').attr('src') + '&mute=1&loop=1&playlist=' + videoId;
					// console.log(muteUrl);
					// $('#y-box-inner').attr('src', muteUrl);
				}, 1000);
			}else{
				yBoxCover.pauseVideo();
				yBoxInner.playVideo();
			}

			// play btn to control youtube play/pause
			$('.audio-left').click(function(){
				$(this).toggleClass('is-pause')
				if( $(this).hasClass('is-pause') ){
					yBoxInner.playVideo();
				}else{
					yBoxInner.pauseVideo();
				}
			});			
		}

		/// DONE
		$('.article_cover').addClass("Read_on");
		$('section').addClass("Read_on");
		$('.message_btn').addClass("show");
		$('.ad').addClass("show");
		// HEIGHT FOR ARTICLE TITLE
		let artHeight;
		if(layoutType== 'a'){
			artHeight = $('.is-title-a').outerHeight(true) + 95;
		}else{
			artHeight = $('.is-title-b').outerHeight(true) + 55;
		}
		$('.article_cover').css({height: artHeight});
		const scrollHeight = 'calc( 100% - ' + artHeight + 'px )';
		$('.scroller').css({height: scrollHeight});
	});
	$('.english span').click(function () {
		$(this).toggleClass("Drlinehight");
		$(this).siblings().removeClass('Drlinehight');
		$('.english span .translation_Font').remove();
		$(this).append(popContent);
		const left = $(this).offset().left;
		const top = $(this).offset().top;
		if (left <= 160) {
			$('.english span .translation_Font').addClass("lbox");
		} else {
			$('.english span .translation_Font').addClass("rbox");
		}
		if (top <= 410) {// Gress: a=390 / b=410
			$('.english span .translation_Font').addClass("tbox");
		} else {
			$('.english span .translation_Font').addClass("bbox");
		}
	});
	$('.share_btn').click(function () {
	  	$('#sharebox').addClass("showbox");
	});
	$('.close_share').click(function () {
		$('#sharebox').removeClass("showbox");
		$('.ad').addClass("show");
	});
	$('.close_join,.join_btn,.fb_btn').click(function () {
		$('#joinbox').removeClass("showbox");
		$('.ad').addClass("show");
	});
	$('.message_btn,.join_btn,.fb_btn').click(function () {
	// $('.join_btn,.fb_btn').click(function () {
		switch(true){
			case layoutType == 'a':
				$('.messagebox').addClass("show");
				break;
			case layoutType == 'b':
				$('#messagebg').addClass("showbox");
				break;
			default:
		}
	});
	$('.back_btn').click(function () {
		switch (true){
			case layoutType == 'a':
				$('.messagebox').removeClass("show");
				break;
			case layoutType == 'b':
				$('#messagebg').removeClass("showbox");
				break;
			default:
		}
	  	$('.ad').addClass("show");
	});
	const nua = navigator.userAgent;
	if (/iphone/i.test(nua)) {
		$('.Read_More_btn').on('click', function () {
			const $target = $('.scroller');
			switch (true){
				case layoutType == 'a':
					$target.css({ marginTop: '-5px' });
					break;
				case layoutType == 'b':
					$target.css({ marginTop: 25, paddingBottom: 38 });
					break;
				default:
			}
		});
	}

	$('#audioPlayer-a').click(function () {
		if($(this).attr('src')=='images/mb_a/play_btn.png'){
			$(this).attr('src','images/mb_a/pause_btn.png')
			$('.main').addClass('is-playing')
			pauseplay()
		}else{
			$(this).attr('src','images/mb_a/play_btn.png')
			$('.main').removeClass('is-playing')
			pausetime()
		}
	})

	$('#audioPlayer-b').click(function () {
		if($(this).attr('src')=='images/mb_b/play_btn.png'){
			$(this).attr('src','images/mb_b/pause_btn.png')
			$('.main').addClass('is-playing')
			pauseplay()
		}else{
			$(this).attr('src','images/mb_b/play_btn.png')
			$('.main').removeClass('is-playing')
			pausetime()
		}
	})

	// ====================================
	// == v SCROLL 'READ MORE'
	// ====================================
	let newTop;
	let oldTop;
	const $readMore = $('.read-more');
	$('.scroller').scroll(function(){
		oldTop = newTop;
		newTop = $(this).scrollTop();
		if( newTop > oldTop ){
			$readMore.removeClass('is-show');
		}else{
			$readMore.addClass('is-show');
		}
	});


	// ====================================
	// == v layoutType B .message_btn
	// ====================================
	if( layout == 'b'){
		$('.message_btn, .back_btn').click(function(){
			$('.scroller').toggleClass('is-lock')
		});
	}
 });