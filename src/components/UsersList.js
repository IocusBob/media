import { render } from '@testing-library/react'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store'
import Skeleton from './Skeleton'

const UsersList = () => {
  const dispatch = useDispatch();
  const {isLoading, data, error} = useSelector(state => {
    return state.users;
  })
  console.log(data)
  useEffect(() => {
    dispatch(fetchUsers());
  }, [])

  if (isLoading) {
    return <Skeleton times={6} extraClasses="h-10 w-full"/>
  }
  if(error){
    return <div>Error fetching data...</div>
  }

  const renderedUsers = data.map(user => {
    return <div key={user.id} className="mb-2 border rounded">
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        {user.name}
      </div>
    </div>
  })
  return (
    <div>{renderedUsers}</div>
  )
}

export default UsersList