import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../reducer';
import { changeNewHobby, fetchHobbies, addNewHobby, deleteHobby } from './actions';
import { PassionLevel } from './hobby';
import loadingLabel from '../loading-label';
import HobbyRow from './HobbyRow';

const Hobbies = () => {
  const hobbies = useSelector((state: AppState) => state.hobbies);
  const newHobby = useSelector((state: AppState) => state.newHobby);
  const selectedUser = useSelector((state: AppState) => state.selectedUser);
  const isHobbiesLoading = useSelector((state: AppState) => state.isHobbiesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHobbies(selectedUser))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser])

  const handleDeleteHobby = (id: number) => {
    dispatch(deleteHobby(id, selectedUser || 0));
  }

  return (
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
          onClick={() => selectedUser && dispatch(addNewHobby(
            selectedUser,
            newHobby?.passionLevel || 'Low',
            newHobby?.description || '',
            newHobby?.since || ''
          ))}
        >
          Add
        </button>
      </div>
      {isHobbiesLoading ? loadingLabel : hobbies.filter(hobby => hobby.userId === selectedUser).map(hobby =>
        <HobbyRow key={hobby.id} hobby={hobby} onDeleteHobby={handleDeleteHobby} />
      )}
    </div>
  );  
}

export default Hobbies;