"use strict";

var $ = require('jquery');
var currentPercentage;

$(document).ready(function() {
	$('.fab').on('click', function() {
		mfs.show(currentPercentage);
	});
});

$('.slider').on('touchstart', function(ev) {
	$('.material-fab-slider').addClass('dragging');
	$('.slider').addClass('active');
	$('body').on('touchmove', onTouchMove);
});

$('body').on('touchend', function() {
	if ($('.material-fab-slider').hasClass('dragging')) {
		$('.material-fab-slider').removeClass('dragging');
		$('.slider').removeClass('active');
		$('body').off('touchmove', onTouchMove);
		mfs.hide();
	}
});

function onTouchMove(ev) {
	var percentage = 100 - (ev.originalEvent.touches[0].clientX - $('.progress-bar').offset().left - $('.handle').width() / 2) / $('.progress-bar').width() * 100;
	$('.progress-bar-empty')
		.css({
			width: percentage + '%'
		});

	$('.slider').css({
			left: $('.progress-bar-empty').offset().left - $('.slider').width() / 2
		});

	currentPercentage = percentage;

	$('.indicator').html(parseInt(percentage, 10));
}



var mfs = {};

mfs.show = function(percentage) {
	percentage = percentage || 50;

	$('.material-fab-slider')
		.removeClass('animated-backwards')
		.addClass('animated');

	$('.progress-bar-empty')
		.css({
			width: percentage + '%'
		})
		.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
			$('.slider').css({
				left: $('.progress-bar-empty').offset().left - $('.slider').width() / 2
			});

			if (typeof done === 'function') { done(); }
		});
};

mfs.hide = function() {
	$('.material-fab-slider')
		.removeClass('animated')
		.addClass('animated-backwards');
	$('.progress-bar-empty')
		.css({
			width: '0%'
		});
}