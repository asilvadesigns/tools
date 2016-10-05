var Dropdown = (function(){

	var dropdowns = document.querySelectorAll(".js-dropdown");

	function Init() {
		if (dropdowns.length === 0 ) {
			return false;
		}
		_AddEventListeners();
	}

	function _AddEventListeners() {
		for (var i = 0; i < dropdowns.length; i++) {
			dropdowns[i].addEventListener("click", _DropdownToggle);
		}
	}

	function _DropdownToggle(evt) {
		if (evt.target.classList.contains("open")) {
			evt.target.classList.remove("open");
		} else {
			evt.target.classList.add("open");
		}
	}

	return {
		init: Init
	};

})();

Dropdown.init();
