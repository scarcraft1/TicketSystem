/**
 *  Has minimum 8 characters in length.
    At least one uppercase English letter.
    At least one lowercase English letter.
    At least one digit.
    At least one special character.
 */
const PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export {PASSWORD};
