//reference several pieces of the HTML elements using id's
//to get a reference to the choice-texts/the answer choice - can give each an ID but there is a better way to do it,
//so i will query on the class choice-text, that will give a list of choices, and will update from that point
//also adding data-number to create a custom data attribute
const question = document.getElementById("question");
//creating an arrray from the HTML Collection list so that I can use array functions and manage the data - note that HTML needs to load before js or it won't have access to the data I am reference=ing
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);
const questionCounters = document.getElementById("questionCounter");
const scores = document.getElementById("score");

let currentQuestion = [];
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
/*check to see if it is correct by comparing the answer number */
let availableQuestions = [];

let questions = [
    {
        question: "OH DOM-MY! What is the significance of where you place the <script> MOM-my? ",
        choice1: "It doesn't matter, because it is in the HTML",
        choice2: "It doesn't matter, because the js is linked to the HTML and CSS",
        choice3: "It does matter, because pages load in order and the HTML has to be loaded before the js can add functionality",
        choice4: "It does matter, because the pages need to load the js first because functions take longer to load so it keeps your page fast",
        answer: 3,
    },
    {
        question: "If you want to join Software junction, tell me difference between using a standard and an arrow => function...",
        choice1: "They are synonymous",
        choice2: "Use of this keyword: Unlike regular functions, arrow functions do not have their own this.",
        choice3: "Arrow functions are longer",
        choice4: "Standard functions are more concise",
        answer: 2,
    },
    {
        question: "Calling by reference and value may be similar in syntax but have a different use...so tell me which of the statements from the below are true?!",
        choice1: "Call by reference is an approach where 2 variables become the same by copying the value but in 2 separate spots in the memory",
        choice2: "Call by value is an approach in which all objects interact by reference.",
        choice3: "In call by value, changes in one object variable affect the other object variable.",
        choice4: "In call by value, changes are made in a particular variable it does not affect the other one.",
        answer: 4,
    },
    {
        question: "A great engineer you are? Alas alas, not if you can't spot the difference between an object and a class!",
        choice1: "Class is a detailed description, the definition, and the template of what an object will be. But it is not the object itself.",
        choice2: "An object is the building block that leads to Object-Oriented Programming,",
        choice3: "Once you have written a class and defined it, we can use it to create as many arrays based on that class as we want.",
        choice4: "Once you have written an object and defined it, we can use it to create as many classes based on that class as we want.",
        answer: 1,
    },
    {
        question: "So you can build a website like 1-2-3, but can you tell me what's true of a binary search tree?",
        choice1: "A binary search tree is used to store data in a manner that it can be retrieved very efficiently.",
        choice2: "The left sub-tree contains nodes whose keys are less than the node’s key value.",
        choice3: "The right sub-tree contains nodes whose keys are greater than or equal to the node’s key value",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "console.log(let); - Uncaught TypeError: Cannot read properties of undefined, but let = [ 3, 4, 5]; ...so what might not be right?",
        choice1: "Placing the <script> tag above other DOM elements in the <body>",
        choice2: "Arrays cannot be defined that way",
        choice3: "Remove the semicolon",
        choice4: "You've already logged this to the console before",
        answer: 1,
    },
    {
        question: "Before the timer ruptures.. which of the following is NOT true of linear and non-linear data structures?",
        choice1: "Linear data structure is a structure in which data elements are adjacent to each other",
        choice2: "Linear data structure examples include linked lists, arrays, queues, and stacks, graphs and trees",
        choice3: "Non-linear data structure is a structure in which each data element can connect to over two adjacent data elements",
        choice4: "Non-linear data structure include graphs and trees",
        answer: 2,
    },
    {
        question: "A simple question for a good engineer i'd say...what's the difference between a stack and an array? ",
        choice1: "Stack follows a Last In First Out (LIFO) pattern - meaning that data access necessarily follows a particular sequence where the last data to be stored is the first one that will be extracted.",
        choice2: "Arrays do not follow a specific order,",
        choice3: "Arrays can be accessed or called by referring to the indexed element within the array.",
        choice4: "All of the Above",
        answer: 4,
    },
    {
        question: "You're on a tight deadline but you need your code to last. So you need to ___________. [fill in the blank]",
        choice1: "Make it work, make it good, make it fast!",
        choice2: "Double it and to the next person you pass!",
        choice3: "Go to HR and file for harass",
        choice4: "Copy work from other people done in the past!",
        answer: 1,
    },
    {
        question: "You can code the right syntax but knowing which code to write takes a master....what code would you write if you wanted to sum all the digits of an array in a way that makes it faster?",
        choice1: "That is not imporant",
        choice2: "Create an equation where each index value is added to the next",
        choice3: "function that returns the sum of the array items without adding individual indices",
        choice4: "The only way is to manually calculate and then add the number into Javascript",
        answer: 3,
    },
    {
        question: "Before you go on your coding excursion, tell me what is meant by a function 'recursion'?",
        choice1: "FIFO",
        choice2: "A concept that refers to the wrapping of code and data together into a single unit.",
        choice3: "LIFO",
        choice4: "Recursion refers to a function calling itself based on a terminating condition.",
        answer: 4,
    },
    {
        question: "CSS is hard but the computer is literal...what's a big problem that might first seem miniscule? ",
        choice1: "Syntax: make sure there is a period after everything",
        choice2: "CSS: Cascading Style Sheets - make sure there are no properties being overruled by another style further down in the sheet",
        choice3: "the css file has to be named 'style.css",
        choice4: "All of the above",
        answer: 2,
    },
    {
        question: "HTML is simple, but don't sleep on details...what happened if the html loads but the styling fails? ",
        choice1: "Check the link to the CSS style sheet!",
        choice2: "Connection to WIFI",
        choice3: "Remove the link to Javsscript",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Spacing seems simple but slow down it's not a race...things keep moving what is there to keep it in place? ",
        choice1: "C and D",
        choice2: "Webpages are automatically responsive",
        choice3: "CSS grid!",
        choice4: "CSS flexbox!",
        answer: 1,
    },
    {
        question: "An ID and a class both give elements style...but what makes them different be quick don't take a while!! ",
        choice1: "They are synonymous",
        choice2: "Class keyword is added to tag but ID is not",
        choice3: "Class adds stying in the HTML but ID adds styling in the CSS ",
        choice4: "Only one ID selector can be attached to an element but multiple class selectors can be attached to an element.",
        answer: 4,
    },
    {
        question: "Your code might run and you think you're a tech mogul...but to pass here tell me - what is a global variable...",
        choice1: "let , var, and const",
        choice2: "let",
        choice3: "a variable type that is declared outside any function and is accessible to all functions throughout the program",
        choice4: "var",
        answer: 3,
    },
    {
        question: "Your code can work but it's messy and coworkers are mad at it..... ",
        choice1: "because my code works this time, but just this once cause it's static",
        choice2: "because I am perfect and others are problematic",
        choice3: "because I was being too darn dramatic",
        choice4: "THE ANSWER IS B",
        answer: 1,
    },
    {
        question: "This is computer science but let's do some math...if you use == and not === what difference would that have?",
        choice1: "The deep equal make the deeply comparison of objects possible (not only the first level)",
        choice2: "This is strict liability which === checks the the equality between two values with their types. ",
        choice3: "== is weak equality or double equals == converts the two values to a same type (named type coercion) and then compare them. ",
        choice4: "B and C",
        answer: 4,
    },
    {
        question: "Center your content... 3 ways to try....do all three or just say which one is right.. ",
        choice1: "Align Items",
        choice2: "Justify Content",
        choice3: "Text-align",
        choice4: "Depends on what type of content you are trying to center",
        answer: 4,
    },
    {
        question: "I know I'm funny but I'm not joking,  you need to call your function where should you invoke it?",
        choice1: "When you want it to be loaded in the DOM",
        choice2: "Anywhere outside of the function",
        choice3: "At the bottom of the function",
        choice4: "Invoke all functions at the top of the page",
        answer: 1,
    },
    {
        question: "You're a great engineer but can you land a job, depends on if you can do this thing or not... ",
        choice1: "creative problem solve",
        choice2: "debug",
        choice3: "improve code written by others and yourself",
        choice4: "ALL THIS AND MORE!",
        answer: 4,
    },
    {
        question: "Which is a backend skill?",
        choice1: "HTML",
        choice2: "Javascript",
        choice3: "Python, Node.js, and Ruby",
        choice4: "CSS",
        answer: 3,
    },
    {
        question: "Which is a full-stack skill?",
        choice1: "HTML and CSS",
        choice2: "Javascript",
        choice3: "Python, Node.js, and Ruby",
        choice4: "All of the above",
        answer: 4,
    },
    {
        question: "What is the primary difference between frontend and backend development?",
        choice1: "Front-end focuses more on data and storage",
        choice2: "Front-end developers create the invisible structure that helps websites function properly, but Back-end developers design the visual aspects of websites for users to interact with, including colors, layout, and fonts.",
        choice3: "Back-end developers create the invisible structure that helps websites function properly, but Front-end developers design the visual aspects of websites for users to interact with, including colors, layout, and fonts.",
        choice4: "Back-end focuses on the user-facing end",
        answer: 3,
    },
    {
        question: "What should you do if you want to break into TECH as a new developer?!",
        choice1: "Look for REALISTIC roles based on your experience and level of expertise",
        choice2: "network",
        choice3: "be consistent, persistent, and constantly practice and improve what you can present to employers!",
        choice4: "ALL OF THE ABOVE - CLICK THIS ONE - THIS IS THE ANSWER - oops who wrote that there",
        answer: 4,
    },
    {
        question: "Which of these are skills a Full-Stack developer should have? ",
        choice1: "databases and storage",
        choice2: "Git/Github",
        choice3: "HTTP, REST",
        choice4: "All of the Above",
        answer: 4,
    },
];

const CORRECT_BONUS = 4;
const MAX_QUESTIONS = 25;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

/*make this greater than or EQUAL to */
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        return window.location.assign("end.html");
    }
/* use Math.floor to return a random number for the random question - a random nunmber between 0-3. Math.random alone returns a  decimal between 0-1 */
    questionCounter ++;

    questionCounters.innerText = `${questionCounter}/${MAX_QUESTIONS}`;


    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {         
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })
/*so the computer doesn't choose from questions already given */
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

/*strict comparison compares the data type as welloes not */
/*common technique to give it a default value  CLASSTOAPPLY??*/

        let classA = "incorrect";
        if (selectedAnswer == currentQuestion.answer) {
            classA = "correct";
        }

        if(classA === "correct")  {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classA);
/* only wwant to show the color for a moment after user clicks so now it will be removed so the div container does not stay the same color for the next question
To do this without it not canceling out - need to set a set time-out */
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classA); 
            getNewQuestion();
        }, 750);

        console.log(classA);
});
});
/* */
incrementScore = num => {
    score +=num;
    scores.innerText = score;
}

startGame();
/*change color to red and green and do a pause - check to see if selected answer is the same as the correct answer if so display green if not display red */