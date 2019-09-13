import React from 'react';

const LoginForm = ({ loginHandler, setLogin, login }) => {
    const handleChange = (event) => {
        // update password and username
        if (event.target.name === 'password') {
            setLogin({ ...login, password: event.target.value });
        } else if (event.target.name === 'username') {
            setLogin({ ...login, username: event.target.value });
        }
    };

    return (
        <form onSubmit={loginHandler}>
            <div>
				Username <input type="text" name="username" onChange={handleChange} />
            </div>
            <div>
				Password <input type="password" name="password" onChange={handleChange} />
            </div>
            <div>
                <input type="submit" value="Login" />
            </div>
        </form>
    );
};

export default LoginForm;
