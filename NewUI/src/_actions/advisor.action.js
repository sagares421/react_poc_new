import { advisorConstants } from '../_constants/advisor.constants';

function getAdvisor(data){
    return { type: advisorConstants.GET_ADVISOR, data };
}

function addAdvisor(data){
    return { type: advisorConstants.ADD_ADVISOR, data };
}

function updateAdvisor(data){
    return { type: advisorConstants.UPDATE_ADVISOR, data };
}

function deleteAdvisor(data){
    return { type: advisorConstants.DELETE_ADVISOR, data };
}

export const advisorActions = {
    getAdvisor,
    addAdvisor,
    updateAdvisor,
    deleteAdvisor
}