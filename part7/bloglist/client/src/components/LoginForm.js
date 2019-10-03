import React from 'react';

const LoginForm = ({ loginHandler, username, password }) => {
    return (
        <form onSubmit={loginHandler}>
            <div>
                Username <input {...username.bind} />
            </div>
            <div>
                Password <input {...password.bind} />
            </div>
            <div>
                <input type="submit" value="Login" />
            </div>
        </form>
    );
};

export default LoginForm;
