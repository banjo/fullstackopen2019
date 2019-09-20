import React from 'react';

const LoginForm = ({ loginHandler, username, password }) => {
    return (
        <form onSubmit={loginHandler}>
            <div>
                Username <input {...username} />
            </div>
            <div>
                Password <input {...password} />
            </div>
            <div>
                <input type="submit" value="Login" />
            </div>
        </form>
    );
};

export default LoginForm;
