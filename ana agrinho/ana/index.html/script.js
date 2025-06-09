// --- Definição dos Conjuntos de Perguntas ---

// Perguntas para o público INFANTIL (8 a 12 anos)
const questions_kids = [
    {
        question: "Qual a melhor maneira de economizar água no banheiro?",
        options: [
            "Tomar banhos mais longos",
            "Deixar a torneira aberta ao escovar os dentes",
            "Tomar banhos rápidos e fechar a torneira ao escovar os dentes",
            "Usar a descarga várias vezes seguidas"
        ],
        answer: "Tomar banhos rápidos e fechar a torneira ao escovar os dentes" // 'correctAnswer' renomeado para 'answer' para consistência
    },
    {
        question: "Qual tipo de material leva mais tempo para se decompor na natureza?",
        options: [
            "Casca de banana",
            "Papel",
            "Vidro",
            "Folhas secas"
        ],
        answer: "Vidro"
    },
    {
        question: "O que significa 'consumo consciente'?",
        options: [
            "Comprar tudo o que quero, sem pensar",
            "Comprar apenas o que é essencial, pensando no impacto ambiental e social",
            "Comprar só produtos importados",
            "Descartar produtos usados em qualquer lugar"
        ],
        answer: "Comprar apenas o que é essencial, pensando no impacto ambiental e social"
    },
    {
        question: "Por que separar o lixo é importante?",
        options: [
            "Para deixar a lixeira mais bonita",
            "Ajuda na reciclagem e diminui a quantidade de lixo em aterros",
            "Não faz diferença, tudo vai para o mesmo lugar",
            "Para aumentar o trabalho dos coletores"
        ],
        answer: "Ajuda na reciclagem e diminui a quantidade de lixo em aterros"
    },
    {
        question: "Qual ação contribui para a diminuição do uso de sacolas plásticas?",
        options: [
            "Sempre pedir sacolas plásticas novas no mercado",
            "Levar sua própria sacola retornável",
            "Comprar produtos embalados individualmente",
            "Jogar sacolas plásticas em rios e lagos"
        ],
        answer: "Levar sua própria sacola retornável"
    }
];

// Perguntas para o público ADULTO/ADOLESCENTE (13+ anos)
const questions_teens = [
    {
        question: "1. Qual dos seguintes conceitos melhor descreve a **pegada ecológica**?",
        options: [
            "A quantidade de lixo gerada por uma pessoa em um dia.",
            "A área de terra e água necessária para sustentar o estilo de vida de uma população.",
            "O impacto da poluição sonora em grandes centros urbanos.",
            "O aumento da temperatura média global ao longo do tempo."
        ],
        answer: "A área de terra e água necessária para sustentar o estilo de vida de uma população."
    },
    {
        question: "2. Os três pilares da sustentabilidade (ambiental, social e econômico) são interdependentes. Qual a principal razão para essa interdependência?",
        options: [
            "Apenas o pilar ambiental pode existir sem os outros dois.",
            "Um não pode ser plenamente alcançado sem o equilíbrio e a consideração dos outros.",
            "Eles representam áreas isoladas de atuação que não se cruzam.",
            "Apenas o crescimento econômico é suficiente para garantir a sustentabilidade."
        ],
        answer: "Um não pode ser plenamente alcançado sem o equilíbrio e a consideração dos outros."
    },
    {
        question: "3. A poluição plástica nos oceanos é um problema ambiental grave. Qual das seguintes ações individuais, em conjunto, mais efetivamente contribui para mitigar esse problema?",
        options: [
            "Substituir garrafas plásticas por reutilizáveis e participar de mutirões de limpeza de praias.",
            "Aumentar o consumo de produtos embalados em plástico para estimular a reciclagem.",
            "Descartar eletrônicos corretamente.",
            "Utilizar mais o transporte público."
        ],
        answer: "Substituir garrafas plásticas por reutilizáveis e participar de mutirões de limpeza de praias."
    },
    {
        question: "4. No contexto da sustentabilidade social, qual a importância de promover a educação e o acesso à saúde para todos?",
        options: [
            "Não há relação direta com a sustentabilidade; são apenas questões de bem-estar individual.",
            "Garante que a população tenha mais opções de consumo de bens e serviços.",
            "Fortalece a equidade social e capacita os indivíduos a fazerem escolhas mais conscientes e participativas.",
            "Contribui unicamente para o desenvolvimento econômico de um país."
        ],
        answer: "Fortalece a equidade social e capacita os indivíduos a fazerem escolhas mais conscientes e participativas."
    }
];

// --- Lógica para Selecionar o Conjunto de Perguntas Correto ---
let currentQuestions = []; // Variável que conterá as perguntas da página atual

const currentPage = window.location.pathname; // Pega o caminho do arquivo HTML atual

if (currentPage.includes('projeto_infantil.html')) {
    currentQuestions = questions_kids;
} else if (currentPage.includes('projeto_principal.html')) {
    currentQuestions = questions_teens;
}


// --- Elementos do Quiz ---
const quizForm = document.getElementById('quiz-form');
const submitButton = document.getElementById('submit-quiz');
const resultDiv = document.getElementById('quiz-result');

// --- Função para Construir o Quiz ---
function buildQuiz() {
    // Só constrói o quiz se os elementos existirem e houver perguntas para a página atual
    if (quizForm && currentQuestions.length > 0) {
        quizForm.innerHTML = ''; // Limpa qualquer conteúdo pré-existente
        currentQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            const questionText = document.createElement('p');
            questionText.textContent = `${index + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            q.options.forEach(option => {
                const label = document.createElement('label');
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `question${index}`;
                input.value = option;
                label.appendChild(input);
                label.appendChild(document.createTextNode(option));
                optionsDiv.appendChild(label);
            });

            questionDiv.appendChild(optionsDiv);
            quizForm.appendChild(questionDiv);
        });
    }
}

// --- Função para Mostrar os Resultados do Quiz ---
function showResults() {
    // Sai da função se não houver quiz ou perguntas para a página atual
    if (!quizForm || currentQuestions.length === 0) return;

    let score = 0;
    let incorrectAnswers = [];

    currentQuestions.forEach((q, index) => {
        const selector = `input[name=question${index}]:checked`;
        const userAnswer = (document.querySelector(selector) || {}).value;

        if (userAnswer === q.answer) { // Usa 'q.answer' para a resposta correta
            score++;
        } else {
            incorrectAnswers.push({
                question: q.question,
                correct: q.answer, // Usa 'q.answer' para a resposta correta
                yours: userAnswer || "Não respondida"
            });
        }
    });

    if (resultDiv) { // Verifica se a div de resultado existe
        resultDiv.style.display = 'block'; // Mostra a div de resultado
        resultDiv.innerHTML = `Você acertou ${score} de ${currentQuestions.length} perguntas!`;

        if (incorrectAnswers.length > 0) {
            resultDiv.innerHTML += "<br><br><strong>Revisar:</strong>";
            incorrectAnswers.forEach(item => {
                resultDiv.innerHTML += `<p class="incorrect"><strong>Pergunta:</strong> ${item.question}<br><strong>Correta:</strong> ${item.correct}<br><strong>Sua resposta:</strong> ${item.yours}</p>`;
            });
        }

        // Opcional: Desabilitar o formulário após a submissão
        const radios = quizForm.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => radio.disabled = true);
        if (submitButton) {
            submitButton.disabled = true;
        }
    }
}

// --- Event Listeners e Inicialização Geral ---
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o quiz APENAS se os elementos do quiz existirem na página
    // e se houver perguntas carregadas para a página atual
    if (quizForm && submitButton && resultDiv && currentQuestions.length > 0) {
        buildQuiz();
        submitButton.addEventListener('click', showResults);
    }

    // Lógica para a seção FAQ (se existir na página)
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling; // Pega o próximo elemento (a resposta)

                // Fecha todas as outras respostas abertas
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherQuestion.nextElementSibling.classList.remove('show');
                    }
                });

                // Alterna a classe 'active' na pergunta e 'show' na resposta
                question.classList.toggle('active');
                answer.classList.toggle('show');
            });
        });
    }

    // Lógica para o formulário de contato (se existir na página)
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) { // Verifica se o formulário existe na página
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio real do formulário

            // Simula um envio e mostra uma mensagem de sucesso
            if (formFeedback) {
                formFeedback.textContent = "Mensagem enviada com sucesso! Agradecemos seu contato.";
                formFeedback.style.display = 'block';
            }

            // Opcional: Limpar o formulário após o "envio"
            contactForm.reset();

            // Opcional: Esconder a mensagem após alguns segundos
            setTimeout(() => {
                if (formFeedback) {
                    formFeedback.style.display = 'none';
                }
            }, 5000); // Esconde após 5 segundos
        });
    }
});