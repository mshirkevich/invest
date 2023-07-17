$(document).ready(function () {
	var rentArray = [11, 11.6, 12.1, 12.7, 13.4, 14.0, 14.7, 15.5, 16.3, 17.1];
	var coefArray = [0, 5, 5.25, 5.51, 5.79, 6.08, 6.38, 6.7, 7.04, 7.38];
	var checkPrevResultRent = 0,
		checkPrevPercentRent = 0;
	var checkPrevResultCoef = 0,
		checkPrevPercentCoef = 0;
	var checkRentValue = rentArray[0],
		checkCoefValue = coefArray[0];

	var investValue = 0;
	var sliderId = 1;
	//values
	var costActive = 300000,
		costCoef = 0,
		costRent = 0,
		prevCostCoef = 0,
		prevCostRent = 0;
	var rentPercent, coefPercent, sumCoef;
	$(".first-screen__socials")
		.mouseenter(function () {
			$(this).find(".bem-symbol").css("fill", "#fff");
		})
		.mouseleave(function () {
			$(this).find(".bem-symbol").css("fill", "#1F40E7");
		});

	var youtube = document.querySelectorAll(".youtube");
	// loop
	for (var i = 0; i < youtube.length; i++) {
		var list = youtube[i].dataset.src.split("/");
		var ember = list[list.length - 1];
		// thumbnail image source. youtube[i].dataset.embed
		var source = "https://img.youtube.com/vi/" + ember + "/hqdefault.jpg";

		// Load the image asynchronously
		var image = new Image();
		image.src = source;
		image.addEventListener(
			"load",
			(function () {
				youtube[i].appendChild(image);
			})(i)
		);
		youtube[i].addEventListener("click", function () {
			var list = this.dataset.src.split("/");
			var src = list[list.length - 1];
			var iframe = document.createElement("iframe");

			iframe.setAttribute("frameborder", "0");
			iframe.setAttribute("allowfullscreen", "");
			iframe.setAttribute(
				"src",
				"https://www.youtube.com/embed/" + src + "?rel=0&showinfo=0&autoplay=1"
			);

			this.innerHTML = "";
			this.appendChild(iframe);
			console.log(this);
			this.classList.add("video");
		});
	}

	$(".objects-slider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 760,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	$(".navbar").on("click", function () {
		if ($(this).is(".active")) {
			$(this).removeClass("active");
			$(this).parent().find("svg.menu-close").hide();
			$(this).parent().find("svg.menu-burg").show();
			$(".m-menu .m-menu__wrap").hide();
		} else {
			$(".m-menu .m-menu__wrap").show();
			$(this).addClass("active");
			$(this).parent().find("svg.menu-burg").hide();
			$(this).parent().find("svg.menu-close").show();
		}
	});
	$("a.scroll-to-section").on("click", function (e) {
		if ($("body").width() < 769 && $(this).parent().is(".m-menu__item")) {
			$(".navbar").trigger("click");
		}
		var anchor = $(this);
		$("html, body")
			.stop()
			.animate(
				{
					scrollTop: $(anchor.attr("href")).offset().top - 100,
				},
				777
			);

		e.preventDefault();
		return false;
	});

	$(".popup").magnificPopup({
		type: "inline",
		preloader: false,
		focus: "#name",
		removalDelay: 160,
		modal: true,
	});
	$(document).on("click", ".popup-close", function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
	$("#polzunok1").slider({
		animate: "slow",
		range: "min",
		max: 10000000,
		min: 300000,
		step: 100000,
		slide: function (event, ui) {
			$("#result-polzunok1").text(prettyfy(ui.value));
			costActive = ui.value;
			var costAllRent = reSumRentAndCoef(sliderId, rentArray, ui.value);
			costRent = costAllRent;
			$("#rentValue").text(prettyfy(costAllRent));
			var costAllCoef = reSumRentAndCoef(sliderId, coefArray, ui.value);
			costCoef = costAllCoef;
			$("#coefValue").text(prettyfy(costCoef));
			$("#costActive").text(prettyfy(costActive));
			$("#globalValue").text(prettyfy(reSumValue()));
		},
	});

	function prettyfy(num) {
		var n = num.toString();
		var separator = " ";
		return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
	}
	$("#result-polzunok1").text(prettyfy($("#polzunok1").slider("value")));

	function checkYearValue(array, checkValue, year, isRent) {
		var result;
		if (isRent) {
			if (checkPrevResultRent == 0) result = array[0];
			else result = checkPrevResultRent;
			if (checkPrevPercentRent == 0) checkValue = array[0];
			else checkValue = checkPrevPercentRent;
			if (checkValue < array[year - 1]) {
				result += array[year - 1];
			} else {
				result -= array[year];
			}
			checkPrevResultRent = result;
			checkValue = array[year - 1];
			checkPrevPercentRent = checkValue;
			return result;
		} else {
			if (checkPrevResultCoef == 0) result = array[0];
			else result = checkPrevResultCoef;
			if (checkPrevPercentCoef == 0) checkValue = array[0];
			else checkValue = checkPrevPercentCoef;
			if (checkValue < array[year - 1]) {
				result += array[year - 1];
			} else {
				result -= array[year];
			}
			checkPrevResultCoef = result;
			checkValue = array[year - 1];
			checkPrevPercentCoef = checkValue;
			return result;
		}
	}

	function reSumValue() {
		var result = costActive + costCoef + costRent;
		return result;
	}

	function reSumRentAndCoef(years, array, inputValue) {
		var result = 0,
			val = 0;
		for (var i = 0; i <= years - 1; i++) {
			val = inputValue * (array[i] / 100);
			result += val;
		}
		return result;
	}
	$("#polzunok2").slider({
		animate: "slow",
		range: "min",
		max: 10,
		min: 1,
		step: 1,
		slide: function (event, ui) {
			if (event.originalEvent.type == "mousemove") {
				sliderId = ui.value;
				$("#result-polzunok2").text(ui.value);
				countYears = ui.value;
				var toPage;
				toPage = checkYearValue(rentArray, checkRentValue, ui.value, true);
				rentPercent = toPage;
				$("#rentPercent").text("+" + toPage.toFixed(2) + "%");

				toPage = checkYearValue(coefArray, checkCoefValue, ui.value, false);
				coefPercent = toPage;
				$("#coefPercent").text("+" + toPage.toFixed(2) + "%");
				investValue = $("#polzunok1").slider("value");
				var val;

				var costAllRent = reSumRentAndCoef(ui.value, rentArray, investValue);
				costRent = costAllRent;
				$("#rentValue").text(prettyfy(costRent));

				var costAllCoef = reSumRentAndCoef(ui.value, coefArray, investValue);
				costCoef = costAllCoef;
				checkPrevCoef = costCoef;
				$("#coefValue").text(prettyfy(costCoef));

				val = Math.round(reSumValue());
				$("#globalValue").text(prettyfy(val));
				sumCoef = rentPercent + coefPercent;
				$("#globalCoef").text("+" + sumCoef.toFixed(2) + "%");
			} else {
				sliderId = ui.value;
				$("#result-polzunok2").text(ui.value);
				var sumRentPercent = 0,
					sumCoefPercent = 0;
				checkPrevPercentRent = rentArray[ui.value - 1];
				checkPrevPercentCoef = coefArray[ui.value - 1];
				for (var i = 0; i <= ui.value - 1; i++) {
					sumRentPercent += rentArray[i];
					sumCoefPercent += coefArray[i];
				}
				checkPrevResultRent = sumRentPercent;
				checkPrevResultCoef = sumCoefPercent;

				var toPage = sumRentPercent;
				rentPercent = toPage;
				toPage = toPage.toFixed(2);
				$("#rentPercent").text("+" + prettyfy(toPage) + "%");

				investValue = $("#polzunok1").slider("value");
				var costAllRent = reSumRentAndCoef(ui.value, rentArray, investValue);
				costRent = costAllRent;
				$("#rentValue").text(prettyfy(costRent));

				toPage = sumCoefPercent;
				coefPercent = toPage;
				toPage = toPage.toFixed(2);
				$("#coefPercent").text("+" + prettyfy(toPage) + "%");

				var costAllCoef = reSumRentAndCoef(ui.value, coefArray, investValue);
				costCoef = costAllCoef;
				$("#coefValue").text(prettyfy(costCoef));

				val = Math.round(reSumValue());
				$("#globalValue").text(prettyfy(val));
				sumCoef = rentPercent + coefPercent;
				$("#globalCoef").text("+" + sumCoef.toFixed(2) + "%");
			}
		},
	});
	$("#result-polzunok2").text($("#polzunok2").slider("value"));

	var opt = $("#polzunok2").data().uiSlider.options,
		min = opt.min,
		raz = opt.max - min;

	$("#polzunok2").append(
		$('<span class="list-number" style="width: 100%;"></span>').css(
			"left",
			"-7px"
		)
	);
	for (var i = 0; i <= raz; i++) {
		$("#polzunok2")
			.find(".list-number")
			.append(
				$("<span>" + min++ + "</span>").css("left", (i / raz) * 100 + "%")
			);
	}
	$(function () {
		$("#phone1, #phone2, #phone3, #phone4").mask("+7 (999) 999-99-99");
	});
});
