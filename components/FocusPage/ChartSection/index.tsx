import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { SPACING } from "@/styles/spacing";
import { CartesianChart, Line, Scatter } from "victory-native";

export default function ChartSection() {
    return (
        <CustomView>
            <CartesianChart
                data={[]}
                xKey="time"
                yKeys={["focusTime"]}
                axisOptions={{
                    labelOffset : 30,
                    formatXLabel:  (value) => `${value}`,
                    formatYLabel: (value) => `${value}`,
                    labelColor: 'black',
                    tickCount: 5,
                }}
                domainPadding={{left : SPACING.medium, right : SPACING.medium, top : SPACING.medium, bottom : SPACING.medium}}
                frame={{
                    lineWidth : 0,
                }}
            >
                {({ points, chartBounds }) => (
                    <>
                        <Line
                            points={points.focusTime}
                            color={COLORS.brand.primary}
                            strokeWidth={2}
                        />
                        <Scatter
                            points={points.focusTime}
                            color={COLORS.brand.primary}
                            radius={5}
                            style="fill"
                        />
                    </>
                )}
            </CartesianChart>
        </CustomView>
    )
}