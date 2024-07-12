
export function compareDates(date1, date2) {
    // return how many days from date1 to date2
    let diff = date2.getTime() - date1.getTime();
    const sign = (diff < 0) ? -1 : 1;
    diff = Math.abs(diff);
    return sign * Math.ceil(diff / (86400000));
}