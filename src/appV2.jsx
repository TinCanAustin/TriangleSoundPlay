import { useState, useEffect, useCallback, useRef} from 'react'

function AppV2(){
    const ALLOWEDKEYS = ['w', 'a', 's', 'd', 'shift', 'arrowup', 'arrowdown', 'arrowright', 'arrowleft'];
  
    let [keyPress, keyChange] = useState([]);

    const NOTES = {
        'a' : 261.6,
        'w' : 293.7,
        'd' : 329.6,
        's' : 349.2,
        'arrowleft' : 392.0,
        'arrowup' : 440.0,
        'arrowright' : 493.9,
        'arrowdown' : 523.3
    }

    const SHIFT_NOTES = {
        'a' : 277.2,
        'w' : 311.1,
        'd' : 349.2,
        's' : 370.0,
        'arrowleft' : 415.3,
        'arrowup' : 466.2,
        'arrowright' : 523.3,
        'arrowdown' : 554.4
    }
  
    const audioContext = useRef(new (window.AudioContext || window.webkitAudioContext)())
    const audioPlayers = useRef({});
    
    const soundPlay = (fq)=>{
        let play = audioContext.current.createOscillator()
        let gain = audioContext.current.createGain()

        play.type = "triangle"
        play.frequency.value = fq

        gain.gain.value = 1/9

        play.connect(gain)
        gain.connect(audioContext.current.destination)
        
        return {p:play, g:gain};
    }
    
  
    let KeyPressUp = useCallback((e) => {
        if(ALLOWEDKEYS.includes(e.key.toLowerCase()) && !keyPress.includes(e.key.toLowerCase())){
            keyChange([...keyPress, e.key.toLowerCase()]);
            if(!keyPress.includes('shift')){
                let {p, g} = soundPlay(NOTES[e.key.toLowerCase()])
                audioPlayers.current[e.key.toLowerCase()] = {p, g}
                p.start(0);
            }else{
                let {p, g} = soundPlay(SHIFT_NOTES[e.key.toLowerCase()])
                audioPlayers.current[e.key.toLowerCase()] = {p, g}
                p.start(0);
            }
        }
    }, [keyPress]);
  
    let keyGo = useCallback((e)=>{
        keyChange(keyPress.filter(k => k != e.key.toLowerCase()));

        if(ALLOWEDKEYS.includes(e.key.toLowerCase())){
            let {p, g} = audioPlayers.current[e.key.toLowerCase()]
            p.stop(0);
            g.disconnect();
            
            audioPlayers.current[e.key.toLowerCase()] = null
        }
  
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

          <img src={keyPress.length==0 ? "/migu_w.png" : "/migu_D.png"} alt="w" height={100}/>
  
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

        <div className='version'>
            <p>V2.0</p>
        </div>
      </>
    );
}

export default AppV2