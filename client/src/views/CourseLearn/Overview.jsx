import React from 'react'
import style from './style.module.scss'

const Overview = () => {
    return (
        <div className={style.courseLearn__overview}>
            <div className={style.courseLearn__overview_about}>
                <div className="container">
                    <h2>About this course</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat perferendis 
                        repudiandae praesentium, quo, enim eius veritatis minus voluptates, corporis 
                        culpa optio totam debitis doloremque ad laboriosam voluptatum numquam 
                        voluptate laborum!
                    </p>
                </div>
            </div>
            <div className={style.courseLearn__overview_numbers}>
                <div className="container">
                    <div className={style.courseLearn__overview_numbers_wrapper}>
                        <h3>By the numbers</h3>
                        <ul>
                            <li>Skill Level: All Levels</li>
                            <li>Students: 5120</li>
                            <li>Languages: Arabic</li>
                            <li>Caption: No</li>
                            <li>lectures: 15</li>
                            <li>Videos: 3 total hours</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.courseLearn__overview_features}>
            <div className="container">
                    <div className={style.courseLearn__overview_features_wrapper}>
                        <h3>Features</h3>
                        <ul>
                            <li>Available on iOS and Android</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.courseLearn__overview_description}>
                <div className="container">
                    <h3>Description</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit 
                        amet. Lorem ipsum dolor sit amet, <br /><br />
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum 
                        dolor sit amet. <br /><br />
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo 
                        dolores et ea rebum. Stet clita kasd gubergren, <br /><br />
                        no sea takimata sanctus est Lorem ipsum dolor sit 
                        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor 
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum 
                        dolor sit amet.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Overview
