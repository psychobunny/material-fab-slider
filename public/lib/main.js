"use strict";

var $ = require('jquery');
var currentPercentage;
var mfs = {};

mfs.show = function(percentage, done) {
	if ($('.material-fab-slider').hasClass('animating')) {
		return;
	}

	percentage = typeof percentage !== 'undefined' ? percentage : 50;

	$('.material-fab-slider')
		.removeClass('animated-backwards')
		.addClass('animated open animating');

	setTimeout(function() {		
		$('.progress-bar-empty')
			.css({
				width: (100 - percentage) + '%'
			})
			.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
				$('.slider').css({
					left: $('.progress-bar-empty').offset().left - $('.slider').width() / 2
				});

				$('.material-fab-slider').removeClass('animating');

				if (typeof done === 'function') { done(); }
			});
	}, 100)
};

mfs.hide = function() {
	if ($('.material-fab-slider').hasClass('animating')) {
		return;
	}

	$('.material-fab-slider')
		.removeClass('animated')
		.addClass('animated-backwards animating')
		.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
			$(this).removeClass('open animating');
		});
	$('.progress-bar-empty')
		.css({
			width: '0%'
		});
};

$(document).ready(function() {
	$('.fab').on('click', function() {
		mfs.show(currentPercentage);
	});
});

$('.slider').on('touchstart mousedown', function(ev) {
	$('.material-fab-slider').addClass('dragging');
	$('.slider').addClass('active');
	$(window).on('touchmove mousemove', onTouchMove);
});

$(window).on('touchend mouseup', function() {
	if ($('.material-fab-slider').hasClass('dragging')) {
		$('.material-fab-slider').removeClass('dragging');
		$('.slider').removeClass('active');
		$(window).off('touchmove mousemove', onTouchMove);
		mfs.hide();
	}
});

function onTouchMove(ev) {
	var x = ev.originalEvent.touches ? ev.originalEvent.touches[0].clientX : ev.originalEvent.clientX,
		percentage = (x - $('.progress-bar').offset().left - $('.handle').width() / 2) / $('.progress-bar').width() * 100,
		width;

	if (percentage < 0) {
		percentage = 0;
	}

	width = 100 - percentage;

	$('.progress-bar-empty')
		.css({
			width: width + '%'
		});

	$('.slider').css({
			left: $('.progress-bar-empty').offset().left - $('.slider').width() / 2
		});

	currentPercentage = percentage;
}