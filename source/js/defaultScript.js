//page status
var pageStats = false;

//mobile gnb event
var menuBtn = document.querySelector(".gnb-icon");
var menuStatus = false;
menuBtn.addEventListener("click", menuClicked);

function menuClicked() {
	var gnb = document.querySelector(".gnb-mobile-wrap");
	var cover = document.querySelector(".screenCover");
	var menu = document.querySelector(".icon-menu");
	var cancle = document.querySelector(".icon-cancle");

	if (!menuStatus) {
		gnb.classList.add("menuStatus");
		menuStatus = !menuStatus;
		cover.style.zIndex = "1";

		setTimeout(function () {
			cover.style.opacity = "1";
			menu.classList.remove("icon-active");
			cancle.classList.add("icon-active");
		}, 100);

	} else {
		gnb.classList.remove("menuStatus");
		menuStatus = !menuStatus;
		cover.style.opacity = "0";
		cancle.classList.remove("icon-active");
		menu.classList.add("icon-active");

		setTimeout(function () {
			cover.style.zIndex = "-1";
		}, 100)
	}
}