import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import dayjs from 'dayjs'
import CalenderDaysGrid from './CalenderDaysGrid'

const months = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const Calender = ({setContactType}) => {
    const [month, setMonth] = useState(dayjs().format("M"))
    const [dayTime, setDayTime ] = useState('')
    const [date, setDate] = useState({})
    const minute = dayjs().minute()
    const hour = dayjs().hour()
    const today = dayjs().date()
    const year = dayjs().format("YYYY")
    const currentDate = dayjs().format('YYYY-MM-DD')
    
    const getDateHandler = e => {
        const value = {[e.target.name]: e.target.value} 
        setDate({...date, ...value})
    }
    const getDayHandler = today => {
        setDate({...date, today})
    }
    const setMonthHandler = action => {
        if(action  === 'prev') {
            if(parseInt(month) > 1){
                setMonth(prev => dayjs(prev).subtract(1, 'month').format('M'))
                setDate({...date, month:dayjs(month).subtract(1, 'month').format('M')})
            }
        }else if(action === 'next') {
            if(parseInt(month) < months.length){
                setMonth(prev => dayjs(prev).add(1, 'month').format('M'))    
                setDate({...date, month:dayjs(month).add(1, 'month').format('M')})
            }
        }
    }
    const setDayTimeHandler = _ => {
        if(dayTime === 'PM') {
            setDayTime('AM')
            setDate({...date, dayTime:'AM'})
        } else if(dayTime === 'AM') {
            setDayTime('PM')
            setDate({...date, dayTime:'PM'})
        }
    }
    const submitDateHandler = _ => {
        let copyDate = {...date}
        if(!copyDate.minute) copyDate = {...copyDate, minute}
        if(!copyDate.hour) copyDate = {...copyDate, hour}
        if(!copyDate.today) copyDate = {...copyDate, today}
        if(!copyDate.dayTime) copyDate = {...copyDate, dayTime}
        if(!copyDate.month) copyDate = {...copyDate, month}
        if(!copyDate.year) copyDate = {...copyDate, year}
        setContactType('option')
        console.log(copyDate);
    }
    useEffect(() => {
        hour >= 12 
        ? setDayTime('PM')
        : setDayTime('AM')
    }, [hour])
    return (
        <div className={style.calender}>
            <div className={style.calender__header}>
                <p>Pick Date & Time</p>
                <p>Book a Call</p>
            </div>
            <div className={style.calender__time}>
                <p>Time</p>
                <div className={style.calender__time_inputs}>
                    <input 
                    type="number" 
                    name='hour'
                    defaultValue={hour}
                    onChange={(e) => getDateHandler(e)}/>
                    <span className={style.calender__time_separator}>:</span>
                    <input 
                    type="number" 
                    name='minute' 
                    defaultValue={minute}
                    onChange={(e) => getDateHandler(e)}/>
                    <span className={style.calender__time_period}
                    onClick={setDayTimeHandler}>{dayTime}</span>
                </div>
                <button onClick={submitDateHandler}>submit</button>
            </div>
            <div className={style.calender__date}>
                <p>Date</p>
                <div className={style.calender__date_inputs}>
                   <span onClick={() => setMonthHandler('prev')}>&#x0003C;</span>
                   <input 
                   type="text" 
                   name='month' 
                   value={months[month - 1]}
                   />
                   <span onClick={() => setMonthHandler('next')}>&#x0003E;</span>
                </div>
                <input type="number" name='year' defaultValue={year}
                onChange={(e) => getDateHandler(e)}
                className={style.calender__date_year}/>
            </div>
            <div className={style.calender__week}>
                {weekDays.map((day, idx) => <span key={idx}>{day}</span>)}
            </div>
            <div className={style.calender__days}>
                <CalenderDaysGrid 
                today={currentDate} 
                getDayHandler={getDayHandler} 
                month={month}
                year={year}
                />
            </div>
        </div>
    )
}

export default Calender
