export const validateSignUpData = ({ name, email, password, username, confirmPassword }) => {
    if (!name) {
        return "Name can't be empty";
    }
    if (!email) {
        return "Email can't be empty";
    }
    // Check email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }
    if (!username) {
        return "Username can't be empty";
    }
    if (!password) {
        return "Password can't be empty";
    }
    // Check password strength (at least 8 characters, with at least one lowercase, one uppercase, one digit, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
    }
    if (password !== confirmPassword) {
        return "Password does not match";
    }
    return null;
};

export const validateLoginData=({ loginId, password})=>{
    if(!loginId) return "Email/username can't be empty"
    if(!password) return "Password can't be empty"
    return null
}