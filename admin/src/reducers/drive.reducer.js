import constants from "../constants";


const authenticateMember = (state, action) => {
    const cases = {
        [constants.drive.AUTH_MEMBER_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.AUTH_MEMBER_SUCCESS]: 
        {
            loading:false,
            error:null,
            url:action.url,
            files:action.files
        },

        [constants.drive.AUTH_MEMBER_FAIL]: 
        {
            loading:false,
            error:action.payload,
        },

        [constants.drive.AUTH_MEMBER_RESET]: 
        {
            loading:false,
            error:null,
            url:null,
            files:null
        }
    }

    return cases[action.type] || {...state}
}

const getAccessToken = (state, action) => {
    const cases = {
        [constants.drive.ACCESS_TOKEN_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.ACCESS_TOKEN_SUCCESS]: 
        {
            loading:false,
            error:null,
            files:action.payload
        },

        [constants.drive.ACCESS_TOKEN_FAIL]: 
        {
            loading:false,
            error:action.payload,
        },

        [constants.drive.ACCESS_TOKEN_RESET]: 
        {
            loading:false,
            error:null,
            files:null
        }
    }

    return cases[action.type] || {...state}
}

const deleteFile = (state, action) => {
    const cases = {
        [constants.drive.DELETE_FILE_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.DELETE_FILE_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.payload
        },

        [constants.drive.DELETE_FILE_FAIL]: 
        {
            loading:false,
            error:action.payload, 
        },

        [constants.drive.DELETE_FILE_RESET]: 
        {
            loading:false,
            error:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const downloadFile = (state, action) => {
    const cases = {
        [constants.drive.DOWNLOAD_FILE_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.DOWNLOAD_FILE_SUCCESS]: 
        {
            loading:false,
            error:null,
            fileData:action.payload
        },

        [constants.drive.DOWNLOAD_FILE_FAIL]: 
        {
            loading:false,
            error:action.payload, 
        },

        [constants.drive.DOWNLOAD_FILE_RESET]: 
        {
            loading:false,
            error:null,
            fileData:null
        }
    }

    return cases[action.type] || {...state}
}

const uploadFile = (state, action) => {
    const cases = {
        [constants.drive.UPLOAD_FILE_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.UPLOAD_FILE_SUCCESS]: 
        {
            loading:false,
            error:null,
            uploaded:action.uploaded,
            message:action.message
        },

        [constants.drive.UPLOAD_FILE_FAIL]: 
        {
            loading:false,
            error:action.payload, 
        },

        [constants.drive.UPLOAD_FILE_RESET]: 
        {
            loading:false,
            error:null,
            uploaded:null,
            message:null
        }
    }

    return cases[action.type] || {...state}
}

const resumeFile = (state, action) => {
    const cases = {
        [constants.drive.RESUME_FILE_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.RESUME_FILE_SUCCESS]: 
        {
            loading:false,
            error:null,
            message:action.message,
            range:action.range
        },

        [constants.drive.RESUME_FILE_FAIL]: 
        {
            loading:false,
            error:action.payload, 
        },

        [constants.drive.RESUME_FILE_RESET]: 
        {
            loading:false,
            error:null,
            message:null,
            range:null
        }
    }

    return cases[action.type] || {...state}
}

const searchFiles = (state, action) => {
    const cases = {
        [constants.drive.SEARCH_FILES_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.SEARCH_FILES_SUCCESS]: 
        {
            loading:false,
            error:null,
            files:action.payload,
        },

        [constants.drive.SEARCH_FILES_FAIL]: 
        {
            loading:false,
            error:action.payload, 
        },

        [constants.drive.SEARCH_FILES_RESET]: 
        {
            loading:false,
            error:null,
            files:null
        }
    }

    return cases[action.type] || {...state}
}


const deletePermission = (state, action) => {
    const cases = {
        [constants.drive.DELETE_FILE_PERMISSION_REQUEST]: 
        {
            loading:true,
            error:null
        },

        [constants.drive.DELETE_FILE_PERMISSION_SUCCESS]: 
        {
            loading:false,
            error:null,
            isSuccess:true
        },

        [constants.drive.DELETE_FILE_PERMISSION_FAIL]: 
        {
            loading:false,
            error:action.payload, 
        },

        [constants.drive.DELETE_FILE_PERMISSION_RESET]: 
        {
            loading:false,
            error:null,
            isSuccess:false
        }
    }

    return cases[action.type] || {...state}
}

const reducer = {
    authenticateMember,
    getAccessToken,
    uploadFile,
    downloadFile,
    deletePermission,
    deleteFile,
    resumeFile,
    searchFiles
}

export default reducer 