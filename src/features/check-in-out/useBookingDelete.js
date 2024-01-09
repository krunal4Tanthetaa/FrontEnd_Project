/* eslint-disable no-undef */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useBookingDelete() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,

        onSuccess: () => {
            toast.success(`Booking successfully Delete`);
            queryClient.invalidateQueries({ queryKey: ["bookings"] });
        },

        onError: (error) => {
            toast.error(err.message);
            console.log(error);
        },
    });

    return { deleteBooking, isDeleting };
}
