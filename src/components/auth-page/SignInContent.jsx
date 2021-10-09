import "../../assets/css/signInContent.css";

function SignInContent() {
    return (
        <div className="sign-in">
            <h2 className="sign-in__title">Welcome Back</h2>
            <div className="google">
                <div className="google__button">
                    <div id="google-signin">
                        <span className="icon"></span>
                        <span className="text">Sign in with Google</span>
                    </div>
                </div>
            </div>

            <div className="local">
                <form className="local__form" id="form-sign-in-local">
                    <div className="local__control">
                        <input
                            className="local__input"
                            id="username"
                            type="text"
                            name="username"
                            placeholder=" "
                        />
                        <label className="local__label" htmlFor="username">
                            Username
                        </label>
                    </div>
                    <div className="local__control">
                        <input
                            className="local__input"
                            id="password"
                            type="password"
                            name="password"
                            placeholder=" "
                        />
                        <label className="local__label" htmlFor="password">
                            Password
                        </label>
                    </div>
                    <button
                        className="local__button"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignInContent;