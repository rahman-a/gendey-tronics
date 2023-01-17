import constants from "../constants";


const dashboardInfo = (state, action) => {
    const cases = {
        [constants.dashboard.DASHBOARD_INFO_REQUEST]:
        {
            loading:true,
            error:null
        },
        [constants.dashboard.DASHBOARD_INFO_SUCCESS]: 
        {
            loading:false,
            error:null,
            info:action.payload
        },
        [constants.dashboard.DASHBOARD_INFO_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.dashboard.DASHBOARD_INFO_RESET]: 
        {
            loading:false,
            error:null,
            info:null
        }

    }

    return cases[action.type] || {...state}
}

const latestUsers = (state, action) => {
    const cases = {
        [constants.dashboard.LATEST_USERS_REQUEST]:
        {
            loading:true,
            error:null
        },
        [constants.dashboard.LATEST_USERS_SUCCESS]: 
        {
            loading:false,
            error:null,
            users:action.payload
        },
        [constants.dashboard.LATEST_USERS_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.dashboard.LATEST_USERS_RESET]: 
        {
            loading:false,
            error:null,
            users:null
        }

    }

    return cases[action.type] || {...state}
}

const latestOrders = (state, action) => {
    const cases = {
        [constants.dashboard.LATEST_ORDERS_REQUEST]:
        {
            loading:true,
            error:null
        },
        [constants.dashboard.LATEST_ORDERS_SUCCESS]: 
        {
            loading:false,
            error:null,
            orders:action.payload
        },
        [constants.dashboard.LATEST_ORDERS_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.dashboard.LATEST_ORDERS_RESET]: 
        {
            loading:false,
            error:null,
            orders:null
        }

    }

    return cases[action.type] || {...state}
}

const latestEnrollments = (state, action) => {
    const cases = {
        [constants.dashboard.LATEST_ENROLLMENTS_REQUEST]:
        {
            loading:true,
            error:null
        },
        [constants.dashboard.LATEST_ENROLLMENTS_SUCCESS]: 
        {
            loading:false,
            error:null,
            enrollments:action.payload
        },
        [constants.dashboard.LATEST_ENROLLMENTS_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.dashboard.LATEST_ENROLLMENTS_RESET]: 
        {
            loading:false,
            error:null,
            enrollments:null
        }

    }

    return cases[action.type] || {...state}
}

const latestContactsInfo = (state, action) => {
    const cases = {
        [constants.dashboard.LATEST_CONTACTS_INFO_REQUEST]:
        {
            loading:true,
            error:null
        },
        [constants.dashboard.LATEST_CONTACTS_INFO_SUCCESS]: 
        {
            loading:false,
            error:null,
            contacts:action.payload
        },
        [constants.dashboard.LATEST_CONTACTS_INFO_FAIL]: 
        {
            loading:false,
            error:action.payload
        },
        [constants.dashboard.LATEST_CONTACTS_INFO_RESET]: 
        {
            loading:false,
            error:null,
            contacts:null
        }

    }

    return cases[action.type] || {...state}
}

const reducer =  {
    dashboardInfo,
    latestContactsInfo,
    latestEnrollments,
    latestOrders,
    latestUsers
}

export default reducer