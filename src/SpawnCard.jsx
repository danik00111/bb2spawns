import PropTypes from 'prop-types';
import './SpawnCard.css';
import { useContext } from 'react';
import NamesContext from './NamesContext.js';

const SpawnCard=({id, text, author})=>{
  const names = useContext(NamesContext);
  return(
    <div className='spawncard' id={id}>
      <p className='spawncard-text'>
        {text}
      </p>
      <div className='spawncard-by'>#{id}, by <p className='spawncard-author'
        onClick     ={()=>{ navigator .clipboard .writeText( document .getElementById(id) .querySelector('.spawncard-author') .innerHTML ) }}
        onMouseEnter={()=>{ document .getElementById(id) .querySelector('.spawncard-author') .textContent =author }}
        onMouseLeave={()=>{ document .getElementById(id) .querySelector('.spawncard-author') .textContent =(names[author]??'???') }}
        onMouseDown ={()=>{ document .getElementById(id) .querySelector('.spawncard-author') .style .color ='white' }}
        onMouseUp   ={()=>{ document .getElementById(id) .querySelector('.spawncard-author') .style .color ='black' }}
      >{names[author] ?? '???'}</p></div>
    </div>
  )
};
SpawnCard.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  author: PropTypes.string,
};

export default SpawnCard;