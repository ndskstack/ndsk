
// export const path = '/a'
// export default (request)=>{ 
//   return {}
// }

export const path = '/a/{p*}'
export default (request)=>{  
  console.log(request.params) 
  return {}
}