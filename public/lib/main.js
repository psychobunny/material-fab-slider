"use strict";

var $ = require('jquery');

$(document).ready(function() {
	setTimeout(function() {
		$('body').addClass('animated');
		mfs.init(50);
	}, 500);
});


var mfs = {};

mfs.init = function(initialPercentage) {
	initialPercentage = initialPercentage || 50;

	setTimeout(function() {
		mfs.set(initialPercentage);
	}, 500);
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
		});
};