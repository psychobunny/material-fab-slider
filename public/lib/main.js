"use strict";

var $ = require('jquery');

$(document).ready(function() {
	$('.fab').on('click', function() {
		mfs.init();
	});
});


var mfs = {};

mfs.init = function(initialPercentage) {
	initialPercentage = initialPercentage || 50;

	$('.material-fab-slider').addClass('animated');
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

			if (typeof done === 'function') { done(); }
		});
};