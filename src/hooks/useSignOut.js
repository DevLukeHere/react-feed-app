import { useAuthContext } from "./useAuthContext";

export const useSignOut = () => {
  const { dispatch } = useAuthContext();
  
  const signOut = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch signout action
    dispatch({ type: "LOGOUT" });
  };

  return { signOut };
};
