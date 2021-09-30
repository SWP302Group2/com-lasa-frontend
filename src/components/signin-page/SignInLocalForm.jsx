function SignInLocalForm() {
  return (
    <article className="sign-in__local">
      <h2 className="sign-in__sub-headline sign-in__sub-headline--local">
        Sign in
      </h2>
      <form className="sign-in__form" id="form-sign-in">
        <div className="sign-in__control">
          <input
            className="sign-in__input"
            id="username"
            type="text"
            name="txtUser"
            placeholder=" "
          />
          <label className="sign-in__label" htmlFor="username">
            Username
          </label>
        </div>
        <div className="sign-in__control">
          <input
            className="sign-in__input"
            id="password"
            type="password"
            name="txtPass"
            placeholder=" "
          />
          <label className="sign-in__label" htmlFor="password">
            Password
          </label>
        </div>
        <button className="sign-in__button" name="btAction" value="sign-in">
          Submit
        </button>
      </form>
    </article>
  );
}

export default SignInLocalForm;
