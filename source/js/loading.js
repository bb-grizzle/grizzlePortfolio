loader_text();

//const box = document.querySelector(".box");
//const boxFill = document.querySelector(".box-fill");
//let boxLeft = -20;
//
//function changeBoxWidth() {
//	box.style.width = "100%";
//}
//
//function changeBoxPos() {
//	boxLeft += 20;
//	boxFill.style.left = boxLeft + "%";
//	box.style.width = "50%";
//}

//function loader_rect() {
//	setInterval(() => {
//		changeBoxWidth();
//		setTimeout(() => {
//			changeBoxPos();
//		}, 700);
//
//		if (boxLeft > 80) {
//			boxLeft = -60;
//			boxFill.style.display = "none";
//		} else {
//			boxFill.style.display = "block";
//		}
//
//	}, 1400);
//}

function loader_text() {
	console.log();
	console.log('- loader_text -');

	const roll = ["creator", "designer", "developer", "student", "lazybones", "father", "mother", "helper", "explorer", "visitor", "manager", "artist", "musician", "poor", "rich"];

	const p = document.querySelector('.load-p');

	setInterval(function () {
		const ranNumb = Math.floor(Math.random() * roll.length);
		p.innerHTML = roll[ranNumb];
	}, 300);
}