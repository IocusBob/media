import React from 'react'
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

const UsersListItem = ({user}) => {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);
    const handlClick = () => {
        doRemoveUser(user);
    }

    const header = <React.Fragment>
                        <Button className='mr-3' loading={isLoading} onClick={handlClick}>
                            <GoTrashcan />
                        </Button>
                        {error && <div>Error Deleting User</div>}
                        {user.name}
                    </React.Fragment>
    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
                    
    )
}

export default UsersListItem