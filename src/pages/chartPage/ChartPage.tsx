import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

import { TaskModel } from "@models/task.model";
import taskService from "@services/task.service";
import { selectUserInfo } from "@store/reducers/userSlice";
import { COLORS } from "@constants/globalStyles";
import { convertTaskListDataToChart } from "../../helpers/convertTaskListDataToChart";
import { Toolbar } from "@components/toolbar";
import styles from "./chart.styles";
import { RenderChart } from "./components/RenderChart";

export type ChartType = "week" | "year" | "month";

const ChartTypes: ChartType[] = ["week", "month", "year"];

const ONE_WEEK = 6 * 24 * 60 * 60 * 1000;
const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

export const ChartPage = () => {
  const [data, setData] = useState<TaskModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [chartType, setChartType] = useState<ChartType>("week");
  const { id: userId } = useSelector(selectUserInfo) ?? { id: "" };

  const fetchData = async () => {
    try {
      setLoading(true);

      const endDate = new Date().getTime();
      let startDate = endDate;

      if (chartType === "week") {
        startDate -= ONE_WEEK;
      } else if (chartType === "month") {
        startDate -= ONE_MONTH;
      } else {
        startDate -= ONE_YEAR;
      }

      const response = await taskService.getTasksByDateRange(userId, startDate, endDate);

      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

  }, [chartType]);

  const convertedData = useMemo(() => {
    return convertTaskListDataToChart(data, chartType);
  }, [chartType, loading]);


  return (
    <View style={styles.container}>
      <Toolbar>
        <Text style={styles.title}> Charts</Text>
      </Toolbar>
      <View style={styles.chartContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primaryViolent} />
        ) : (
          <ScrollView horizontal={true}>
            <View style={styles.chartContainer}>
              <RenderChart chartData={convertedData} chartType={chartType} />
            </View>
          </ScrollView>
        )
        }
      </View>
      <View style={styles.btnContainer}>
        {ChartTypes.map(chartItem => (
          <TouchableOpacity style={[styles.btn, chartType === chartItem && styles.activeBtn]} key={chartItem}
                            onPress={() => setChartType(chartItem)}>
            <Text style={[styles.btnText, chartType === chartItem ? styles.activeBtnText : null]}>{chartItem}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
