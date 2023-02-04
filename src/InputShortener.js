import { useState } from "react"

const InputShortener = ({ setInputValue }) => {
  const [value, setValue] = useState("");

  const handleClick = () => {
    setInputValue(value);
    setValue("");
  }

  return (
    <div className="inputContainer ">
      <h1>Qurly  <span>Url Shortner & Qr Generator</span></h1>
      <div>
        <input
          type="text"
          placeholder="Paste a link to shorten it & Generate Qr Code"
          value={value}
          onChange={e => setValue(e.target.value)}  
        />
        <button onClick={handleClick}>shorten</button>
      </div>
    </div>
    
  )
}

export default InputShortener