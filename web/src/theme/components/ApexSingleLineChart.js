import ReactApexChart from "react-apexcharts";

const ApexSingleLineChart = ({ series, labels }) => {
  const options = {
    chart: {
      height: 350,
      type: "bar",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    labels: labels,
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
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={1200}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default ApexSingleLineChart;
