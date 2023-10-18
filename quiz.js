/*THINGS TO DO
1. finalise questions
2. [DONE] add code to add picture for each choice
3. [DONE] fix the add of design for each choice
4. [DONE] direct to spoonacular page 
5. use vue(?)
6. add back button
*/

let questions = [
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

let dietaryRequirements = sessionStorage.getItem('dietary-requirements');
let answers = {
    'exlude ingredients' : dietaryRequirements
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

    // Add bootstrap styling + animations
    questionElement.classList.add('text-center', 'bg-light', 'rounded-pill' ,'w-75', 'animate__animated', 'animate__fadeInDown', 'p-3')


    // Add bootstrap styling + animations
    questionElement.classList.add('text-center', 'bg-light', 'rounded-pill' ,'w-75', 'animate__animated', 'animate__fadeInDown')

    questionContainer.appendChild(questionElement);

    // show choices
    var choices = currentQuestion.choices;
    for (let index = 0; index < choices.length; index++) {
        var choice = choices[index];
        var choiceDiv = document.createElement('div');
        // choiceDiv.classList.add = 'choices'; //put color
        var choiceButton = document.createElement('button');

        // Add bootstrap styling + icon img + animations
        choiceButton.classList.add('btn', 'btn-lg', 'bg-light', 'm-3', 'd-flex', 'flex-column' ,'align-items-center', 'm-3', 'w-50','animate__animated', 'animate__fadeInUp');
        let img_elem = document.createElement('img');

        // thinking of doing this dynamically (img.src = `${choice}.png`), and maybe we can randomise the images for every new round
        // for example, we can randomise the dessert icons for every new round. 
        if(choice == 'Appetizer'){
            img_elem.src = ('proj_pics/appetiser.png')
        }
        else if (choice == 'Dessert'){
            img_elem.src = ('proj_pics/pudding pixel.png')
        }
        choiceButton.innerText = choice;
        choiceButton.appendChild(img_elem)
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
