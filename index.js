// day from 0 - 6 hour from 9 - 22
import Calendar from './calendar.js';

const arrayOfEvents = [
    { name: 'pol dance', day: 0, hour: 9 },
    { name: 'dance', day: 1, hour: 10 },
    { name: 'hiphop dance', day: 2, hour: 11 },
    { name: 'cool dance', day: 3, hour: 14 },
    { name: 'just dance', day: 4, hour: 15 },
    { name: 'look dance', day: 5, hour: 16 },
    { name: 'hook dance', day: 6, hour: 17 },
]

new Calendar(arrayOfEvents)
