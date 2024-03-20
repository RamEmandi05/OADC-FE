const genericValidators = {
    "email": ((email) => {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!EMAIL_REGEXP.test(email)) {
            return false;
        }
        return true;
    }),
    "phone": ((phone) => {  
        var phone_REGEXP = /^\d{10}$/;  ///^[+]?\d{3}\d{3}\d{4}$/

        if (!phone_REGEXP.test(phone)) {
            return false;
        }
        return true;
    }),
}
export default  genericValidators