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
	$('.touch').on('touchstart', function(){
		console.log('got');
		
	});
	
	// $('.article span').on('mousedown', function(){
	// 	let time = null
	// 	const $this = $(this);
	// 	// write('b2 mouse down');
	// 	clearTimeout(time);
		
	// 	$this.on('mouseup.up', function () {
	// 		clearTimeout(time);
	// 		write('b2 not long enough = one click');
	// 		$this.off('.up');
	// 	})

	// 	time = setTimeout(function(){
	// 		write('b2 long touch / mouseover');
	// 		$this.off('.up');
	// 	}, 400);
	// });
	
	// -----------------------------------
	$('.article span').on('touchstart', function(e){
		e.preventDefault();
		let time = null
		const $this = $(this);
		// write('b2 mouse down');
		clearTimeout(time);
		
		$this.on('touchend.up', function () {
			clearTimeout(time);
			write('b2 not long enough = one click');
			$this.off('.up');
		})

		time = setTimeout(function(){
			write('b2 long touch / mouseover');
			$this.off('.up');
		}, 400);
	});

	// -----------------------------------
	// const demo2 = (function(){
	// 	let time = null;
	// 	return {
	// 		fn1: function(){
	// 			const $this = $(this);
	// 			clearTimeout(time2);
	// 			write('b2 not long enough = one click');
	// 			$this.off('.up');
	// 			time = setTimeout(function () {
	// 				write('b2 long touch / mouseover');
	// 				$this.off('.up');
	// 			}, 400);	
	// 		},
	// 		init: function(){
	// 			$(function(){
	// 				$('.article span').on('mousedown', function(){demo2.fn1});
	// 			});
	// 		}
	// 	}
	// })();
	// demo2.init();
});