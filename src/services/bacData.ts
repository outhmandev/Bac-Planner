import type { NationalExamPaper, Exam, Weakness } from '../types/school';

/**
 * ============================================================================
 * OFFICIAL MOROCCAN 2ND BACCALAUREATE NATIONAL EXAM ARCHIVE (2020 - 2024)
 * Subjects: Mathématiques, Physique-Chimie, SVT, Philosophie, English
 * Sources: Ministère de l'Éducation Nationale du Maroc & AlloSchool Archives
 * ============================================================================
 */
export const OFFICIAL_NATIONAL_PAPERS: NationalExamPaper[] = [
  // 1. Mathématiques 2024 - Session Normale
  {
    id: 'bac-math-2024-sn',
    year: 2024,
    session: 'normale',
    subjectId: 'subj-math',
    subjectName: 'Mathématiques (الرياضيات)',
    stream: 'Sciences Physiques (PC)',
    durationHours: 3,
    coefficient: 7,
    topicsCovered: [
      'Exercice 1 (3 pts): Géométrie spatiale (Produit vectoriel, plan tangent à une sphère)',
      'Exercice 2 (3 pts): Nombres complexes (Forme trigonométrique, équation du 2nd degré, rotation)',
      'Exercice 3 (3 pts): Probabilités et variable aléatoire (Tirage simultané de boules numérotées)',
      'Problème d\'Analyse (11 pts): Fonctions exponentielles, branches infinies, calcul d\'aire et suites u_{n+1} = f(u_n)'
    ],
    pdfUrl: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Épreuve très équilibrée. Le problème d\'analyse portait sur une fonction exponentielle avec calcul d\'intégrale par parties.'
  },

  // 2. Mathématiques 2024 - Session Rattrapage
  {
    id: 'bac-math-2024-sr',
    year: 2024,
    session: 'rattrapage',
    subjectId: 'subj-math',
    subjectName: 'Mathématiques (الرياضيات)',
    stream: 'Sciences Physiques (PC)',
    durationHours: 3,
    coefficient: 7,
    topicsCovered: [
      'Exercice 1 (3 pts): Géométrie dans l\'espace (Intersection plan et sphère)',
      'Exercice 2 (3 pts): Nombres complexes (Homothétie et cocyclicité)',
      'Exercice 3 (3 pts): Dénombrement et tirage successif sans remise',
      'Problème d\'Analyse (11 pts): Fonctions logarithmes népériens ln(x) et convergence de suite'
    ],
    pdfUrl: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Excellente épreuve pour tester sa maîtrise des fonctions ln(x) et de la règle ALPES pour l\'IPP.'
  },

  // 3. Mathématiques 2023 - Session Normale
  {
    id: 'bac-math-2023-sn',
    year: 2023,
    session: 'normale',
    subjectId: 'subj-math',
    subjectName: 'Mathématiques (الرياضيات)',
    stream: 'Sciences Physiques (PC)',
    durationHours: 3,
    coefficient: 7,
    topicsCovered: [
      'Exercice 1 (3 pts): Géométrie analytique de l\'espace (Distance d\'un point à un plan)',
      'Exercice 2 (3 pts): Complexes (Formule de Moivre, module et argument)',
      'Exercice 3 (3 pts): Probabilités composées et arbre pondéré',
      'Problème (11 pts): Étude d\'une fonction exponentielle f(x) = (x - 2)e^x + x et suite récurrente associée'
    ],
    pdfUrl: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Sujet référence avec un barème officiel très détaillé sur les branches infinies.'
  },

  // 4. Physique-Chimie 2024 - Session Normale
  {
    id: 'bac-pc-2024-sn',
    year: 2024,
    session: 'normale',
    subjectId: 'subj-physics',
    subjectName: 'Physique-Chimie (الفيزياء والكيمياء)',
    stream: 'Sciences Physiques (PC)',
    durationHours: 3,
    coefficient: 7,
    topicsCovered: [
      'Chimie (7 pts): Dosage pH-métrique d\'un acide carboxylique et constante d\'acidité Ka + Pile Daniell',
      'Physique Ondes (2.5 pts): Ondes mécaniques progressives à la surface de l\'eau (diffraction)',
      'Nucléaire (2.5 pts): Décroissance du Cobalt 60 et énergie de liaison',
      'Électricité (4 pts): Réponse du dipôle RC à un échelon de tension puis décharge dans une bobine inductive (RLC)',
      'Mécanique (4 pts): Mouvement d\'un solide sur plan incliné avec frottements et chute parabolique d\'un projectile'
    ],
    pdfUrl: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Examen complet conforme au cadre de référence officiel. La partie mécanique nécessite une bonne projection sur les axes de Frenet/Cartésien.'
  },

  // 5. Physique-Chimie 2024 - Session Rattrapage
  {
    id: 'bac-pc-2024-sr',
    year: 2024,
    session: 'rattrapage',
    subjectId: 'subj-physics',
    subjectName: 'Physique-Chimie (الفيزياء والكيمياء)',
    stream: 'Sciences Physiques (PC)',
    durationHours: 3,
    coefficient: 7,
    topicsCovered: [
      'Chimie (7 pts): Cinétique chimique et temps de demi-réaction t_{1/2} + Réaction d\'estérification',
      'Physique Ondes (2.5 pts): Diffraction de la lumière monochromatique par une fente fine (relation theta = lambda / a)',
      'Nucléaire (2 pts): Fission nucléaire de l\'Uranium 235 et bilan d\'énergie libérée Delta E',
      'Électricité (4.5 pts): Oscillations électriques libres et amorties dans un circuit RLC série',
      'Mécanique (4 pts): Mouvement d\'une particule chargée dans un champ magnétique uniforme (force de Lorentz)'
    ],
    pdfUrl: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Sujet très formateur sur la cinétique chimique et la diffraction de la lumière.'
  },

  // 6. Physique-Chimie 2023 - Session Normale
  {
    id: 'bac-pc-2023-sn',
    year: 2023,
    session: 'normale',
    subjectId: 'subj-physics',
    subjectName: 'Physique-Chimie (الفيزياء والكيمياء)',
    stream: 'Sciences Physiques (PC)',
    durationHours: 3,
    coefficient: 7,
    topicsCovered: [
      'Chimie (7 pts): Suivi temporel par conductimétrie et équilibre acide-base de l\'acide éthanoïque',
      'Physique (13 pts): Célérité des ondes ultrasonores, datation au Carbone 14, charge d\'un condensateur RC, mouvement des satellites terrestres (Kepler)'
    ],
    pdfUrl: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'La question sur les lois de Kepler et le satellite géostationnaire est un classique absolu.'
  },

  // 7. SVT 2024 - Session Normale
  {
    id: 'bac-svt-2024-sn',
    year: 2024,
    session: 'normale',
    subjectId: 'subj-svt',
    subjectName: 'Sciences de la Vie et de la Terre (علوم الحياة والأرض)',
    stream: 'Sciences Expérimentales (PC)',
    durationHours: 2,
    coefficient: 5,
    topicsCovered: [
      'Partie 1 (5 pts): Restitution des connaissances (QCM et définitions sur la glycolyse et la phosphorylation oxydative)',
      'Partie 2 (15 pts): Exploitation de données expérimentales sur l\'expression de l\'information génétique (mutation, transcription, ARN messager) et géologie des chaînes de subduction'
    ],
    pdfUrl: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Attention à la rigueur de rédaction : bien exploiter chaque graphe avant de tirer une conclusion scientifique.'
  },

  // 8. SVT 2023 - Session Normale
  {
    id: 'bac-svt-2023-sn',
    year: 2023,
    session: 'normale',
    subjectId: 'subj-svt',
    subjectName: 'Sciences de la Vie et de la Terre (علوم الحياة والأرض)',
    stream: 'Sciences Expérimentales (PC)',
    durationHours: 2,
    coefficient: 5,
    topicsCovered: [
      'Partie 1 (5 pts): Définitions et associations (Mitochondrie, cycle de Krebs, rendement énergétique)',
      'Partie 2 (15 pts): Génie génétique et production d\'insuline humaine recombinante + Étude des granites d\'anatexie et métamorphisme thermal'
    ],
    pdfUrl: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques',
    solutionUrl: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques',
    completed: false,
    score: undefined,
    notes: 'Sujet modèle pour la méthodologie de synthèse en géologie et biotechnologies.'
  },

  // 9. Philosophie 2024 - Session Normale
  {
    id: 'bac-philo-2024-sn',
    year: 2024,
    session: 'normale',
    subjectId: 'subj-philosophy',
    subjectName: 'Philosophie (الفلسفة)',
    stream: 'Sciences Expérimentales (Toutes séries)',
    durationHours: 2,
    coefficient: 2,
    topicsCovered: [
      'Sujet 1 (السؤال الإشكالي): هل معرفة الغير ممكنة أم مستحيلة؟ (مجزوءة الوضع البشري - مفهوم الغير)',
      'Sujet 2 (القولة الفلسفية): "إن التجربة وحدها كافية لبناء النظرية العلمية" ناقش وبيّن مدى صحة القولة (مجزوءة المعرفة)',
      'Sujet 3 (النص الفلسفي): نص لسبينوزا حول الغاية الحقيقية من تأسيس الدولة وهي الحرية (مجزوءة السياسة)'
    ],
    pdfUrl: 'https://www.alloschool.com/course/philosophie-2eme-bac',
    solutionUrl: 'https://www.alloschool.com/course/philosophie-2eme-bac',
    completed: false,
    score: undefined,
    notes: 'Structure officielle de notation : الفهم 4ن، التحليل 5ن، المناقشة 5ن، التركيب 3ن، الجوانب الشكلية 3ن.'
  },

  // 10. Philosophie 2023 - Session Normale
  {
    id: 'bac-philo-2023-sn',
    year: 2023,
    session: 'normale',
    subjectId: 'subj-philosophy',
    subjectName: 'Philosophie (الفلسفة)',
    stream: 'Sciences Expérimentales',
    durationHours: 2,
    coefficient: 2,
    topicsCovered: [
      'Sujet 1: هل تتحقق هوية الشخص في ثبات الذاكرة أم في التفكير الواعي؟ (ديكارت، جون لوك، شوبنهاور)',
      'Sujet 2: "تقوم العدالة على المساواة المطلقة بين جميع الأفراد" بيّن أبعاد هذا القول وحدوده (أرسطو، راولز)',
      'Sujet 3: نص فلسفي حول الواجب الأخلاقي بين الإلزام والالتزام (كانط، دوركايم)'
    ],
    pdfUrl: 'https://www.alloschool.com/course/philosophie-2eme-bac',
    solutionUrl: 'https://www.alloschool.com/course/philosophie-2eme-bac',
    completed: false,
    score: undefined,
    notes: 'Un classique absolu sur l\'identité de la personne et la justice.'
  },

  // 11. English 2024 - Session Normale
  {
    id: 'bac-en-2024-sn',
    year: 2024,
    session: 'normale',
    subjectId: 'subj-english',
    subjectName: 'English (اللغة الإنجليزية)',
    stream: 'Sciences Expérimentales',
    durationHours: 2,
    coefficient: 2,
    topicsCovered: [
      'Reading Comprehension (15 pts): Text on Artificial Intelligence in Education and youth empowerment in Morocco',
      'Language (15 pts): Modals of past deduction (must have / could have), Conditional Type 3, Phrasal verbs (look up, give up, drop out), Word formation prefixes/suffixes',
      'Writing (10 pts): Task 1: Formal email to a foundation requesting scholarship; Task 2: Opinion essay on Brain Drain and how to retain young Moroccan talents'
    ],
    pdfUrl: 'https://www.alloschool.com/course/anglais-2eme-bac',
    solutionUrl: 'https://www.alloschool.com/course/anglais-2eme-bac',
    completed: false,
    score: undefined,
    notes: 'Examen standardisé sur 40 points, ramené ensuite sur 20. Barème de writing très sensible à l\'organisation des paragraphes.'
  },

  // 12. English 2023 - Session Normale
  {
    id: 'bac-en-2023-sn',
    year: 2023,
    session: 'normale',
    subjectId: 'subj-english',
    subjectName: 'English (اللغة الإنجليزية)',
    stream: 'Sciences Expérimentales',
    durationHours: 2,
    coefficient: 2,
    topicsCovered: [
      'Reading Comprehension (15 pts): Non-governmental organizations and sustainable development initiatives in rural areas',
      'Language (15 pts): Passive voice in continuous tenses, Reported speech with reporting verbs, Collocations (make a decision, bear in mind)',
      'Writing (10 pts): Argumentative essay about renewable energy projects (Noor Ouarzazate) and environmental protection'
    ],
    pdfUrl: 'https://www.alloschool.com/course/anglais-2eme-bac',
    solutionUrl: 'https://www.alloschool.com/course/anglais-2eme-bac',
    completed: false,
    score: undefined,
    notes: 'Richesse du vocabulaire des unités Sustainable Development et Cultural Values.'
  }
];

/**
 * ============================================================================
 * OFFICIAL CONTINUOUS ASSESSMENTS & NATIONAL EXAM CALENDAR
 * Official 2nd Bac Schedule aligned with the Moroccan Ministry of Education
 * ============================================================================
 */
export const OFFICIAL_BAC_EXAMS: Exam[] = [
  {
    id: 'exam-ds1-math',
    subjectId: 'subj-math',
    title: 'Contrôle Surveillé 1 (S1) - Limites, Continuité & TAF',
    date: '2026-10-28',
    time: '08:00',
    coefficient: 7,
    targetGrade: 18.5,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Porte sur les chapitres 1 et 2 : TVI, continuité, dérivabilité et branches infinies.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-ds1-pc',
    subjectId: 'subj-physics',
    title: 'Contrôle Surveillé 1 (S1) - Ondes & Suivi Temporel Cinétique',
    date: '2026-11-04',
    time: '10:00',
    coefficient: 7,
    targetGrade: 18.0,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Ondes mécaniques progressives, diffraction lumineuse et suivi de vitesse volumique.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-ds2-math',
    subjectId: 'subj-math',
    title: 'Contrôle Surveillé 2 (S1) - Suites Numériques & Logarithmes (ln)',
    date: '2026-12-15',
    time: '08:00',
    coefficient: 7,
    targetGrade: 19.0,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Suites arithmétiques/géométriques, convergence, propriétés et étude de fonctions avec ln(x).',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-ds2-pc',
    subjectId: 'subj-physics',
    title: 'Contrôle Surveillé 2 (S1) - Nucléaire, Dipôle RC & Acide-Base',
    date: '2026-12-22',
    time: '10:00',
    coefficient: 7,
    targetGrade: 18.5,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Décroissance radioactive, bilan massique E=mc², charge d\'un condensateur RC et pH-métrie.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-ds3-svt',
    subjectId: 'subj-svt',
    title: 'Contrôle Surveillé 1 (S1) - Consommation Matière Organique & ATP',
    date: '2027-01-08',
    time: '14:00',
    coefficient: 5,
    targetGrade: 17.5,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Glycolyse, cycle de Krebs, chaîne respiratoire mitochondriale et contraction musculaire.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-ds1-philo',
    subjectId: 'subj-philosophy',
    title: 'Contrôle Surveillé 1 (S1) - مجزوءة الوضع البشري (الشخص والغير)',
    date: '2027-01-12',
    time: '14:00',
    coefficient: 2,
    targetGrade: 16.5,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Analyse d\'une قولة فلسفية مع سؤال وفق المنهجية الرسمية (4-5-5-3-3).',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-ds1-en',
    subjectId: 'subj-english',
    title: 'Contrôle Surveillé 1 (S1) - Units 1 & 2 (Youth & Humour)',
    date: '2027-01-16',
    time: '16:00',
    coefficient: 2,
    targetGrade: 19.0,
    actualGrade: undefined,
    type: 'devoir_surveille',
    notes: 'Reading comprehension, Gerund vs Infinitive, modals and short descriptive writing.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-blanc-s1',
    subjectId: 'subj-math',
    title: 'Examen Blanc Régional S1 (Conditions Réelles du National)',
    date: '2027-01-26',
    time: '08:00',
    coefficient: 7,
    targetGrade: 18.0,
    actualGrade: undefined,
    type: 'examen_blanc',
    notes: 'Simulation 3 heures sur tout le programme du 1er semestre (Analyse, Suites, Complexes 1).',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-blanc-national',
    subjectId: 'subj-math',
    title: 'Examen Blanc National Provincial S2 (Épreuve Générale)',
    date: '2027-05-18',
    time: '08:00',
    coefficient: 7,
    targetGrade: 18.5,
    actualGrade: undefined,
    type: 'examen_blanc',
    notes: 'Dernière répétition générale avant le National : sujet complet 4 exercices.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'exam-national-2027',
    subjectId: 'subj-math',
    title: '🎓 EXAMEN NATIONAL DU BACCALAURÉAT 2027 (Session Normale)',
    date: '2027-06-08',
    time: '08:00',
    coefficient: 7,
    targetGrade: 19.0,
    actualGrade: undefined,
    type: 'national',
    notes: 'Objectif Mention Très Bien (>= 16/20) avec Félicitations du Jury pour dossier CPGE/Ausbildung.',
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  }
];

/**
 * ============================================================================
 * HIGH-YIELD WEAKNESSES & COMMON TRAPS IDENTIFIED ON NATIONAL EXAMS
 * ============================================================================
 */
export const OFFICIAL_BAC_WEAKNESSES: Weakness[] = [
  {
    id: 'wk-1',
    subjectId: 'subj-math',
    chapterId: 'math-ch2',
    topic: 'Branches infinies: Asymptote oblique vs Branche parabolique',
    description: 'Lorsque lim f(x)/x = a, oubli de calculer lim [f(x) - ax] pour trancher entre asymptote oblique y = ax + b ou branche parabolique de direction (y = ax).',
    severity: 'critical',
    actionPlan: 'Résoudre les 4 exercices de branches infinies des examens nationaux 2021, 2022 et 2023 et synthétiser l\'arbre de décision sur fiche bristol.',
    resolved: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'wk-2',
    subjectId: 'subj-math',
    chapterId: 'math-ch7',
    topic: 'Complexes: Confusion entre angle de rotation et homothétie',
    description: 'Confusion entre l\'écriture z\' - omega = k(z - omega) (k in R*, homothétie) et z\' - omega = e^{i theta}(z - omega) (rotation d\'angle theta).',
    severity: 'moderate',
    actionPlan: 'Faire 5 exercices d\'annales sur l\'identification des transformations géométriques par identification des coefficients.',
    resolved: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'wk-3',
    subjectId: 'subj-physics',
    chapterId: 'pc-ch8',
    topic: 'Cinétique Chimique: Vitesse de réaction vs Vitesse volumique',
    description: 'Oubli de diviser par le volume total de la solution V_T lors du calcul de la vitesse volumique v = (1/V_T) * dx/dt.',
    severity: 'critical',
    actionPlan: 'Toujours vérifier les unités (mol.L^{-1}.s^{-1}) et la présence explicite du facteur 1/V_T dans l\'expression finale.',
    resolved: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'wk-4',
    subjectId: 'subj-physics',
    chapterId: 'pc-ch7',
    topic: 'Circuit RLC: Conservation de l\'énergie totale E_T',
    description: 'Affirmer à tort que l\'énergie totale E_T = E_e + E_m est constante alors que la résistance interne r de la bobine n\'est pas nulle.',
    severity: 'moderate',
    actionPlan: 'Écrire systématiquement dE_T/dt = -r * i² <= 0 pour prouver la dissipation par effet Joule.',
    resolved: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'wk-5',
    subjectId: 'subj-philosophy',
    chapterId: 'ph-ch1',
    topic: 'Philosophie: Oubli de la problématique dans l\'introduction (Fahm)',
    description: 'Ne pas formuler explicitement le paradoxe ou la tension conceptuelle et les 3 questions directrices qui guident l\'analyse.',
    severity: 'critical',
    actionPlan: 'Appliquer rigoureusement la formule type : "هذا التقابل يضعنا أمام المفارقة التالية... مما يدفعنا إلى طرح الأسئلة الإشكالية : هل... أم... وإلى أي حد...؟"',
    resolved: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'wk-6',
    subjectId: 'subj-english',
    chapterId: 'en-ch8',
    topic: 'English: Inversion and Irregular Participles in Conditional Type 3',
    description: 'Writing "If he would have known" instead of "If he had known, he would have succeeded".',
    severity: 'moderate',
    actionPlan: 'Memorize the fixed formula: If + Subject + HAD + Past Participle, Subject + WOULD HAVE + Past Participle.',
    resolved: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  }
];

/**
 * ============================================================================
 * OFFICIAL CADRE DE RÉFÉRENCE: LESSONS ESSENTIAL DATA LOOKUP
 * Provides Key Formulas, National Exam Weight, and Tips for lessons
 * ============================================================================
 */
export const LESSON_EXTRA_DATA: Record<string, { weight: string; formula: string; tip: string; url?: string }> = {
  // Math Ch 1: Limites et Continuité
  'm-l1': {
    weight: '1.5 - 2 pts',
    formula: 'f continue en x_0 <=> lim_{x->x_0} f(x) = f(x_0). Somme, produit et composée de fonctions continues restent continues.',
    tip: 'Toujours mentionner explicitement la continuité de chaque fonction composante sur l\'intervalle I avant toute déduction.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l2': {
    weight: '1.0 - 1.5 pts',
    formula: 'TVI: Si f continue sur [a,b] et f(a)*f(b) < 0, il existe c in ]a,b[ tel que f(c) = 0. Avec stricte monotonie: unicité de c.',
    tip: 'Si la consigne dit "Montrer qu\'il existe un unique alpha...", vous DEVEZ citer : 1) Continuité, 2) Stricte monotonie, 3) Signe de f(a)*f(b).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l3': {
    weight: '1.0 - 1.5 pts',
    formula: 'Théorème de la bijection: (f^{-1})\'(f(x_0)) = 1 / f\'(x_0) avec f\'(x_0) != 0. Courbe symétrique par rapport à la droite y = x.',
    tip: 'Vérifiez bien que le point où vous calculez la dérivée réciproque ne correspond pas à une tangente horizontale (f\'=0).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l4': {
    weight: '0.75 - 1 pt',
    formula: '(n-th root of x)\' = 1 / (n * (n-th root of x)^{n-1}) pour x > 0. a^{p/q} = q-th root of a^p.',
    tip: 'Pour lever l\'indétermination infini - infini, factorisez par le terme de plus haut degré ou multipliez par le conjugué cubique.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 2: Dérivation
  'm-l5': {
    weight: '1.5 - 2 pts',
    formula: 'Tangente T: y = f\'(x_0)(x - x_0) + f(x_0). Si lim [f(x)-f(x_0)]/(x-x_0) = +-inf => Demi-tangente verticale.',
    tip: 'Précisez l\'orientation de la demi-tangente (vers le haut si signes identiques, vers le bas si opposés).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l6': {
    weight: '1 pt',
    formula: 'TAF: f(b) - f(a) = f\'(c)(b - a). Inégalité: m <= f\'(x) <= M => m(b-a) <= f(b)-f(a) <= M(b-a).',
    tip: 'Clé fondamentale pour majorer |u_{n+1} - l| <= k|u_n - l| et prouver la convergence d\'une suite.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l7': {
    weight: '2 pts (National)',
    formula: 'lim f(x)/x = a, lim [f(x) - ax] = b => Asymptote oblique y = ax + b. f\'\'(x) s\'annule en changeant de signe => Point d\'inflexion.',
    tip: 'Ne confondez jamais asymptote oblique (limite = b réel fini) et branche parabolique (limite = +-infini).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l8': {
    weight: '2 pts',
    formula: 'Centre de symétrie Omega(a,b): f(2a - x) + f(x) = 2b. Axe x = a: f(2a - x) = f(x).',
    tip: 'Dans le tracé de C_f, commencez toujours par placer les asymptotes, les tangentes et les points d\'inflexion.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 3: Suites
  'm-l9': {
    weight: '1 pt',
    formula: 'Récurrence: 1. Initialisation (n_0) -> 2. Hérédité (supposer P(n) vraie, prouver P(n+1)) -> 3. Conclusion pour tout n >= n_0.',
    tip: 'Écrivez mot pour mot la conclusion : "D\'après le principe de récurrence, pour tout n in N...". Les correcteurs y attribuent 0.5 pt.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l10': {
    weight: '1.5 pts',
    formula: 'Géométrique: u_n = u_0 * q^n. Somme S = (1er terme) * (1 - q^{nb}) / (1 - q). Nb de termes = fin - début + 1.',
    tip: 'Attention aux indices : si la somme commence à k=1 jusqu\'à n, il y a n termes (pas n+1).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l11': {
    weight: '1 pt',
    formula: 'Toute suite croissante et majorée converge. Si |q| < 1 => lim q^n = 0.',
    tip: 'Pour trouver la limite d\'une suite définie par v_n = g(u_n), commencez par exprimer u_n en fonction de n.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l12': {
    weight: '1.5 pts',
    formula: 'u_{n+1} = f(u_n): Si f continue, f(I) inclus dans I, u_0 in I et u converge vers l => f(l) = l.',
    tip: 'Après avoir résolu l\'équation f(l) = l, vérifiez impérativement que la solution retenue appartient à l\'intervalle I.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 4: Logarithmes
  'm-l13': {
    weight: '1.5 pts',
    formula: 'ln(ab) = ln(a) + ln(b) ; ln(a/b) = ln(a) - ln(b) ; ln(a^r) = r*ln(a) ; ln(e) = 1 ; ln(1) = 0.',
    tip: 'Le domaine de définition de ln(u(x)) impose strictement u(x) > 0. Ne pas oublier cette condition en début d\'exercice.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l14': {
    weight: '1.5 pts',
    formula: 'lim_{x->0+} x*ln(x) = 0 ; lim_{x->+inf} ln(x)/x = 0 ; lim_{x->0} ln(1+x)/x = 1.',
    tip: 'Règle de croissance comparée : en +infini, les puissances x^n dominent toujours le logarithme ln(x).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l15': {
    weight: '1 pt',
    formula: '(ln |u(x)|)\' = u\'(x) / u(x). Logarithme décimal: log(x) = ln(x) / ln(10).',
    tip: 'N\'oubliez pas de multiplier par u\'(x) au numérateur, c\'est la cause d\'erreur n°1 en dérivation de logarithmes.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l16': {
    weight: '4 - 6 pts',
    formula: 'Étude globale: D_f, symétries, variations, signe de f\', limites aux bornes, concavité et tracé de la courbe.',
    tip: 'Vérifiez toujours que les flèches du tableau de variation sont cohérentes avec les signes des limites aux bornes.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 5 & 7: Complexes
  'm-l17': {
    weight: '1 pt',
    formula: 'z = a + ib ; |z| = sqrt(a² + b²) ; bar(z) = a - ib ; z * bar(z) = |z|² ; |z_1 * z_2| = |z_1| * |z_2|.',
    tip: 'Rappelez-vous que 1/z = bar(z) / |z|² pour éliminer le complexe au dénominateur sans multiplier inutilement.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l18': {
    weight: '1 pt',
    formula: 'z = r(cos theta + i sin theta) = r * e^{i theta} ; arg(z_1 * z_2) = arg(z_1) + arg(z_2) [2pi].',
    tip: 'Pour trouver l\'argument, mettez toujours le module r = |z| en facteur en premier.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l20': {
    weight: '1 pt',
    formula: 'Delta = b² - 4ac. Si Delta < 0: z_{1,2} = (-b +- i sqrt(-Delta)) / (2a).',
    tip: 'Dans l\'épreuve nationale, le discriminant Delta est presque toujours négatif pour tester la partie imaginaire.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l25': {
    weight: '1.5 pts',
    formula: 'AB = |z_B - z_A| ; (vect(u), vect(AB)) = arg(z_B - z_A) [2pi] ; (vect(CA), vect(CD)) = arg((z_D-z_C)/(z_A-z_C)).',
    tip: 'Si le quotient (z_C - z_A)/(z_B - z_A) = +-i, le triangle ABC est immédiatement rectangle et isocèle en A.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l28': {
    weight: '1.5 pts',
    formula: 'Rotation R(Omega, theta): z\' - omega = e^{i theta}(z - omega) => z\' = e^{i theta} * z + b.',
    tip: 'Pour déterminer le centre Omega, résolvez l\'équation du point fixe z = e^{i theta} * z + b.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 6: Exponentielles
  'm-l21': {
    weight: '1.5 pts',
    formula: 'e^0 = 1 ; e^x > 0 strictement pour tout x in R. (e^{u(x)})\' = u\'(x) * e^{u(x)}.',
    tip: 'Puisque e^u > 0 toujours, le signe de la dérivée f\' dépend exclusivement des autres facteurs.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l22': {
    weight: '1.5 pts',
    formula: 'lim_{x->+inf} e^x / x^n = +inf ; lim_{x->-inf} x^n * e^x = 0 ; lim_{x->0} (e^x - 1)/x = 1.',
    tip: 'En -infini, si vous avez un doute sur le signe de x*e^x, posez X = -x pour vous ramener à -X/e^X -> 0-.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 8: Calcul Intégral
  'm-l30': {
    weight: '1.5 pts (National)',
    formula: 'IPP: int_a^b u\'(x)v(x) dx = [u(x)v(x)]_a^b - int_a^b u(x)v\'(x) dx. Règle mnémonique ALPES.',
    tip: 'ALPES: Arc > Logarithme > Polynôme > Exponentielle > Sinus/Cosinus. Le premier dans la liste est choisi comme v(x) (à dériver).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l32': {
    weight: '1 - 1.5 pts',
    formula: 'Aire = (int_a^b |f(x) - g(x)| dx) * ||i|| * ||j|| cm². Déterminer le signe de f(x) - g(x) sur [a,b].',
    tip: 'Si ||i|| = 2 cm et ||j|| = 2 cm, l\'unité d\'aire vaut 4 cm² ! N\'oubliez pas de multiplier le résultat par 4.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Math Ch 10: Géométrie & Probabilités
  'm-l38': {
    weight: '1.5 pts',
    formula: 'Sphère S(Omega(a,b,c), R): (x-a)² + (y-b)² + (z-c)² = R². Distance d(Omega, P) = |ax_0+by_0+cz_0+d| / sqrt(a²+b²+c²).',
    tip: 'Si d = R, le plan est tangent à la sphère en un unique point H. Si d < R, l\'intersection est un cercle de rayon r = sqrt(R² - d²).',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },
  'm-l40': {
    weight: '2 pts',
    formula: 'P(A inter B) = P(A) * P_A(B). Espérance E(X) = sum x_i * p_i. Loi binomiale B(n,p): P(X=k) = C_n^k * p^k * (1-p)^{n-k}.',
    tip: 'Toujours faire la somme des p_i dans votre tableau de loi de probabilité : elle doit faire exactement 1. Si ce n\'est pas le cas, recalculez.',
    url: 'https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-physiques'
  },

  // Physique Ch 1 & 2: Ondes
  'pc-l1': {
    weight: '1.5 pts',
    formula: 'Célérité v = d / Delta t (m/s). Retard temporel tau = d / v. Relation y_M(t) = y_S(t - tau).',
    tip: 'L\'onde transporte de l\'énergie sans transport de matière. Les points du milieu reproduisent le mouvement de la source avec un retard tau.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l3': {
    weight: '1.5 pts',
    formula: 'Relation fondamentale: lambda = v * T = v / N. Milieu dispersif: la célérité v dépend de la fréquence N.',
    tip: 'Pour tester si deux points vibrent en phase, calculez la distance d : si d = k*lambda ils sont en phase ; si d = (2k+1)*lambda/2 en opposition.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l4': {
    weight: '1.5 pts',
    formula: 'Diffraction: Écart angulaire theta = lambda / a (rad) avec a largeur de la fente. Sur écran: tan theta approx theta = L / (2D).',
    tip: 'En combinant les deux formules : L = 2 * lambda * D / a. Si a diminue, la tache centrale de largeur L s\'élargit.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },

  // Physique Ch 3 & 4: Nucléaire
  'pc-l7': {
    weight: '1.5 pts',
    formula: 'Loi de décroissance: N(t) = N_0 * e^{-lambda * t}. Demi-vie: t_{1/2} = ln(2) / lambda. Activité a(t) = lambda * N(t).',
    tip: 'Faites très attention aux unités : dans a = lambda * N (en Bq), la constante radio-active lambda doit impérativement être en secondes^{-1} !',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l10': {
    weight: '1.5 pts',
    formula: 'Défaut de masse: Delta m = [Z*m_p + (A-Z)*m_n] - m(noyau) > 0. Énergie de liaison: E_l = Delta m * c². Énergie par nucléon: E_l / A.',
    tip: 'Plus l\'énergie de liaison par nucléon E_l / A est élevée, plus le noyau est stable. Le fer 56 est le plus stable de la courbe d\'Aston.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },

  // Physique Ch 5, 6, 7: Électricité
  'pc-l13': {
    weight: '2 pts',
    formula: 'Charge condensateur: u_C(t) + RC * du_C/dt = E. Solution: u_C(t) = E * (1 - e^{-t/tau}) avec constante de temps tau = RC.',
    tip: 'Détermination graphique de tau : intersection de la tangente à l\'origine avec l\'asymptote u_C = E, ou ordonnée à 0.63*E.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l16': {
    weight: '2 pts',
    formula: 'Tension aux bornes d\'une bobine: u_b = L * di/dt + r * i. Établissement du courant: tau = L / (R_T + r).',
    tip: 'La bobine s\'oppose aux variations du courant électrique. En régime permanent (di/dt = 0), la bobine se comporte comme un simple conducteur ohmique r.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l19': {
    weight: '2.5 pts (National)',
    formula: 'Circuit LC idéal: T_0 = 2*pi*sqrt(L*C). Énergie totale E_T = (1/2)*C*u_C² + (1/2)*L*i² = constante.',
    tip: 'Dans un circuit RLC réel, la résistance dissipe de l\'énergie par effet Joule : dE_T/dt = -R_T * i² <= 0 (oscillations amorties).',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },

  // Chimie Ch 8, 9, 13, 14: Chimie
  'pc-l22': {
    weight: '2 pts',
    formula: 'Vitesse volumique: v(t) = (1/V_T) * dx/dt. Temps de demi-réaction t_{1/2}: avancement x(t_{1/2}) = x_{max} / 2.',
    tip: 'Sur la courbe x(t), la vitesse diminue au cours du temps car la concentration des réactifs (facteur cinétique) diminue.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l25': {
    weight: '3 pts (National)',
    formula: 'pH = -log[H_3O+] <=> [H_3O+] = 10^{-pH}. Ka = ([A-] * [H_3O+]) / [AH] => pH = pKa + log([A-] / [AH]).',
    tip: 'À la demi-équivalence du dosage d\'un acide faible : [A-] = [AH], donc pH = pKa ! Astuce précieuse pour lire le pKa sur la courbe.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l37': {
    weight: '2.5 pts',
    formula: 'Quantité d\'électricité: Q = I * Delta t = n(e-) * F avec F = 96500 C/mol. Dans une pile: l\'oxydation se produit à l\'Anode (-).',
    tip: 'Mnémonique infaillible : Voyelle avec Voyelle (Anode = Oxydation), Consonne avec Consonne (Cathode = Réduction).',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l41': {
    weight: '2 pts',
    formula: 'Estérification: Acide carboxylique + Alcool <=> Ester + Eau. Réaction lente, athermique et limitée (rendement 67% avec alcool primaire).',
    tip: 'Pour augmenter le rendement sans déplacer l\'équilibre : utiliser un anhydride d\'acide (réaction totale et rapide) ou éliminer l\'eau.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },

  // Physique Mécanique Ch 10, 11, 12
  'pc-l28': {
    weight: '2.5 pts',
    formula: '2ème Loi de Newton: Somme des forces extérieures = m * vect(a_G). Dans repère de Frenet: a = (dv/dt)*u_T + (v²/rho)*u_N.',
    tip: 'Précisez toujours le système étudié et le référentiel terrestre supposé galiléen avant d\'appliquer la 2ème loi de Newton.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },
  'pc-l31': {
    weight: '2.5 pts (National)',
    formula: 'Projectile: x(t) = (v_0 cos alpha)*t ; y(t) = -(1/2)g*t² + (v_0 sin alpha)*t + h. Équation de la trajectoire par élimination de t.',
    tip: 'Pour trouver la portée (point d\'impact au sol), posez y(x) = 0 et déterminez la solution positive x_P.',
    url: 'https://www.alloschool.com/course/physique-chimie-2eme-bac-sciences-physiques'
  },

  // SVT
  'svt-l1': {
    weight: '2.5 pts',
    formula: 'Bilan de la respiration: C_6H_{12}O_6 + 6 O_2 -> 6 CO_2 + 6 H_2O + 38 ATP (ou 36 ATP). Rendement énergétique élevé (~40.5%).',
    tip: 'La glycolyse se déroule dans le hyaloplasme et ne nécessite pas de dioxygène O_2. Elle produit 2 ATP et 2 Pyruvates.',
    url: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques'
  },
  'svt-l5': {
    weight: '2 pts',
    formula: 'Contraction musculaire: Glissement des myofilaments d\'actine entre les filaments de myosine, raccourcissement des sarcomères avec consommation d\'ATP et libération de Ca^{2+}.',
    tip: 'Le complexe actomyosine nécessite l\'hydrolyse d\'ATP pour faire basculer la tête de myosine et provoquer le raccourcissement.',
    url: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques'
  },
  'svt-l9': {
    weight: '2.5 pts',
    formula: 'Dogme central: ADN (Transcription dans le noyau) -> ARNm (Traduction dans le cytoplasme par les ribosomes) -> Protéine.',
    tip: 'Attention au brin transcrit (non-codant) orienté 3\'->5\' : l\'ARN messager synthétisé est complémentaire et orienté 5\'->3\'.',
    url: 'https://www.alloschool.com/course/sciences-de-la-vie-et-de-la-terre-2eme-bac-sciences-physiques'
  },

  // Philo
  'ph-l1': {
    weight: '5 pts',
    formula: 'هوية الشخص: ديكارت (التفكير والشك : أنا أفكر إذن أنا موجود)، جون لوك (الشعور المقترن بالذاكرة)، شوبنهاور (إرادة الحياة).',
    tip: 'في مناقشة هوية الشخص، ابنِ تقابلاً فلسفياً قوياً بين الموقف العقلاني (ديكارت) والموقف التجريبي الحسي (جون لوك).',
    url: 'https://www.alloschool.com/course/philosophie-2eme-bac'
  },
  'ph-l5': {
    weight: '5 pts',
    formula: 'النظرية والتجربة: النزعة العقلانية الرياضية (أينشتاين: العقل هو المبدأ الخلاق)، النزعة التجريبية الكلاسيكية (كلود برنار: خطوات المنهج التجريبي: الملاحظة، الفرضية، التجربة).',
    tip: 'أشر إلى مفهوم "الحوار الجدلي بين العقل والتجربة" عند غاستون باشلار لتتويج فقرة التركيب بنقطة تميز.',
    url: 'https://www.alloschool.com/course/philosophie-2eme-bac'
  },
  'ph-l9': {
    weight: '5 pts',
    formula: 'مشروعية الدولة وغاياتها: هوبز ولوك وروسو (نظرية العقد الاجتماعي للخروج من حالة الطبيعة)، سبينوزا (الغاية الحقيقية هي الحرية وليس ترهيب المواطنين)، ماكس فيبر (احتكار العنف المشروع).',
    tip: 'وظف بدقة المفاهيم الفلسفية المؤطرة : السيادة، العقد الاجتماعي، الحق الطبيعي، والمشروعية.',
    url: 'https://www.alloschool.com/course/philosophie-2eme-bac'
  },

  // English
  'en-l2': {
    weight: '1.5 pts',
    formula: 'Gerund (-ing) after: enjoy, avoid, suggest, look forward to, be used to, mind. Infinitive (to + verb) after: decide, hope, promise, agree, refuse.',
    tip: '"Look forward to" is followed by a GERUND (verb + ing) because "to" is a preposition here: "I look forward to meeting you".',
    url: 'https://www.alloschool.com/course/anglais-2eme-bac'
  },
  'en-l6': {
    weight: '1.5 pts',
    formula: 'Modals of Past Deduction: MUST HAVE + PP (sure it happened), CANNOT HAVE + PP (impossible), MIGHT/COULD HAVE + PP (possibility).',
    tip: 'Look for evidence in the sentence: "The lights were off, they must have gone to bed."',
    url: 'https://www.alloschool.com/course/anglais-2eme-bac'
  },
  'en-l10': {
    weight: '2 pts',
    formula: 'Past Unreal Conditional (Type 3): If + Subject + HAD + Past Participle, Subject + WOULD HAVE + Past Participle.',
    tip: 'Regret about the past: "If she had studied harder, she would have passed the Bac with honors."',
    url: 'https://www.alloschool.com/course/anglais-2eme-bac'
  },
  'en-l14': {
    weight: '2 pts',
    formula: 'Passive Voice: Subject + form of BE (in the active tense) + PAST PARTICIPLE of main verb. By + Agent.',
    tip: 'Present Continuous Active: is building => Passive: is being built. Past Perfect: had solved => had been solved.',
    url: 'https://www.alloschool.com/course/anglais-2eme-bac'
  }
};
