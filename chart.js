// Fetch weights and render chart
async function renderWeightChart() {
  try {
    let { data: weights, error } = await supabasePublicClient
      .from("weights")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching weights:", error);
      return;
    }

    // Prepare data for Chart.js
    const dates = weights.map((w) => {
      const utcDate = new Date(w.date);
      const localDate = new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      );
      return localDate.toLocaleDateString();
    });
    const weightValues = weights.map((w) => w.weight);

    // Create chart
    const ctx = document.getElementById("weightChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Weight",
            data: weightValues,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Weight",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      },
    });
  } catch (err) {
    console.error("Chart rendering error:", err);
  }
}

renderWeightChart();
