let date;
let time;
setInterval(() => {
    date = new Date();
    time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    document.getElementById('time').textContent = time;    
}, 1000);

function dayName(day){
    switch (day) {
        case 0: return 'Sunday'; break;
        case 1: return 'Monday'; break;
        case 2: return 'Tuesday'; break;
        case 3: return 'Wednesday'; break;
        case 4: return 'Thursday'; break;
        case 5: return 'Friday'; break;
        default : return 'Saturday'; break;
    }
}

function monthName(month){
    switch (month) {
        case 0: return 'January'; break;
        case 1: return 'February'; break;   
        case 2: return 'March'; break;
        case 3: return 'April'; break;
        case 4: return 'May'; break;
        case 5: return 'June'; break;
        case 6: return 'July'; break;
        case 7: return 'August'; break;
        case 8: return 'September'; break;
        case 9: return 'October'; break;
        case 10: return 'November'; break;
        default : return 'December'; break;
    }
}

date = new Date();
document.getElementById("date").textContent = `${dayName(date.getDay())}, ${date.getDate()} ${monthName(date.getMonth())}, ${date.getFullYear()}`;
