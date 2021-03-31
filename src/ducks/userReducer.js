import axios from 'axios';

// Create the base action types we will use
const REQUEST_USER_DATA = 'REQUEST_USER_DATA';

const initialState = {
    email: null,
    firstname: null,
    lastname: null
}

//The action creator here defines an action type and payload that wil be used by the reducer function to update values in the redux store. This function itself will be invoked in a component via props once that component has connected to a it via the connnect method
export const requestUserData = () => {
    let data = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

export default function reducer(state = initialState, action){

    // Using a switch statment Inside of this Function enables the redux store to update its state dynamically based on the action type passed in. This function runs when the action creators are invoked in a component.

    // TIP: You will use the promise based syn '_FUFILLED' because 'FULFILLED'/'PENDING'/'REJECTED' is added by redux-promise-middleware when making promise based requests (Requests that receive responses) through redux. Actions that are not related to promise based request SHOULD NOT have 'FULFILLED'/'PENDING'/'REJECTED' concatenated to them. If you DID NOT use redux-promise-middleware, you should also NOT concatenate those strings.
    switch(action.type){
        case REQUEST_USER_DATA + '_FULFILLED':
            const { email, firstName, lastName } = action.payload.user
            return { email, firstName, lastName};
            default:
                return state;
    }
}