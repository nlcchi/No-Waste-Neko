/*THINGS TO DO
1. finalise questions
2. add code to add picture for each choice
3. fix the add of design for each choice
4. [DONE] direct to spoonacular page 
5. use vue(?)
*/

let questions = [
    { 
        question: 'Which course', 
        choices: ['Appetizer', 'Main course', 'Dessert']
    },
    { 
        question: 'Maximun Prepration time (in mins)', 
        choices: ['15','30','45', '60', '90', '120']
    },
    { 
        question: 'Cuisine', 
        choices: ['Japanese', 'Chinese', 'Italian', 'Indian', 'Mexican']
    },
    { 
        question: 'Choice of Protein', 
        choices: ['Chicken', 'Pork', 'Beef', 'Fish','Tofu']
    }
];

let questionKeys = {
    'Which course': 'type',
    'Maximun Prepration time (in mins)': 'maxReadyTime',
    'Cuisine': 'cuisine',
    'Choice of Protein': 'query'
};

let currentQuestionIndex = 0;
let answers = {};

function displayCurrentQuestion() {
    var questionContainer = document.getElementById('question-container');
    var optionsContainer = document.getElementById('options-container');
    
    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    
    var currentQuestion = questions[currentQuestionIndex];
    var questionElement = document.createElement('h2');
    questionElement.innerText = currentQuestion.question;

    questionElement.classList.add('text-center', 'bg-light', 'rounded-pill' ,'w-75', 'animate__animated', 'animate__fadeInDown', 'p-3')
    questionContainer.appendChild(questionElement);

    var choices = currentQuestion.choices;
    for (let choice of choices) {
        var choiceButton = document.createElement('button');
        choiceButton.innerText = choice;

        choiceButton.classList.add('btn', 'btn-lg', 'bg-light', 'm-3', 'd-flex', 'flex-column' ,'align-items-center', 'm-3', 'w-50','animate__animated', 'animate__fadeInUp');

        if (currentQuestionIndex !== 1){
            let img_elem = document.createElement('img');
            img_elem.src = `../styling/pics/quiz_icons/${choice}.png`
            img_elem.style = 'width:110px; height:110px'
            choiceButton.appendChild(img_elem)
        }

        choiceButton.value = choice;

        choiceButton.addEventListener('click', function() {
            displayChoices(choice, currentQuestion);
        });

        optionsContainer.appendChild(choiceButton);
    };

    currentQuestionIndex++;
}

function displayChoices(choice, currentQuestion){
    var key = questionKeys[currentQuestion.question];
    answers[key] = choice;
    if (currentQuestionIndex < questions.length) {
        displayCurrentQuestion();
    } else {
        console.log(answers);
        sessionStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'new_recipes.html';
    }
}
