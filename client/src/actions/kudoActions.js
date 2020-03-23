import axios from 'axios';
import { GET_ERRORS } from './types';
import { GET_GIVEN_KUDOS, GET_KUDOS} from './types';

export const getKudos = () => dispatch => {
    console.log('Kudos done');
    axios.get('/api/kudos')
        .then(res => {
            const kudos = res.data;
            dispatch({
                type: GET_KUDOS,
                payload: kudos
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
export const getGivenKudos = () => dispatch => {
    axios.get('/api/kudos/givenkudos')
        .then(res => {
            console.log('get given kudos');
            const kudos = res.data;
            console.log(kudos);
            dispatch({
                type: 'GET_GIVEN_KUDOS',
                payload: kudos
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
export const getKudosCount = () => dispatch => {
    axios.get('/api/kudos/kudoscount')
        .then(res => {
            const kudoscount = res.data;
            console.log('kudos_count', kudoscount)
            dispatch({
                type: 'GET_KUDOS_COUNT',
                payload: kudoscount
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
export const giveKudos = kudosData => dispatch => {
    console.log('Give kudos');
    axios.post('/api/kudos', kudosData)
        .then(res => {
            axios.get('/api/kudos/givenkudos')
        .then(res => {
            console.log('get given kudos');
            const kudos = res.data;
            console.log(kudos);
            dispatch({
                type: 'GET_GIVEN_KUDOS',
                payload: kudos
            })
            dispatch({
                type: 'REDUCE_KUDO_COUNT',
                
            })
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
            console.log('Kudo Given')})
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}