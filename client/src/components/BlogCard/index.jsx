import React from 'react'
import style from './style.module.scss'

const BlogCard = () => {
    return (
        <div className={style.blog}>
           <figure>
               <img src="images/img-1.png" alt="mechanic" />
           </figure>
           <div className={style.blog__content}>
               <h3>How to repair your cars now by your self</h3>
               <p className={style.blog__content_date}>August 8, 2020</p>
               <p className={style.blog__content_par}>There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration
                in some form, by injected humour, or random words which don't  look even slightly believable. If you 
                are going to use a passage of Lorem Ipsum</p>
                <button>learn more</button>
           </div>
        </div>
    )
}

export default BlogCard
