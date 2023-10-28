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
    }
];

let vegetableQuestions = [
    { 
        question: 'Choice of Vegetable', 
        choices: ['Carrot', 'Broccoli', 'Spinach', 'Peas', 'Corn']
    }
];

let preparationQuestions = [
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
    'Maximum Preparation time (in mins)': 'maxReadyTime',
    'Cuisine': 'cuisine',
    'Choice of Protein': 'query',
    'Choice of Vegetable': 'query'
};

let currentQuestionIndex = 0;
let answers = {};

function displayCurrentQuestion() {
    var questionContainer = document.getElementById('question-container');

    // Added row in quiz.html to make options responsive on phone
    var optionsRow = document.getElementById('options-row');
    questionContainer.innerHTML = '';
    optionsRow.innerHTML = '';
    
    var currentQuestion = questions[currentQuestionIndex];
    var questionElement = document.createElement('h2');
    questionElement.innerText = currentQuestion.question;

    questionElement.classList.add('text-center', 'bg-light', 'rounded-pill' ,'w-75', 'animate__animated', 'animate__fadeInDown', 'p-3')
    questionContainer.appendChild(questionElement);

    var choices = currentQuestion.choices;
    for (let choice of choices) {

        // Create a col for each option for phone responsiveness
        var choiceButtonCol = document.createElement('div')
        choiceButtonCol.classList.add('col', 'col-sm-12', 'col-md', 'd-flex', 'justify-content-center', 'align-items-center')
        

        var choiceButton = document.createElement('button');
        choiceButton.classList.add('btn', 'btn-lg', 'bg-light', 'my-3','animate__animated', 'animate__fadeInUp');
        

        // Create a new div for the text and img to fit into the button
        var innerDiv = document.createElement('div')
        innerDiv.classList.add('d-flex', 'flex-column' ,'align-items-center')
        innerDiv.innerHTML += `<span>${choice}</span>`

        if(currentQuestionIndex == 1){
            // Adjust the buttons size
            choiceButton.style = "width:150px; height:150px"
        }
        else{
            // Adjust the button size 
            if(currentQuestionIndex == 0){
                choiceButton.style = "width:300px; height:250px"
            }
            else{
                choiceButton.style = "width:200px; height:200px"
            }
            let img_elem = document.createElement('img');
            img_elem.src = `../styling/pics/quiz_icons/${choice}.png`
            innerDiv.appendChild(img_elem)
        }

        choiceButton.value = choice;

        choiceButton.addEventListener('click', function() {
            displayChoices(choice, currentQuestion);
        });

        // Append innerDiv into choiceButton
        choiceButton.appendChild(innerDiv);
        choiceButtonCol.appendChild(choiceButton)
        optionsRow.appendChild(choiceButtonCol);
    };

    currentQuestionIndex++;
}

function displayChoices(choice, currentQuestion){
    if (currentQuestion.question === 'Which course') {
        if (choice === 'Main course' || choice === 'Appetizer') {
            questions = questions.concat(preparationQuestions, vegetableQuestions);
        } else if (choice === 'Dessert') {
            questions = questions.concat(preparationQuestions.slice(0, 1));
        }
    }
    
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
