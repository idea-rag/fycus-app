import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { ChartDataPoint } from "@/types/chart";
import { CartesianChart, Line } from "victory-native";

interface ChartSectionProps {
  data: ChartDataPoint[];
}

export default function ChartSection({ data = [] }: ChartSectionProps) {
  return (
    <CustomView width={'100%'} height={300}>
      <CartesianChart
        data={data}
        xKey="time"
        yKeys={["focusTime"]}
        frame={{ lineWidth: 0 }}
        domain={{ x: [0, 9], y: [-2, 12] }}  
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
  );
}
