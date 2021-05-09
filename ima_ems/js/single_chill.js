const labels= ['5/1','5/2','5/3','5/4','5/5','5/6','5/7'];

// const color_nor = '#102c40';
const color_nor= 'rgba(16,44,64,.92)'
// const color_err = '#5f363e';
const color_err = 'rgba(147,26,49,.92)';

const bg_nor = [
	color_nor,
	color_nor,
	color_nor,
	color_nor,
	color_nor,
	color_nor,
	color_nor
];
const data_nor = [600, 570, 600, 550, 600, 300, 40]
const bg_err = [
	color_err,
	color_err,
	color_err,
	color_err,
	color_err,
	color_err,
	color_err
];
const data_err = [10,30,5,50,2,30,5]

const nua = navigator.userAgent;

const fnCanvas = function(id, labels, data, backgroundColor ){
	const ctx = document.getElementById(id).getContext('2d');
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels,
			datasets: [{
				data,
				backgroundColor,
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}],
				xAxes: [{
					gridLines: {
						display: false // 橫軸 hide
					}
				}]
			}
		}
	});
};

// ----------------------------
// NAV COLOR ITEM v
// ----------------------------
const buHtmStatusItem = function(data){
	let html = '';
	data.forEach(function(item){
		html += '<div class="status-item" data-status="' + item.value + '">';
		html += '<div class="status-color" style="background-color:' + item.color + '"></div>';
		html += '<div class="status-txt">' + item.name + '</div>';
		html += '</div>'
	});
	$('.status-chill').html(html);
}

let colorObj;
let total='';

$(()=>{
	// ----------------------------
	// NAV STATUS ITEM v
	// ----------------------------
	$.ajax({
		type: 'GET',
		url: './data/chill_color.json',
		dataType: 'json',
		success: function(res){
			buHtmStatusItem(res.chiller);
			colorObj = res;

			// ----------------------------
			// BUILD v
			// ----------------------------
			$.ajax({
				type: 'GET',
				url: './data/chill.json',
				dataType: 'json',
				success: function(res){
					console.log('bu res ', res);
					$('#location span').text(res.build);
					$('.rbox-psyitem.is-dry span').text(res.psy.dry);
					$('.rbox-psyitem.is-wet span').text(res.psy.wet);
					//
					let html = '';
					html += '<div class="build-row">';
					html += '<div class="build-floor"></div>';
					html += '<div class="build-house">';
					res.house.show.forEach(function(item, i){
						html += '<div class="build-item" title=門牌"' + res.house.number[i] + '">';
						html += item;
						html += '</div>';// .build-item
					});
					html += '</div>'// .build-house
					html += '</div>'// .build-row
					for( f in res.status ){
						let wf = f;
						if( /f/i.test(f) ){ wf= wf.replace('f', '') }
						html += '<div class="build-row">';
						html += '<div class="build-floor">' + wf + '</div>';
						html += '<div class="build-house">';
						res.status[f].forEach(function(v){
							let code = '';
							colorObj.chiller.forEach(function(jtem, j){
								if( jtem.value == v ){
									code = jtem.color
								}
							});
							html += '<div class="build-item "';
							html += 'data-status="' + v + '" ';
							html += 'style="background-color:' + code + '">';
							html += '</div>';// .build-item
							total ++;
						});
						html += '</div>'// .build-house
						html += '</div>'// .build-row
					}
					$('#build').html(html);
					$('.is-chill-total').text(total)
				}
			});
		}
	});

	// ----------------------------
	// CHART v
	// ----------------------------
	fnCanvas('cv-1', labels, data_nor, bg_nor);
	fnCanvas('cv-2', labels, data_err, bg_err);

	Chart.plugins.register({
		afterDatasetsDraw: function(chartInstance, easing) {
			// To only draw at the end of animation, check for easing === 1
			var ctx = chartInstance.chart.ctx;
			// console.log(chartInstance.chart);
			chartInstance.data.datasets.forEach(function(dataset, i) {
				var meta = chartInstance.getDatasetMeta(i);
				if (!meta.hidden ) {
					meta.data.forEach(function(element, index) {
						// console.log(element._chart);
						// Draw the text in black, with the specified font
						// nor > err
						const area = meta.data[index]._chart.config.data.datasets[0].backgroundColor[0] == color_nor ? 40 : 4
						// less > more
						let padding = 5;
						let color = '#000';
						if( dataset.data[index].toString() > area ){
							padding = -20;
							color = '#fff';
						}
						// const padding =  ? -20 : 5;
						ctx.fillStyle = color;
						var fontSize = 13;
						var fontStyle = 'normal';
						var fontFamily = 'Helvetica Neue';
						ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
						// Just naively convert to string for now
						var dataString = dataset.data[index].toString();
						// Make sure alignment settings are correct
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						var position = element.tooltipPosition();
						// if( dataset.data[index].toString() != 0 ){
							
							ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
						// }
					});
				}
			});
		}
	});

	// ----------------------------
	// LB v
	// ----------------------------
	let bottom = 0;
	if( !/iphone | ipad | android/i.test(nua) ){
		bottom = $('#lb-content').outerHeight(true) * -1;
		$('#lb').css({bottom});
	}

	const part = function(){
		if( /iphone | ipad | android/i.test(nua) ){
			$('#lb, #lb-masker').hide();
		}else{
			const status = $('#lb').attr('data-status');
			if( status == 0 ){
				$('#lb').attr('data-status', 1).removeAttr('style');
			}else{
				$('#lb').attr('data-status', 0);
				$('#lb').css({bottom});
			}
		};
	}
	$('#lb-cbox, .rbox-error-btn').click(function(){ part() });
	$('#build').on('click', '.build-item', function(){ part() });

	$('.build-house').click(function(){
		if( /iphone | ipad | android/i.test(nua) ){
			$('#lb, #lb-masker').hide();
		}else{
			$('#lb').attr('data-status', 1).removeAttr('style');
		}
	});

	// ----------------------------
	// HAMBER v
	// ----------------------------
	if( /iphone | ipad | android/i.test(nua) ){
		$('#hamber').click(function(){
			$(this).toggleClass('is-open');
			$('#mbbox, #nav-masker').toggle();
		});
	}
})