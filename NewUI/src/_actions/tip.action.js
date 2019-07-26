import { tipConstants } from '../_constants/tip.constants';

function getTip(data){
    return { type: tipConstants.GET_TIP, data };
}

function addTip(data){
    return { type: tipConstants.ADD_TIP, data };
}

function updateTip(data){
    return { type: tipConstants.UPDATE_TIP, data };
}

function deleteTip(data){
    return { type: tipConstants.DELETE_TIP, data };
}

function activateTip(data){
    return { type: tipConstants.ACTIVATE_TIP, data };
}

function deActivateTip(data){
    return { type: tipConstants.DE_ACTIVATE_TIP, data };
}

export const advisorActions = {
    getTip,
    addTip,
    updateTip,
    deleteTip,
    activateTip,
    deActivateTip
}