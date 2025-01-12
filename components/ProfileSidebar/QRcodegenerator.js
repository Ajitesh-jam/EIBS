import QRCode from 'react-qr-code';

const QRCodeGenerator = ({publicAddress}) => {
    return (
        <div className='QRCodeContainer'>
            <QRCode value={publicAddress} size={256} />
        </div>
    );
}

export default QRCodeGenerator;