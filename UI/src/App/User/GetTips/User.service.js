import { authHeader, handleResponse } from '../../../_helpers';
const config = {
    apiUrl: 'http://localhost:4000/api'
};
export const service = {
    getCommodities,
    getAll,
    getById,
    addOne,
    activateById,
    deleteById
};


function getCommodities() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/metal`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tip/approved`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/tip/${id}`, requestOptions).then(handleResponse);
}

function addOne(data) {
    const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(data) };
    return fetch(`${config.apiUrl}/tip`, requestOptions).then(handleResponse);
}

function activateById(id) {
    const requestOptions = { method: 'PUT', headers: authHeader() };
    return fetch(`${config.apiUrl}/tip/activate/${id}`, requestOptions).then(handleResponse);
}

function deleteById(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.apiUrl}/tip/${id}`, requestOptions).then(handleResponse);
}