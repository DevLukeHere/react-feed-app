import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
const axios = require("axios");

export const useSignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signIn = async (email, password) => {
    setLoading(true);
    setError("");

    axios
      .post(`https://api.realworld.io/api/users/login`, {
        user: {
          email: email,
          password: password,
        },
      })
      .then(function (response) {
        // handle success
        const user = response.data.user;

        localStorage.setItem("user", JSON.stringify(user)); // store user object to local storage after logging in
        dispatch({ type: "LOGIN", payload: user });
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setError(error);
        setLoading(false);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });
  };

  return { signIn, loading, error };
};
