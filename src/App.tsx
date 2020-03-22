import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { AppState, changeNewUserName, addUser, selectUser, changeNewHobby, PassionLevel, addHobby } from '.';

function App() {
  const users = useSelector((state: AppState) => state.users);
  const hobbies = useSelector((state: AppState) => state.hobbies);
  const newUserName = useSelector((state: AppState) => state.newUserName);
  const newHobby = useSelector((state: AppState) => state.newHobby);
  const selectedUser = useSelector((state: AppState) => state.selectedUser);
  const dispatch = useDispatch();
  return (
    <div className='App'>
      User hobbies
      <div className='table'>
        <div className='user-list'>
          <div className='user-form'>
            <input
              placeholder='Enter user name'
              className='user-name'
              value={newUserName}
              onChange={e => dispatch(changeNewUserName(e.currentTarget.value))}
            />
            <button className='add-user' onClick={() => dispatch(addUser(newUserName, users.length + 1))}>Add</button>
          </div>
          {users.map(user => (
            <div
              onClick={() => dispatch(selectUser(user.id))}
              key={user.id}
              className={selectedUser === user.id ? 'selected-user' : ''}
            >
              User: {user.name}
            </div>
          ))}
        </div>
        <div className='hobbies-list'>
          <div className='hobby-form'>
            <select
              onChange={e => dispatch(changeNewHobby(
                newHobby?.description || '',
                e.currentTarget.value as PassionLevel || 'Low',
                newHobby?.since || ''
              ))}
              value={newHobby?.passionLevel || 'Low'}
              placeholder='Select passion level'
              className='passion-level'
            >
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
              <option value='Very-High'>Very-High</option>
            </select>
            <input
              onChange={e => dispatch(changeNewHobby(
                e.currentTarget.value || '',
                newHobby?.passionLevel || 'Low',
                newHobby?.since || ''
              ))}
              value={newHobby?.description || ''}
              placeholder='Enter user hobby'
              className='user-hobby'
            />
            <input
              onChange={e => dispatch(changeNewHobby(
                newHobby?.description || '',
                newHobby?.passionLevel || 'Low',
                e.currentTarget.value || ''
              ))}
              value={newHobby?.since || ''}
              placeholder='Enter year'
              className='since-year'
            />
            <button
              className='add-hobby'
              disabled={!selectedUser}
              onClick={() => selectedUser && dispatch(addHobby(
                selectedUser,
                newHobby?.description || '',
                newHobby?.passionLevel || 'Low',
                newHobby?.since || ''
              ))}
            >
              Add
            </button>
          </div>
          {hobbies.filter(hobby => hobby.userId === selectedUser).map(hobby =>
            <div key={hobby.description+hobby.passionLevel+hobby.since}>{hobby.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
