export const checkValidData = (email: string, password: string, name: string) => {
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
      email
    );
  
    const isPasswordValid =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    
    // if (name != 'undefined') {
    //   const isValidName =  name ? /^([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/.test(name) : false;    
    //   if (!isValidName) return 'Name is not valid';
    // }
  

    if (!isEmailValid) return 'Email ID is not valid';
    if (!isPasswordValid) return 'Password is not valid';
  
    return null;
};