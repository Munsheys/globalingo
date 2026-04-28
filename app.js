// GlobaLingo - Core Application Logic

const WORDS_DATABASE = [
    { country: 'Japan', lang: 'ja-JP', flag: '🇯🇵', script: '木漏れ日', ipa: '/ko.mo.re.bi/', definition: 'Sunlight filtering through trees.', options: ['Sunlight through trees', 'Early morning mist', 'Moonlight on water'] },
    { country: 'France', lang: 'fr-FR', flag: '🇫🇷', script: 'Dépaysement', ipa: '/de.pe.iz.mɑ̃/', definition: 'The feeling of being in a foreign country.', options: ['Feeling of being abroad', 'A sudden realization', 'Losing one\'s path'] },
    { country: 'Egypt', lang: 'ar-EG', flag: '🇪🇬', script: 'يا عيني', ipa: '/ya ʕeːni/', definition: 'Oh my eyes (expression of empathy or joy).', options: ['Expression of empathy', 'Looking at the stars', 'A cold desert night'] },
    { country: 'Mexico', lang: 'es-MX', flag: '🇲🇽', script: 'Sobremesa', ipa: '/so.βɾe.ˈme.sa/', definition: 'Conversation after a meal.', options: ['Conversation after a meal', 'A nap in the sun', 'Setting the table'] },
    { country: 'Germany', lang: 'de-DE', flag: '🇩🇪', script: 'Fernweh', ipa: '/ˈfɛʁnˌveː/', definition: 'A longing for far-off places.', options: ['Longing for far places', 'Fear of the dark', 'Missing home'] },
    { country: 'Italy', lang: 'it-IT', flag: '🇮🇹', script: 'Abbiocco', ipa: '/ab.bjok.ko/', definition: 'The drowsiness after eating.', options: ['Drowsiness after eating', 'Morning sunlight', 'Walking slowly'] }
];

const state = {
    currentWord: null,
    currentScreen: 'selection-screen',
    streak: parseInt(localStorage.getItem('globalingo-streak') || '0'),
    history: JSON.parse(localStorage.getItem('globalingo-history') || '[]'),
    voiceConfidence: 0,
    tracePassed: false,
    recognition: null,
    isRecording: false
};

// DOM Elements
const screens = document.querySelectorAll('.screen');
const mainProgressBar = document.getElementById('main-progress-bar');
const streakCountEl = document.getElementById('streak-count');

// Navigation Logic
function showScreen(screenId) {
    screens.forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    state.currentScreen = screenId;
    
    // Update Progress Bar
    const screenOrder = ['selection-screen', 'learning-screen', 'echo-screen', 'trace-screen', 'recall-screen', 'results-screen'];
    const progress = ((screenOrder.indexOf(screenId) + 1) / screenOrder.length) * 100;
    mainProgressBar.style.width = `${progress}%`;
}

// Initialization
function init() {
    streakCountEl.textContent = state.streak;
    initRegionButtons();
    initEchoSystem();
    initTraceCanvas();
    initRecallSystem();
    initAtlasSystem();
    
    // Setup generic back buttons
    document.getElementById('btn-echo-back').onclick = () => showScreen('learning-screen');
    document.getElementById('btn-home').onclick = () => location.reload();
}

// Region Selection
function initRegionButtons() {
    document.querySelectorAll('.region-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const region = btn.dataset.region;
            if (region === 'random') {
                state.currentWord = WORDS_DATABASE[Math.floor(Math.random() * WORDS_DATABASE.length)];
            } else {
                state.currentWord = WORDS_DATABASE.find(w => w.country.toLowerCase().includes(btn.innerText.toLowerCase())) || WORDS_DATABASE[0];
            }
            loadWordData();
            showScreen('learning-screen');
        });
    });
    
    document.getElementById('btn-to-echo').onclick = () => showScreen('echo-screen');
}

function loadWordData() {
    document.getElementById('word-country-flag').textContent = state.currentWord.flag;
    document.getElementById('word-country-name').textContent = state.currentWord.country;
    document.getElementById('display-word').textContent = state.currentWord.script;
    document.getElementById('word-ipa').textContent = state.currentWord.ipa;
    document.getElementById('word-definition').textContent = state.currentWord.definition;
    
    // Update result screen values
    document.getElementById('result-word').textContent = state.currentWord.script;
    document.getElementById('recall-word').textContent = state.currentWord.script;
    document.getElementById('ghost-word').textContent = state.currentWord.script;
}

// --- ECHO SYSTEM (Voice Recognition) ---
function initEchoSystem() {
    const btnSpeak = document.getElementById('btn-speak');
    const btnPlay = document.getElementById('btn-play-audio');
    const transcriptEl = document.getElementById('speech-transcript');
    const confidenceText = document.getElementById('confidence-text');
    const confidenceProgress = document.getElementById('confidence-progress');
    const btnNext = document.getElementById('btn-echo-next');

    // Warm up the speech engine
    let enginePrimed = false;
    const primeEngine = () => {
        if (enginePrimed) return;
        const msg = new SpeechSynthesisUtterance('');
        msg.volume = 0;
        window.speechSynthesis.speak(msg);
        enginePrimed = true;
    };

    // Text to Speech
    btnPlay.onclick = () => {
        primeEngine();
        window.speechSynthesis.cancel(); // Stop any current speech
        const msg = new SpeechSynthesisUtterance(state.currentWord.script);
        msg.lang = state.currentWord.lang;
        
        // Find best voice for language
        const voices = window.speechSynthesis.getVoices();
        const bestVoice = voices.find(v => v.lang.startsWith(state.currentWord.lang.split('-')[0])) || voices[0];
        if (bestVoice) msg.voice = bestVoice;
        
        window.speechSynthesis.speak(msg);
    };

    // Speech Recognition Setup
    if ('webkitSpeechRecognition' in window) {
        state.recognition = new webkitSpeechRecognition();
        state.recognition.continuous = false;
        state.recognition.interimResults = false;

        state.recognition.onstart = () => {
            state.isRecording = true;
            btnSpeak.classList.add('recording');
            transcriptEl.textContent = "Listening...";
        };

        state.recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            const confidence = Math.round(event.results[0][0].confidence * 100);
            
            transcriptEl.textContent = `"${result}"`;
            updateConfidence(confidence);
            
            if (confidence > 40) {
                btnNext.disabled = false;
            }
        };

        state.recognition.onend = () => {
            state.isRecording = false;
            btnSpeak.classList.remove('recording');
        };

        btnSpeak.onclick = () => {
            if (state.isRecording) state.recognition.stop();
            else state.recognition.start();
        };
    } else {
        transcriptEl.textContent = "Speech recognition not supported in this browser.";
    }

    function updateConfidence(val) {
        state.voiceConfidence = val;
        confidenceText.textContent = `${val}%`;
        confidenceProgress.style.strokeDasharray = `${val}, 100`;
        document.getElementById('final-voice-score').textContent = `${val}%`;
    }

    btnNext.onclick = () => showScreen('trace-screen');
}

// --- TRACE SYSTEM (Canvas Drawing) ---
function initTraceCanvas() {
    const canvas = document.getElementById('trace-canvas');
    const ctx = canvas.getContext('2d');
    const btnClear = document.getElementById('btn-clear-canvas');
    const btnVerify = document.getElementById('btn-verify-trace');
    
    let drawing = false;

    // Resize canvas
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Drawing logic
    canvas.onmousedown = startDraw;
    canvas.onmousemove = draw;
    canvas.onmouseup = stopDraw;
    canvas.ontouchstart = (e) => { e.preventDefault(); startDraw(e.touches[0]); };
    canvas.ontouchmove = (e) => { e.preventDefault(); draw(e.touches[0]); };
    canvas.ontouchend = stopDraw;

    function startDraw(e) {
        drawing = true;
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#ff9f1c';
        const rect = canvas.getBoundingClientRect();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }

    function draw(e) {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    }

    function stopDraw() { drawing = false; }

    btnClear.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    btnVerify.onclick = () => {
        // Simple verification: Check if we have drawn something
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let count = 0;
        for(let i=0; i<data.length; i+=4) if(data[i+3] > 0) count++;
        
        if (count > 100) {
            state.tracePassed = true;
            document.getElementById('final-trace-score').textContent = "Pass";
            showScreen('recall-screen');
            renderQuiz();
        } else {
            alert("Try drawing the word first!");
        }
    };
}

// --- RECALL SYSTEM (Quiz) ---
function initRecallSystem() {
    // Logic handled in renderQuiz
}

function renderQuiz() {
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    const options = [...state.currentWord.options].sort(() => Math.random() - 0.5);
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => {
            if (opt === state.currentWord.definition) {
                btn.classList.add('correct');
                state.streak++;
                localStorage.setItem('globalingo-streak', state.streak);
                saveToAtlas();
                setTimeout(() => showScreen('results-screen'), 1000);
            } else {
                btn.classList.add('wrong');
                setTimeout(() => {
                    btn.classList.remove('wrong');
                }, 500);
            }
        };
        optionsContainer.appendChild(btn);
    });
}

// --- ATLAS SYSTEM (History & Persistence) ---
function initAtlasSystem() {
    const btnOpen = document.getElementById('btn-open-atlas');
    const btnClose = document.getElementById('btn-atlas-close');
    
    btnOpen.onclick = () => {
        renderAtlas();
        showScreen('atlas-screen');
    };
    
    btnClose.onclick = () => {
        showScreen('selection-screen');
    };
}

function saveToAtlas() {
    // Don't add duplicates
    if (!state.history.find(w => w.script === state.currentWord.script)) {
        state.history.unshift({
            ...state.currentWord,
            timestamp: new Date().toISOString(),
            confidence: state.voiceConfidence
        });
        localStorage.setItem('globalingo-history', JSON.stringify(state.history));
    }
}

function renderAtlas() {
    const list = document.getElementById('atlas-list');
    const empty = document.getElementById('atlas-empty');
    list.innerHTML = '';
    
    if (state.history.length === 0) {
        empty.style.display = 'flex';
        return;
    }
    
    empty.style.display = 'none';
    state.history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'atlas-item';
        div.innerHTML = `
            <span class="word">${item.script}</span>
            <span class="country">${item.flag} ${item.country}</span>
        `;
        div.onclick = () => {
            // Re-play audio on tap
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance(item.script);
            msg.lang = item.lang;
            
            const voices = window.speechSynthesis.getVoices();
            const bestVoice = voices.find(v => v.lang.startsWith(item.lang.split('-')[0])) || voices[0];
            if (bestVoice) msg.voice = bestVoice;
            
            window.speechSynthesis.speak(msg);
        };
        list.appendChild(div);
    });
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
