function msToTime(time) {
    const ms = new Date().getTime() - new Date(time).getTime()
    let seconds = (ms / 1000);
    let minutes = (ms / (1000 * 60));
    let hours = (ms / (1000 * 60 * 60));
    let days = (ms / (1000 * 60 * 60 * 24));
    if (seconds < 60) {
        return "few seconds";
    } 
    else if (minutes < 60) {
        return Math.round(minutes) + "m";
    } 
    else if (hours < 24) {
        return Math.round(hours) + "h";
    } 
    else  {
        return Math.round(days) + "d"
    } 
}

export default msToTime