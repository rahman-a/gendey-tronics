import React, {useState} from 'react'
import style from './style.module.scss'
import Template from '../../components/Template'
import {PhoneAlt, Schedule} from '../../components/icons'
import {Modal} from '../../components/Modal'
import Contact from '../../views/Product/contant'
import Call from '../../views/Product/call'
import PhoneNumber from '../../views/Product/phoneNumber'
import Calender from '../../components/Calender'

const ContactPage = () => {
    const [toggle, setToggle] = useState(false)
    const [contactType, setContactType] = useState('calender')
    const [actionType, setActionType] = useState('')
    const setActionTypeHandler = action => {
        setToggle(true)
        setActionType(action)
    }
    const submitFormHandler = e => {
        e.preventDefault()
    }
    return (
        <Template>
            <Modal toggle={toggle} 
            closeHandler={() => setToggle(false)}
            styling={{boxShadow:'-1px 1px 11px 0px rgb(0 0 0 / 50%)'}}>
                {actionType === 'call'
                ?<Call/>
                : actionType === 'contact' 
                &&
                <>
                {contactType === 'option'
                ?<Contact setContactType={setContactType}/>
                : contactType === 'phone' 
                ?<PhoneNumber setContactType={setContactType}/>
                : contactType === 'calender'
                ?<Calender setContactType={setContactType}/>
                : contactType === 'done' 
                &&<div className={style.contact__done}>
                    <span>DONE</span>
                </div>}
                </>}
            </Modal>
            <div className={style.contact__overlay}
            style={{transform:toggle ? 'scale(1)': 'scale(0)'}}></div>
            <div className={style.contact}>
                <div className="container">
                    <div className={style.contact__wrapper}>
                        <div className={style.contact__map}>
                            <div className={style.contact__map_wrapper}>
                                <img src="images/map.png" alt="map" />
                            </div>
                            <button>find our location in google maps</button>
                        </div>
                        <form onSubmit={submitFormHandler}>
                            <h3>send us a message</h3>
                            <input type="text" name='name' placeholder='Your Name'/>
                            <input type="text" name='phone' placeholder='Your Phone Number'/>
                            <input type="email" name='email' placeholder='Your E-mail'/>
                            <textarea name="message" placeholder='Your Message' cols="30" rows="10"></textarea>
                            <button type="submit">submit</button>
                        </form>
                    </div>
                    <div className={style.contact__cta}>
                        <button className={style.product__cta_gray}
                            onClick={() => setActionTypeHandler('call')}>
                                <PhoneAlt/> Call us
                            </button>
                            <button className={style.product__cta_yellow}
                            onClick={() => setActionTypeHandler('contact')}>
                                <Schedule/> book call
                        </button>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                            Illum, facilis deleniti corporis tenetur eos reiciendis.
                        </p>
                    </div>
                </div>
                
            </div>
        </Template>
    )
}

export default ContactPage
