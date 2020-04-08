import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md'

import './styles.css'

function FileList({ files, onDelete }) {
    return (
        <ul className="container-ul">
            {files.map(uploadedFile => (
                <li key={uploadedFile.id}>
                    <span className="file-info">
                        <img src={uploadedFile.preview} alt="" className="preview"/>
                        <div>
                            <strong>{uploadedFile.name}</strong>
                            <span>
                                {uploadedFile.readableSize}{" "}
                                { !!uploadedFile.url && (
                                    <button onClick={() => onDelete(uploadedFile.id)}>Excluir</button>
                                ) }
                            </span>
                        </div>
                    </span>

                    <div>
                        {!uploadedFile.uploaded && !uploadedFile.error && (
                            <CircularProgressbar
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#affaaf' }
                                }}
                                strokeWidth={10}
                                value={uploadedFile.progress}
                            />
                        )}

                        {uploadedFile.url && (
                            <a href="http://localhost:3003/files/1090ce50d7fd8846860aab7570b10de8-índice.jpg" 
                                target="_blank" rel="noopener noreferrer"
                            >
                                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />    
                            </a>
                        )}

                        { uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" /> }
                        { uploadedFile.error && <MdError size={24} color="#e57878" /> }
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default FileList