import React from 'react'
import style from './style.module.scss'
import {Trash} from '../../components/icons'

const Notes = () => {
    return (
        <div className={style.courseLearn__notes}>
           <div className="container">
               <div className={style.courseLearn__notes_area}>
                   <div className={style.courseLearn__notes_take}>
                       Create note at 3:47
                       <span>+</span>
                   </div>
                   <div className={style.courseLearn__notes_canvas}></div>
               </div>
               <div className={style.courseLearn__notes_sorting}>
                   <select name="lecture" id="lecture">
                       <option value="all lecture">All Lectures</option>
                       <option value="current lecture">Current Lectures</option>
                   </select>
                   <select name="recent" id="recent">
                       <option value="most recent">Sort by most recent</option>
                       <option value="oldest">Sort by oldest</option>
                   </select>
               </div>
               <div className={style.courseLearn__notes_content}>
                    <div className={style.courseLearn__notes_note}>
                        <div className={style.courseLearn__notes_note_header}>
                            <span>3:47</span>
                            <p>Introduction Lecture</p>
                            <button> <Trash/> </button>
                        </div>
                        <div className={style.courseLearn__notes_note_body}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ipsa iusto, 
                            labore odio voluptates quibusdam dignissimos obcaecati. Cumque quibusdam 
                        </div>
                    </div>
                    {/* ////////// */}
                    <div className={style.courseLearn__notes_note}>
                        <div className={style.courseLearn__notes_note_header}>
                            <span>3:47</span>
                            <p>Introduction Lecture</p>
                            <button> <Trash/> </button>
                        </div>
                        <div className={style.courseLearn__notes_note_body}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam ipsa iusto, 
                            labore odio voluptates quibusdam dignissimos obcaecati. Cumque quibusdam 
                        </div>
                    </div>
               </div>
           </div>
        </div>
    )
}

export default Notes
