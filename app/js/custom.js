/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Search
5. Init Gallery


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var map;
	var header = $('.header');
	var menu = $('.menu');
	var menuActive = false;

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	initMenu();
	initSearch();
	initGallery();

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.hamburger').length && $('.menu').length)
		{
			var hamb = $('.hamburger');

			hamb.on('click', function()
			{
				if(!menuActive)
				{
					openMenu();
				}
				else
				{
					closeMenu();
				}
			});
		}
	}

	function openMenu()
	{
		menu.addClass('active');
		menuActive = true;
	}

	function closeMenu()
	{
		menu.removeClass('active');
		menuActive = false;
	}

	/* 

	4. Init Search

	*/

	function initSearch()
	{
		if($('.search_dropdown').length)
		{
			var dds = $('.search_dropdown');
			dds.each(function()
			{
				var dd = $(this);
				if(dd.find('ul > li').length)
				{
					var ddItems = dd.find('ul > li');
					dd.on('click', function()
					{
						dd.toggleClass('active');
					});
					ddItems.each(function()
					{
						var ddItem = $(this);
						ddItem.on('click', function()
						{
							dd.find('span').text(ddItem.text());
						});
					});
				}	
			});
		}
	}

	/* 

	5. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_slider').length)
		{
			var gallerySlider = $('.gallery_slider');
			gallerySlider.owlCarousel(
			{
				items:1,
				autoplay:false,
				loop:true,
				nav:false,
				dots:false,
				smartSpeed:1200,
				margin:2,
				responsive:
				{
					0:
					{
						items:1
					},
					576:
					{
						items:1
					},
					768:
					{
						items:2
					},
					992:
					{
						items:2
					},
					1440:
					{
						items:2
					}
				}
			});
		}

		if($('.gallery_item').length)
		{
			$('.colorbox').colorbox(
			{
				rel:'colorbox',
				photo: true,
				maxWidth:'95%',
				maxHeight:'95%'
			});
		}
	}

});

$(function() {
  var href = window.location.href;
  $('.nav-item').each(function(e,i) {
    if (href.indexOf($(this).attr('href')) >= 0) {
			$('.nav-li').removeClass('active');
      $(this).closest('li').addClass('active');
    }
  });
});