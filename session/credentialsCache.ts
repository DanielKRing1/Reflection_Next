export default (() => {
    // Closure-protected values
    let _userId: string = "";
    let _password: string = "";

    const isEmpty = () => _userId === "" && _password === "";

    // Update values
    const setCredentials = (userId: string, password: string) => {
        _userId = userId;
        _password = password;
    };

    return {
        userId: _userId,
        password: _password,
        isEmpty,
        setCredentials,
    };
})();
