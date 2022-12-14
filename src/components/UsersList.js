import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import UsersListItem from './UsersListItem';
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

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} extraClasses="h-10 w-full"/>
  } else if(loadingUsersError){
    content = <div>Error fetching data...</div>
  } else {
    content = data.map(user => {
      return <UsersListItem key={user.id} user= {user}/>

    })
  }

  const handleUserAdd = () => {
    doCreateUser();
  };
  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
          <Button loading={isCreateingUser} onClick={handleUserAdd}> + Add User</Button>
        {
          createingUserError && 'Error creating user...'
        }
        
      </div>
      {content}
    </div>
  )
}

export default UsersList