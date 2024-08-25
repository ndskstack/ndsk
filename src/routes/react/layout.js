export default (request)=>{
    let title = ['/react','/react/index'].includes(request.path) ? 'page-react-index' :'page-layout-about';
    return {title}
}