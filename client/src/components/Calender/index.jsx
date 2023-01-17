import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import dayjs from 'dayjs'
import objectSupport from 'dayjs/plugin/objectSupport'
import CalenderDaysGrid from './CalenderDaysGrid'
import strings from '../../localization'
import { useSelector } from 'react-redux'

const months = ['January','February','March','April','May','June','July',
'August','September','October','November','December'];
const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']


const Calender = ({setContactType, setCallDate}) => {
    const [month, setMonth] = useState(dayjs().format("M"))
    const [dayTime, setDayTime ] = useState('AM')
    const [date, setDate] = useState({})
    const [minute, setMinute]= useState(dayjs().minute())
    const [hour, setHour] = useState(dayjs().hour()) 
    const day = dayjs().date()
    const year = dayjs().format("YYYY")
    const currentDate = dayjs().format('YYYY-MM-DD')
    const {lang} = useSelector(state => state.language)
    
    const getDateHandler = e => {
        if(e.target.name === 'hour') {
            if(e.target.value > 12 || e.target.value < 1) return
            setHour(e.target.value)
        }
        if(e.target.name === 'minute'){
            if(e.target.value > 60 || e.target.value < 0) return 
            setMinute(e.target.value)
        }
        const value = {[e.target.name]: e.target.value} 
        setDate({...date, ...value})
    }
    const getDayHandler = today => {
        setDate({...date, day:today})
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
        dayjs.extend(objectSupport)
        let copyDate = {...date}
        if(!copyDate.minute) copyDate = {...copyDate, minute}
        if(!copyDate.hour) copyDate = {...copyDate, hour}
        if(!copyDate.day) copyDate = {...copyDate, day}
        if(!copyDate.dayTime) copyDate = {...copyDate, dayTime}
        if(!copyDate.month) copyDate = {...copyDate, month}
        if(!copyDate.year) copyDate = {...copyDate, year}
        if(parseInt(copyDate.month) > 0) {
            copyDate.month = parseInt(copyDate.month) - 1
        } 
        if(copyDate.dayTime === 'PM') {
            copyDate.hour  = parseInt(copyDate.hour) + 12
        }
        
        delete copyDate.dayTime       
        
        const date_format = dayjs(copyDate).$d.toISOString()
        setCallDate(date_format)
        setContactType('option')
    }
    useEffect(() => {
        if(hour > 12) {
            console.log(dayjs().hour());
            setHour(prev => prev - 12)
            setDayTime('PM')
        }
    }, [hour])
    return (
        <div className={style.calender}>
            <div className={style.calender__header}>
                <p>{strings.product[lang].pick}</p>
                <p>{strings.product[lang].book}</p>
            </div>
            <div className={style.calender__time}>
                <p>{strings.product[lang].time}</p>
                <div className={`${style.calender__time_inputs} ${lang === 'ar' ? style.calender__time_inputs_ar : ''}`}>
                    <input 
                    type="number" 
                    name='hour'
                    value={hour}
                    onChange={(e) => getDateHandler(e)}/>
                    <span className={style.calender__time_separator}>:</span>
                    <input 
                    type="number" 
                    name='minute' 
                    value={minute}
                    onChange={(e) => getDateHandler(e)}/>
                    <span className={style.calender__time_period}
                    onClick={setDayTimeHandler}>{dayTime}</span>
                </div>
                <button onClick={submitDateHandler}>{strings.product[lang].set_date}</button>
            </div>
            <div className={style.calender__date}>
                <p>{strings.product[lang].date}</p>
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
                lang={lang}
                strings={strings}
                />
            </div>
        </div>
    )
}

export default Calender
