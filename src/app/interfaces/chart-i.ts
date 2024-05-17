export interface ChartI {
  labels: string[];
  datasets: ChartDatasets[];
}

interface ChartDatasets {
  label: string;
  data: number[];
}
