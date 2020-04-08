import React, { useState } from 'react'
import { uniqueId } from 'lodash'
import fileSize from 'filesize'

import api from './services/api'

import './global.css'
import './styles.css'
import 'react-circular-progressbar/dist/styles.css'

import Upload from './components/Upload'
import FileList from './components/FileList'

function App() {
    const [ uploadedFiles, setUploadedFiles ] = useState([])

    function handleUpload(files) {
        const uploaded = files.map(file => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: fileSize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null
        }))

        const lotFiles = uploadedFiles.concat(uploaded)

        setUploadedFiles(lotFiles)

        uploaded.forEach(processUpload)
    }

    function updateFile(id, data) {
        const updateFiles = { uploadedFiles: uploadedFiles.map(file => {
            return id === file.id ? { ...file, ...data } : file
        }) }

        setUploadedFiles(updateFiles)
    }

    function processUpload(fileUploading) {
        const data = new FormData()

        data.append('file', fileUploading.file, fileUploading.name)

        api.post('posts', data, {
            onUploadProgress: e => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total))

                updateFile(fileUploading.id, {
                    progress: progress
                })
            }
        }).then(response => {
            updateFile(fileUploading.id, {
                uploaded: true,
                id: response.data._id,
                url: response.data.url
            })
        }).catch(() => {
            updateFile(fileUploading.id, {
                error: true
            })
        })
    }

    async function handleDelete(id) {
        await api.delete(`posts/${id}`)
        
        setUploadedFiles(uploadedFiles.filter(file => file.id !== id))
    }

    return (
        <div className="container">
            <div className="content">
                <Upload onUpload={handleUpload} />
                { !!uploadedFiles.length && (
                    <FileList files={uploadedFiles} onDelete={handleDelete} />
                ) }
            </div>
        </div>
    );
}

export default App;
