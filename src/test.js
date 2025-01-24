//import {compareDates} from "./utils";
const date1 = new Date(2000, 0, 0);
const date2 = new Date(2000, 0, 14);

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('14 days later', () => {
    expect(compareDates(date1, date2)).toBe(14);
});