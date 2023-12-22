<template>
  <bar-chart :data="data" :options="options" />
</template>

<script lang="ts">
import { Bar, mixins } from "vue-chartjs"

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  data() {
    return {
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>

<style>
/* Add your styles here */
</style>
