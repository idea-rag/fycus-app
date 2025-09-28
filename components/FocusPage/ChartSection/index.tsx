import CustomView from "@/components/general/CustomView";
import { COLORS } from "@/styles/colors";
import { ChartDataPoint } from "@/types/chart";
import { CartesianChart, Line } from "victory-native";

interface ChartSectionProps {
  data: ChartDataPoint[];
}

export default function ChartSection({ data = [] }: ChartSectionProps) {
  // Calculate dynamic domain based on data
  const getYDomain = () => {
    if (data.length === 0) return [0, 10] as [number, number];
    
    const values = data.map(d => d.focusTime).filter(Number.isFinite) as number[];
    if (values.length === 0) return [0, 10] as [number, number];
    
    const min = Math.max(0, Math.min(...values) - 1);
    const max = Math.max(10, Math.max(...values) + 1);
    
    return [min, max] as [number, number];
  };
  
  const yDomain = getYDomain();

  return (
    <CustomView width={'100%'} height={300}>
      <CartesianChart
        data={data}
        xKey="time"
        yKeys={["focusTime"]}
        domain={{ y: yDomain }}
        padding={{ left: 50, right: 20, top: 20, bottom: 30 }}
      >
        {({ points }) => (
          <Line
            points={points.focusTime}
            color={COLORS.brand.primary}
            strokeWidth={2.5}
            curveType="natural"
          />
        )}
      </CartesianChart>
    </CustomView>
  );
}
