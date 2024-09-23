export default (props)=>{
    return (
        <div>
            <h1>{props.name}</h1>
            {props.children}
        </div>
    )
}