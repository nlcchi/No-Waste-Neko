let questions = {
    mealType: {
      question: 'Meal type',
      choices: {
        'Appetiser': {
          question: 'Time Prep',
          choices: ['10 mins', '30 mins', '60 mins'],
          cuisine: {
            question: 'Cuisine',
            choices: ['Asian', 'Chinese', 'Italian', 'Indian', 'Japanese', 'Mexican']
          }
          
        },
        'Main Course': {
          question: 'Time Prep',
          choices: ['10 mins', '30 mins', '60 mins'],
          cuisine: {
            question: 'Cuisine',
            choices: ['Asian', 'Chinese', 'Italian', 'Indian', 'Japanese', 'Mexican'],
            proteinFromFridge: {
                question: 'Use any protein from fridge?',
                choices: ['Yes', 'No'],
                proteinChoice: {
                question: 'Choice of Protein',
                choices: ['Chicken', 'Pork', 'Beef', 'Fish', 'Tofu'],
                },
                vegetableFromFridge: {
                    question: 'Use any vegetable from fridge?',
                    choices: ['Yes', 'No'],
                    vegetableChoice: {
                    question: 'Choice of Vegetable',
                    choices: ['Broccoli', 'Carrots', 'Spinach', 'Bell Peppers', 'Zucchini'],
                    },
                },
            },
          },
        },
        'Dessert': {
            question: 'Time Prep',
            choices: ['10 mins', '30 mins', '60 mins'],
            dairy: {
                question: 'Dairy',
                choices: ['Yes', 'No'],
            }
        },
      },
    },
  };
  let currentQuestion = questions.mealType;
  let answers = {};
  
  function displayCurrentQuestion() {
    var question = currentQuestion.question;
    var choices = currentQuestion.choices;
  
    var questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // Clear the question container
  
    var questionElement = document.createElement('h2');
    questionElement.innerText = question;
    questionContainer.appendChild(questionElement);
  
    var optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
  
    for (let choiceKey in choices) {
      var choiceButton = document.createElement('button');
      choiceButton.classList.add('btn', 'btn-lg', 'bg-light', 'm-3', 'd-flex', 'flex-column', 'align-items-center', 'm-3', 'w-50', 'animate__animated', 'animate__fadeInUp');
      choiceButton.innerText = choices[choiceKey]; // Use the choice text
      choiceButton.addEventListener('click', () => displayChoices(choiceKey, choices[choiceKey]));
      optionsContainer.appendChild(choiceButton);
    }
  }  
  
  function displayChoices(choiceKey, choice) {
    var key = currentQuestion.choices[choiceKey];
  
    if (key === 'Time Prep' || key === 'Cuisine' || key === 'Dairy') {
      // Handle choices for 'Time Prep', 'Cuisine', and 'Dairy'
      answers[currentQuestion.question] = choiceKey;
  
      if (typeof choice === 'object') {
        // If there are sub-questions, navigate to the next sub-question
        currentQuestion = choice;
        currentQuestion.parent = questions.mealType; // Store parent question for navigation
      } else {
        // Move to the next top-level question
        currentQuestion = currentQuestion.parent;
      }
    } else {
      // Handle choices for 'Use any protein from fridge?' and 'Use any vegetable from fridge?'
      answers[currentQuestion.question] = choiceKey;
  
      if (typeof choice === 'object') {
        // If there are sub-questions, navigate to the next sub-question
        currentQuestion = choice;
        currentQuestion.parent = currentQuestion; // Store parent question for navigation
      } else {
        // Move to the next top-level question
        currentQuestion = currentQuestion.parent;
      }
    }
  
    if (currentQuestion) {
      // Display the next question
      displayCurrentQuestion();
    } else {
      // All questions answered; handle as needed
      console.log(answers);
      // You can handle the redirection logic here
    }
  }
  
  // Initialize the question display
  displayCurrentQuestion();
  