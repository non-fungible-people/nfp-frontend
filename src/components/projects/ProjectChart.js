import {useEffect, useRef, useState} from "react";
import Chart from "react-apexcharts";
import {Box} from "@mui/material";
import {api} from "../../api/apiClient";

export const ProjectChart = ({symbol}) => {
  const chartRef = useRef()
  const [series, setSeries] = useState([])

  async function getPriceHistory(symbol) {
    return await api.get(`/price/history?symbol=${symbol.toUpperCase()}`)
  }

  useEffect(() => {
    getPriceHistory(symbol)
      .then(response => {
        let history = response.data.data
        let chartData = history.map(history => {
          let timestamp = Date.parse(history.createdAt)
          return [timestamp, history.price]
        })
        setSeries([{
          name: 'Price($)',
          data: chartData
        }])
      })
  }, [])

  const options = {
    options: {
      chart: {
        id: 'chart1',
        type: 'area',
        stacked: false,
        height: 300,
        toolbar: {
          autoSelected: 'pan',
        },
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        title: {
          text: 'Price'
        },
      },
      xaxis: {
        type: 'datetime',
      },
      tooltip: {
        shared: false,
        x: {
          format: 'yyyy MMM dd HH:mm:ss'
        },
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
    },
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
      <Box sx={{width: "95%",}}>
        <Chart options={options.options} series={series} type="area" width={"95%"} height={300}/>
      </Box>
    </Box>
  )
};

export default ProjectChart;
