var slide = (function(){

	var slideToggle = document.querySelectorAll("[data-toggle='slide']");
	var slideTargetSelector;
	var slideTarget;

	function Init() {
		if (slideToggle.length === 0) {
			return;
		}
		_AddEventListeners();
	}

	function _AddEventListeners() {
		for(var i = 0; i < slideToggle.length; i++) {
			slideToggle[i].addEventListener("click", _slideToggle);
		}
	}

	function _slideToggle(evt) {
		slideTargetSelector = evt.target.getAttribute("data-target");
		slideTarget = document.querySelector(slideTargetSelector);

		if (!slideTarget) {
			throw new Error("Whoops! Ensure 'data-target' is a valid selector.");
		}

		if (slideTarget.classList.contains("open")) {
			slideTarget.classList.remove("open");
		} else {
			slideTarget.classList.add("open");
		}
	}

	return {
		init: Init
	};

})();

slide.init();
