import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {Trash} from '../../components/icons'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'

const SingleNote = ({note, tm, course}) => {
    const {error, message} = useSelector(state => state.deleteNote)
    const [loadingState, setLoadingState] = useState(false)
    const dispatch = useDispatch()
    const deleteNoteHandler = (noteId) => {
        setLoadingState(true)
        dispatch(actions.courses.deleteNote(course,noteId))
    }
    useEffect(() => {
        message && setLoadingState(false)
    },[message])
    return (
        <div className={style.courseLearn__notes_note}>
            <div className={style.courseLearn__notes_note_header}>
                <span>{tm(note.time)}</span>
                <p>{note.lesson.title}</p>
                <button onClick={() => deleteNoteHandler(note._id)}> <Trash/> </button>
            {   loadingState ? <Loader size='4'/>
                : error && <Message 
                type='error' 
                size='1.8'
                width='max-content'
                custom={{marginLeft:'1rem'}} 
                message={error}/>
            }
            </div>
            <div className={style.courseLearn__notes_note_body}>
                {note.note} 
            </div>
        </div>
    )
}

export default SingleNote
