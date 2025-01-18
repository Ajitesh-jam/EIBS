import React from 'react'
import './InputBox.css'

const InputBox = ({ setInput, placeholder,width , type = "text"}) => {
    const handleLink = (e) => {

        setInput(e.target.value);
        // console.log("Link is ", e.target.value);
    }

    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                className='InputBox' 
                onChange={handleLink}
                style={{width: width}}/>

        </div>
    )
}

export default InputBox