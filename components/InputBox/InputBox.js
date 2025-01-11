import React from 'react'
import './InputBox.css'

const InputBox = ({ setInput, placeholder,width }) => {
    const handleLink = (e) => {
        setInput(e.target.value);
        // console.log("Link is ", e.target.value);
    }

    return (
        <div>
            <input
                type="text"
                placeholder={placeholder}
                className='InputBox' 
                onChange={handleLink}
                style={{width: width}}/>

        </div>
    )
}

export default InputBox