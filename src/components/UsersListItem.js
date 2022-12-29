import React from 'react'
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

const UsersListItem = ({user}) => {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
    const handlClick = () => {
        doRemoveUser(user);
    }
    return (
        <div key={user.id} className="mb-2 border rounded">
            <div className='flex p-2 justify-between items-center cursor-pointer'>
                <div className='flex flex-row items-center justify-between'>
                    <Button className='mr-3' loading={isLoading} onClick={handlClick}>
                        <GoTrashcan />
                    </Button>
                    {error && <div>Error Deleting User</div>}
                    {user.name}
                </div>
            </div>
        </div>
    )
}

export default UsersListItem