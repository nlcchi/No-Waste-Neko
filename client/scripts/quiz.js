'/'/*THINGS TO DO
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
        question: 'Max Prep time (in mins)', 
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
        if(currentQuestionIndex==1){
            choiceButtonCol.classList.add('col', 'col-6', 'col-md', 'd-flex', 'justify-content-center', 'align-items-center')
        }
        else{
            choiceButtonCol.classList.add('col', 'col-12', 'col-md', 'd-flex', 'justify-content-center', 'align-items-center')
        }
        

        var choiceButton = document.createElement('button');
        choiceButton.classList.add('btn', 'btn-lg', 'my-3','animate__animated', 'animate__fadeInUp');
        

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
            img_elem.style="width:100px; height:100px"
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

let maxReadyTime; // Initialize maxReadyTime outside of the function

function displayChoices(choice, currentQuestion) {
    if (currentQuestion.question === 'Which course') {
        if (choice === 'Main course' || choice === 'Appetizer') {
            questions = questions.concat(preparationQuestions, vegetableQuestions);
            document.getElementById('cooking-gif').classList.remove('d-none')
            document.getElementById('cooking-gif').classList.add('d-inline')
        } else if (choice === 'Dessert') {
            questions = questions.concat(preparationQuestions.slice(0, 1));
            document.getElementById('baking-gif').classList.remove('d-none')
            document.getElementById('baking-gif').classList.add('d-inline')
        }
    }

    var key = questionKeys[currentQuestion.question];

    // Check if the key already exists in answers and if it's an array, if not, initialize it as an array
    if (!answers[key]) {
        answers[key] = [];
    }

    // Special case for 'Maximum Preparation time (in mins)' key
    if (key === 'maxReadyTime') {
        maxReadyTime = parseInt(choice); // Convert choice to an integer and store it in maxReadyTime
    } else {
        // Check if the value is a string before calling toLowerCase
        if (typeof choice === 'string') {
            choice = choice.toLowerCase();

            // Add the choice to the key specified in questionKeys
            answers[key].push(choice);
        }
    }

    if (currentQuestionIndex < questions.length) {
        displayCurrentQuestion();
    } else {
        // Set maxReadyTime in answers
        answers['maxReadyTime'] = maxReadyTime;

        console.log(answers);
        sessionStorage.setItem('answers', JSON.stringify(answers));
        window.location.href = 'new_recipes.html';
    }
}
