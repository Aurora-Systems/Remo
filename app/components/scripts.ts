export const is_password_strong = (value:string)=>{
    const regex_strip = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex_strip.test(value)
}