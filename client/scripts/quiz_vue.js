const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            questions: [
                { 
                    question: 'Which course', 
                    choices: ['Appetizer', 'Main course', 'Dessert']
                }
            ],
            vegetableQuestions: [
                { 
                    question: 'Choice of Vegetable', 
                    choices: ['Carrot', 'Broccoli', 'Spinach', 'Peas', 'Corn']
                }
            ],
            preparationQuestions: [
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
            ],
            questionKeys: {
                'Which course': 'type',
                'Max Prep time (in mins)': 'maxReadyTime',
                'Cuisine': 'cuisine',
                'Choice of Protein': 'query',
                'Choice of Vegetable': 'query'
            },
            currentQuestionIndex: 0,
            answers: {},
            maxReadyTime: 0,
            showImage: false,
            showCookingGif: false,
            showBakingGif: false
        };
    },

    computed: {
      currentQuestion() {
        return this.questions[this.currentQuestionIndex];
      },
      buttonStyle() {
        if (this.currentQuestion.question === 'Choice of Vegetable') {
          return "width:150px; height:150px";
        } else if (this.currentQuestion.question === 'Which course') {
          return "width:300px; height:250px";
        } else {
          return "width:200px; height:200px";
        }
      },
      currentChoices() {
        if (this.currentQuestion) {
          return this.currentQuestion.choices;
        }
        return [];
      },
    },

    // Methods
    methods: {
        selectChoice(choice) {
          if (this.currentQuestion.question === 'Which course') {
            if (choice === 'Main course' || choice === 'Appetizer') {
              this.questions = this.questions.concat(this.preparationQuestions, this.vegetableQuestions);
              this.showCookingGif = true;
            } else if (choice === 'Dessert') {
              this.questions = this.questions.concat(this.preparationQuestions.slice(0, 1));
              this.showBakingGif = true;
            }
          }

          const key = this.questionKeys[this.currentQuestion.question];
  
          if (!this.answers[key]) {
              this.answers[key] = []; // Directly set the property
          }
  
          if (key === 'maxReadyTime') {
              this.maxReadyTime = parseInt(choice);
          } else {
              this.answers[key].push(choice.toLowerCase());
          }

          if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showImage = this.currentQuestion.question !== 'Max Prep time (in mins)';
          } else {
            this.answers['maxReadyTime'] = this.maxReadyTime;
            console.log(this.answers);
            sessionStorage.setItem('answers', JSON.stringify(this.answers));
            window.location.href = 'new_recipes.html';
          }
        }
      },

    // Lifecycle Hook
    mounted() {
        this.showImage = (this.currentQuestion.question !== 'Max Prep time (in mins)');
    }
})

main.mount('#main');