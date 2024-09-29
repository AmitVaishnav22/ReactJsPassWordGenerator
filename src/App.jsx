import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,getLength]=useState(8)
  const [num,getNum]=useState(false)
  const [char,getChar]=useState(false)
  const [pass,setPass]=useState("")
  const [copy,setCopy]=useState(false)
  
  const passRef=useRef(null)
  const passGen= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (num) str+='0123456789'
    if (char) str+='!@#$%^&*(){}[]|'
    for (let i=1; i<=length;i++){
      let ch=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(ch)
    }
    setPass(pass)
  },[length,num,char,setPass])


  useEffect(()=>{
    passGen()

  },[length,num,char,passGen])

  
  const copyPass = useCallback(() => {
    if (passRef.current) {
      passRef.current.focus();    // Focus the input field first
      passRef.current.select();   // Select the text
      window.navigator.clipboard.writeText(pass).then(() => {
        setCopy(true);  
        setTimeout(() => setCopy(false), 2000) 
    });
  }
    }, [pass]);

  return (
    <>
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
            <h1 className='text-white text-center my-3'>Password generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
              <input
                  type="text"
                  value={pass}
                  className="outline-none w-full py-1 px-3"
                  placeholder="Password"
                  readOnly
                  ref={passRef}
                  
              />
              <button onClick={copyPass}
              className='outline-none w-20 bg-blue-700 text-white px-3 py-0.5 shrink-0'
              >    {copy ? '✓' : 'Copy'} 
              
              </button>
        
        
        
        </div>
          <div className='flex text-sm gap-x-2'>
      <div className='flex items-center text-black w-50 gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {getLength(e.target.value)}}
          />
          <label>Length:{length}</label>
      </div>

      <div>
            <input
            type="checkbox"
            checked={num}
            id="numberInput"
            onChange={() => {
                getNum((prev) => !prev);
            }}
        />
        <label htmlFor="numberInput" className='text-black w-60'>Numbers</label>
      </div>

       <div className="flex items-center gap-x-1">
           <input
              type="checkbox"
              checked={char}
              id="charInput"
              onChange={() => {
              getChar((prev) => !prev);
           }}
          />
          <label htmlFor="charInput" className='text-black w-70'>Characters Allowed</label>
          </div> 
      </div>
      </div>
    </>
  )
}

export default App
