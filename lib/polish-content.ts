import type { GlossaryTerm, Lesson, Phrase, RoleplayScript } from "./types";

export const categoryLabels = {
  home: "Home",
  kitchen: "Kitchen",
  parenting: "Parenting",
  "getting-ready": "Getting ready",
  bedtime: "Bedtime",
  feelings: "Feelings",
  questions: "Questions",
  "wife-conversations": "Wife conversations",
  kids: "Kids",
  outings: "Outings"
} as const;

export const phrases: Phrase[] = [
  { id: "p001", pl: "Jesteś głodna?", en: "Are you hungry?", pron: "YES-tesh GWOD-nah", category: "kitchen", tags: ["question", "food"], note: "Use głodna for a woman/girl, głodny for a man/boy." },
  { id: "p002", pl: "Jesteś głodny?", en: "Are you hungry?", pron: "YES-tesh GWOD-nih", category: "kitchen", tags: ["question", "food"] },
  { id: "p003", pl: "Chcesz wody?", en: "Do you want water?", pron: "hchesh VO-dih", category: "kitchen", tags: ["question", "drink"] },
  { id: "p004", pl: "Chcesz coś zjeść?", en: "Do you want something to eat?", pron: "hchesh tsohsh zyeshch", category: "kitchen", tags: ["question", "food"] },
  { id: "p005", pl: "Smakuje ci?", en: "Do you like the taste?", pron: "smah-KOO-yeh chee", category: "kitchen", tags: ["food", "question"] },
  { id: "p006", pl: "To jest gorące.", en: "This is hot.", pron: "toh yest goh-RON-cheh", category: "kitchen", tags: ["warning"] },
  { id: "p007", pl: "Uważaj, gorące.", en: "Careful, it is hot.", pron: "oo-VAH-zhai goh-RON-cheh", category: "kitchen", tags: ["warning"] },
  { id: "p008", pl: "Jeszcze trochę?", en: "A little more?", pron: "YESH-cheh TRO-heh", category: "kitchen", tags: ["question", "food"] },
  { id: "p009", pl: "Już wystarczy?", en: "Is that enough already?", pron: "yoosh vih-STAR-chih", category: "kitchen", tags: ["question", "food"] },
  { id: "p010", pl: "Skończyłaś jeść?", en: "Are you done eating?", pron: "skon-CHIH-wash yeshch", category: "kitchen", tags: ["question", "food"] },
  { id: "p011", pl: "Skończyłeś jeść?", en: "Are you done eating?", pron: "skon-CHIH-wesh yeshch", category: "kitchen", tags: ["question", "food"] },
  { id: "p012", pl: "Odłóż talerz.", en: "Put the plate away.", pron: "OD-woozh TAH-lesh", category: "kitchen", tags: ["command", "cleanup"] },
  { id: "p013", pl: "Pomóż mi, proszę.", en: "Help me, please.", pron: "POH-moosh mee PROH-sheh", category: "home", tags: ["request"] },
  { id: "p014", pl: "Posprzątajmy razem.", en: "Let’s clean up together.", pron: "poh-spzhon-TAI-mih RAH-zem", category: "home", tags: ["cleanup"] },
  { id: "p015", pl: "Odłóż to na miejsce.", en: "Put that back in its place.", pron: "OD-woozh toh nah MYES-tseh", category: "home", tags: ["cleanup", "command"] },
  { id: "p016", pl: "Gdzie jest twoja zabawka?", en: "Where is your toy?", pron: "gdjeh yest TFO-yah zah-BAF-kah", category: "kids", tags: ["question", "toy"] },
  { id: "p017", pl: "Gdzie są twoje buty?", en: "Where are your shoes?", pron: "gdjeh son TFO-yeh BOO-tih", category: "getting-ready", tags: ["question"] },
  { id: "p018", pl: "Załóż buty.", en: "Put your shoes on.", pron: "ZAH-woozh BOO-tih", category: "getting-ready", tags: ["command"] },
  { id: "p019", pl: "Załóż kurtkę.", en: "Put your jacket on.", pron: "ZAH-woozh KOORT-keh", category: "getting-ready", tags: ["command"] },
  { id: "p020", pl: "Czas iść.", en: "Time to go.", pron: "chahs eeshch", category: "getting-ready", tags: ["routine"] },
  { id: "p021", pl: "Zaraz wychodzimy.", en: "We’re leaving soon.", pron: "ZAH-rahs vih-hoh-JEE-mih", category: "getting-ready", tags: ["routine"] },
  { id: "p022", pl: "Idziemy do sklepu.", en: "We’re going to the store.", pron: "ee-JYEH-mih doh SKLEH-poo", category: "outings", tags: ["plans"] },
  { id: "p023", pl: "Idziemy do kościoła.", en: "We’re going to church.", pron: "ee-JYEH-mih doh koh-SHCHOH-wah", category: "outings", tags: ["plans"] },
  { id: "p024", pl: "Jedziemy do babci.", en: "We’re going to grandma’s.", pron: "yeh-JYEH-mih doh BAP-chee", category: "outings", tags: ["family", "plans"] },
  { id: "p025", pl: "Zapnij pasy.", en: "Buckle your seatbelt.", pron: "ZAP-nyee PAH-sih", category: "outings", tags: ["car", "command"] },
  { id: "p026", pl: "Bądź ostrożna.", en: "Be careful.", pron: "bonj oh-STROOZH-nah", category: "parenting", tags: ["warning"] },
  { id: "p027", pl: "Bądź ostrożny.", en: "Be careful.", pron: "bonj oh-STROOZH-nih", category: "parenting", tags: ["warning"] },
  { id: "p028", pl: "Nie biegaj w domu.", en: "Don’t run in the house.", pron: "nyeh BYEH-gai v DOH-moo", category: "parenting", tags: ["boundary"] },
  { id: "p029", pl: "Mów ciszej, proszę.", en: "Speak quieter, please.", pron: "moov CHEE-shei PROH-sheh", category: "parenting", tags: ["request"] },
  { id: "p030", pl: "Nie krzycz, proszę.", en: "Don’t yell, please.", pron: "nyeh kshihch PROH-sheh", category: "parenting", tags: ["boundary"] },
  { id: "p031", pl: "Słuchaj mamy.", en: "Listen to mommy.", pron: "SWOO-hai MAH-mih", category: "parenting", tags: ["family"] },
  { id: "p032", pl: "Słuchaj taty.", en: "Listen to daddy.", pron: "SWOO-hai TAH-tih", category: "parenting", tags: ["family"] },
  { id: "p033", pl: "Powiedz mamie.", en: "Tell mommy.", pron: "POH-vyets MAH-myeh", category: "kids", tags: ["family"] },
  { id: "p034", pl: "Powiedz tacie.", en: "Tell daddy.", pron: "POH-vyets TAH-tsyeh", category: "kids", tags: ["family"] },
  { id: "p035", pl: "Co się stało?", en: "What happened?", pron: "tsoh shyeh STAH-woh", category: "questions", tags: ["question"] },
  { id: "p036", pl: "Dlaczego płaczesz?", en: "Why are you crying?", pron: "dlah-CHEH-goh PWAH-chesh", category: "feelings", tags: ["question"] },
  { id: "p037", pl: "Jesteś smutna?", en: "Are you sad?", pron: "YES-tesh SMOOT-nah", category: "feelings", tags: ["question"] },
  { id: "p038", pl: "Jesteś zła?", en: "Are you angry?", pron: "YES-tesh zwah", category: "feelings", tags: ["question"] },
  { id: "p039", pl: "Jesteś zmęczona?", en: "Are you tired?", pron: "YES-tesh zmen-CHOH-nah", category: "feelings", tags: ["question"] },
  { id: "p040", pl: "Chodź do mnie.", en: "Come to me.", pron: "hojch doh mnyeh", category: "feelings", tags: ["comfort"] },
  { id: "p041", pl: "Przytul mnie.", en: "Hug me.", pron: "PSHI-tool mnyeh", category: "feelings", tags: ["comfort"] },
  { id: "p042", pl: "Wszystko dobrze.", en: "Everything is okay.", pron: "FSHIST-koh DOB-zheh", category: "feelings", tags: ["comfort"] },
  { id: "p043", pl: "Już dobrze.", en: "It’s okay now.", pron: "yoosh DOB-zheh", category: "feelings", tags: ["comfort"] },
  { id: "p044", pl: "Kocham cię.", en: "I love you.", pron: "KOH-ham chyeh", category: "home", tags: ["affection"] },
  { id: "p045", pl: "Jestem z ciebie dumny.", en: "I’m proud of you.", pron: "YES-tem z CHEE-byeh DOOM-nih", category: "home", tags: ["encouragement"] },
  { id: "p046", pl: "Świetna robota.", en: "Great job.", pron: "SHVYET-nah roh-BOH-tah", category: "kids", tags: ["encouragement"] },
  { id: "p047", pl: "Spróbuj jeszcze raz.", en: "Try one more time.", pron: "SPROO-booy YESH-cheh rahs", category: "kids", tags: ["encouragement"] },
  { id: "p048", pl: "Dasz radę.", en: "You can do it.", pron: "dahsh RAH-deh", category: "kids", tags: ["encouragement"] },
  { id: "p049", pl: "Czego potrzebujesz?", en: "What do you need?", pron: "CHEH-goh poh-tsheh-BOO-yesh", category: "feelings", tags: ["question"] },
  { id: "p050", pl: "Potrzebujesz pomocy?", en: "Do you need help?", pron: "poh-tsheh-BOO-yesh poh-MOH-tsih", category: "questions", tags: ["question"] },
  { id: "p051", pl: "Chcesz odpocząć?", en: "Do you want to rest?", pron: "hchesh od-POH-chonch", category: "feelings", tags: ["question"] },
  { id: "p052", pl: "Chcesz się pobawić?", en: "Do you want to play?", pron: "hchesh shyeh poh-BAH-veech", category: "kids", tags: ["question", "play"] },
  { id: "p053", pl: "Pobawimy się?", en: "Shall we play?", pron: "poh-bah-VEE-mih shyeh", category: "kids", tags: ["question", "play"] },
  { id: "p054", pl: "Teraz moja kolej.", en: "Now it’s my turn.", pron: "TEH-rahs MOH-yah KOH-lei", category: "kids", tags: ["play"] },
  { id: "p055", pl: "Teraz twoja kolej.", en: "Now it’s your turn.", pron: "TEH-rahs TFO-yah KOH-lei", category: "kids", tags: ["play"] },
  { id: "p056", pl: "Poczekaj chwilę.", en: "Wait a moment.", pron: "poh-CHEH-kai HFEE-leh", category: "home", tags: ["routine"] },
  { id: "p057", pl: "Zaraz wracam.", en: "I’ll be right back.", pron: "ZAH-rahs VRAH-tsam", category: "home", tags: ["routine"] },
  { id: "p058", pl: "Nie rozumiem jeszcze.", en: "I don’t understand yet.", pron: "nyeh roh-ZOO-myem YESH-cheh", category: "wife-conversations", tags: ["repair"] },
  { id: "p059", pl: "Możesz powiedzieć wolniej?", en: "Can you say it slower?", pron: "MOH-zhesh poh-VYEH-jetch VOL-nyei", category: "wife-conversations", tags: ["repair", "question"] },
  { id: "p060", pl: "Możesz powtórzyć?", en: "Can you repeat that?", pron: "MOH-zhesh pof-TOO-zhihch", category: "wife-conversations", tags: ["repair", "question"] },
  { id: "p061", pl: "Jak to powiedzieć po polsku?", en: "How do you say this in Polish?", pron: "yak toh poh-VYEH-jetch poh POL-skoo", category: "wife-conversations", tags: ["repair", "question"] },
  { id: "p062", pl: "Próbuję mówić więcej po polsku.", en: "I’m trying to speak more Polish.", pron: "PROO-boo-yeh MOO-veech VYEN-tsei poh POL-skoo", category: "wife-conversations", tags: ["self"] },
  { id: "p063", pl: "Popraw mnie, proszę.", en: "Correct me, please.", pron: "POH-praf mnyeh PROH-sheh", category: "wife-conversations", tags: ["repair"] },
  { id: "p064", pl: "Czy tak jest dobrze?", en: "Is it right like this?", pron: "chih tak yest DOB-zheh", category: "wife-conversations", tags: ["question"] },
  { id: "p065", pl: "Co dzisiaj robimy?", en: "What are we doing today?", pron: "tsoh jee-SHAI roh-BEE-mih", category: "questions", tags: ["plans"] },
  { id: "p066", pl: "Co chcesz robić?", en: "What do you want to do?", pron: "tsoh hchesh ROH-beech", category: "questions", tags: ["plans"] },
  { id: "p067", pl: "O której wychodzimy?", en: "What time are we leaving?", pron: "oh KTOO-rei vih-hoh-JEE-mih", category: "questions", tags: ["plans"] },
  { id: "p068", pl: "Potrzebuję kawy.", en: "I need coffee.", pron: "poh-tsheh-BOO-yeh KAH-vih", category: "home", tags: ["daily"] },
  { id: "p069", pl: "Jestem zmęczony.", en: "I’m tired.", pron: "YES-tem zmen-CHOH-nih", category: "feelings", tags: ["self"] },
  { id: "p070", pl: "Dziękuję za pomoc.", en: "Thank you for the help.", pron: "jen-KOO-yeh zah POH-mots", category: "home", tags: ["thanks"] },
  { id: "p071", pl: "Przepraszam.", en: "I’m sorry / excuse me.", pron: "psheh-PRAH-sham", category: "home", tags: ["repair"] },
  { id: "p072", pl: "Masz rację.", en: "You’re right.", pron: "mash RAH-tsyeh", category: "wife-conversations", tags: ["conversation"] },
  { id: "p073", pl: "Nie jestem pewien.", en: "I’m not sure.", pron: "nyeh YES-tem PEH-vyen", category: "wife-conversations", tags: ["conversation"] },
  { id: "p074", pl: "Myślę, że tak.", en: "I think so.", pron: "MIH-shleh zheh tak", category: "wife-conversations", tags: ["conversation"] },
  { id: "p075", pl: "Myślę, że nie.", en: "I don’t think so.", pron: "MIH-shleh zheh nyeh", category: "wife-conversations", tags: ["conversation"] },
  { id: "p076", pl: "Zgadzam się.", en: "I agree.", pron: "ZGAH-dzam shyeh", category: "wife-conversations", tags: ["conversation"] },
  { id: "p077", pl: "Nie zgadzam się.", en: "I disagree.", pron: "nyeh ZGAH-dzam shyeh", category: "wife-conversations", tags: ["conversation"] },
  { id: "p078", pl: "Chwileczkę.", en: "Just a second.", pron: "hfee-LECH-keh", category: "home", tags: ["routine"] },
  { id: "p079", pl: "Już idę.", en: "I’m coming.", pron: "yoosh EE-deh", category: "home", tags: ["routine"] },
  { id: "p080", pl: "Co robisz?", en: "What are you doing?", pron: "tsoh ROH-beesh", category: "questions", tags: ["question"] },
  { id: "p081", pl: "Co masz?", en: "What do you have?", pron: "tsoh mash", category: "questions", tags: ["question"] },
  { id: "p082", pl: "Kto to zrobił?", en: "Who did this?", pron: "ktoh toh ZROH-beew", category: "questions", tags: ["past"] },
  { id: "p083", pl: "Ja to zrobiłem.", en: "I did it.", pron: "yah toh ZROH-bee-wem", category: "questions", tags: ["past", "self"] },
  { id: "p084", pl: "Ona to zrobiła.", en: "She did it.", pron: "OH-nah toh ZROH-bee-wah", category: "questions", tags: ["past"] },
  { id: "p085", pl: "Będziemy jeść obiad.", en: "We’re going to eat dinner.", pron: "ben-JYEH-mih yeshch OH-byad", category: "kitchen", tags: ["future"] },
  { id: "p086", pl: "Będziemy się bawić.", en: "We’re going to play.", pron: "ben-JYEH-mih shyeh BAH-veech", category: "kids", tags: ["future"] },
  { id: "p087", pl: "Jutro pójdziemy do parku.", en: "Tomorrow we’ll go to the park.", pron: "YOO-troh pooy-JYEH-mih doh PARK-oo", category: "outings", tags: ["future"] },
  { id: "p088", pl: "Dzisiaj zostajemy w domu.", en: "Today we’re staying home.", pron: "jee-SHAI zoh-stah-YEH-mih v DOH-moo", category: "home", tags: ["plans"] },
  { id: "p089", pl: "Czas na kąpiel.", en: "Time for a bath.", pron: "chahs nah KOM-pyel", category: "bedtime", tags: ["routine"] },
  { id: "p090", pl: "Umyj ręce.", en: "Wash your hands.", pron: "OO-mihy REN-tseh", category: "parenting", tags: ["routine", "command"] },
  { id: "p091", pl: "Umyj zęby.", en: "Brush your teeth.", pron: "OO-mihy ZEM-bih", category: "bedtime", tags: ["routine", "command"] },
  { id: "p092", pl: "Załóż piżamę.", en: "Put on pajamas.", pron: "ZAH-woozh pee-ZHAH-meh", category: "bedtime", tags: ["routine", "command"] },
  { id: "p093", pl: "Wybierz książkę.", en: "Choose a book.", pron: "VIH-byesh KSHONZH-keh", category: "bedtime", tags: ["routine"] },
  { id: "p094", pl: "Przeczytamy bajkę.", en: "We’ll read a story.", pron: "psheh-chih-TAH-mih BAI-keh", category: "bedtime", tags: ["routine", "future"] },
  { id: "p095", pl: "Czas spać.", en: "Time to sleep.", pron: "chahs spahch", category: "bedtime", tags: ["routine"] },
  { id: "p096", pl: "Dobranoc.", en: "Good night.", pron: "doh-BRAH-nots", category: "bedtime", tags: ["routine"] },
  { id: "p097", pl: "Śpij dobrze.", en: "Sleep well.", pron: "shpeey DOB-zheh", category: "bedtime", tags: ["routine"] },
  { id: "p098", pl: "Zostań w łóżku.", en: "Stay in bed.", pron: "ZOH-stain v WOOZH-koo", category: "bedtime", tags: ["boundary"] },
  { id: "p099", pl: "Potrzebujesz kocyka?", en: "Do you need a blanket?", pron: "poh-tsheh-BOO-yesh koh-TSIH-kah", category: "bedtime", tags: ["question"] },
  { id: "p100", pl: "Chcesz mleka?", en: "Do you want milk?", pron: "hchesh MLEH-kah", category: "kitchen", tags: ["question", "drink"] },
  { id: "p101", pl: "To jest moje.", en: "This is mine.", pron: "toh yest MOH-yeh", category: "kids", tags: ["play"] },
  { id: "p102", pl: "To jest twoje.", en: "This is yours.", pron: "toh yest TFO-yeh", category: "kids", tags: ["play"] },
  { id: "p103", pl: "Dzielimy się.", en: "We share.", pron: "jyeh-LEE-mih shyeh", category: "parenting", tags: ["sharing"] },
  { id: "p104", pl: "Poczekaj na swoją kolej.", en: "Wait for your turn.", pron: "poh-CHEH-kai nah SFO-yom KOH-lei", category: "parenting", tags: ["sharing"] },
  { id: "p105", pl: "Nie wolno bić.", en: "No hitting.", pron: "nyeh VOL-noh beech", category: "parenting", tags: ["boundary"] },
  { id: "p106", pl: "Delikatnie.", en: "Gently.", pron: "deh-lee-KAHT-nyeh", category: "parenting", tags: ["boundary"] },
  { id: "p107", pl: "Jestem tutaj.", en: "I’m here.", pron: "YES-tem TOO-tai", category: "feelings", tags: ["comfort"] },
  { id: "p108", pl: "Oddychaj powoli.", en: "Breathe slowly.", pron: "od-DIH-hai poh-VOH-lee", category: "feelings", tags: ["comfort"] },
  { id: "p109", pl: "Powiedz mi słowami.", en: "Tell me with words.", pron: "POH-vyets mee swoh-VAH-mee", category: "parenting", tags: ["feelings"] },
  { id: "p110", pl: "Nie rozumiem, pokaż mi.", en: "I don’t understand, show me.", pron: "nyeh roh-ZOO-myem POH-kazh mee", category: "parenting", tags: ["repair"] },
  { id: "p111", pl: "Czy możesz mi pomóc?", en: "Can you help me?", pron: "chih MOH-zhesh mee POH-moots", category: "questions", tags: ["request"] },
  { id: "p112", pl: "Potrzebuję pięciu minut.", en: "I need five minutes.", pron: "poh-tsheh-BOO-yeh PYEN-choo MEE-noot", category: "wife-conversations", tags: ["home"] },
  { id: "p113", pl: "Zrobię to za chwilę.", en: "I’ll do it in a moment.", pron: "ZROH-byeh toh zah HFEE-leh", category: "home", tags: ["future"] },
  { id: "p114", pl: "Zrobiłem obiad.", en: "I made dinner.", pron: "ZROH-bee-wem OH-byad", category: "kitchen", tags: ["past"] },
  { id: "p115", pl: "Kupiłem mleko.", en: "I bought milk.", pron: "koo-PEE-wem MLEH-koh", category: "kitchen", tags: ["past"] },
  { id: "p116", pl: "Dzieci już śpią.", en: "The kids are already sleeping.", pron: "JYEH-chee yoosh shpyon", category: "wife-conversations", tags: ["bedtime"] },
  { id: "p117", pl: "Jak minął dzień?", en: "How was your day?", pron: "yak MEE-now jyen", category: "wife-conversations", tags: ["question"] },
  { id: "p118", pl: "Co było najtrudniejsze?", en: "What was the hardest thing?", pron: "tsoh BIH-woh nai-trood-NYEI-sheh", category: "wife-conversations", tags: ["question"] },
  { id: "p119", pl: "Co było najlepsze?", en: "What was the best thing?", pron: "tsoh BIH-woh nai-LEP-sheh", category: "wife-conversations", tags: ["question"] },
  { id: "p120", pl: "Dziękuję, że mi pomagasz.", en: "Thank you for helping me.", pron: "jen-KOO-yeh zheh mee poh-MAH-gash", category: "wife-conversations", tags: ["thanks"] }
];

export const lessons: Lesson[] = [
  {
    id: "lesson-home-basics",
    title: "Home basics you can use today",
    situation: "Moving through a normal morning at home with short, useful Polish.",
    level: "A2",
    phraseIds: ["p013", "p014", "p015", "p044", "p056", "p057", "p078", "p079", "p088"],
    explanation: "Use short sentences first. Polish communication at home does not need to be fancy; it needs to be available in the moment.",
    pattern: "Imperatives like odłóż, poczekaj, and chodź are common in family Polish. Add proszę when you want a softer tone.",
    speakingDrill: [
      "Say: Help me, please.",
      "Say: Put that back in its place.",
      "Say: I love you.",
      "Say: We’re staying home today."
    ],
    challenge: "Use at least 3 home phrases today and write one note about what felt natural or hard.",
    quiz: [
      { id: "q1", type: "translate-en-pl", prompt: "How do you say: Help me, please?", answer: "Pomóż mi, proszę." },
      { id: "q2", type: "multiple-choice", prompt: "What does 'Chwileczkę' mean?", answer: "Just a second.", choices: ["Just a second.", "Good night.", "I agree.", "Be careful."] },
      { id: "q3", type: "missing-word", prompt: "Odłóż to na ____.", answer: "miejsce", choices: ["miejsce", "wody", "kawę", "sklep"] }
    ]
  },
  {
    id: "lesson-kitchen-food",
    title: "Kitchen and food questions",
    situation: "Breakfast, snacks, and quick food questions with kids or your wife.",
    level: "A2",
    phraseIds: ["p001", "p002", "p003", "p004", "p005", "p006", "p007", "p008", "p009", "p010", "p011", "p100"],
    explanation: "Questions with chcesz are high-value. You can swap the object: wody, mleka, coś zjeść.",
    pattern: "Chcesz + noun in genitive often appears for offers: Chcesz wody? Chcesz mleka?",
    speakingDrill: [
      "Ask a girl/woman if she is hungry.",
      "Ask if someone wants water.",
      "Warn someone that something is hot.",
      "Ask if they are done eating."
    ],
    challenge: "Use one Polish food or drink question at the next meal.",
    quiz: [
      { id: "q1", type: "multiple-choice", prompt: "Which phrase means 'Do you want water?'", answer: "Chcesz wody?", choices: ["Chcesz wody?", "Czas iść.", "Jestem tutaj.", "Masz rację."] },
      { id: "q2", type: "translate-pl-en", prompt: "Translate: Smakuje ci?", answer: "Do you like the taste?" },
      { id: "q3", type: "missing-word", prompt: "Uważaj, ____.", answer: "gorące", choices: ["gorące", "dobranoc", "tutaj", "wolniej"] }
    ]
  },
  {
    id: "lesson-gentle-parenting",
    title: "Gentle parenting commands",
    situation: "Keeping boundaries while sounding warm and practical.",
    level: "A2+",
    phraseIds: ["p026", "p027", "p028", "p029", "p030", "p031", "p032", "p047", "p048", "p103", "p104", "p105", "p106"],
    explanation: "Polish commands can sound direct. Tone, proszę, and short encouragement make them feel warmer.",
    pattern: "Use nie + command for limits: Nie biegaj, nie krzycz. Use positive alternatives when possible.",
    speakingDrill: [
      "Tell a child not to run in the house.",
      "Say 'speak quieter, please.'",
      "Say 'try one more time.'",
      "Say 'we share.'"
    ],
    challenge: "Pick one boundary phrase and one encouragement phrase to practice out loud.",
    quiz: [
      { id: "q1", type: "translate-en-pl", prompt: "How do you say: Don’t run in the house?", answer: "Nie biegaj w domu." },
      { id: "q2", type: "multiple-choice", prompt: "What does 'Delikatnie' mean?", answer: "Gently.", choices: ["Gently.", "Time to go.", "A little more?", "I agree."] },
      { id: "q3", type: "missing-word", prompt: "Poczekaj na swoją ____.", answer: "kolej", choices: ["kolej", "wodę", "książkę", "kurtkę"] }
    ]
  },
  {
    id: "lesson-bedtime",
    title: "Bedtime routine",
    situation: "Bath, pajamas, teeth, books, and good night.",
    level: "A2",
    phraseIds: ["p089", "p091", "p092", "p093", "p094", "p095", "p096", "p097", "p098", "p099", "p116"],
    explanation: "Bedtime phrases repeat every day, which makes them perfect for automatic speaking practice.",
    pattern: "Czas na + noun means 'time for'. Czas spać means 'time to sleep'.",
    speakingDrill: [
      "Say: Time for a bath.",
      "Say: Brush your teeth.",
      "Say: We’ll read a story.",
      "Say: Sleep well."
    ],
    challenge: "Run one part of bedtime in Polish, even if it is only two phrases.",
    quiz: [
      { id: "q1", type: "translate-en-pl", prompt: "How do you say: Time to sleep?", answer: "Czas spać." },
      { id: "q2", type: "multiple-choice", prompt: "What does 'Wybierz książkę' mean?", answer: "Choose a book.", choices: ["Choose a book.", "Wash your hands.", "Buckle your seatbelt.", "Wait a moment."] },
      { id: "q3", type: "missing-word", prompt: "Załóż ____.", answer: "piżamę", choices: ["piżamę", "wody", "wolniej", "rację"] }
    ]
  },
  {
    id: "lesson-repair-with-wife",
    title: "Repair phrases with your wife",
    situation: "Staying in Polish longer by asking for help, repetition, and corrections.",
    level: "A2+",
    phraseIds: ["p058", "p059", "p060", "p061", "p062", "p063", "p064", "p070", "p071", "p072", "p117"],
    explanation: "Repair phrases keep conversations alive. They let you stay in Polish instead of switching immediately to English.",
    pattern: "Możesz + infinitive is useful and polite: możesz powiedzieć, możesz powtórzyć.",
    speakingDrill: [
      "Ask your wife to say it slower.",
      "Ask how to say something in Polish.",
      "Say you are trying to speak more Polish.",
      "Ask whether what you said is correct."
    ],
    challenge: "Ask for one correction in Polish today and record the correction in your notes.",
    quiz: [
      { id: "q1", type: "translate-en-pl", prompt: "How do you say: Can you repeat that?", answer: "Możesz powtórzyć?" },
      { id: "q2", type: "multiple-choice", prompt: "What does 'Popraw mnie, proszę' mean?", answer: "Correct me, please.", choices: ["Correct me, please.", "I bought milk.", "Time for a bath.", "I disagree."] },
      { id: "q3", type: "missing-word", prompt: "Próbuję mówić więcej po ____.", answer: "polsku", choices: ["polsku", "domu", "kawę", "kolej"] }
    ]
  }
];

export const roleplayScripts: RoleplayScript[] = [
  {
    id: "wife-evening-checkin",
    title: "Evening check-in with your wife",
    context: "After the kids are down, ask simple questions and stay in Polish.",
    audience: "wife",
    lines: [
      { speaker: "You", pl: "Jak minął dzień?", en: "How was your day?" },
      { speaker: "Wife", pl: "Był długi, ale dobry.", en: "It was long, but good." },
      { speaker: "You", pl: "Co było najtrudniejsze?", en: "What was the hardest thing?" },
      { speaker: "You", pl: "Możesz powiedzieć wolniej?", en: "Can you say it slower?" }
    ]
  },
  {
    id: "wife-polish-help",
    title: "Asking for Polish help",
    context: "Use repair phrases without leaving the conversation.",
    audience: "wife",
    lines: [
      { speaker: "You", pl: "Próbuję mówić więcej po polsku.", en: "I’m trying to speak more Polish." },
      { speaker: "You", pl: "Jak to powiedzieć po polsku?", en: "How do you say this in Polish?" },
      { speaker: "Wife", pl: "Powiedz: potrzebuję pięciu minut.", en: "Say: I need five minutes." },
      { speaker: "You", pl: "Czy tak jest dobrze?", en: "Is it right like this?" }
    ]
  },
  {
    id: "wife-planning-outing",
    title: "Planning an outing",
    context: "A practical short conversation before leaving the house.",
    audience: "wife",
    lines: [
      { speaker: "You", pl: "Co dzisiaj robimy?", en: "What are we doing today?" },
      { speaker: "Wife", pl: "Idziemy do sklepu.", en: "We’re going to the store." },
      { speaker: "You", pl: "O której wychodzimy?", en: "What time are we leaving?" },
      { speaker: "You", pl: "Potrzebuję pięciu minut.", en: "I need five minutes." }
    ]
  },
  {
    id: "kid-cleanup",
    title: "Cleanup with a child",
    context: "Gentle cleanup commands and encouragement.",
    audience: "kids",
    lines: [
      { speaker: "You", pl: "Posprzątajmy razem.", en: "Let’s clean up together." },
      { speaker: "You", pl: "Odłóż to na miejsce.", en: "Put that back in its place." },
      { speaker: "Child", pl: "Nie chcę.", en: "I don’t want to." },
      { speaker: "You", pl: "Spróbuj jeszcze raz. Dasz radę.", en: "Try one more time. You can do it." }
    ]
  },
  {
    id: "kid-feelings",
    title: "Feelings and comfort",
    context: "Respond when a child is upset.",
    audience: "kids",
    lines: [
      { speaker: "You", pl: "Co się stało?", en: "What happened?" },
      { speaker: "You", pl: "Chodź do mnie.", en: "Come to me." },
      { speaker: "You", pl: "Jestem tutaj.", en: "I’m here." },
      { speaker: "You", pl: "Powiedz mi słowami.", en: "Tell me with words." }
    ]
  },
  {
    id: "kid-bedtime",
    title: "Bedtime routine with a child",
    context: "Move through bedtime in short Polish phrases.",
    audience: "kids",
    lines: [
      { speaker: "You", pl: "Czas na kąpiel.", en: "Time for a bath." },
      { speaker: "You", pl: "Umyj zęby.", en: "Brush your teeth." },
      { speaker: "You", pl: "Wybierz książkę.", en: "Choose a book." },
      { speaker: "You", pl: "Dobranoc. Śpij dobrze.", en: "Good night. Sleep well." }
    ]
  }
];

export const glossary: GlossaryTerm[] = [
  { id: "g001", pl: "chcieć", en: "to want", example: "Chcesz wody?", tags: ["verb", "A2"] },
  { id: "g002", pl: "potrzebować", en: "to need", example: "Potrzebujesz pomocy?", tags: ["verb", "A2"] },
  { id: "g003", pl: "pomoc", en: "help", example: "Dziękuję za pomoc.", tags: ["noun", "family"] },
  { id: "g004", pl: "dzień", en: "day", example: "Jak minął dzień?", tags: ["noun", "conversation"] },
  { id: "g005", pl: "dom", en: "home / house", example: "Zostajemy w domu.", tags: ["noun", "home"] },
  { id: "g006", pl: "woda", en: "water", example: "Chcesz wody?", tags: ["noun", "kitchen"] },
  { id: "g007", pl: "mleko", en: "milk", example: "Kupiłem mleko.", tags: ["noun", "kitchen"] },
  { id: "g008", pl: "jeść", en: "to eat", example: "Chcesz coś zjeść?", tags: ["verb", "kitchen"] },
  { id: "g009", pl: "iść", en: "to go by foot", example: "Czas iść.", tags: ["verb", "movement"] },
  { id: "g010", pl: "jechać", en: "to go by vehicle", example: "Jedziemy do babci.", tags: ["verb", "movement"] },
  { id: "g011", pl: "powiedzieć", en: "to say / tell", example: "Możesz powiedzieć wolniej?", tags: ["verb", "repair"] },
  { id: "g012", pl: "powtórzyć", en: "to repeat", example: "Możesz powtórzyć?", tags: ["verb", "repair"] },
  { id: "g013", pl: "wolniej", en: "slower", example: "Powiedz wolniej.", tags: ["adverb", "repair"] },
  { id: "g014", pl: "dobrze", en: "well / okay", example: "Wszystko dobrze.", tags: ["adverb", "comfort"] },
  { id: "g015", pl: "ostrożnie", en: "carefully", example: "Bądź ostrożna.", tags: ["adverb", "parenting"] },
  { id: "g016", pl: "kolej", en: "turn", example: "Teraz twoja kolej.", tags: ["noun", "play"] },
  { id: "g017", pl: "książka", en: "book", example: "Wybierz książkę.", tags: ["noun", "bedtime"] },
  { id: "g018", pl: "łóżko", en: "bed", example: "Zostań w łóżku.", tags: ["noun", "bedtime"] },
  { id: "g019", pl: "ręce", en: "hands", example: "Umyj ręce.", tags: ["noun", "routine"] },
  { id: "g020", pl: "zęby", en: "teeth", example: "Umyj zęby.", tags: ["noun", "routine"] },
  { id: "g021", pl: "smutny / smutna", en: "sad", example: "Jesteś smutna?", tags: ["adjective", "feelings"] },
  { id: "g022", pl: "zmęczony / zmęczona", en: "tired", example: "Jestem zmęczony.", tags: ["adjective", "feelings"] },
  { id: "g023", pl: "głodny / głodna", en: "hungry", example: "Jesteś głodna?", tags: ["adjective", "kitchen"] },
  { id: "g024", pl: "dzielić się", en: "to share", example: "Dzielimy się.", tags: ["verb", "parenting"] },
  { id: "g025", pl: "spróbować", en: "to try", example: "Spróbuj jeszcze raz.", tags: ["verb", "encouragement"] },
  { id: "g026", pl: "rozumieć", en: "to understand", example: "Nie rozumiem jeszcze.", tags: ["verb", "repair"] },
  { id: "g027", pl: "mówić", en: "to speak", example: "Próbuję mówić więcej po polsku.", tags: ["verb", "conversation"] },
  { id: "g028", pl: "poprawić", en: "to correct", example: "Popraw mnie, proszę.", tags: ["verb", "learning"] },
  { id: "g029", pl: "dzisiaj", en: "today", example: "Co dzisiaj robimy?", tags: ["time"] },
  { id: "g030", pl: "jutro", en: "tomorrow", example: "Jutro pójdziemy do parku.", tags: ["time"] }
];

export const curriculumModules = [
  "Home and family basics",
  "Food and kitchen Polish",
  "Parenting commands and gentle corrections",
  "Getting ready and leaving the house",
  "Feelings, needs, and comfort phrases",
  "Questions and answers",
  "Simple past tense for daily stories",
  "Simple future tense for plans",
  "Polish cases through useful phrase patterns",
  "Conversation scripts with your wife",
  "Kid-friendly Polish games and phrases",
  "Listening and pronunciation practice"
];
