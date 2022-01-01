import React, {useState, useEffect} from 'react'
import style from './style.module.scss'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loader from '../Loader'
import {countries} from './countriesList'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../../actions'
import constants from '../../constants'

const AddressForm = ({addressData, setAddAddress, update, lang, strings}) => {
    const [addressInfo, setAddressInfo] = useState({
        address:'',
        country:'',
        state:'',
        city:'',
        postalCode:''
    })
    const [errorMessage, setErrorMessage] = useState([])
    const dispatch = useDispatch()
    const {loading, error, message} = useSelector(state => state.update)
    
    const captureAddressInfoHandler = e => {
        const value = {[e.target.name]:e.target.value}
        setAddressInfo({...addressInfo, ...value})
    }

    const updateAddressHandler = e => {
        e.preventDefault()
        setAddAddress(true)
    }
    const isFormValid = () => {
        const displayError = {
            address:strings.client[lang].address_error,
            city:strings.client[lang].city_error,
            state:strings.client[lang].city_error,
            country:strings.client[lang].country_error,
            postalCode:strings.client[lang].postalCode_error
        }
        for(let key in addressInfo){
            if(!(addressInfo[key])) {
                setErrorMessage([displayError[key]])
                return false
            }
        }
        return true
    }

    const clearAlertsHandler = _ => {
        setErrorMessage([])
        dispatch({type:constants.client.UPDATE_RESET})
    }
    
    const submitAddressInfoHandler = e => {
        e.preventDefault()
        setErrorMessage([])
        if(isFormValid()) {
            dispatch(actions.client.update({shippingAddress:addressInfo}))
        }
    }

    useEffect(() => {
        addressData && setAddressInfo(addressData)
        error && setErrorMessage([error])
        if(message){
            dispatch({type:constants.client.UPDATE_RESET})
            setAddAddress(false)
        }
    },[addressData, error, message])
    return (
        <>
        {
          loading && <Loader size='25' center custom={{zIndex:'1'}}/>
        }
        <Form className={style.accountInfo__address_add} >
        <div className={style.accountInfo__address_overlay} 
        style={{display:loading?'block':'none'}}></div>
            <Form.Group className='mb-3' controlId='formBasicAlertMessage'>
                {
                    errorMessage.length > 0 
                    && (
                    <Alert variant='danger' 
                    dismissible 
                    onClose={clearAlertsHandler}>
                        {errorMessage[0]}
                    </Alert>
                    )
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddressLine">
                <Form.Label style={{fontSize:'1.3rem'}}>
                   {strings.client[lang].address_line} {!update && <span style={{color:'red'}}>*</span>}
                </Form.Label>
                <Form.Control name='address' type="text" size='lg' placeholder={strings.client[lang].address_line_holder}
                onChange={(e) => captureAddressInfoHandler(e)}
                defaultValue={addressInfo.address}
                disabled={update && true}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCountry">
                <Form.Label style={{fontSize:'1.3rem'}}>
                {strings.client[lang].country_select} {!update && <span style={{color:'red'}}>*</span>}
                </Form.Label>
                <Form.Select aria-label="Default select" size='lg'
                name='country'
                disabled={update && true}
                onChange={(e) => captureAddressInfoHandler(e)}>
                    {
                        countries.map(country => (
                            <option selected={country.name === addressInfo.country} value={country.name}>{country.name}</option>
                        ))
                    }
                </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label style={{fontSize:'1.3rem'}}>
                {strings.client[lang].state_enter} {!update && <span style={{color:'red'}}>*</span>}
                </Form.Label>
                <Form.Control type="text" name='state' size='lg' placeholder={strings.client[lang].state_enter_holder}
                defaultValue={addressInfo.state}
                disabled={update && true}
                onChange={(e) => captureAddressInfoHandler(e)} />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label style={{fontSize:'1.3rem'}}>
                {strings.client[lang].city_enter} {!update && <span style={{color:'red'}}>*</span>}
                </Form.Label>
                <Form.Control type="text" name='city' size='lg' placeholder={strings.client[lang].city_enter_holder}
                disabled={update && true}
                defaultValue={addressInfo.city}
                onChange={(e) => captureAddressInfoHandler(e)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPostal">
                <Form.Label style={{fontSize:'1.3rem'}}>
                {strings.client[lang].postal_enter} {!update && <span style={{color:'red'}}>*</span>}
                </Form.Label>
                <Form.Control type="text" name='postalCode' size='lg' placeholder={strings.client[lang].postal_enter_holder}
                disabled={update && true}
                defaultValue={addressInfo.postalCode}
                onChange={(e) => captureAddressInfoHandler(e)} />
            </Form.Group>

            { update 
            ? <Button variant="dark" type="submit" size='lg'
            onClick={updateAddressHandler}>
                {strings.client[lang].update}
            </Button>
            :<Button variant="warning" type="submit" size='lg'
            onClick={submitAddressInfoHandler}>
                {strings.client[lang].submit}
            </Button>}
        </Form>
    </>
    )
}

export default AddressForm
