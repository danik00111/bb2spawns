import { useState, useEffect } from 'react';
import './App.css';
import Padding from './Padding.jsx';
import SpawnCard from './SpawnCard.jsx';
const spawnslink = 'https://api.jsonbin.io/v3/b/67a493c4ad19ca34f8faca8c/latest';


function App() {
  const [spawnFilter, setFilter] = useState({
    id: {min: 0, max: 5000},
    search: '',
    user: '',
    displayOG: false
  });
  const [spawns, setSpawns] = useState([]);

  useEffect(() => {
    fetch(spawnslink, { method: "GET", headers: { "X-Bin-Meta":"false" } })
    .then(response => response.json())
    .then(data => { console.log('fetched spawns!'); setSpawns(data) })
    .catch(error => alert('Error fetching spawns:', error));
  }, []);


  return (
    <>
      <h1 id="title">BB2 Spawns Filtering Utility</h1>
      <a id="about-link" href='#about' style={{fontSize:'12px'}}>What?</a>
      <div id="about">
        <div id="about-contents">
          this is a tool for viewing and filtering spawns from the <a href='https://discord.gg/TanQfTbgw3' target='blank_'>bonk.io community discord</a>.
          dont know what that is? well... i don&apos;t think i can explain it.
          <br/><br/>
          there are some filters at the top of the page, in order:
          <br/>
          - from a certain user (click any name to copy it&apos;s id, paste that into userid)
          <br/>
          - in the id range (ids are chronological)
          <br/>
          - a toggle to show either the current or original state of a spawn
          <br/>
          (staff often edit stuff like IlIlIlery)
          <br/>
          - good old search inside the spawn texts themsleves
          <br/><br/>
          the data is pulled from jsonbin and is added there by hand
          <a style={{display:'block',width:'fit-content',margin:'0 auto'}} href='#'>close</a>
        </div>
      </div>
      <Padding size='16px'/>
      <div id="options">
        <p className="option">Filters</p>
        <div id="filterlist">
        <input id="input-user" className='input-user' type="number" onKeyDown={(e)=>e.key !== 'e'} placeholder="UserID" style={{width:'7ch'/* not feeling like dynamically coding this */}}
        onInput={()=>{
          const inp = document.getElementById('input-user');
          inp.style.width = Math.max(inp.placeholder.length, inp.value.length)+1+'ch';
          setFilter(x=>{x.user = inp.value; return {...x}});
        }}/>
        <span style={{display:'inline-block',width:'1ch'}}></span>
        <input id="input-range-min" className='input-range-min' type="number" onKeyDown={(e)=>e.key !== 'e'} placeholder="min" min='100' max='5000' style={{width:'4ch'/* not feeling like dynamically coding this */}}
        onInput={()=>{
          const inp = document.getElementById('input-range-min');
          inp.style.width = Math.max(inp.placeholder.length, inp.value.length)+1+'ch';
          setFilter(x=>{x.id.min = inp.value.length==0 ? 0 : Number(inp.value); return {...x}});
        }}/>
        -
        <input id="input-range-max" className='input-range-max' type="number" onKeyDown={(e)=>e.key !== 'e'} placeholder="max" min='100' max='5000' style={{width:'4ch'/* not feeling like dynamically coding this */}}
        onInput={()=>{
          const inp = document.getElementById('input-range-max');
          inp.style.width = Math.max(inp.placeholder.length, inp.value.length)+1+'ch';
          setFilter(x=>{x.id.max = inp.value.length==0 ? 10000 : Number(inp.value); return {...x}});
        }}/>
        </div>
        <Padding size='16px'/>
        <p className="option">Display</p>
        <button className='Toggle' id='toggle-display' value={spawnFilter.displayOG} onClick={()=>{
          setFilter(x=>{x.displayOG = !x.displayOG; return {...x}});
        }}>
          {spawnFilter.displayOG ? 'Original' : 'Current'}
        </button>
        <Padding size='20px'/>
        <input id="input-search" className="input-search" type="text" placeholder="Search..." maxLength='50' style={{width:'10ch'/* not feeling like dynamically coding this */}}
        onInput={()=>{
          const inp = document.getElementById('input-search');
          inp.style.width = Math.max(inp.placeholder.length, inp.value.length)+1+'ch';
          const newfilter = {...spawnFilter};
          newfilter.search = inp.value;
          setFilter(newfilter);
        }}/>
        <Padding size='32px'/>
      </div>

      <div id='spawns-flexbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        { spawns.length==0 ? 'Fetching data...' :
          spawns.filter((x)=>{
            if(x.id < spawnFilter.id.min || x.id > spawnFilter.id.max) return false;
            if(!(
              (x.ogtext!=undefined ? x.ogtext.toLowerCase().includes(spawnFilter.search.toLowerCase()) : false)
              ||x.text.toLowerCase().includes(spawnFilter.search.toLowerCase())
            )) return false;
            if(spawnFilter.user != '') if(x.author != spawnFilter.user) return false;
            return true;
          }).map(x=><SpawnCard {...x} key={x.id} text={(spawnFilter.displayOG && (x.ogtext!=undefined)) ? x.ogtext : x.text}/>)
        }
      </div>
      <Padding size='64px' />
    </>
  )
}

export default App;