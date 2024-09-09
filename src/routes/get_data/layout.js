export default (request)=>{
    let title = "get data"
    let desciption = 'default descript'
    let keywords = 'default keywords'
    let author = 'default author'
    if(request.path === '/get_data/app'){
        title = "app title";
        desciption = "app descript"
        keywords = 'app keywords'
        author = 'app author'
    }
    return {title,desciption,keywords,author}
}