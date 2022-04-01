import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {Loader, HeaderAlert,Table, SideAlert} from '../../components'
import actions from '../../actions'
import Row from './Row'
import CreateSlider from './CreateSlider'

const Slider = () => {
    const [isCreateSlide, setIsCreateSlide] = useState(false)
    const dispatch = useDispatch()
    const {sliders, loading, error} = useSelector(state => state.listSliders)
    const {error:delete_error} = useSelector(state => state.deleteSlider)
  
    useEffect(() => {
        dispatch(actions.admin.sliders())
    },[])

    useEffect(() =>{
        sliders && console.log({sliders});
    },[sliders])
    
    return (
        <div className={style.sliders}>
       
        <SideAlert 
         type='danger' 
         text={delete_error}
         isOn={delete_error ? true : false}/>
 
         <CreateSlider
         isCreateSlide={isCreateSlide}
         setIsCreateSlide={setIsCreateSlide}
         />
        
        <h1 className='main-header'>Sliders</h1>
        <Button 
            variant='warning' 
            size='lg'
            className={style.sliders__add}
            onClick={() => setIsCreateSlide(true)}>
           Add Slider 
        </Button>
         {
            loading
            ? <Loader size='10' options={{animation:'border'}}/>
            : error 
            ? <HeaderAlert type='danger' size='3' text={error}/>
            : <>
               <Table>
                 <thead>
                   <th>#</th>
                   <th>Header</th>
                   <th>Sub Header</th>
                   <th>Image</th>
                   <th>Link to</th>
                   <th>Created At</th>
                   <th></th>
                 </thead>
                 <tbody>
                   {
                     sliders && sliders.map((slide, idx) => (
                       <tr key={slide._id}>
                         <Row 
                         slide={slide} 
                         idx={idx}/>
                       </tr>
                     ))
                   }
                 </tbody>
             </Table>
            </>
         }
         
     </div>
  )
}

export default Slider