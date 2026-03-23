// Hidden Games Menu
let gamesMenuActive = false;

// Create hidden menu element
const gamesMenu = document.createElement('div');
gamesMenu.innerHTML = `
    <div id="hiddenGamesMenu" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1e3a5f;
        color: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        display: none;
        min-width: 200px;
        border: 2px solid #ffd700;
    ">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #ffd700; padding-bottom: 5px;">
            <strong>🎮 Bible Games</strong>
            <span id="closeGamesMenu" style="cursor: pointer; font-size: 20px;">&times;</span>
        </div>
        <div id="gameOptions">
            <div class="game-option" data-game="trivia" style="padding: 8px 5px; cursor: pointer; border-radius: 5px; margin: 2px 0; transition: background 0.2s;">
                📖 Bible Trivia
            </div>
            <div class="game-option" data-game="books" style="padding: 8px 5px; cursor: pointer; border-radius: 5px; margin: 2px 0; transition: background 0.2s;">
                📚 Books of the Bible Quiz
            </div>
            <div class="game-option" data-game="memory" style="padding: 8px 5px; cursor: pointer; border-radius: 5px; margin: 2px 0; transition: background 0.2s;">
                💭 Memory Verse Match
            </div>
            <div class="game-option" data-game="verse" style="padding: 8px 5px; cursor: pointer; border-radius: 5px; margin: 2px 0; transition: background 0.2s;">
                ✝️ Complete the Verse
            </div>
        </div>
    </div>
`;
document.body.appendChild(gamesMenu);

// Style game options
const style = document.createElement('style');
style.textContent = `
    .game-option:hover {
        background: #3498db !important;
    }
`;
document.head.appendChild(style);

// Close function
document.getElementById('closeGamesMenu').onclick = () => {
    document.getElementById('hiddenGamesMenu').style.display = 'none';
    gamesMenuActive = false;
};

// Game option click handler
document.querySelectorAll('.game-option').forEach(option => {
    option.onclick = () => {
        const game = option.dataset.game;
        document.getElementById('hiddenGamesMenu').style.display = 'none';
        gamesMenuActive = false;
        loadGame(game);
    };
});

// Load different games
function loadGame(game) {
    const gameContainer = document.createElement('div');
    gameContainer.id = 'gameModal';
    gameContainer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 1001;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        border: 3px solid #1e3a5f;
    `;
    
    if (game === 'trivia') {
        gameContainer.innerHTML = getTriviaGame();
    } else if (game === 'books') {
        gameContainer.innerHTML = getBooksGame();
    } else if (game === 'memory') {
        gameContainer.innerHTML = getMemoryGame();
    } else if (game === 'verse') {
        gameContainer.innerHTML = getVerseGame();
    }
    
    document.body.appendChild(gameContainer);
    
    // Add close button to modal
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    `;
    closeBtn.onclick = () => gameContainer.remove();
    gameContainer.appendChild(closeBtn);
}

// Trigger mechanism: Click the church name in header 3 times
let clickCount = 0;
let clickTimer;

document.querySelector('header h1')?.addEventListener('click', () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => clickCount = 0, 1000);
    
    if (clickCount === 3) {
        const menu = document.getElementById('hiddenGamesMenu');
        if (menu.style.display === 'none' || !gamesMenuActive) {
            menu.style.display = 'block';
            gamesMenuActive = true;
        } else {
            menu.style.display = 'none';
            gamesMenuActive = false;
        }
        clickCount = 0;
    }
});

// Game content functions
function getTriviaGame() {
    return `
        <h3 style="color: #1e3a5f; margin-bottom: 15px;">📖 Bible Trivia</h3>
        <div id="triviaGame">
            <div id="triviaQuestion" style="margin: 15px 0; font-size: 18px;">Loading...</div>
            <div id="triviaOptions"></div>
            <div id="triviaScore" style="margin-top: 10px; color: #666;">Score: 0</div>
        </div>
        <button onclick="location.reload()" style="margin-top: 10px; padding: 5px 10px;">New Game</button>
    `;
}

function getBooksGame() {
    return `
        <h3 style="color: #1e3a5f; margin-bottom: 15px;">📚 Books of the Bible Quiz</h3>
        <p>Name the book that comes after:</p>
        <div id="booksQuestion" style="margin: 15px 0; font-size: 20px; font-weight: bold;"></div>
        <input type="text" id="booksAnswer" placeholder="Enter book name" style="padding: 8px; width: 80%; margin: 10px 0;">
        <button onclick="checkBooksAnswer()" style="padding: 8px 15px; background: #3498db; color: white; border: none; border-radius: 5px;">Submit</button>
        <div id="booksFeedback" style="margin-top: 10px;"></div>
        <div id="booksScore" style="margin-top: 10px;">Score: 0</div>
        <script>
            let booksScore = 0;
            let currentBookIndex = 0;
            const books = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'];
            
            function nextBook() {
                if (currentBookIndex >= books.length - 1) {
                    document.getElementById('booksFeedback').innerHTML = '<strong>🎉 Complete! You know the books of the Bible!</strong>';
                    return;
                }
                document.getElementById('booksQuestion').innerText = books[currentBookIndex];
            }
            
            function checkBooksAnswer() {
                const answer = document.getElementById('booksAnswer').value.trim().toLowerCase();
                const correct = books[currentBookIndex + 1].toLowerCase();
                if (answer === correct) {
                    booksScore++;
                    document.getElementById('booksScore').innerText = 'Score: ' + booksScore;
                    document.getElementById('booksFeedback').innerHTML = '<span style="color: green;">✅ Correct! ' + books[currentBookIndex] + ' → ' + books[currentBookIndex + 1] + '</span>';
                    currentBookIndex++;
                    document.getElementById('booksAnswer').value = '';
                    if (currentBookIndex < books.length - 1) {
                        document.getElementById('booksQuestion').innerText = books[currentBookIndex];
                    } else {
                        document.getElementById('booksFeedback').innerHTML = '<strong>🎉 Complete! Final score: ' + booksScore + '/' + (books.length - 1) + '</strong>';
                    }
                } else {
                    document.getElementById('booksFeedback').innerHTML = '<span style="color: red;">❌ Try again! ' + books[currentBookIndex] + ' → ?</span>';
                }
            }
            nextBook();
            window.checkBooksAnswer = checkBooksAnswer;
        </script>
    `;
}

function getMemoryGame() {
    return `
        <h3 style="color: #1e3a5f; margin-bottom: 15px;">💭 Memory Verse Match</h3>
        <p>Match the verse reference to its text (coming soon!)</p>
        <div style="margin: 20px 0; padding: 20px; background: #ecf0f1; border-radius: 10px; text-align: center;">
            🚧 More games coming soon! 🚧
        </div>
        <p style="font-size: 12px; color: #666;">Check back for more Bible games!</p>
    `;
}

function getVerseGame() {
    return `
        <h3 style="color: #1e3a5f; margin-bottom: 15px;">✝️ Complete the Verse</h3>
        <p>Fill in the missing word:</p>
        <div id="verseQuestion" style="margin: 15px 0; font-size: 18px;">For God so loved the world that He gave His only _____ Son...</div>
        <input type="text" id="verseAnswer" placeholder="Enter missing word" style="padding: 8px; width: 80%; margin: 10px 0;">
        <button onclick="checkVerseAnswer()" style="padding: 8px 15px; background: #3498db; color: white; border: none; border-radius: 5px;">Submit</button>
        <div id="verseFeedback" style="margin-top: 10px;"></div>
        <div id="verseScore" style="margin-top: 10px;">Score: 0</div>
        <script>
            let verseScore = 0;
            function checkVerseAnswer() {
                const answer = document.getElementById('verseAnswer').value.trim().toLowerCase();
                if (answer === 'begotten') {
                    verseScore++;
                    document.getElementById('verseScore').innerText = 'Score: ' + verseScore;
                    document.getElementById('verseFeedback').innerHTML = '<span style="color: green;">✅ Correct! "For God so loved the world that He gave His only begotten Son..."</span>';
                    document.getElementById('verseAnswer').disabled = true;
                } else {
                    document.getElementById('verseFeedback').innerHTML = '<span style="color: red;">❌ Try again! Hint: It starts with B</span>';
                }
            }
            window.checkVerseAnswer = checkVerseAnswer;
        </script>
    `;
}
