"use strict";

var $ = require('jquery');

$(document).ready(function() {
	$('.fab').on('click', function() {
		mfs.init(currentPercentage);
	});

	$('.slider').on('touchstart', function() {

	});

	$('.slider').on('touchend', function() {
		$('.material-fab-slider')
			.removeClass('animated')
			.addClass('animated-backwards');
		$('.progress-bar-empty')
			.css({
				width: '0%'
			})
	});
});

var dragging = false, originalX, currentPercentage;

$('.slider').on('touchstart', function(ev) {
	dragging = true;
	originalX = ev.originalEvent.touches[0].clientX;
	$('.material-fab-slider').addClass('dragging');
	$('.slider').addClass('active');
});

$('body').on('touchend', function() {
	if (dragging === true) {
		dragging = false;
		$('.material-fab-slider').removeClass('dragging');
		$('.slider').removeClass('active');
	}
});

$('body').on('touchmove', function(ev) {
	if (!dragging) {
		return;
	}

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
});



var mfs = {};

mfs.init = function(initialPercentage) {
	initialPercentage = initialPercentage || 50;

	$('.material-fab-slider')
		.removeClass('animated-backwards')
		.addClass('animated');

	mfs.set(initialPercentage);
};

mfs.set = function(percentage, done) {
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