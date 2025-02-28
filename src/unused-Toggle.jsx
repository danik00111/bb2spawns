import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * 
 * @param {Object} attributes
 * @param {string} [attributes.id] An ID tag you want the toggle to have.
 * @param {string} [attributes.trueText] The text to display when the button is toggled on. If omitted, becomes falsetext.
 * @param {string} [attributes.falseText] The text to display when the button is toggled off. If omitted, becomes truetext.
 * @returns A toggle that can change style and text depending on it's value. Off by default.
 */
const Toggle=({id, trueText, falseText, trueStyle, falseStyle})=>{
  const [bool, setBool] = useState(false);
  if(falseText==undefined && trueText==undefined) throw new Error('Both texts in Toggle omitted');
  return(
    <button className='Toggle'
      id={id}
      style={bool?trueStyle:falseStyle}
      value={bool}
      onClick={()=>{setBool(!bool)}}
    >
      {(()=>{
        if(falseText==undefined) return trueText;
        if(trueText==undefined) return falseText;
        return bool ? trueText : falseText
      })()}
    </button>
  )
};
Toggle.propTypes = {
  id: PropTypes.string,
  trueText: PropTypes.string,
  falseText: PropTypes.string,
  trueStyle: PropTypes.object,
  falseStyle: PropTypes.object
};

export default Toggle;