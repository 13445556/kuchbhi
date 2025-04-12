document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab")

      // Remove active class from all tabs and contents
      tabBtns.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      btn.classList.add("active")
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })

  // Initialize charts
  initializeCharts()

  // AI Insights and Recommendations
  const insightsTab = document.querySelector('[data-tab="insights"]')
  const recommendationsTab = document.querySelector('[data-tab="recommendations"]')
  const refreshInsightsBtn = document.getElementById("refresh-insights")
  const refreshRecommendationsBtn = document.getElementById("refresh-recommendations")

  // Function to simulate API call for insights
  function fetchAIInsights() {
    const insightsLoading = document.getElementById("insights-loading")
    const insightsResponse = document.getElementById("insights-response")
    const insightsGrid = document.getElementById("insights-grid")

    // Show loading, hide other content
    insightsLoading.classList.remove("hidden")
    insightsResponse.classList.add("hidden")
    insightsGrid.classList.add("hidden")

    // Simulate API call delay
    setTimeout(() => {
      // Hide loading
      insightsLoading.classList.add("hidden")

      // Prepare AI response
      const healthMetrics = {
        heartRate: "78 bpm (avg over 24 hours)",
        bloodPressure: "120/78 (last reading at 8:30 AM)",
        hydration: "70% (5% below optimal)",
        sleepQuality: "80% (7.2 hrs, 10% better than last week)",
      }

      // Simulate GPT response
      const aiResponse = generateAIInsights(healthMetrics)

      // Display response
      insightsResponse.innerHTML = aiResponse
      insightsResponse.classList.remove("hidden")

      // Show insights grid after a delay
      setTimeout(() => {
        insightsGrid.classList.remove("hidden")
      }, 500)
    }, 2000) // 2 second delay to simulate API call
  }

  // Function to simulate API call for recommendations
  function fetchAIRecommendations() {
    const recommendationsLoading = document.getElementById("recommendations-loading")
    const recommendationsResponse = document.getElementById("recommendations-response")
    const recommendationsCard = document.getElementById("recommendations-card")

    // Show loading, hide other content
    recommendationsLoading.classList.remove("hidden")
    recommendationsResponse.classList.add("hidden")
    recommendationsCard.classList.add("hidden")

    // Simulate API call delay
    setTimeout(() => {
      // Hide loading
      recommendationsLoading.classList.add("hidden")

      // Prepare AI response
      const healthMetrics = {
        heartRate: "78 bpm (avg over 24 hours)",
        bloodPressure: "120/78 (stable)",
        hydration: "70% (5% below optimal)",
        sleepQuality: "80% (7.2 hrs, improved 10% from last week)",
      }

      // Simulate GPT response
      const aiResponse = generateAIRecommendations(healthMetrics)

      // Display response
      recommendationsResponse.innerHTML = aiResponse
      recommendationsResponse.classList.remove("hidden")

      // Show recommendations card after a delay
      setTimeout(() => {
        recommendationsCard.classList.remove("hidden")
      }, 500)
    }, 2000) // 2 second delay to simulate API call
  }

  // Simulate GPT response for insights
  function generateAIInsights(metrics) {
    // This would normally be the response from the OpenAI API
    const insights = [
      `Your <span class="highlight">heart rate</span> of ${metrics.heartRate.split(" ")[0]} bpm is slightly elevated compared to yesterday, but it's still within a normal range.`,
      `<span class="highlight">Blood pressure</span> at ${metrics.bloodPressure.split(" ")[0]} is stable and healthy — great job maintaining this!`,
      `Your <span class="highlight">hydration level</span> is ${metrics.hydration.split(" ")[0]}, which is ${metrics.hydration.split("(")[1].replace(")", "")} of where we'd like to see it. Try to increase your fluid intake, especially in the afternoon.`,
      `<span class="highlight">Sleep quality</span> has improved by ${metrics.sleepQuality.split("better than")[1].trim()} — that's a fantastic trend to keep up! Your current average of ${metrics.sleepQuality.split("hrs")[0].trim()} hours is ideal for your age group.`,
    ]

    let html =
      '<div class="ai-thinking"><span>AI analyzed your data</span><div class="thinking-dots"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div></div>'
    html += "<h3>Your Health Insights</h3>"

    insights.forEach((insight, index) => {
      html += `<p style="animation-delay: ${index * 0.2}s">${insight}</p>`
    })

    return html
  }

  // Simulate GPT response for recommendations
  function generateAIRecommendations(metrics) {
    // This would normally be the response from the OpenAI API
    const recommendations = [
      {
        title: "Increase Water Intake",
        description:
          "Drink at least 2 extra glasses of water daily, especially between 2-4 PM when your hydration typically drops.",
        icon: "💧",
      },
      {
        title: "Evening Walk",
        description: "Add a 20-minute evening walk to help regulate your heart rate and improve sleep quality.",
        icon: "🚶",
      },
      {
        title: "Maintain Sleep Schedule",
        description:
          "Continue your current sleep routine — your sleep quality is improving! Try to maintain consistent bedtime and wake-up times.",
        icon: "🌙",
      },
    ]

    let html =
      '<div class="ai-thinking"><span>AI generated recommendations</span><div class="thinking-dots"><div class="thinking-dot"></div><div class="thinking-dot"></div><div class="thinking-dot"></div></div></div>'
    html += "<h3>Your Personalized Health Recommendations</h3>"

    recommendations.forEach((rec, index) => {
      html += `
        <div class="ai-response-item" style="animation-delay: ${index * 0.2}s">
          <div class="ai-response-icon">${rec.icon}</div>
          <div class="ai-response-content">
            <h4>${rec.title}</h4>
            <p>${rec.description}</p>
          </div>
        </div>
      `
    })

    return html
  }

  // Event listeners for tabs and refresh buttons
  if (insightsTab) {
    insightsTab.addEventListener("click", fetchAIInsights)
  }

  if (recommendationsTab) {
    recommendationsTab.addEventListener("click", fetchAIRecommendations)
  }

  if (refreshInsightsBtn) {
    refreshInsightsBtn.addEventListener("click", fetchAIInsights)
  }

  if (refreshRecommendationsBtn) {
    refreshRecommendationsBtn.addEventListener("click", fetchAIRecommendations)
  }
})

function initializeCharts() {
  // Heart Rate Chart - Pure JS implementation
  const heartRateData = [72, 75, 78, 74, 76, 70, 72]
  const heartRateLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  createSimpleChart("heartRateChart", heartRateData, heartRateLabels, "#0a5f9e", "bpm")

  // Sleep Chart - Pure JS implementation
  const sleepData = [7.2, 6.8, 7.5, 8.1, 6.5, 7.8, 7.4]
  const sleepLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  createSimpleChart("sleepChart", sleepData, sleepLabels, "#3c92d1", "hours")
}

function createSimpleChart(elementId, data, labels, color, unit) {
  const chartElement = document.getElementById(elementId)
  if (!chartElement) return

  // Clear any existing content
  chartElement.innerHTML = ""

  // Find the max value for scaling
  const maxValue = Math.max(...data)

  // Create bars for each data point
  data.forEach((value, index) => {
    // Calculate height percentage based on max value
    const heightPercentage = (value / maxValue) * 80 // 80% of container height max

    // Create bar container
    const barContainer = document.createElement("div")
    barContainer.className = "chart-bar"

    // Create bar fill
    const barFill = document.createElement("div")
    barFill.className = "chart-bar-fill"
    barFill.style.height = "0" // Start at 0 for animation
    barFill.style.backgroundColor = color

    // Create label
    const barLabel = document.createElement("div")
    barLabel.className = "chart-bar-label"
    barLabel.textContent = labels[index]

    // Create value
    const barValue = document.createElement("div")
    barValue.className = "chart-bar-value"
    barValue.textContent = `${value} ${unit}`

    // Append elements
    barContainer.appendChild(barFill)
    barContainer.appendChild(barLabel)
    barContainer.appendChild(barValue)
    chartElement.appendChild(barContainer)

    // Animate the bar height after a small delay
    setTimeout(
      () => {
        barFill.style.height = `${heightPercentage}%`
      },
      100 + index * 100,
    )
  })
}
