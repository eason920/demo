$(function(){
	// =========================================
	// == SHARE ICON
	// =========================================
	const url = location.href;
	// LINE
	$('.share-line').click(function (e) {
		e.preventDefault();
		const href = 'https://social-plugins.line.me/lineit/share?openExternalBrowser=1&url=https://funday.asia/sample/learning/';
		window.open( href, 'social', config = 'width= 500, height= 700');
	});	

	// FB
	$('.share-fb').click(function (e) {
		e.preventDefault();
		const href = 'http://www.facebook.com/sharer.php?u=' + url;
		window.open(href, 'social', config = 'width=500, height=700');
	});

	// =========================================
	// == IOS COPY PLUGIN
	// =========================================
	window.Clipboard = (function (window, document, navigator) {
		let textArea,
			copy;

		function isOS() {
			return navigator.userAgent.match(/ipad|iphone/i);
		}

		function createTextArea(text) {
			textArea = document.createElement('textArea');
			textArea.value = text;
			document.body.appendChild(textArea);
		}

		function selectText() {
			let range,
				selection;

			if (isOS()) {
				range = document.createRange();
				range.selectNodeContents(textArea);
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange(range);
				textArea.setSelectionRange(0, 999999);
			} else {
				textArea.select();
			}
		}

		function copyToClipboard() {
			document.execCommand("Copy");
			document.body.removeChild(textArea);
		}

		copy = function (text) {
			createTextArea(text);
			selectText();
			copyToClipboard();
		};

		return {
			copy
		};
	})(window, document, navigator);


	// =========================================
	// == COPY
	// =========================================
	const copied = function(){
		$copied = $('.copied');
		$copied.css({display: 'block'});
		setTimeout(function(){
			$copied.removeAttr('style');
		}, 2100);
	}


	const $copyBtn = $('.copy-btn')
	const $copySource = $('.copy-source');
	$copySource.attr('value', location.href);
	$copyBtn.click(function (e) {
		e.preventDefault();
		if( navigator.userAgent.match(/ipad|iphone/i) ){
			console.log('is ios');
			
			const value = $(".mgm-sharelink").val();
			window.Clipboard.copy(value);
			copied();
		}else{
			console.log('is android')
			const source = $copySource;
			source.select();
			document.execCommand('Copy');
			copied();
		}
	});
})