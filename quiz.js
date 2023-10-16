/*THINGS TO DO
1. finalise questions
2. add code to add picture for each choice
3. fix the add of design for each choice
4. direct to spoonacular page
5. use vue(?)
*/

let questions = [
    // { 
    //     question: 'Dietary requirements', 
    //     choices: ['Vegetarian', 'Vegan', 'Gluten-free', 'Halal', 'Keto', 'None']
    // },
    { 
        question: 'Which course', 
        choices: ['Appetizer', 'Mains', 'Dessert']
    },
    { 
        question: 'Prep time', 
        choices: ['<15mins', '15-25mins','25-35min','45+ mins']
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
    'Dietary requirements': 'diet',
    'Which course': 'meal type',
    'Prep time': 'maxReadyTime',
    'Cuisine': 'cuisine',
    'Choice of Protein': ['query', 'includeIngredients']
};

let currentQuestionIndex = 0;
let answers = {
    'exlude ingredients' : ''
};

function displayCurrentQuestion() {
    var questionContainer = document.getElementById('question-container');
    var optionsContainer = document.getElementById('options-container');
    
    questionContainer.innerHTML = '';
    optionsContainer.innerHTML = '';
    
    // show question
    var currentQuestion = questions[currentQuestionIndex];
    var questionElement = document.createElement('h2');
    questionElement.innerText = currentQuestion.question;
    questionContainer.appendChild(questionElement);

    // show choices
    var choices = currentQuestion.choices;
    for (let index = 0; index < choices.length; index++) {
        var choice = choices[index];
        var choiceDiv = document.createElement('div');
        choiceDiv.className = 'choices'; //put color
        var choiceButton = document.createElement('button');
        choiceButton.innerText = choice;
        choiceButton.addEventListener('click', () => displayChoices(choice, currentQuestion));
        optionsContainer.appendChild(choiceButton);
    };

    currentQuestionIndex++;

    //display everything
}

function displayChoices(choice, currentQuestion){
    var key = questionKeys[currentQuestion.question];
            if (Array.isArray(key)) {
                for (let i = 0; i < key.length; i++) {
                    answers[key[i]] = choice;
                }
            } else {
                answers[key] = choice;
            }
    if (currentQuestionIndex < questions.length) {
        displayCurrentQuestion();
    } else {
        // All questions answered; note: redirect to spoonacular
        document.write('done')
        console.log(answers)
        // save answers in session and redirects to next page
        sessionStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'new_recipes.html';
    }
}
