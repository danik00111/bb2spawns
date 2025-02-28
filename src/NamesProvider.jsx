import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import NamesContext from './NamesContext.js';
const nameslink = 'https://api.jsonbin.io/v3/b/67a62c0be41b4d34e485c910';

const NamesProvider =({children})=> {
  const [names, setNames] = useState({});
  
  useEffect(() => {
    fetch(nameslink, { method: "GET", headers: { "X-Bin-Meta":"false" } })
    .then(response => response.json())
    .then(data => { setNames(data); })
    .catch(error => alert('Error fetching names:', error));
  }, []); // only run once
  
  return <NamesContext.Provider value={names}>{children}</NamesContext.Provider>;
}

NamesProvider.propTypes = { children: PropTypes.any };

export default NamesProvider;