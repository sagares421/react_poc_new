import { commodityConstants } from '../_constants/commodity.constants';

function getCommodity(data){
    return { type: commodityConstants.GET_COMMODITY, data };
}

function addCommodity(data){
    return { type: commodityConstants.ADD_COMMODITY, data };
}

function updateCommodity(data){
    return { type: commodityConstants.UPDATE_COMMODITY, data };
}

function deleteCommodity(data){
    return { type: commodityConstants.DELETE_COMMODITY, data };
}

export const commodityActions = {
    getCommodity,
    addCommodity,
    updateCommodity,
    deleteCommodity
}