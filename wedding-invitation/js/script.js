function dqs(value) {
	return document.querySelector(value);
}



let headerNames = dqs(".header__center-names");
let header = dqs(".header");



function BRinHeaderNames(value) {

	let txt = headerNames.innerHTML;
	let newTxt;

	if (value == "add" && txt.includes(" ")) {
		newTxt = txt.replace(/ /g, '<br>');
		headerNames.innerHTML = newTxt;
	} else if (value == "remove" && txt.includes("<br>")) {
		newTxt = txt.replace(/<br>/g, ' ');
		headerNames.textContent = newTxt;	
	}
}

function animation(n) {

	header.classList.add(`frame${n}`);

	if (n == 5) {
		dqs(".btn-confirm").classList.add("visible");
		setTimeout(() => {
			dqs("body").classList.remove("animation");
			addInObsBtnConfirm();
			setTimeout(() => {
				dqs(".btn-confirm").style.transition = "all 0.5s linear";
			}, 1000)
		}, 1000);

		return;
	} else if (n == 4) {
		setTimeout(() => {
			animation(5);
		}, 500)
		return;
	}

	let newN = n + 1;

	setTimeout(() => {
		animation(newN);
	}, 2000)
}

function setVH() {
	let vh100 = window.innerHeight;
	let vh1 = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh100', `${vh100}px`);
	document.documentElement.style.setProperty('--vh1', `${vh1}px`);
};

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
 	if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}

// hiding .btn-confirm
let footerForm = document.querySelectorAll("#form");
const inObs = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				dqs(".btn-confirm").classList.remove("visible");
			} else {
				dqs(".btn-confirm").classList.add("visible");
			}
		});
	},
	{
		rootMargin: "0px 0px 50px 0px",
	},
);
function addInObsBtnConfirm() {
	footerForm.forEach(form => inObs.observe(form));
}



window.addEventListener("DOMContentLoaded", event => {
	if (window.innerWidth <= 575.5) {
		BRinHeaderNames("add");
	}
});

window.addEventListener("resize", event => {
	setVH();
	window.innerWidth <= 575.5 ? BRinHeaderNames("add") : BRinHeaderNames("remove");
});

window.addEventListener('load', () => {
	setVH();
	dqs(".bg-image").classList.add("visible");
	setTimeout(() => {
		animation(1);
	}, 1000);
});
