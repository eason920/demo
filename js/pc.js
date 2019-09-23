//nglEq0nxEdg // galaxy
//CZoYuWA21SU // bird
const videoId = 'nglEq0nxEdg';
let player;
const youtube = function (videoId) {
	// append script
	const tag = document.createElement('script');
	tag.src = "./js/youtube_iframe_api.js";
	const firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	function onYouTubeIframeAPIReady() {
		player = new YT.Player('y-box', {
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

const scaleUp = function(){
	$('#y-box').addClass('action');
	$('.y-start').fadeOut();
	$('.y-small').fadeIn();
}


$(function () {
	$('.y-start').click(function(){
		if( !$('#y-box').hasClass('is-first-start') ){
			player.playVideo();
			scaleUp();
		}else{
			youtube(videoId);
			$('#y-box').removeClass('is-first-start');
			setTimeout(function(){
				scaleUp();
			},700);	
		}
		// talk
		if( $(".play_btn").hasClass("pause") ) {
			$(".play_btn").removeClass('pause');
			pausetime()
		}
	});
	$('.y-small').click(function () {
		player.pauseVideo();
		$('#y-box').removeClass('action');
		$(this).fadeOut();
		$('.y-start').fadeIn();
	});
	// $('.y-big').click(function () {
	// 	player.playVideo();
	// 	$('#y-box').addClass('action');
	// 	$(this).hide();
	// 	$('.y-small').show();
	// 	// talk
	// 	if ($(".play_btn").hasClass("pause") == true) {
	// 		$(".play_btn").removeClass('pause');
	// 		pausetime()
	// 	}
	// });
	// youtube end
	$('.english span').click(function () {
		$('#translation_Font').addClass("show");

		var left = $(this).position().left;
		var top = $(this).position().top;
		var box_l = left + 450;
		var box_r = left + 350;
		var box_t = top + 120;
		var total = $('.mask').width() / 2;

		if (left <= total) {
			$('#translation_Font').css({ top: box_t, left: box_l });
		} else {
			$('#translation_Font').css({ top: box_t, left: box_r });
		}
	});
	$('#translation_Font .close_btn').click(function () {
		$('#translation_Font').removeClass("show");
	});
	// 講解 <--> 朗讀
	const $control = $('#control-1');
	const $explain = $('.article2');
	const $readOnly = $('.article');
	$('#control-1 .toggle').click(function () {
		$control.toggleClass("active");
		if($control.attr('data-value')=='0'){
			$control.attr('data-value','1');
			$explain.show()
			$readOnly.hide();
		}else{
			$control.attr('data-value','0');
			$readOnly.show();
			$explain.hide();			
		}
			//console.log($('#control-1').attr('data-value'))
	})
	$('#control-1 b').click(function(){
		$control.addClass("active");
		$control.attr('data-value', '1');
		$explain.show();
		$readOnly.hide();
	});
	$('#control-1 i').click(function(){
		$control.removeClass("active");
		$control.attr('data-value', '0');
		$readOnly.show();
		$explain.hide();
	});
	// 英 <--> 中英
	// $('#control-2 .toggle').click(function () {
	// 	$('#control-2').toggleClass("active");
	// 	$('.Chinese').toggleClass("show");
	// })
	$('.play_btn').click(function () {
		$('.speed').toggleClass("show");
		$('.play_btn').toggleClass("pause");
		pauseplay()
		if($(".play_btn").hasClass("pause")==false){
			pausetime()
		}
		// youtube
		player.pauseVideo();
		$('#y-box').removeClass('action');
		$('.y-small').fadeOut();
		$('.y-start').fadeIn();
	})
	$('.play_btn').hover(function(){
		if($(".play_btn").hasClass("pause"))
			$('.speed').addClass('show');
	})

	$('.speed').hover(function(){},function(){
		$('.speed').removeClass('show');
	})

	$('.share_btn').click(function () {
		$('.share').toggleClass("show");
	})
	$('.word_btn').click(function () {
		$('section').toggleClass("move");
		$('.tranglationBody').toggleClass("show");
	})
	$('.tranglationBody .close_btn').click(function () {
		$('section').removeClass('move');
		$('.tranglationBody').removeClass("show");
	})
	const $cfc = $('.classification')
	$('.classification_btn').hover(function () {
		$cfc.toggleClass('show');
	})

	const cfcIndex = $cfc.find('.activity').index()
	// console.log('cfc idx is :',cfcIndex);
	
	$cfc.addClass('eq'+cfcIndex);

	$('.message_btn').click(function () {
		$(".mask").stop().animate({ 'scrollTop': $("#message").offset().top - 70 }, 1000, 'swing');
	})
	if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
		$('.speed').addClass("formac");
	}
	const nua = navigator.userAgent;
	if (/macintosh/i.test(nua)) {
		if (/chrome/i.test(nua)) {
			// $('header nav .speed').css({ right: 722 })
		} else {
			// $('header nav .speed').css({ right: 728 })
		}
	}
	
	// ====================================
	// == v SCROLL 'READ MORE'
	// ====================================
	let newTop;
	let oldTop;
	const $readMore = $('.read-more');
	$('.mask').scroll(function(){
		oldTop = newTop;
		newTop = $(this).scrollTop();
		if( newTop > oldTop ){
			$readMore.removeClass('is-show');
		}else{
			$readMore.addClass('is-show');
		}
	});

	// ====================================
	// == NAV BAR FULL WIDTH
	// ====================================
	$(window).on('load resize', function(){
		// SETTING
		const $target = $('header > nav > ul');
		const asideWidth =$('.article_mask aside').innerWidth();
		// ARTICLE MASK WIDTH / PADDING
		const maskInnerWidth = $('article .mask').innerWidth();
		const maskWidth = $('article .mask').width();
		const singleMask = Math.floor( (maskInnerWidth - maskWidth) / 2 );
		// ARTICLE WIDTH / PADDING
		const articleInnerWidth = $('article').innerWidth();
		const articleWidth = $('article').width();
		const singleArticle = Math.floor( (articleInnerWidth - articleWidth) / 2 );
		// PLUGIN VALUE
		const marginLeft = asideWidth + singleArticle + singleMask;

		// ====================================
		// == NAVBG ( at right of navbar )
		// ====================================
		
		
		// ====================================
		// == DROPDOWN
		// ====================================
		const shareLeft = function(){
			const ww = $(window).width();
			const rGuter = ( ww - 1770 ) / 2;
			const left =  Math.floor($('header li .share_btn').offset().left );
			if( ww >= 1770){
				$('nav > div.share').css({left: left - rGuter });
				// $('.navbg').css({width: rGuter});
			}else{
				$('nav > div.share').css({left})	
			}
		}
		shareLeft();// on load
		$(window).on('resize', function(){
			shareLeft();
		});
	})
});
