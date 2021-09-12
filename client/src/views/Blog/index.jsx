import React from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import AddComment from '../../components/AddComment'
const Blog = () => {
    return (
        <Template>
            <div className={style.blog}>
                <div className="container" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div className={style.blog__wrapper}>
                        <h2>How to repair your cars now by your self</h2>
                        <p className={style.blog__date}>August 8, 2019</p>
                        <figure>
                            <img src="images/img-1.png" alt="mechanic"/>
                        </figure>
                        <p className={style.blog__content}>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                            <br/>
                            <br/>
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                            ipsum dolor sit amet.
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                            ipsum dolor sit amet.
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                            ipsum dolor sit amet.
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                            ipsum dolor sit amet.
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                            dolores et ea rebum. Stet clita kasd gubergren,
                            <br/>
                            <br/>
                            no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem 
                            ipsum dolor sit amet.
                            <br/>
                            <br/>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod 
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At 
                            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, 
                            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et 
                            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo 
                            duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est 
                            Lorem ipsum dolor sit
                        </p>
                        <AddComment/>
                    </div>
                </div>
            </div>
        </Template>
    )
}

export default Blog
