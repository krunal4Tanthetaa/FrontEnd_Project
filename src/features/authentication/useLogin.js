// import the necessary dependencies
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    // access the queryClient and navigate functionalities
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // use the useMutation hook from react-query
    const { mutate: login, isLoading } = useMutation({
        // specify the mutation function, which calls the loginApi service
        mutationFn: ({ email, password }) =>
            loginApi({
                email,
                password,
            }),

        // handle successful login attempts
        onSuccess: (user) => {
            // set the user data in the queryClient cache
            queryClient.setQueryData(["user"], user.user);
            // navigate to the dashboard page, replacing the current history entry
            navigate("/dashboard" , { replace: true });
        },

        // handle login errors
        onError: (err) => {
            // log the error to the console
            console.log("ERROR", err);
            // display a toast notification to inform the user about the error
            toast.error("Provided email or password are incorrect");
        },
    });

    // return the login function and the isLoading status
    return { login, isLoading };
}