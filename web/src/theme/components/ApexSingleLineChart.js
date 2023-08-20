import ReactApexChart from "react-apexcharts";

export const ApexSingleLineChart = ({ series, labels }) => {
  const options = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      labels: [],

      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3, 3, 3], // Set the stroke width to the desired value for each series
        curve: "smooth",
        dashArray: [0, 0, 0], // Set the dash array to [0, 0, 0] for solid lines
      },
      colors: ["#50CD89", "#D32F2F", "#FFD02B"],
      yaxis: {
        formatter: (value) => {
          return `${value} %`;
        },
      },
      legend: {
        position: "right",
        fontSize: "20px",
        fontWeight: 400,

        offsetY: 150,
      },
    },
  };
  return (
    <div id="chart" style={{ background: "white" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
        width={1200}
        style={{ width: "100%" }}
      />
    </div>
  );
};
