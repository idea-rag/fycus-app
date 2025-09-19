import CustomButton from "@/components/general/CustomButton";
import CustomView from "@/components/general/CustomView";
import { useTokenStore } from "@/store/useToken";
import ApiClient from "@/http/https";

export default function TestFocusPage() {
    //@ts-ignore
    const {token} = useTokenStore();

    const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL);
    const focusStart = async () => {
        try {
            const now = Math.floor(Date.now() / 1000); // Current time in seconds
            const response = await apiClient.startFocus({
                focusTime: "120",
                measureTime: 120,
                startTime: now - 600,  // 10 minutes ago
                endTime: now,         // Now
                whenDay: 20250920     // Example date YYYYMMDD
            });
            apiClient.setToken(token);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <CustomView
            style={{
                flex: 1,
            }}
            width={"100%"}
            height={"100%"}
        >
            <CustomButton
                text="Focus Start"
                onPress={focusStart}
            />
        </CustomView>
    );
}