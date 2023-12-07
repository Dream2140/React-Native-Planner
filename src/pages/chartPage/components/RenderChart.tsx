import { COLORS } from "@constants/globalStyles";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import React from "react";
import { ChartRenderDataType } from "../../../helpers/convertTaskListDataToChart";
import { ChartType } from "../ChartPage";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const chartHeight = screenHeight * 0.4;

interface RenderChartProps {
  chartData: ChartRenderDataType,
  chartType: ChartType
}

export const RenderChart: React.FC<RenderChartProps> = ({ chartData, chartType }) => {

  const additionalChartWidth = chartType === "month" ? 400 : 0;

  const chartConfig = {
    backgroundGradientFrom: COLORS.bgGray,
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(104, 113, 238, ${opacity})`,
    barPercentage: 0.5
  };

  const chartDataObject = {
    labels: chartData.label,
    datasets: [
      {
        data: chartData.data
      }
    ]
  };

  return (

    <BarChart
      data={chartDataObject}
      width={screenWidth + additionalChartWidth}
      height={chartHeight}
      chartConfig={chartConfig}
      fromZero={true}
      yAxisSuffix={""}
      yAxisLabel={""}
    />

  );
};
