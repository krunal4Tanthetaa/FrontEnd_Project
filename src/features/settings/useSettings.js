import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
    const {
        isLoding,
        error,
        data: settings,
    } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    });

    return { isLoding, error, settings };
}
