import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { MapMarked } from '../icons'
import { Modal } from '../Modal'
import { Overlay } from '../Overlay'
import { useSelector } from 'react-redux'
import AddressForm from './addressForm'

const Address = ({ lang, strings }) => {
  const [addAddress, setAddAddress] = useState(false)
  const { info } = useSelector((state) => state.client)
  const { message } = useSelector((state) => state.update)
  const addAddressHandler = (e) => {
    e.preventDefault()
  }
  useEffect(() => {}, [message])
  return (
    <>
      <Overlay toggle={addAddress} />
      {info && (
        <Modal toggle={addAddress} closeHandler={() => setAddAddress(false)}>
          <AddressForm
            addAddressHandler={addAddressHandler}
            addressData={info.shippingAddress}
            setAddAddress={setAddAddress}
            lang={lang}
            strings={strings}
          />
        </Modal>
      )}
      <div className={style.accountInfo__address}>
        {info && info.shippingAddress ? (
          <div className={style.accountInfo__address_location}>
            <AddressForm
              setAddAddress={setAddAddress}
              addressData={info.shippingAddress}
              lang={lang}
              strings={strings}
              update
            />
          </div>
        ) : (
          <div className={style.accountInfo__address_new}>
            <div className={style.accountInfo__address_cta}>
              <p>{strings.client[lang].no_address}</p>
              <p>{strings.client[lang].add_address_now}</p>
              <button onClick={() => setAddAddress(true)}>
                {strings.client[lang].add_address}
              </button>
            </div>
            <div className={style.accountInfo__address_icon}>
              <MapMarked />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Address
