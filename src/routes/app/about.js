export const path = '/a/{p*}'
export default (request)=>{  
  console.log(request.params) 
  return {}
}