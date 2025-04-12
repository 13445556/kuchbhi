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

  // Patient search functionality
  const searchInput = document.getElementById("patient-search")
  const patientCards = document.querySelectorAll(".patient-card")

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase()

      patientCards.forEach((card) => {
        const patientName = card.querySelector("h3").textContent.toLowerCase()

        if (patientName.includes(searchTerm)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    })
  }

  // Toggle patient details
  const toggleBtns = document.querySelectorAll(".toggle-btn")

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const patientCard = this.closest(".patient-card")
      const patientDetails = patientCard.querySelector(".patient-details")

      this.classList.toggle("active")
      patientDetails.classList.toggle("hidden")
    })
  })

  // Dropdown menus
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation()
      const dropdown = this.nextElementSibling
      dropdown.classList.toggle("show")
    })
  })

  // Close dropdowns when clicking outside
  document.addEventListener("click", () => {
    const openDropdowns = document.querySelectorAll(".dropdown-menu.show")
    openDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show")
    })
  })

  // Modal functionality
  const modalTriggers = document.querySelectorAll("[data-modal]")
  const modals = document.querySelectorAll(".modal")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  const cancelBtns = document.querySelectorAll("#cancel-reschedule")

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function () {
      const modalId = this.getAttribute("data-modal")
      const modal = document.getElementById(modalId)

      modal.classList.add("show")

      // Initialize calendar if it's the reschedule modal
      if (modalId === "reschedule-modal") {
        initializeCalendar()
      }
    })
  })

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.classList.remove("show")
    })
  })

  cancelBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.classList.remove("show")
    })
  })

  // Close modal when clicking outside
  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("show")
      }
    })
  })

  // Confirm reschedule
  const confirmRescheduleBtn = document.getElementById("confirm-reschedule")

  if (confirmRescheduleBtn) {
    confirmRescheduleBtn.addEventListener("click", function () {
      // Get selected date from calendar (in a real app)
      alert("Appointment rescheduled successfully!")

      // Close modal
      const modal = this.closest(".modal")
      modal.classList.remove("show")
    })
  }

  // Add pulse animation to cards
  const animatedCards = document.querySelectorAll(".animate-pulse")
  animatedCards.forEach((card, index) => {
    setTimeout(() => {
      card.style.animationDelay = `${index * 0.2}s`
    }, 100)
  })
})

// Simple calendar initialization
function initializeCalendar() {
  const calendarContainer = document.getElementById("appointment-calendar")

  if (!calendarContainer) return

  // Clear previous calendar
  calendarContainer.innerHTML = ""

  // Create a simple calendar UI
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const calendarHTML = `
        <div class="calendar-header">
            <h3>${getMonthName(currentMonth)} ${currentYear}</h3>
        </div>
        <div class="calendar-days">
            <div class="day-header">Sun</div>
            <div class="day-header">Mon</div>
            <div class="day-header">Tue</div>
            <div class="day-header">Wed</div>
            <div class="day-header">Thu</div>
            <div class="day-header">Fri</div>
            <div class="day-header">Sat</div>
            ${generateCalendarDays(currentMonth, currentYear)}
        </div>
    `

  calendarContainer.innerHTML = calendarHTML

  // Add click event to days
  const dayElements = document.querySelectorAll(".calendar-day:not(.disabled)")
  dayElements.forEach((day) => {
    day.addEventListener("click", function () {
      // Remove selected class from all days
      dayElements.forEach((d) => d.classList.remove("selected"))

      // Add selected class to clicked day
      this.classList.add("selected")
    })
  })
}

function getMonthName(monthIndex) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return months[monthIndex]
}

function generateCalendarDays(month, year) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date().getDate()

  let daysHTML = ""

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    daysHTML += '<div class="calendar-day disabled"></div>'
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === today
    daysHTML += `<div class="calendar-day ${isToday ? "today" : ""}">${i}</div>`
  }

  return daysHTML
}
