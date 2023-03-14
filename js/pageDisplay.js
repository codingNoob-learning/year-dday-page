const title = document.querySelector("head title"),
    headerEl = document.querySelectorAll('.dday'),
    secondsEl = document.querySelectorAll('.container .seconds .number'),
    seconds = document.querySelector(".full .seconds .number"),
    minutes = document.querySelector(".full .minutes .number"),
    hours = document.querySelector(".full .hours .number"),
    days = document.querySelector(".full .days .number"),

    hourSecSeconds = document.querySelector('.hour .seconds .number'),
    hourSecMinutes = document.querySelector('.hour .minutes .number'),
    hourSecHours = document.querySelector('.hour .hours .number'),

    minSecSeconds = document.querySelector('.minute .seconds .number'),
    minSecMinutes = document.querySelector('.minute .minutes .number'),

    secondsSecSeconds = document.querySelector('.seconds .time .number'),

    fullSecEl = document.querySelector('#secFull'),
    hourSecEl = document.querySelector('#secHour'),
    minuteSecEl = document.querySelector('#secMinute'),
    secondsSecEl = document.querySelector('#secSeconds'),

    body = document.querySelector("body"),
    containerEl = document.querySelectorAll(".container"),
    numberEl = document.querySelectorAll(".number"),
    textEl = document.querySelectorAll(".text");

let secValue, minValue, hourValue, daysValue;
let secIndex = 0;

init();
display();

const timeFunction = setInterval(() => {
    if (secValue == 0 && minValue == 0 && hourValue == 0 && daysValue == 0) {
        init();
    } else {
        secValue--;

        if (secValue <= 10) {
            secondsEl.forEach(seconds => {
                seconds.classList.add("impending");
            })
        } else {
            secondsEl.forEach(seconds => {
                seconds.classList.remove("impending");
            })
        }

        if (secValue <= 0) {
            if (minValue >= 0 && secValue != 0) {
                minValue--;
                secondsEl.forEach(seconds => {
                    seconds.classList.remove("impending");
                })
                secValue = 59;
            }
        }

        if (minValue < 0) {
            if (hourValue >= 0 && secValue != 0) {
                hourValue--;
                switchDark();
            }
            minValue = 59;
        }

        if (hourValue < 0) {
            if (daysValue > 0) {
                daysValue--;
            }
            hourValue = 23;
        }
    }

    display();
}, 1000)

function switchDark() {
    if (hourValue < 6 || hourValue > 17) {
        body.classList.add("dark")
        headerEl.forEach(header => header.classList.add("dark"))
        numberEl.forEach(number => number.classList.add("dark"))
        textEl.forEach(text => text.classList.add("dark"))
    } else {
        body.classList.remove("dark")
        headerEl.forEach(header => header.classList.remove("dark"))
        numberEl.forEach(number => number.classList.remove("dark"))
        textEl.forEach(text => text.classList.remove("dark"))
    }
}

function init() {
    const today = new Date();
    const nextYear = new Date(today.getFullYear() + 1, 0);

    let countDown = Math.floor(((nextYear - today) / 1000));

    const resultDays = Math.floor((countDown / 86400));
    countDown = countDown - (resultDays * 86400);

    const resultHours = Math.floor((countDown / 3600));
    countDown = countDown - (resultHours * 3600);

    const resultMinutes = Math.floor((countDown / 60));
    countDown = countDown - (resultMinutes * 60);

    const resultSeconds = countDown;

    title.textContent = `${nextYear.getFullYear()}` + " Year D-Day"
    headerEl.forEach(header => {
        header.textContent = `${nextYear.getFullYear()}` + " Year D-Day"
    })

    secValue = resultSeconds;
    minValue = resultMinutes;
    hourValue = resultHours;
    daysValue = resultDays;

    switchDark();
}

function display() {
    seconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
    minutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
    hours.textContent = hourValue < 10 ? `0${hourValue}` : hourValue;
    
    days.textContent = daysValue < 10 ? `0${daysValue}` : daysValue;

    hourSecSeconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
    hourSecMinutes.textContent = minValue < 10 ? `0${minValue}` : minValue;
    hourSecHours.textContent = ((daysValue * 24) + hourValue) < 10 ? `0${hourValue}` : ((daysValue * 24) + hourValue);

    minSecSeconds.textContent = secValue < 10 ? `0${secValue}` : secValue;
    minSecMinutes.textContent = ((daysValue * 1440) + (hourValue * 60) + minValue) < 10 ? `0${minValue}` : ((daysValue * 1440) + (hourValue * 60) + minValue);

    secondsSecSeconds.textContent = ((daysValue * 86400) + (hourValue * 3600) + (minValue * 60) + secValue) < 10 ? `0${secValue}` : ((daysValue * 86400) + (hourValue * 3600) + (minValue * 60) + secValue);
}