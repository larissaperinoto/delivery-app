import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <form>
      <label htmlFor="common_login__input-email">
        <input
          type="email"
          placeholder="Email"
          data-testid="common_login__input-email"
        />
      </label>
      <label htmlFor="common_login__input-password">
        <input
          type="password"
          placeholder="Password"
          data-testid="common_login__input-password"
        />
      </label>
      <button type="submit" data-testid="common_login__button-login">
        Login
      </button>
      <Link to="/register">
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </Link>
    </form>
  );
}
