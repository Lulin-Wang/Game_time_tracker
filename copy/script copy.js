const quizData = [
    {
        question: "Que signifie \\\"A-T-T-E-N-T-I-O-N\\\" dans le contexte du texte ?",
        options: ["Un cri de ralliement", "Une formule magique", "Une demande d'attention", "Une chanson"],
        correctAnswer: "Une demande d'attention"
    },
    {
        question: "Que dit Jentry après avoir réussi ?",
        options: ["\\\"On a réussi, c'est dingue !\\\"", "\\\"On a échoué, c'est dommage !\\\"", "\\\"Ce n'était pas si difficile.\\\"", "\\\"On devrait réessayer plus tard.\\\""],
        correctAnswer: "\\\"On a réussi, c'est dingue !\\\""
    },
    {
        question: "À quoi Jentry compare-t-elle l'idée de refaire cette expérience ?",
        options: ["À une tradition familiale", "À un week-end entier lors de la dernière année", "À une fête d'anniversaire", "À un concours sportif"],
        correctAnswer: "À un week-end entier lors de la dernière année"
    },
    {
        question: "Qui est mentionné avec Jentry dans le texte ?",
        options: ["Son père", "Son professeur", "Sa mère", "Son frère"],
        correctAnswer: "Sa mère"
    },
    {
        question: "Quel est le ton général du dialogue ?",
        options: ["Enthousiaste et joyeux", "Triste et mélancolique", "Colérique et frustré", "Confus et désorienté"],
        correctAnswer: "Enthousiaste et joyeux"
    },
    {
        question: "Que ressent Jentry après avoir réussi ?",
        options: ["Elle est fière et excitée", "Elle est déçue du résultat", "Elle est indifférente", "Elle est en colère"],
        correctAnswer: "Elle est fière et excitée"
    },
    {
        question: "Qui Jentry félicite-t-elle dans le dialogue ?",
        options: ["Son oncle", "Kevin", "Une inconnue", "Son professeur"],
        correctAnswer: "Kevin"
    },
    {
        question: "Quelle est l'idée de Kevin ?",
        options: ["Faire ça tout un week-end en dernière année", "Ne plus jamais retenter l'expérience", "Partir en voyage", "Demander de l’aide à un adulte"],
        correctAnswer: "Faire ça tout un week-end en dernière année"
    },
    {
        question: "Quel est l’objectif de \\\"A-T-T-E-N-T-I-O-N\\\" ?",
        options: ["Faire peur aux autres", "Attirer l’attention", "Exprimer de la colère", "Lancer un défi"],
        correctAnswer: "Attirer l’attention"
    },
    {
        question: "Que peut-on comprendre de la relation entre Jentry et Kevin ?",
        options: ["Ils sont rivaux", "Ils sont amis et partagent des expériences", "Ils sont indifférents l’un envers l’autre", "Ils ne se connaissent pas bien"],
        correctAnswer: "Ils sont amis et partagent des expériences"
    }
];

const quizContainer = document.getElementById('quiz');
let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuizData = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="quiz-question">${currentQuizData.question}</div>
        <ul class="quiz-options">
            ${currentQuizData.options.map((option, index) => `
                <li><button onclick="checkAnswer('${option}')">${option}</button></li>
            `).join('')}
        </ul>
        <div id="feedback" class="feedback"></div>
    `;
}

function checkAnswer(selectedOption) {
    const currentQuizData = quizData[currentQuestionIndex];
    const feedbackDiv = document.getElementById('feedback');
    const optionsButtons = document.querySelectorAll('.quiz-options button');

    if (selectedOption === currentQuizData.correctAnswer) {
        score++;
        feedbackDiv.textContent = "Correct!";
        feedbackDiv.classList.add('correct-answer');
        feedbackDiv.classList.remove('wrong-answer');
    } else {
        feedbackDiv.textContent = `Incorrect. La bonne réponse est : ${currentQuizData.correctAnswer}`;
        feedbackDiv.classList.add('wrong-answer');
        feedbackDiv.classList.remove('correct-answer');
    }

    optionsButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuizData.correctAnswer) {
            button.classList.add('correct-answer');
        }
        if (button.textContent === selectedOption && selectedOption !== currentQuizData.correctAnswer) {
            button.classList.add('wrong-answer');
        }
    });


    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        setTimeout(loadQuestion, 2000); 
    } else {
        showScore();
    }
}

function showScore() {
    quizContainer.innerHTML = `
        <h2>Quiz terminé ! Votre score est de ${score}/${quizData.length}</h2>
        <button onclick="location.reload()">Rejouer</button>
    `;
}

loadQuestion();
</script>
