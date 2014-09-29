
    // cardChange() and cardChangeMC() control the flipping animation for numerical and multiple choice flashcards respectively.
    function cardChange(a, b, intro) {
        $('#offRightCard').animate({"right":"-44%"}, "slow", "easeOutElastic", function(){$('#offRightCard').css("right","-200%");});
        $('#rightCard').animate({"right":"20%"}, "slow", "easeOutElastic", function(){$('#rightCard').css("right","-44%");});
        $('#card').animate({"left":"-44%"}, "slow", "easeOutElastic",
            function(){
                if(intro) {
                    document.getElementById('expression').innerHTML = '<div class="intro">' + a + '</div>';
                    $('#card').css("left","20%");
                } else {
                    var b = 0;
                    document.getElementById('expression').innerHTML = a + " " + b;
                    $('#card').css("left","20%");
                    $('#card').css({"box-shadow":"1px 1px 5px 0px #000", "color":"#000", "border": "0px solid #000"});
                }
            });
        $('#leftCard').animate({"left":"-200%"}, "slow", "easeOutElastic", function(){$('#leftCard').css("left","-44%");});
    }

    function cardChangeMC(question, answers) {
        $('#offRightCard').animate({"right":"-44%"}, "slow", "easeOutElastic", function(){$('#offRightCard').css("right","-200%");});
        $('#rightCard').animate({"right":"20%"}, "slow", "easeOutElastic", function(){$('#rightCard').css("right","-44%");});
        $('#card').animate({"left":"-44%"}, "slow", "easeOutElastic",
            function(){
                    var b = 0;
                    document.getElementById('expression').innerHTML = '<div class="intro">' + question + "<br /><br />1: " + answers[0] + "<br />2: " + answers[1] + "<br />3: " + answers[2]  + "<br />4: " + answers[3]+ '</div>';
                    $('#card').css("left","20%");
                    $('#card').css({"box-shadow":"1px 1px 5px 0px #000", "color":"#000", "border": "0px solid #000"});
            });
        $('#leftCard').animate({"left":"-200%"}, "slow", "easeOutElastic", function(){$('#leftCard').css("left","-44%");});
    }

    //This is the function for the flashCard object.
    //Input: num_operations will typically be 2 or 4. 2 generates a flashCard with addition or subtraction. 4 generates a flashCard with addition, subtraction, multiplication, or division. 0 or 1: +, 2: +-, 3: +-*, 4: +-*/
    function flashCard(num_operations){
        this.answer = 11;
        this.a = 0;
        this.b = 0;

        this.op = Math.floor((Math.random() * num_operations)); // 0==+, 1==-, 2==*, 3==/
        
        while ((this.answer > 10) || (this.answer < 0)) {
            this.a = Math.floor((Math.random() * 10) + 1);
            this.b = Math.floor((Math.random() * 10) + 1);
            switch (this.op){
                case 0: // +
                    this.op = ' + ';
                    this.answer = (this.a+this.b);
                    break;
                case 1: // -
                    this.op = ' &minus; ';
                    this.answer = (this.a-this.b);
                    break;
                case 2:
                    this.op = ' &times; ';
                    this.answer = (this.a*this.b);
                    break;
                case 3:
                    this.op = ' &divide; ';
                    this.answer = (this.a*this.b);
                    tempn = this.a;
                    this.a = this.answer;
                    this.answer = tempn;
                    break;
                default:
                    this.op = ' + ';
                    this.answer = (this.a+this.b);
            }
        }
    }

    // This function is used to generate the initial welcome flashcard. It tests user input by asking for 5 fingers and allows runGame() to start at the same place regardless of chosen difficulty.
    function firstFlash(){
        this.answer = 5;
        this.a = 'Ready? ';
        this.b = 'Hold up 5 fingers to begin. '
        this.op = ' ';
    }

    //This is the function for the flashCardHard object, which allows answers between 0 and 99.
    //Input: num_operations will typically be 2 or 4. 2 generates a flashCard with addition or subtraction. 4 generates a flashCard with addition, subtraction, multiplication, or division. 0 or 1: +, 2: +-, 3: +-*, 4: +-*/
    function flashCardHard(num_operations){
        this.answer = 100;
        this.a = 0;
        this.b = 0;

        this.op = Math.floor((Math.random() * num_operations)); // 0==+, 1==-, 2==*, 3==/
        
        while ((this.answer > 99) || (this.answer < 0)) {
            switch (this.op){
                case 0: // +
                    this.a = Math.floor((Math.random() * 50) + 1);
                    this.b = Math.floor((Math.random() * 50) + 1);
                    this.op = ' + ';
                    this.answer = (this.a+this.b);
                    break;
                case 1: // -
                    this.a = Math.floor((Math.random() * 100) + 1);
                    this.b = Math.floor((Math.random() * 100) + 1);
                    this.op = ' &minus; ';
                    this.answer = (this.a-this.b);
                    break;
                case 2:
                    this.a = Math.floor((Math.random() * 10) + 1);
                    this.b = Math.floor((Math.random() * 10) + 1);
                    this.op = ' &times; ';
                    this.answer = (this.a*this.b);
                    break;
                case 3:
                    this.a = Math.floor((Math.random() * 10) + 1);
                    this.b = Math.floor((Math.random() * 10) + 1);
                    this.op = ' &divide; ';
                    this.answer = (this.a*this.b);
                    tempn = this.a;
                    this.a = this.answer;
                    this.answer = tempn;
                    break;
                default:
                    this.a = Math.floor((Math.random() * 50) + 1);
                    this.b = Math.floor((Math.random() * 50) + 1);
                    this.op = ' + ';
                    this.answer = (this.a+this.b);
            }
        }
    }

    // This is the function for the flashCardMC object - flashcards with multiple choice questions and 4 answers. 
    // Input: 5 strings, the question, the answer, and three wrong answers
    // Answer is the numbered choice of the correct answer (1-4)
    function flashCardMC(question, answerstring, wrongA, wrongB, wrongC){
        this.question = question;
        this.answerstring = answerstring;
        this.answer = 1;
        this.choices = ['a', 'b', 'c', 'd'];
        var randI;
        used = [false, false, false, false];
        choicestemp = [answerstring, wrongA, wrongB, wrongC];
        var i;
        for (i = 0; i < 4; i++){
            randI = Math.floor(Math.random() * 4);
            while (used[randI]){
                randI = Math.floor(Math.random() * 4);
            }
            this.choices[i] = choicestemp[randI];
            if (this.choices[i] == this.answerstring){
                this.answer = i+1;
            }
            used[randI] = true;
        }
    }

    // This is the function to create a deck of flashCardMC objects.
    // Input: An array of questions and an array of answers, as well as the number of cards to be created.
    function deckMC(qarray, aarray, n){
        var deck = [];
        var j;
        var k;
        var l;
        var m;
        var i;
        var isUsed = [];
        isUsed.length = n;
        for (i = 0; i < n; i++){
            isUsed[i] = false;
        }
        //Randomly choose n questions from the array as well as 3 random answers
        for (i = 0; i < n; i++){
            m = (Math.floor(Math.random() * n));
            while (isUsed[m]){
                m = (Math.floor(Math.random() * n));
                isUsed[m] = true;
            }           
            j = (Math.floor(Math.random() * n));
            k = (Math.floor(Math.random() * n));
            l = (Math.floor(Math.random() * n));
            while (j===m){
                j = Math.floor((Math.random() * n));  
            }
            while (k===m || k === j){
                k = Math.floor((Math.random() * n));
            }
            while (l===m || l === k || l === j){
                l = Math.floor((Math.random() * n));
            }
            var fc;
            fc = new flashCardMC(qarray[m], aarray[m], aarray[j], aarray[k], aarray[l]);
            deck.push(fc);
        }
        this.deck = deck;
        this.length = deck.length;
    }  

    // Calculate the score on a correctly answered card based on start and stop times and a given value (for example, difficult questions may earn higher points)
    function cardScore(start, stop, value){
        var myScore;
        myScore = value - Math.floor((stop-start)/1000);
        if (myScore <= 5){
            return 5;
        }
        else{ 
            return myScore;
        }
    }


    // This is the function to check whether a given answer matches the answer on a flashCard or flashCardMC.
    // Input: attempted answer and flashCard or flashCardMC object    
    function checkAnswer(ans, fc){
          if (ans == fc.answer){
             return true;
          }
         else{
            return false;
        }     
    }

    // This function measures confidence level and counts the number of extended fingers
    // It requires access to the vars confidence and extendedFingers
    function checkHands(frame){
        confidence = 1;
        extendedFingers = 0;
        for (var i = 0; i < frame.hands.length; i++){
            var hand = frame.hands[i];
            if (hand.confidence < confidence){
                confidence = hand.confidence;
            }
            for (var f = 0; f < hand.fingers.length; f++){
                var finger = hand.fingers[f];
                if(finger.extended){
                    extendedFingers++;
                }
            }         
        }
    }

    // This function begins the intro.
    // Input: runIntro requires frame input from within the Leapmotion controller loop
    // Output: runIntro returns true until it has completed cycling through each introText. It then returns false
    function runIntro(frame){
        if (paused) {return;}
        console.log(introCount);
        //Display the cards
        document.getElementById('expression').innerHTML = '<span class="intro">' + introTexts[introCount] + '</span>';
        stop = Date.now();
        checkHands(frame);

        // If we are on the last page of the slide
        if (introCount == (introTexts.length - 1)){
            if ((confidence > .8) && (extendedFingers < 6) && (extendedFingers > 0) && ((stop-start) > 2000)){
                difficulty = extendedFingers;
                console.log('woooo!!!!');
                inIntro = false;
                return;
            }
            inIntro = true;
        } else

        // If the user wants to skip to the end;
        if ((confidence > .6) && (extendedFingers == 10)){
            introCount = (introTexts.length - 1);
            expression = introTexts[introCount];
            cardChange(expression, 0, true);
            inIntro = true;
        } else

        // If the user wants to move to the next page
        if ((confidence > .6) && (extendedFingers == (introCount+1))){
            introCount++;
            expression = introTexts[introCount];
            cardChange(expression, 0, true);
            if (introCount == 3){
                start = Date.now();
            }
            inIntro = true;
        } else {
            inIntro = true;
        }
    }

    // This function begins the game. It requires frame input from within the Leapmotion controller loop
    function runGame(frame){
        if (paused) {return;}
        stop = Date.now();
        document.getElementById('time').innerHTML = "Bonus: " + (cardScore(start, stop, POINTS_PER_CARD) - 5);

        // Set the expression
        var expression = flashcard.a + flashcard.op + flashcard.b + ' = ';

        //Measure confidence and count fingers
        checkHands(frame);

        // When confidence level is above the threshold, check if the answer is correct
        var tocheck = 0;
        if (confidence > CONFIDENCE_THRESHOLD){
        
            // Draw the current guess based on extended fingers
            if (difficulty < 5) {
            if (second_digit == false){
                document.getElementById('expression').innerHTML = expression + " " + extendedFingers;
            }
            if (second_digit == true){
                document.getElementById('expression').innerHTML = expression + " " + ((firstdig*10)+ extendedFingers);
            }
        } else {
            if (deckCount != 0){
                document.getElementById('expression').innerHTML = '<div class="intro">' + question + "<br /><br />1: " + answers[0] + "<br />2: " + answers[1] + "<br />3: " + answers[2]  + "<br />4: " + answers[3]+ '</div>';
            }
            else{
                if (second_digit == false){
                document.getElementById('expression').innerHTML = expression + " " + extendedFingers;
            }
            if (second_digit == true){
                document.getElementById('expression').innerHTML = expression + " " + ((firstdig*10)+ extendedFingers);
            }

            }
        }

            
            // Determine what value the user is entering
            tocheck = extendedFingers;
            if ((difficulty == 2) || (difficulty == 4)){
                if (second_digit == true){
                    tocheck = firstdig*10 + extendedFingers;
                }
                if ((second_digit == false) && (flashcard.answer >= 10)){
                    if (extendedFingers == Math.floor(flashcard.answer/10)){
                        firstdig = extendedFingers;
                        second_digit = true;
                    }
                }
            }

            // Check if the answer is correct and continue to the next card if it is
            if (checkAnswer(tocheck, flashcard)){
                second_digit = false;

                //Increase the score
                stop = Date.now();
                score += cardScore(start, stop, POINTS_PER_CARD);

                // Track completed cards
                flashcount++;

                // Generate a new flashcard
                switch (difficulty){
                    case 1:
                        flashcard = new flashCard(2);
                        expression = flashcard.a + flashcard.op + flashcard.b + ' = ';
                        break;
                    case 2:
                        flashcard = new flashCardHard(2);
                        expression = flashcard.a + flashcard.op + flashcard.b + ' = ';
                        break;
                    case 3:
                        flashcard = new flashCard(4);
                        expression = flashcard.a + flashcard.op + flashcard.b + ' = ';
                        break;
                    case 4:
                        flashcard = new flashCardHard(4);
                        expression = flashcard.a + flashcard.op + flashcard.b + ' = ';
                        break;
                    case 5:
                        if (deckCount < 10){
                            flashcard = new flashCardMC(questionarray[deckCount], answerarray[deckCount], answerarray[deckCount+4],answerarray[deckCount+8],answerarray[deckCount+10]);
                            question = flashcard.question;
                            console.log(question);
                            answers = flashcard.choices;
                            deckCount++;
                        }
                        else{
                            deskCount = 1;
                            flashcard = myDeck[deckCount];
                            question = flashcard.question;
                            answers = flashcard.choices;
                        }
                        //expression = flashcard.a + flashcard.op + flashcard.b + ' = ';
                        break;
                    default:
                        break;
                }

                // Update display with number of completed cards and the new score
                document.getElementById('problem').innerHTML = "Cards Completed: " + flashcount;
                document.getElementById('score').innerHTML = score;

                // Highlight the correct card as green
                $('#card').css({"box-shadow":"1px 1px 5px 0px #2ED931", "color":"#2ED931", "border": "2px solid #2ED931"});
                
                // Pause and then change the card
                paused = true;
                setTimeout(function(){
                    if (difficulty < 5){
                    cardChange(expression, tocheck);
                }
                else {
                    document.getElementById('expression').innerHTML = '<div class="intro">' + question + "<br /><br />1: " + answers[0] + "<br />2: " + answers[1] + "<br />3: " + answers[2]  + "<br />4: " + answers[3]+ '</div>';
                    cardChangeMC(question, answers);
                }
                    paused = false;
                }, 800);

                // Restart the timer
                start = Date.now();
            }
        }       
    }

    // Initialize variables
    var paused = false;
    var score = 0;
    var difficulty = 0;
    var POINTS_PER_CARD = 15;
    var CONFIDENCE_THRESHOLD = .5;
    var stop = Date.now();
    var start = Date.now();
    var confidence = 1;
    var extendedFingers = 0;
    var firstdig = 0;
    var second_digit = false;
    var inIntro = true;
    var introCount = 0;
    var introTexts = [];
    var deckCount = 0;
    var questionarray = []; //Hardcoded for demo
    questionarray = ["juicy; full of juice or sap; full of richness; N: succulent plant such as a cactus", "insurmountable; unbeatable; Ex. insuperable difficulties", "hermit; loner; ADJ. reclusive", "pretentiousness; claim (without foundation); Ex. I make no pretensions to skill as an artist.", "sheer; very light; like cobwebs; N: soft and sheer fabric; cobweb", "(esp. of an expression of the face) twisted; with a humorous twist (expressing displeasure)", "excess; overabundance; Ex. a plethora of excuses", "rosy; optimistic; Ex. roseate views", "excessive zeal; extreme devotion to a belief or cause; N. fanatic; ADJ. fanatic", "(of a person or book) learned; full of learning; scholarly; N. erudition", "brave and successful act; deed or action, particularly a brave deed; CF. crossing the Atlantic ocean", "tunnels in which rabbits live; overcrowded living area; crowded conditions in which people live", "pedestal; raised platform", "put or force in without being asked; trespass; enter as an uninvited person; Ex. intrude one's own opinion into the report; CF. thrust in", "pitiless; merciless; cruel", "depart secretly and hide", "helpful; contributive; V. conduce; Ex. conduce to/towards", "lacking in seriousness; flippant; self-indulgently carefree; unworthy of serious attention; relatively unimportant; trivial", "lizard that changes color in different situations", "chaplain (in the armed forces)", "live in a monotonous way (without interests or activity); CF. vegetation: plants of an area; CF. vegetarian; CF. vegan", "characteristic frame of mind; disposition; emotional excess; ADJ. temperamental: of temperament; having frequent changes of temper; Ex. temperamental dislike of sports; Ex. temperamental actress", "adjoining; neighboring; close by", "sharp-cornered; having an angle; not rounded (body); bony; lean; gaunt; stiff in manner", "model of perfection; Ex. paragon of virtue"];
    var answerarray = [];
    answerarray = ["succulent", "insuperable", "recluse", "pretension", "gossamer", "wry", "plethora", "roseate", "fanaticism", "erudite", "exploit", "warren", "podium", "intrude", "ruthless", "abscond", "conducive", "frivolous", "chameleon", "padre", "vegetate", "temperament", "adjacent", "angular", "paragon"];
    introTexts = ['<p>Welcome to LeapFlash, an interactive learning tool that brings flashcards into the 21st century.</p><p>Try it out now, hold out 1 finger to advance the tutorial.</p>',
                '<p>If it is a two digit answer, you will need to enter the first digit correctly. The card will automatically save a correct tens digit and allow you to input a second digit.</p><p>Hold out 2 fingers to continue the tutorial.</p>',
                '<p>The more quickly you answer a question, the higher your time bonus will be. Check out the bonus, your score, and the number of cards you have completed below the active flashcard.</p><p>Hold out 3 fingers to choose your difficulty.</p>',
                '<p>Choose your difficulty:</p>Level 1: Basic Addition/Subtraction<br />Level 2: Advanced Addition/Subtraction<br />Level 3: Basic Four Operations<br />Level 4: Advanced Four Operations<br />Level 5: GRE Vocab Multiple Choice</p>'];
    //var myDeck = new deckMC(questionarray, answerarray, 10);
    console.log(answerarray[4]);

    //Create initial flashCard
    var flashcard = new firstFlash();
    var flashcount = 0;

    //Initialize Leap Controller      
    var controller = new Leap.Controller();
    var controllerOptions = {enableGestures: true};

    //Begin LeapMotion Control   
    controller.on( 'frame' , function(frame){
        //Begin with the intro function
        if(!inIntro){
            runGame(frame);
        } else {
            runIntro(frame);
        }

        //Begin running the game with the Leapmotion coontroller        
});
// Connect the controller 
controller.connect();
