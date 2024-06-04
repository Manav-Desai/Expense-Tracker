export const checkValidateData = (email,password) => {

    if(email === "")
        return "Email Address is required";

    if(password === "")
        return "Password is required";

    const epattern = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/
    const isEmailValid = epattern.test(email);

    if(!isEmailValid)
        return "Email Address is not valid";

        /*
        Password must contain atleast one special,uppercase,number,lowercase character
        */
    return null;
}