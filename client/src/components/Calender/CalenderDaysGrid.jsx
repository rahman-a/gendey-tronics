//https://css-tricks.com/how-to-make-a-monthly-calendar-with-real-data/
import React, {useState} from 'react'
import dayjs from 'dayjs'
import weekDay from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import style from './style.module.scss'

const CalenderDaysGrid = ({today, getDayHandler, month, year}) => {
  const [calenderDay, setCalenderDay] = useState(null)
  
  const setCalenderDayHandler = (day) => {
    getDayHandler(day)
    setCalenderDay(day)
  }
  
  dayjs.extend(weekDay)
  dayjs.extend(weekOfYear)

  const INITIAL_YEAR = year;
  const INITIAL_MONTH = month;

  let currentMonthDays = createDaysForCurrentMonth(INITIAL_YEAR, INITIAL_MONTH)
  let previousMonthDays = createDaysForPreviousMonth(INITIAL_YEAR, INITIAL_MONTH, currentMonthDays[0])
  let nextMonthDays = createDaysForNextMonth(INITIAL_YEAR, INITIAL_MONTH)

  function getNumberOfDaysInMonth(year, month) {
      return dayjs(`${year}-${month}-01`).daysInMonth()
  }

  function createDaysForCurrentMonth(year, month) {
      return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
        return {
          date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: true
        };
      });
  }

  function getWeekday(date) {
      return dayjs(date).weekday()
  }

  function createDaysForPreviousMonth(year, month) {
      const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
    
      const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
      
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday : 6
    
      const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date).subtract(visibleNumberOfDaysFromPreviousMonth, "day").date();
      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {    
        return {
          date: dayjs(`${previousMonth.year()}-${previousMonth.month() + 1}-${previousMonthLastMondayDayOfMonth + index}`).format("YYYY-MM-DD"),
          dayOfMonth: previousMonthLastMondayDayOfMonth + index,
          isCurrentMonth: false
        }
      })
    }

    function createDaysForNextMonth(year, month) {
      const lastDayOfTheMonthWeekday = getWeekday(`${year}-${month}-${currentMonthDays.length}`)
    
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday ? 6 - lastDayOfTheMonthWeekday : lastDayOfTheMonthWeekday
    
      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(`${year}-${Number(month) + 1}-${index + 1}`).format("YYYY-MM-DD"),
          dayOfMonth: index + 1,
          isCurrentMonth: false
        }
      })
    }


  let days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]

  return (
      <>
        { days.map((day, idx) => 
          {
            return day.date === today && day.isCurrentMonth
            ? <span 
                className={`${style.calender__days_today} 
                ${calenderDay === idx - previousMonthDays.length + 1 && style.calender__days_active}`} 
                key={day.date}
                onClick={() => setCalenderDayHandler(day.dayOfMonth, idx)}>
                {day.dayOfMonth}
            </span>
            :  <span key={day.date}
                onClick={() => setCalenderDayHandler(day.dayOfMonth, idx)}
                className={`${calenderDay === idx - previousMonthDays.length +1 && style.calender__days_active}`}
                style={{visibility:day.isCurrentMonth ? 'visible':'hidden'}}>
                {day.dayOfMonth}
            </span>
          })
          }
      </>
  )
}

export default CalenderDaysGrid