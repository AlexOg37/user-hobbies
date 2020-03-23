import React, { useEffect } from 'react';
import { AppState } from '../reducer';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, changeNewUserName, addNewUser, selectUser } from './actions';
import loadingLabel from '../loading-label';

const Users = () => {
  const newUserName = useSelector((state: AppState) => state.newUserName);
  const selectedUser = useSelector((state: AppState) => state.selectedUser);
  const isUsersLoading = useSelector((state: AppState) => state.isUsersLoading);
  const users = useSelector((state: AppState) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();

  return (
    <div className='user-list'>
      <div className='user-form'>
        <input
          placeholder='Enter user name'
          className='user-name'
          value={newUserName}
          onChange={e => dispatch(changeNewUserName(e.currentTarget.value))}
        />
        <button className='add-user' onClick={() => dispatch(addNewUser(newUserName))}>Add</button>
      </div>
      {isUsersLoading ? loadingLabel : users.map(user => (
        <div
          onClick={() => dispatch(selectUser(user.id))}
          key={user.id}
          className={selectedUser === user.id ? 'selected-user' : ''}
        >
          User: {user.name}
        </div>
      ))}
    </div>
  )
}

export default Users;
