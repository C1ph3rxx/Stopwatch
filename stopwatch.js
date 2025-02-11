let startBtn = document.getElementById('start');
// let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('Reset');

// let hour = 0;
// let minute = 0;
// let second = 0;
// let count = 0;
// let timer = false;  

// startBtn.addEventListener('click', function () {
//     timer = true;
//     stopWatch();
// });

// stopBtn.addEventListener('click', function () {
//     timer = false;
// });

// resetBtn.addEventListener('click', function () {
//     timer = false;
//     hour = 0;
//     minute = 0;
//     second = 0;
//     count = 0;
//     document.getElementById('Hr').innerHTML = "00";
//     document.getElementById('min').innerHTML = "00";
//     document.getElementById('sec').innerHTML = "00";
//     document.getElementById('count').innerHTML = "00";
// });

// function stopWatch() {
//     if (timer) {
//         count++;

//         if (count == 100) {
//             second++;
//             count = 0;
//         }

//         if (second == 60) {
//             minute++;
//             second = 0;
//         }

//         if (minute == 60) {
//             hour++;
//             minute = 0;
//             second = 0;
//         }

        
//         let hrString = hour < 10 ? "0" + hour : hour;
//         let minString = minute < 10 ? "0" + minute : minute;
//         let secString = second < 10 ? "0" + second : second;
//         let countString = count < 10 ? "0" + count : count;

        
//         document.getElementById('Hr').innerHTML = hrString;
//         document.getElementById('min').innerHTML = minString;
//         document.getElementById('sec').innerHTML = secString;
//         document.getElementById('count').innerHTML = countString;

//         setTimeout(stopWatch, 10); 
//     }
// }


Number.prototype.padStart = function(){
    return String(this, null).padStart(2,'0')
}

class Datewatch {
    constructor() {
        this.startTime = null;
        this.elapsedTime = 0;  // Time in milliseconds
        this.timer = null;
        this.startStop = document.getElementById('start');
        this.milliseconds=0, this.seconds = 0, this.minutes = 0, this.hours = 0;
    }

    start() {
        if (this.startTime === null) {
            this.startStop.innerHTML = 'Pause';
            this.startTime = Date.now() - this.elapsedTime;  // Keep track of when it started or resumed
            this.timer = setInterval(() => this.update(), 1); // Update every 10 ms for precision
        
        }else {
            if (this.startStop.innerHTML == 'Pause') return  this.pause();
            this.startStop.innerHTML = 'Pause';
            this.startTime = Date.now() - this.elapsedTime;
            this.timer = setInterval(() => this.update(), 1); // Update every 10 ms for precision
        }
    }
    updateDisplay() {
        var pixelSeconds = document.getElementById('mTime');
        document.getElementById("mSeconds").innerHTML = this.milliseconds;
        // console.log(this.milliseconds)
        return pixelSeconds.innerHTML = this.hours === 0 ? `${this.minutes.padStart()}:${this.seconds.padStart()}` : `${this.hours.padStart()}:${this.minutes.padStart()}:${ this.seconds.padStart()}` ;           
    }

    update() {
       
        this.currentTime = Date.now();
        this.elapsedTime = this.currentTime - this.startTime;

        this.milliseconds = Math.floor(this.elapsedTime % 1000 /10);
        this.seconds = Math.floor(this.elapsedTime / 1000) % 60;
        this.minutes = Math.floor(this.elapsedTime / 60000) % 60; // Get minutes, reset at 60
        this.hours = Math.floor(this.elapsedTime / 3600000); // Get hours, no reset here

        // this.milliseconds >= 10  ? (this.milliseconds = 0, this.seconds++) : null;
        this.seconds >= 60 ? ( this.seconds=0, this.minutes++) : null;
        this.minutes >= 60 ? (this.minutes= 0, ++this.hours):null;
        this.updateDisplay()
    }

    pause() {
        this.startStop.innerHTML = 'Continue';
        clearInterval(this.timer);
        this.timer = null;
    }

    reset() {
        this.startStop.innerHTML = 'Start';
        this.startTime = null;
        this.elapsedTime = 0, this.milliseconds=0, this.seconds = 0, this.minutes = 0, this.hours = 0;
        clearInterval(this.timer);
        this.updateDisplay();
    }
}

const stopWatch = new Datewatch();
startBtn.addEventListener('click', ()=> stopWatch.start());
// stopBtn.addEventListener('click', ()=>stopWatch.pause());
resetBtn.addEventListener('click', ()=> stopWatch.reset());