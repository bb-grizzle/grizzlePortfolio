// setting

var w = screen.width;

window.onload = function () {
	getData();
	//prevent hover

	if (w < 768) {
		preventHover();
	}
};

window.addEventListener("scroll", scrollAction);

var didScrollAction = null;

function scrollAction() {
	if (didScrollAction) {
		clearTimeout(didScrollAction);
	}

	didScrollAction = setTimeout(fixedBtn, 500);
}

function fixedBtn() {
	if (pageStats) {
		var doc = document.documentElement;
		var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

		var btnFixed = document.querySelector("#btn-back-fixed");

		var top_limit = 0;
		if (screen.width < 992) {
			top_limit = 200;
		} else {
			top_limit = 800;
		}

		console.log(top);
		if (top < top_limit) {
			btnFixed.classList.remove("btnShow");
		} else {
			btnFixed.classList.add("btnShow");
		}
	}
}

// set list
function setList() {
	console.log();
	console.log("- setList -");

	var thumbnail = document.querySelector(".thumbnail");

	// projects 배열의 크기 만큼 넣기
	for (var i = 0; i < listCount - 1; i++) {
		var cl = document.querySelector(".thumb-list").cloneNode(true);
		thumbnail.appendChild(cl);
	}
}

// set thumbnail
function setThumb() {
	var lists = document.querySelectorAll(".thumb-list");
	var title = document.querySelectorAll(".text-title");
	var descipt = document.querySelectorAll(".text-descript");
	var text_cata = document.querySelectorAll(".text-cata");

	var bw = document.querySelectorAll(".thum-bw");
	var color = document.querySelectorAll(".thum-color");

	//	reverse folder number json  파일에서 뒷 폴더 부터 불러오기 위함
	var num_reverse;
	var folderNumber;
	var list_reverse;

	for (var i = 0; i < listCount; i++) {
		num = i + 1;
		num_reverse = listCount - i;
		list_reverse = num_reverse - 1;

		if (i < 10) {
			num = "0" + (i + 1);
			folderNumber = "0" + num_reverse;
		} else {
			num = i + 1;
			folderNumber = num_reverse;
		}

		lists[i].dataset.count = i;

		//set thumbnail
		bw[i].style.backgroundImage = "url(./source/image/portfolio/" + folderNumber + "/thumb_bw.jpg)";
		color[i].style.backgroundImage = "url(./source/image/portfolio/" + folderNumber + "/thumb_color.jpg)";

		// set text
		title[i].innerHTML = arr_titles[list_reverse];
		descipt[i].innerHTML = arr_descript_s[list_reverse];

		for (var j = 0; j < arr_tag[i].length; j++) {
			var el_list = document.createElement("li");
			el_list.innerHTML = arr_tag[list_reverse][j];
			text_cata[i].appendChild(el_list);
		}
	}
}

// showDetails project
var show = false;

function portfolio() {
	console.log("PORTFOLIO");
	for (var i = 0; i < listCount; i++) {
		var list = document.querySelectorAll(".thumb-list");

		console.log(list[i]);
		console.log(i);
		list[i].addEventListener("click", function (e) {
			const index = parseInt(e.target.dataset.count)
			// console.log(index);
			showDetailEvent(list, index)
		});
	}
}

function showDetailEvent(list, i) {
	if (!show) {
		// list 가리기
		hideList(list);
		scrollToTop();

		// 자세히 보이기
		setTimeout(function () {
			showDetail(list[i]);
			if (arr_link[listNodeNumb_reverse]) {
				showLinkBtn(list[i]);
			}
			showDetailImage();
		}, 500);
		// 디테일 뷰 추가
		show = true;
	}
}

var listNodeNumb = 0;
var listNodeNumb_reverse = 0;
var list_node_folder = "";

function defineListNode(el) {
	console.log("");
	console.log("- defineListNode -");

	lists = document.querySelectorAll(".thumb-list");

	//	find list node
	for (var i = 0; i < lists.length; i++) {
		if (lists[i].classList.contains("list-active")) {
			listNodeNumb = i;
		}
	}
	listNodeNumb_reverse = listCount - listNodeNumb - 1;

	//	define node folder
	if (listNodeNumb < 10) {
		list_node_folder = "0" + (listCount - listNodeNumb);
	} else {
		list_node_folder = listCount - listNodeNumb;
	}

	console.log("listNodeNumb: " + listNodeNumb);
	console.log("listNodeNumb_reverse: " + listNodeNumb_reverse);
	console.log("list_node_folder: " + list_node_folder);
}

function hasLinkBtn() {
	console.log("");
	console.log("-hasLinBtn- ");
	if (arr_link[listNodeNumb_reverse]) {
		return true;
	} else {
		return false;
	}
}

function showLinkBtn(el) {
	console.log("- showLinkBtn -");
	const hrefLink = arr_link[listNodeNumb_reverse];

	const linkBtn = document.createElement("a");
	linkBtn.setAttribute("href", hrefLink);
	linkBtn.setAttribute("target", "_blank");

	linkBtn.innerHTML = "go to the link";
	linkBtn.classList.add("link-btn");

	const target = document.querySelector(".list-detail").querySelector(".con");

	target.appendChild(linkBtn);
}

function deleteLinkBtn() {
	const linkBtn = document.querySelector(".link-btn");

	linkBtn.parentNode.removeChild(linkBtn);
}

function hideList() {
	var arr = document.querySelectorAll(".thumb-list");
	for (j = 0; j < arr.length; j++) {
		arr[j].classList.add("list-none");
	}
}

function setDetailImage_y() {
	console.log("");
	console.log("- setDetailImage_y -");

	const text_h = document.querySelector(".text-active").clientHeight;
	console.log("text_h: " + text_h);

	const listMove = document.querySelectorAll(".list-move");

	for (let i = 0; i < listMove.length; i++) {
		listMove[i].style.transform = "translateY(" + text_h * 2 + "px)";
	}
}

function initDetailImage_y() {
	console.log("");
	console.log("- initDetailImage_y -");

	const listMove = document.querySelectorAll(".list-move");

	for (let i = 0; i < listMove.length; i++) {
		listMove[i].style.transform = "translateY(0px)";
	}
}

//show portfolio details
function showDetail(el) {
	console.log("");
	console.log("- showDetail - ");

	pageStats = !pageStats;
	console.log("el", el);
	el.classList.add("list-active");

	//				define ListNode
	defineListNode();

	var list = el.style;

	var text = el.querySelector(".portfolio-text-wrap");
	text.classList.add("text-active");

	//	showBtn
	var btn_back = document.querySelector(".btn-top");
	btn_back_fixed.style.pointerEvents = "auto";
	btn_back.style.opacity = "1";
	btn_back.style.pointerEvents = "auto";

	// find child numb
	text.querySelector(".text-descript").innerHTML = arr_descript_l[listNodeNumb_reverse];

	for (var j = 0; j < lists.length; j++) {
		if (j != listNodeNumb) {
			lists[j].classList.add("list-displayNone");
		}
	}

	const textWrap = document.querySelector(".portfolio-text-wrap");
	textWrap.style.textTransform = "";
}

//back event
var btn_back = document.querySelector(".btn-top");
var btn_back_fixed = document.querySelector("#btn-back-fixed");

btn_back.addEventListener("click", hideDetail);
btn_back_fixed.addEventListener("click", hideDetail);

function hideDetail(e) {
	console.log();
	console.log("- hideDetail -");

	btn_back_fixed.classList.remove("btnShow");

	initDetailImage_y();
	if (hasLinkBtn()) {
		deleteLinkBtn();
	}

	if (show) {
		pageStats = !pageStats;
		scrollToTop();

		var list = document.querySelectorAll(".list-none");
		var text = document.querySelector(".text-active");
		text.classList.remove("text-active");

		var active = document.querySelector(".list-active");
		active.classList.remove("list-active");
		active.classList.add("list-opacity");

		console.log(text.querySelector(".text-descript"));
		text.querySelector(".text-descript").innerHTML = arr_descript_s[listNodeNumb];

		setTimeout(function () {
			active.classList.remove("list-opacity");
			showList(list);
		}, 800);

		btn_back.style.opacity = "0";
		btn_back.style.pointerEvents = "none";
		btn_back_fixed.style.pointerEvents = "none";

		hideDetailImage();

		show = false;
	}
}

function showList(arr) {
	for (var i = 0; i < arr.length; i++) {
		arr[i].classList.remove("list-displayNone");
	}

	setTimeout(function () {
		for (var j = 0; j < arr.length; j++) {
			arr[j].classList.remove("list-none");
		}
	}, 100);
}

let listCount = 0;
let arr_titles = [];
let arr_descript_s = [];
let arr_descript_l = [];
let arr_tag = [];
let arr_thum_color = [];
let arr_thum_bw = [];
let arr_detail = [];
let arr_linkStatus = [];
let arr_link = [];
let data_arr = [arr_titles, arr_descript_s, arr_descript_l, arr_tag, arr_thum_color, arr_thum_bw, arr_detail];

function getData() {
	fetch("./source/js/portfolioList.json")
		.then(function (resp) {
			return resp.json();
		})
		.then(function (ob) {
			const projects = ob.project;
			listCount = projects.length;
			//set data
			for (let i = 0; i < projects.length; i++) {
				arr_titles.push(projects[i].title);
				arr_descript_s.push(projects[i].descript_s);
				arr_descript_l.push(projects[i].descript_l);
				arr_tag.push(projects[i].tag);
				arr_thum_color.push(projects[i].thum_color);
				arr_thum_bw.push(projects[i].thum_bw);
				arr_detail.push(projects[i].detail);
				arr_linkStatus.push(projects[i].linkStatus);
				arr_link.push(projects[i].link);
			}
		})
		.then(function () {
			setList();
			setThumb();
			portfolio();
		})
		.then(function () {
			setTimeout(function () {
				endLoading();
			}, 1000);
		});
}

function endLoading() {
	console.log();
	console.log(" - endLoading -");

	const loader = document.querySelector(".loadWrap");
	const wrap = document.querySelector(".fullWrap");

	loader.className += " hidden";

	wrap.style.display = "block";
	setTimeout(function () {
		wrap.className += " show";
	});
}

function showDetailImage() {
	console.log("");
	console.log("- showDetailImage -");

	var detail = document.querySelector(".list-detail");
	var footer = document.querySelector("footer");
	var detail_con = detail.querySelector(".con");

	var padding = document.querySelectorAll(".thum-padding");

	var imgNumb = 0;

	for (var i = 0; i < arr_detail[listNodeNumb_reverse].length; i++) {
		var el_img = document.createElement("img");
		if (i < 9) {
			imgNumb = "0" + (i + 1);
		} else {
			imgNumb = i + 1;
		}
		var dir = "source/image/portfolio/" + list_node_folder + "/detail/" + arr_detail[listNodeNumb_reverse][i];

		el_img.setAttribute("src", dir);
		detail_con.appendChild(el_img);
	}

	padding[listNodeNumb].classList.add("thum-padding-none");

	setTimeout(function () {
		detail.style.opacity = "1";
		detail.classList.add("list-move");
		footer.classList.add("list-move");

		setDetailImage_y();

		var detail_img = detail.querySelectorAll("img");
		for (let i = 0; i < detail_img.length; i++) {
			detail_img[i].style.opacity = "1";
		}
	}, 500);
}

function hideDetailImage() {
	var detail = document.querySelector(".list-detail");
	var detail_con = detail.querySelector(".con");
	var img = detail_con.querySelectorAll("img");
	var padding = document.querySelector(".thum-padding");

	for (var i = 0; i < img.length; i++) {
		img[i].style.opacity = "0";
	}
	detail.style.opacity = "0";

	setTimeout(function () {
		detail_con.innerHTML = "";
		padding.classList.remove("thum-padding-none");
	}, 500);
}

function scrollToTop() {
	const c = document.documentElement.scrollTop || document.body.scrollTop;
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, c - c / 8);
	}
}

//remove hover
function hasTouch() {
	return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

function preventHover() {
	if (hasTouch()) {
		// remove all :hover stylesheets
		try {
			// prevent exception on browsers not supporting DOM styleSheets properly
			for (var si in document.styleSheets) {
				var styleSheet = document.styleSheets[si];
				if (!styleSheet.rules) continue;

				for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
					if (!styleSheet.rules[ri].selectorText) continue;

					if (styleSheet.rules[ri].selectorText.match(":hover")) {
						styleSheet.deleteRule(ri);
					}
				}
			}
		} catch (ex) {}
	}
}