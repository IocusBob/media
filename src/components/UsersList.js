import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from '../hooks/use-thunk';



const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)
  const [doCreateUser, isCreateingUser, createingUserError] = useThunk(addUser)
  const {data} = useSelector(state => {
    return state.users;
  })
  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  if (isLoadingUsers) {
    return <Skeleton times={6} extraClasses="h-10 w-full"/>
  }
  if(loadingUsersError){
    return <div>Error fetching data...</div>
  }

  const renderedUsers = data.map(user => {
    return <div key={user.id} className="mb-2 border rounded">
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        {user.name}
      </div>
    </div>
  })

  const handleUserAdd = () => {
    doCreateUser();
  };
  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {
          isCreateingUser
          ? 'creating user...'
          : <Button onClick={handleUserAdd}> + Add User</Button>
        }
        {
          createingUserError && 'Error creating user...'
        }
        
      </div>
      {renderedUsers}
    </div>
  )
}

export default UsersList