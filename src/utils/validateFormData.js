export const validateSignUpData=({name, email, password,username, confirmPassword})=>{
    if(!name) return "Name can't be empty"
    if(!email) return "Email can't be empty"
    if(!username) return "Username can't be empty"
    if(!password) return "Password can't be empty"
    if(password!==confirmPassword) return "Password does not match"
    return null
}
export const validateLoginData=({ loginId, password})=>{
    if(!loginId) return "Email/username can't be empty"
    if(!password) return "Password can't be empty"
    return null
}