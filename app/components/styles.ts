export const bg_img=(address:string)=>{
    return({
        background:`url(${address})`,
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundSize:"cover"
    })
}