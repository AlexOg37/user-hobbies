import React from 'react';
import { Hobby } from './hobby';
import '../App.scss';

type Props = {
  hobby: Hobby,
  onDeleteHobby: (id: number) => void
}

const HobbyRow: React.SFC<Props> = ({ hobby: { description, id, passionLevel, since }, onDeleteHobby }) =>
  <div className='hobby-row' key={id}>
    <div className='passion-level'>{passionLevel}</div>
    <div className='user-hobby'>{description}</div>
    <div className='since-year'>{since}</div>
    <button onClick={() => onDeleteHobby(id)} className='delete-button'>x</button>
  </div>

export default HobbyRow;