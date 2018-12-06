import React from "react";

class LoginForm extends React.Component {
  // refs
  form: null;
  emailElem: null;
  passwordElem: null;

  render() {
    const { onLogin } = this.props;
    return (
      <div className="container">
        <form
          ref={elem => (this.form = elem)}
          onSubmit={e => {
            e.preventDefault();
            return onLogin({
              email: this.emailElem.value,
              password: this.passwordElem.value
            });
          }}
        >
          <input
            ref={input => (this.emailElem = input)}
            type="text"
            name="email"
            placeholder="Enter Email"
          />
          <input
            ref={input => (this.passwordElem = input)}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="btn btn-default" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
