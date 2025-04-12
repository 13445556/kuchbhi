// Add animation classes to elements
document.addEventListener("DOMContentLoaded", () => {
  // Add pulse animation to feature cards with a delay
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("animate-pulse")
    }, index * 200)
  })

  // Add float animation to role cards with a delay
  const roleCards = document.querySelectorAll(".role-card")
  roleCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("animate-float")
    }, index * 200)
  })
})
