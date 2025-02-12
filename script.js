const questions = [
    { text: "I feel clear about my goals and confident in the direction my life is heading.", category: "Purpose" },
    { text: "I often lose track of time while doing something I enjoy or find meaningful.", category: "Engagement" },
    { text: "I feel connected to the people in my life and have meaningful conversations with them.", category: "Relationships" },
    { text: "I regularly feel moments of joy, gratitude, or optimism in my day.", category: "Meaning" },
    { text: "When faced with challenges, I recover quickly and find ways to move forward.", category: "Resilience" },
    { text: "I often feel fully present in the moment and free from distractions.", category: "Mindfulness" },
    { text: "I frequently reflect on who I am, my strengths, and what brings me fulfillment.", category: "Self Discovery" },
    { text: "I find ways to help others or make a positive impact in their lives.", category: "Contribution" }
];

// Page Navigation Function
function nextPage(pageNumber) {
    document.querySelectorAll(".page").forEach(page => page.style.display = "none");
    document.getElementById(`page${pageNumber}`).style.display = "block";
}

// Dynamically generate form questions with radio buttons
const form = document.getElementById("testForm");
questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    div.innerHTML = `
        <label>${q.text}</label>
        <div>
            <input type="radio" name="q${index}" value="1" required> 1
            <input type="radio" name="q${index}" value="2"> 2
            <input type="radio" name="q${index}" value="3"> 3
            <input type="radio" name="q${index}" value="4"> 4
            <input type="radio" name="q${index}" value="5"> 5
        </div>
    `;
    form.appendChild(div);
});

// Function to calculate the highest well-being aspect
function calculateResult() {
    let scores = {};

    questions.forEach((q, index) => {
        const selectedValue = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedValue) {
            const score = parseInt(selectedValue.value) || 0;
            scores[q.category] = (scores[q.category] || 0) + score;
        }
    });

    // Find the category with the highest score
    let highestAspect = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));

    // Display the result
    document.getElementById("resultText").innerHTML = `Your highest well-being focus is: ${highestAspect}`;
    document.getElementById("categoryText").innerText = highestAspect;

    // Go to result page
    nextPage(3);
}
