import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import {useSelector, useDispatch} from 'react-redux'
import { useLocation } from 'react-router-dom'
import {Image, Form, Tab, Row, Col, ListGroup, Modal, Button} from 'react-bootstrap'
import {SideAlert, Loader} from '../../components'
import actions from '../../actions'
import constants from '../../constants'
import {Upload} from '../../icons'
import Info from './Info'
import Password from './Password'
import About from './About'

const Profile = () => {
    const [upload, setUpload] = useState(false)
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    const {loading, error, info} = useSelector(state => state.getAdminInfo)
    const {
        loading: loadingUpdate, 
        error: errorUpdate, 
        message: messageUpdate
    } = useSelector(state => state.updateAdminImage)
    
    const hash = useLocation().hash
    
    const uploadImageHandler = () => { 
        const data = new FormData()
        data.append('image', image)
        dispatch(actions.admin.updateAdminImage(data))
    }

    useEffect(() => {
        dispatch(actions.admin.getAdminInfo())
    },[])

    useEffect(() => {
        messageUpdate && setUpload(false)
    },[messageUpdate])
    
    return (
        <div className={style.profile}>

        <SideAlert
        isOn={error ? true : false}
        text={error}
        type="danger"
        reset={() => dispatch({type:constants.admin.GET_ADMIN_INFO_RESET})}
        />

    <SideAlert
        isOn={errorUpdate ? true : false}
        text={errorUpdate}
        type="danger"
        reset={() => dispatch({type:constants.admin.UPDATE_ADMIN_IMAGE_RESET})}
        />

        <Modal show={upload} onHide={() => setUpload(false)}>
            <Modal.Header>
                <Modal.Title> Upload Personal Image </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                   {loadingUpdate && <Loader size="4" center options={{animation:'border'}}/>} 
                    <Form.Group controlId="formBasicImage">
                        <Form.Control 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file"
                        disabled={loadingUpdate} 
                        placeholder="Image" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    disabled={loadingUpdate} 
                    variant="secondary" 
                    onClick={() => setUpload(false)}>Close</Button>
                <Button 
                    disabled={loadingUpdate} 
                    variant="primary" 
                    onClick={uploadImageHandler}>Upload</Button>
            </Modal.Footer>
        </Modal>

            <div className="container">
               { info ? <div className={style.profile__wrapper}>
                   <div className={style.profile__header}>
                       <Row className="align-items-center">
                           <Col sm={3}>
                                <figure onClick={() => setUpload(true)}>
                                    <Image
                                        rounded
                                        alt="171x180"
                                        src={info ? `/api/images/${info.image}` : ''}
                                    />
                                    <span>
                                        <Upload />
                                    </span>
                                </figure>
                           </Col>
                           <Col sm={9}>
                                <div className={style.profile__header_info}>
                                    <h1>{`${info.firstName} ${info.lastName}`}</h1>
                                    <h4> {info.role} </h4>
                                    <a href={`mailto:${info.email}`}>{info.email}</a>
                                </div>
                           </Col>
                       </Row>
                   </div>
                   <div className={style.profile__info}>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey={hash}>
                            <Row>
                                <Col sm={4}>
                                    <ListGroup>
                                        <ListGroup.Item action href="#info">
                                            Info
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#pass">
                                            Password
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#about">
                                            About
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="#info">
                                            <Info info={info}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#pass">
                                            <Password/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="#about">
                                            <About about={info.about}/>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                   </div>
                </div> 
                : loading && <Loader size="6" center options={{animation:'border'}}/>}    
            </div>
            
        </div>
    )
}

export default Profile
