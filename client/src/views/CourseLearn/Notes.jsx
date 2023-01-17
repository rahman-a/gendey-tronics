import React, {useState,useEffect} from 'react'
import style from './style.module.scss'
import SingleNote from './SingleNote'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Button from 'react-bootstrap/Button'
import strings from '../../localization'

const Notes = ({lesson, course, lang}) => {
    const {id} = useParams()
    const [note, setNote] = useState(null)
    const [createNote, setCreateNote] = useState(false)
    const {loading, error, notes} = useSelector(state => state.listNotes)
    const {loading:loading_n, error:error_n, message} = useSelector(state => state.newNote)
    const {message:message_dn} = useSelector(state => state.deleteNote)
    const dispatch = useDispatch()

    const createNoteHandler = () => {
        const data = {lesson, note}
        note && dispatch(actions.courses.createNote(course, data))
    }
    
    const cancelCreateNoteHandler = (e) => {
        e.stopPropagation()
        setCreateNote(prev => !prev)
    }
    
    // const calcTime = () => {
    //     // convert time into seconds before send
    //     // return seconds
    //     return 130
    // }
    const tm = (se) => {
        let h = (se /60 /60)
        if(h < 1){
           let  t =  (h * 100).toFixed(2)
            return t 
        }
        return h.toFixed(2)
    }
    useEffect(() => {
        (!notes || notes.length < 1) 
        && dispatch(actions.courses.listNotes(id))
        if(message) {
            setTimeout(() => {
                dispatch({type:constants.courses.CREATE_NOTE_RESET})
            }, 3000)
        }
    }, [id, dispatch,notes, message, message_dn])
    return (
        <div className={style.courseLearn__notes}>
           <div className="container">
               <div className={style.courseLearn__notes_area}
               onClick={() => setCreateNote(true)}>
                  {!createNote ? <div className={style.courseLearn__notes_take}
                   style={{marginBottom:'2rem'}}>
                       {strings.course[lang].create_note}
                       <span>+</span>
                   </div> 
                   : <div className={style.courseLearn__notes_canvas}>
                    <div className={style.courseLearn__notes_canvas_note}>
                        {/* <p>3:47</p> */}
                        <textarea name="note" cols="30" rows="3"
                        onChange={(e) => setNote(e.target.value)}
                        value={note}></textarea>
                    </div>
                    <div className={style.courseLearn__notes_canvas_actions}>
                       {
                       loading_n ? <Loader size='4'/>
                        :  error_n? <Message 
                        type='error' 
                        size='2.2'
                        width='max-content'
                        custom={{marginRight:'1rem'}} 
                        message={error_n}/> 
                        : message&& <Message 
                        type='success' 
                        size='2.2'
                        width='max-content'
                        custom={{marginRight:'1rem'}} 
                        message={message}/>
                        }
                        <Button variant='dark'
                        disabled={loading_n}
                        onClick={createNoteHandler}>{strings.course[lang].save}</Button>
                        <Button variant='danger'
                        disabled={loading_n}
                        onClick={cancelCreateNoteHandler}>{strings.course[lang].cancel}</Button>
                    </div>
                   </div> }
               </div> 

               {/* <div className={style.courseLearn__notes_sorting}>
                   <select name="lecture" id="lecture">
                       <option value="all lecture">All Lectures</option>
                       <option value="current lecture">Current Lectures</option>
                   </select>
                   <select name="recent" id="recent">
                       <option value="most recent">Sort by most recent</option>
                       <option value="oldest">Sort by oldest</option>
                   </select>
               </div> */}
               <div className={style.courseLearn__notes_content}>
                    {loading 
                    ? <Loader size='8' center/>
                    : error 
                    ? <Message type='error' center message={error}/>
                    :    notes && notes.map(note => (
                            <SingleNote
                            key={note._id} 
                            note={note} 
                            course={course}
                            tm={tm}
                            lang={lang}
                            />
                        ))
                    }
               </div>
           </div>
        </div>
    )
}

export default Notes
