import { useState, useEffect, useCallback, useRef} from 'react'

function App() {
  const ALLOWEDKEYS = ['w', 'a', 's', 'd', 'shift', 'arrowup', 'arrowdown', 'arrowright', 'arrowleft'];

  const NOTES = {
    'a' : '/c.mp3',
    'w' : '/d.mp3',
    'd' : '/e.mp3',
    's' : '/f.mp3',
    'arrowleft' : '/g.mp3',
    'arrowup' : '/a.mp3',
    'arrowright' : '/b.mp3',
    'arrowdown' : '/c(end).mp3'
  }

  let [keyPress, keyChange] = useState([]);


  const audioPlayers = useRef({});
  
  const createAudio = (key)=>{
    const audio = new Audio(NOTES[key]);
    audio.loop = true;
    return audio;
  }

  let KeyPressUp = useCallback((e) => {
    if(ALLOWEDKEYS.includes(e.key.toLowerCase()) && !keyPress.includes(e.key.toLowerCase())){
      audioPlayers.current[e.key.toLowerCase()] = createAudio(e.key.toLowerCase());
      
      audioPlayers.current[e.key.toLowerCase()].currentTime = 0;
      audioPlayers.current[e.key.toLowerCase()].play();

      keyChange([...keyPress, e.key.toLowerCase()]);
    }
  }, [keyPress]);

  let keyGo = useCallback((e)=>{
    keyChange(keyPress.filter(k => k != e.key.toLowerCase()));

    audioPlayers.current[e.key.toLowerCase()].pause();
    audio.currentTime = 0;

  }, [keyPress]);

  useEffect(()=>{
    document.addEventListener("keydown", KeyPressUp);
    document.addEventListener("keyup", keyGo);

    console.log(keyPress)

    return ()=> {
      document.removeEventListener("keydown", KeyPressUp);
      document.removeEventListener("keyup", keyGo);
    }
  })

  return (
    <>
      <div className='keys'>
        <div className='wasd'>
          <img src={keyPress.includes('w') ? '/w_invert.png' : '/w.png'} alt="w" height={80} width={80} />
          <img src={keyPress.includes('a') ? '/a_invert.png' : '/a.png'} alt="a" height={80} width={80}/>
          <img src={keyPress.includes('s') ? '/s_invert.png' : '/s.png'} alt="s" height={80} width={80}/>
          <img src={keyPress.includes('d') ? '/d_invert.png' : '/d.png'} alt="d" height={80} width={80}/>
        </div>

        <div className='arrow'>
          <img src={keyPress.includes("arrowup") ? '/up_inverted.png' : '/up.png'} alt="up" height={80} width={80}/>
          <img src={keyPress.includes("arrowleft") ? '/left_inverted.png' : '/left.png'} alt="left" height={80} width={80}/>
          <img src={keyPress.includes("arrowdown") ? '/down_inverted.png' : '/down.png'} alt="down" height={80} width={80}/>
          <img src={keyPress.includes("arrowright") ? '/right_inverted.png' : '/right.png'} alt="right" height={80} width={80}/>
        </div>
      </div>

      <div className='shift'><img src={keyPress.includes("shift") ? "/shift_invert.png" : "/shift.png"} alt="shift" height={80}/></div>
      
      {/* <div className='debug'>
        <h1>{keyPress[keyPress.length - 1]}</h1>
      </div> */}

      <div className='acknowledgement'>
        <p>Made by Austin Philip (Still Under Development)</p>
      </div>
    </>
  );
}

export default App
