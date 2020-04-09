import React from 'react'
import Dropzone from 'react-dropzone'

import './styles.css'

function Upload(props) {
    const renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <p className="message">Faça o Upload aqui...</p>
        }

        if (isDragReject) {
            return <p type="error" className="message error">Arquivo não suportado</p>
        }

        return <p type="success" className="message success">Solte os arquivos aqui</p>
    }

    return (
        <Dropzone accept="image/*" onDropAccepted={props.onUpload}>
            { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <div className="drop-container" 
                    {...getRootProps()}
                    isdragactive={isDragActive.toString()}
                    isdragreject={isDragReject.toString()}>

                    <input {...getInputProps()}/>
                    {renderDragMessage(isDragActive, isDragReject)}
                </div>
            ) }
        </Dropzone>
    )
}

export default Upload