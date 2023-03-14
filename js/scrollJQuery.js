const sectionEls = document.querySelectorAll(".container");

let sectionTop = [];

let mHtml = $("html");
let page = 0;
let sectionHeight = 0;

sectionEls.forEach(section => {
    sectionTop.push(section.getBoundingClientRect().top);
})
console.log(sectionTop);

window.addEventListener("beforeunload", e => {
    sectionEls[0].scrollIntoView();
})

window.addEventListener("resize", e => {
    sectionTop = [0];

    sectionEls[page].scrollIntoView();

    sectionHeight = sectionEls[page].getBoundingClientRect().top
                 + sectionEls[page].getBoundingClientRect().bottom;

    for(let i = 1; i < sectionEls.length; i++) {
        sectionTop.push(sectionHeight * i);
    }
})

window.addEventListener("wheel", function(e) {
    e.preventDefault();
}, {passive: false});

$(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
        if(page == 3) return;
        page++;
    } else if(e.originalEvent.deltaY < 0) {
        if(page == 0) return;
        page--;
    }
    mHtml.animate({scrollTop : sectionTop[page]});
})