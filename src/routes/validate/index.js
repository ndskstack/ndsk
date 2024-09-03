import Joi from 'joi'
export const options = {
    validate:{
      query:Joi.object({
        id:Joi.number().min(5).max(30).required()
      })                       
    }
};
export default (request)=>{
    return request.query;
}