import React, { useEffect } from 'react'
import style from './style.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Table, HeaderAlert, Loader } from '../../components'
import actions from '../../actions'
import Row from './Row'

const Instructors = () => {
  const { isLoading, error, instructors } = useSelector(
    (state) => state.listInstructors
  )
  const dispatch = useDispatch()

  useEffect(() => {
    instructors && console.log({ instructors })
  }, [instructors])

  useEffect(() => {
    dispatch(actions.instructor.getAllInstructors())
  }, [])
  return (
    <div className={style.instructors}>
      <h1 className='main-header'>Instructors List</h1>

      {isLoading ? (
        <Loader size='10' options={{ animation: 'border' }} />
      ) : error ? (
        <HeaderAlert type='danger' size='3' text={error} />
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>About</th>
                <th>Job</th>
                <th>Assigned At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {instructors &&
                instructors.map((instructor, idx) => (
                  <tr key={instructor._id}>
                    <Row idx={idx} instructor={instructor} />
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  )
}

export default Instructors
