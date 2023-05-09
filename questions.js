const startingMinutes = 5;
let time = startingMinutes * 60; 
let alertDisplayed = false;

const countdown = document.getElementById('countdown')

const intervalId = setInterval(updateCountdown, 1000)

function updateCountdown() {
    if(time <= -1 && !alertDisplayed) {
        alert('You have run out of time please try again')
        alertDisplayed = true;
        clearInterval(intervalId)
        return; 
    } 

    const minutes = Math.floor(time/60)
    let seconds = time % 60; 


    seconds = seconds < 10 ? '0' + seconds : seconds

    countdown.innerHTML = `${minutes}: ${seconds}`
    time--;

   
}

