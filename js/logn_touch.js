$(function(){
	const write = function(text){
		$('ul').append(
			$('<li>').text(text)
		)
	};

	// -----------------------------------
	const demo1 = (function () {
		let timer = null;
		return {
			fn1: function(){
				clearTimeout(timer);
				timer = setTimeout(function(){
					write('click');
				}, 300);
			},
			fn2: function(){
				clearTimeout(timer);
				write('double click');
			},
			init: function(){
				$(function () {
					$('.btn1').click(demo1.fn1).dblclick(demo1.fn2);
				});
			}
		}
	})();
	demo1.init();

	// -----------------------------------
	const demo2 = function(event1, event2){
		$('.article span').on(event1, function(e){
			e.preventDefault();
			let time = null
			const $this = $(this);
			clearTimeout(time);
			
			$this.on(event2, function () {
				clearTimeout(time);
				write('click/touch event');
				$this.off('.up');
			})
			
			time = setTimeout(function(){
				write('long event');
				$this.off('.up');
			}, 400);
		});
	};
	const nua = navigator.userAgent;
	console.log(nua);
	
	if( /android|iphone|ipad/i.test(nua) ){
		write('is mobi');
		demo2('touchstart', 'touchend.up');
	}else{
		write('is pc');
		demo2('mousedown', 'mouseup.up');
	}

});