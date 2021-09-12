import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import BlogCard from '../../components/BlogCard'

const Blogs = () => {
    return (
        <Template>
            <div className={style.blogs}>
                <div className="container">
                    <div className={style.blogs__wrapper}>
                        { [...Array(4)].map( _ => <BlogCard />)}
                    </div>
                </div>
            </div>
        </Template>
        
    )
}

export default Blogs
