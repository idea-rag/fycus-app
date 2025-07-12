import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { CartesianChart, Line } from "victory-native";

export default function ChartSection() {
    return (
        <CustomView
            width={'100%'}
            height={250}
        >
            <CartesianChart
                data={[
                    {time : 1, focusTime : 1},
                    {time : 2, focusTime : 2},
                    {time : 3, focusTime : 3},
                    {time : 4, focusTime : 4},
                    {time : 5, focusTime : 5},
                    {time : 6, focusTime : 6},
                    {time : 7, focusTime : 7},
                    {time : 8, focusTime : 8},
                    {time : 9, focusTime : 9},
                    {time : 10, focusTime : 10},
                    {time : 11, focusTime : 12},
                    {time : 12, focusTime : 14},
                    {time : 13, focusTime : 16},
                    {time : 14, focusTime : 18},
                    {time : 15, focusTime : 22},
                    {time : 16, focusTime : 18},
                    {time : 17, focusTime : 22},
                    {time : 18, focusTime : 18},
                    {time : 19, focusTime : 22},
                    {time : 20, focusTime : 18},
                    {time : 21, focusTime : 22},
                    {time : 22, focusTime : 18},
                    {time : 23, focusTime : 22},
                    {time : 24, focusTime : 18},
                    {time : 25, focusTime : 22},
                    {time : 26, focusTime : 18},
                    {time : 27, focusTime : 22},
                    {time : 28, focusTime : 18},
                    {time : 29, focusTime : 22},
                    {time : 30, focusTime : 18},
                ]}
                xKey="time"
                yKeys={["focusTime"]}
                frame={{
                    lineWidth : 0,
                }}
            >
                {({ points }) => (
                    <>
                        <Line
                            points={points.focusTime}
                            color={COLORS.brand.primary}
                            strokeWidth={2}
                        />
                    </>
                )}
            </CartesianChart>
        </CustomView>
    )
}