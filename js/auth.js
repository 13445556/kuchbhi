document.addEventListener("DOMContentLoaded", () => {
  // Tab switching functionality
  const tabs = document.querySelectorAll(".auth-tab")
  const tabContents = document.querySelectorAll(".auth-tab-content")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab")

      // Remove active class from all tabs and contents
      tabs.forEach((t) => t.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      tab.classList.add("active")
      document.getElementById(`${tabId}-content`).classList.add("active")
    })
  })

  // Form submission
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simulate loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.textContent = "Logging in..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        // Redirect to dashboard
        if (window.location.href.includes("auth-doctor")) {
          window.location.href = "dashboard-doctor.html"
        } else {
          window.location.href = "dashboard-patient.html"
        }
      }, 1500)
    })
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.textContent = "Creating account..."
      submitBtn.disabled = true

      // Simulate API call
      setTimeout(() => {
        // Redirect to dashboard
        if (window.location.href.includes("auth-doctor")) {
          window.location.href = "dashboard-doctor.html"
        } else {
          window.location.href = "dashboard-patient.html"
        }
      }, 1500)
    })
  }
})
