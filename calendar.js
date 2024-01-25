export default class Calendar {
    constructor(events) {
        this.events = events;
        this.initialBtns()
        this.render()
    }
    todayDate = new Date();
    MaxDayCout = this.getMaxDayCount()
    getMaxDayCount() {
        const getAppWidth = document.getElementById('app').offsetWidth ;
        if(getAppWidth >= 910){
            return 5
        }
        else if(getAppWidth >= 750){
            return 4
        }
        else if(getAppWidth >= 550){
            return 3
        }
        else if(getAppWidth >= 450){
            return 2
        }
        else{
            return 1;
        }
    }
    _clearAll() {
        const getHeaderDisp = document.getElementById('header')
        while (getHeaderDisp.firstChild) {
            getHeaderDisp.removeChild(getHeaderDisp.lastChild);
        };
        const getCalendarRow = document.getElementById('calendar-body-rows');
        if(getCalendarRow){
            getCalendarRow.remove()
        }
    }
    render() {
        this._clearAll();
        this.createHeaderItems()
        this.createMainRows()
        this.renderCalendarHours();
        this.renderEvents();
    }
    renderEvents(){
        let newArray = [];
        this.events.filter(event => {
            let tempDate = new Date(this.todayDate)
            for(let i = 0 ; i < this.MaxDayCout ; i++){
                if(event.day == tempDate.getDay()){
                    newArray.push(event);
                }
                tempDate = this.addDays(tempDate, 1);
            }
        })
        console.log(newArray)
        newArray.forEach(event => {
            this._renderEvent(event);
        })
    }
    initialBtns() {
        document.getElementById('header-next_btn').addEventListener('click', () => {
            this.todayDate = this.addDays(this.todayDate, this.MaxDayCout)
            this.render();
        })
        document.getElementById('header-prev_btn').addEventListener('click', () => {
            this.todayDate = this.removeDays(this.todayDate, this.MaxDayCout)
            this.render();
        })

    }
    createHeaderItems() {
        const getHeaderDisp = document.getElementById('header')
        for (let i = 0; i < this.MaxDayCout; i++) {
            const createEll = document.createElement('div');
            createEll.classList.add('header-item');
            createEll.textContent = this.getHeaderText(i);
            getHeaderDisp.appendChild(createEll);
        }
    }
    getHeaderText(dayCount) {
        let tempDate = new Date(this.todayDate);
        const allNames = [
            'Вс',
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
        ]
        tempDate = this.addDays(tempDate, dayCount)
        return allNames[tempDate.getDay()];
    }
    addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    removeDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() - days);
        return result;
    }
    createMainRows() {
        const getMainDiv = document.getElementById('main__content');
        const bodyAndRows = this._createCalendarBodyRows();
        getMainDiv.appendChild(bodyAndRows);
    }
    _createCalendarBodyRows() {
        const calendarBodyRows = document.createElement('div');
        calendarBodyRows.id = ('calendar-body-rows');
        let calendarHourCount = 9;
        for (let i = 0; i < 13; i++) {
            if (calendarHourCount !== 13 && calendarHourCount !== 19) {
                const row = this._createCalendarBodyRow();
                row.setAttribute('id', `calendar-body-row-${calendarHourCount}`);
                row.dataset.hour = calendarHourCount;
                calendarBodyRows.appendChild(row);
            }
            calendarHourCount++;
        }
        return calendarBodyRows;
    }
    _createCalendarBodyRow() {
        const calendarBodyRow = document.createElement('div');
        calendarBodyRow.classList.add('calendar-body-row');
        this._createCalendarBodyColumns(calendarBodyRow);
        return calendarBodyRow;
    }
    // НУЖНО ДОБАВИТЬ ТОЧКИ
    _createCalendarBodyColumns(row) {
        const timeLineColumn = document.createElement('div');
        timeLineColumn.classList.add('calendar-body-column');
        timeLineColumn.classList.add('calendar-timeline-column');
        row.appendChild(timeLineColumn);
        for (let i = 0; i < this.MaxDayCout; i++) {
            let tempDate = new Date(this.todayDate);
            const column = document.createElement('div')
            tempDate = this.addDays(tempDate, i)
            column.dataset.day = tempDate.getDay();
            column.classList.add('calendar-body-column');
            row.appendChild(column);
        }
        const timeLineColumnTwo = document.createElement('div');
        timeLineColumnTwo.classList.add('calendar-body-column');
        timeLineColumnTwo.classList.add('calendar-timeline-column');
        row.appendChild(timeLineColumnTwo);
    }
    _renderEvent(event){
        let timeSlot = {
            day: event.day,
            starthour: event.hour
        }
        const cell = this._getCell(timeSlot.day,timeSlot.starthour);
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('calendar-event');
        eventDiv.dataset.eventId = event.id;
        eventDiv.textContent = event.name
        cell && cell.appendChild(eventDiv);
    }
    _getCell(day, hour) {
        const row = document.querySelector(`#calendar-body-row-${hour}`);
        return row.querySelector(`[data-day="${day}"]`);
      }
    renderCalendarHours(){
        const calendarRows = document.getElementsByClassName('calendar-body-row');
        for(let i = 0 ; i < calendarRows.length ; i++){
            const calendarRow = calendarRows[i];
            const hourDiv = calendarRow.querySelectorAll('.calendar-timeline-column');
            for(let j = 0 ; j < hourDiv.length ; j++){
                const hour = `${(parseInt(calendarRow.dataset.hour)) % 24}`.padStart(2,'0')+':00';
                hourDiv[j].innerText = hour;
            }
        }
    }
}

