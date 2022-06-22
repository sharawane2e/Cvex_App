export const getBaselinechartOptions = () => {
  const options: any = {
    title: {
      text: "",
    },
    xAxis: {
      tickLength: 0,
      categories: ["Baseline", "Possible future baseline"],
      gridLineWidth: 0,
    },
    yAxis: {
      tickLength: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: false,
      plotLines: [
        {
          color: "#000000",
          value: 0,
          zIndex: 5,
        },
      ],
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
      dataLabels: {
        formatter: function (y: any) {
          return Math.abs(y) + "%";
        },
      },
    },
    legend: {
      enabled: false,
    },
  };

  return options;
};

export const getPotentialchartOptions = () => {
  const options: any = {
    title: {
      text: "Baseline",
      useHTML: true,
      style: {
        color: "#fff",
        "background-color": "#ccc",
        fontWeight: "bold",
      },
    },
    xAxis: {
      tickInterval: 0,
      type: "category",
      gridLineWidth: 0,
    },

    yAxis: {
      tickInterval: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: "",
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormat: "<b>${point.y:,.2f}</b> USD",
    },
  };

  return options;
};

export const getSegmentchartOptions = () => {
  const options: any = {
    title: {
      text: "Baseline",
      useHTML: true,
      style: {
        color: "#fff",
        "background-color": "#ccc",
        fontWeight: "bold",
      },
    },
    xAxis: {
      tickInterval: 0,
      type: "category",
      gridLineWidth: 0,
    },

    yAxis: {
      tickInterval: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: "",
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormat: "<b>${point.y:,.2f}</b> USD",
    },
  };

  return options;
};

export const getBarchartOptions = () => {
  const options: any = {
    title: {
      text: "Baseline",
      useHTML: true,
      style: {
        color: "#fff",
        "background-color": "#ccc",
        fontWeight: "bold",
      },
    },
    xAxis: {
      tickInterval: 0,
      type: "category",
      gridLineWidth: 0,
    },

    yAxis: {
      tickInterval: 0,
      labels: {
        enabled: false,
      },
      gridLineWidth: 0,
      title: "",
    },

    legend: {
      enabled: false,
    },

    tooltip: {
      pointFormat: "<b>${point.y:,.2f}</b> USD",
    },
  };

  return options;
};
