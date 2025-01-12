import { useState } from 'react';
import React from 'react';

export default function ClipBoard() {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('');

    const copyToClipboard = () => {
        if (text.trim() === '') {
            setStatus('Please enter some text to copy.');
            setTimeout(() => setStatus(''), 2000);
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                setStatus('Text copied to clipboard!');
                setTimeout(() => setStatus(''), 2000);
            })
            .catch(() => {
                setStatus('Failed to copy text. Please try again.');
                setTimeout(() => setStatus(''), 2000);
            });
    };

    return (
        <div className="clipboard-container" style={{ textAlign: 'center', marginTop: '20px' }}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something here..."
                className="clipboard-input"
                style={{ width: '300px', height: '50px', marginBottom: '10px' }}
            ></textarea>
            <br />
            <div className="button-container">
            <button className='button'
                onClick={copyToClipboard}
                >
                
                
            </button>
            </div>
            {status && <p style={{ marginTop: '10px', color: 'black' }}>{status}</p>}
        </div>
    );
}
