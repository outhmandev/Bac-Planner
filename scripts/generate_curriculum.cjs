const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '..', 'src', 'services', 'initialData.ts');

const curriculumCode = `import type { SchoolSubject, Exam, Weakness } from '../types/school';
import type { VocabCard, GrammarTopic, AusbildungMilestone, AusbildungApplication } from '../types/german';
import type { SoftwareProject } from '../types/projects';
import type { LifeGoal } from '../types/goals';
import type { Habit } from '../types/habits';
import type { Task } from '../types/common';
import type { CalendarEvent } from '../types/calendar';
import type { Note } from '../types/notes';
import type { FocusSession } from '../types/focus';

export const INITIAL_SUBJECTS: SchoolSubject[] = [
  /* ========================================================================
     1. MATHÉMATIQUES (الرياضيات) — COEFFICIENT 7
     Moroccan 2nd Bac National Exam (Sciences Expérimentales PC/SVT & SM)
     ======================================================================== */
  {
    id: 'subj-math',
    name: 'Mathématiques (الرياضيات)',
    code: 'math',
    coefficient: 7,
    colorVar: 'var(--subj-math)',
    bgVar: 'var(--subj-math-bg)',
    targetBacGrade: 18.0,
    hoursStudied: 0,
    chapters: [
      {
        id: 'math-ch1',
        subjectId: 'subj-math',
        title: 'Limites et Continuité (الاتصال والنهايات)',
        term: 1,
        order: 1,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l1', title: 'Continuité en un point et sur un intervalle', completed: false },
          { id: 'm-l2', title: 'Théorème des Valeurs Intermédiaires (TVI) & Dichotomie', completed: false },
          { id: 'm-l3', title: 'Théorème de la bijection & fonction réciproque', completed: false },
          { id: 'm-l4', title: 'Fonction racine n-ième et puissances rationnelles', completed: false },
        ]
      },
      {
        id: 'math-ch2',
        subjectId: 'subj-math',
        title: 'Dérivation et Étude des Fonctions (الاشتقاق ودراسة الدوال)',
        term: 1,
        order: 2,
        completed: false,
        exercisesTarget: 50,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l5', title: 'Dérivabilité, interprétation géométrique & tangentes', completed: false },
          { id: 'm-l6', title: 'Théorème des Accroissements Finis (TAF) et Rolle', completed: false },
          { id: 'm-l7', title: 'Branches infinies, concavité et points d\\'inflexion', completed: false },
          { id: 'm-l8', title: 'Éléments de symétrie et construction des courbes C_f', completed: false },
        ]
      },
      {
        id: 'math-ch3',
        subjectId: 'subj-math',
        title: 'Les Suites Numériques (المتتاليات العددية)',
        term: 1,
        order: 3,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l9', title: 'Raisonnement par récurrence, majoration et minoration', completed: false },
          { id: 'm-l10', title: 'Suites arithmétiques, géométriques et sommes partielles', completed: false },
          { id: 'm-l11', title: 'Convergence, théorèmes de comparaison et d\\'encadrement', completed: false },
          { id: 'm-l12', title: 'Suites récurrentes u_{n+1} = f(u_n) et suites adjacentes', completed: false },
        ]
      },
      {
        id: 'math-ch4',
        subjectId: 'subj-math',
        title: 'Fonctions Logarithmes (الدوال اللوغاريتمية)',
        term: 1,
        order: 4,
        completed: false,
        exercisesTarget: 50,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l13', title: 'Fonction logarithme népérien (ln): propriétés algébriques', completed: false },
          { id: 'm-l14', title: 'Limites fondamentales de ln(x) et croissances comparées', completed: false },
          { id: 'm-l15', title: 'Dérivée logarithmique et logarithme décimal', completed: false },
          { id: 'm-l16', title: 'Étude complète de fonctions contenant ln(x)', completed: false },
        ]
      },
      {
        id: 'math-ch5',
        subjectId: 'subj-math',
        title: 'Nombres Complexes: Forme Algébrique & Trigonométrique (الأعداد العقدية 1)',
        term: 1,
        order: 5,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l17', title: 'Ensemble C, forme algébrique, conjugué et module', completed: false },
          { id: 'm-l18', title: 'Argument, forme trigonométrique et notation exponentielle', completed: false },
          { id: 'm-l19', title: 'Formule de Moivre et formules d\\'Euler', completed: false },
          { id: 'm-l20', title: 'Résolution des équations du 2nd degré dans C', completed: false },
        ]
      },
      {
        id: 'math-ch6',
        subjectId: 'subj-math',
        title: 'Fonctions Exponentielles (الدوال الأسية)',
        term: 2,
        order: 6,
        completed: false,
        exercisesTarget: 50,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l21', title: 'Fonction exponentielle népérienne exp(x): définition & limites', completed: false },
          { id: 'm-l22', title: 'Croissances comparées et dérivabilité de exp(u(x))', completed: false },
          { id: 'm-l23', title: 'Fonctions exponentielles de base a et puissances', completed: false },
          { id: 'm-l24', title: 'Étude de fonctions avec exponentielles et asymptotes', completed: false },
        ]
      },
      {
        id: 'math-ch7',
        subjectId: 'subj-math',
        title: 'Nombres Complexes: Géométrie & Transformations (الأعداد العقدية 2)',
        term: 2,
        order: 7,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l25', title: 'Interprétation géométrique du module et de l\\'argument', completed: false },
          { id: 'm-l26', title: 'Alignement, orthogonalité et cocyclicité de 4 points', completed: false },
          { id: 'm-l27', title: 'Écriture complexe des translations et homothéties', completed: false },
          { id: 'm-l28', title: 'Écriture complexe de la rotation d\\'angle theta', completed: false },
        ]
      },
      {
        id: 'math-ch8',
        subjectId: 'subj-math',
        title: 'Calcul Intégral & Primitives (حساب التكامل والدوال الأصلية)',
        term: 2,
        order: 8,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l29', title: 'Primitives usuelles et calcul de primitives', completed: false },
          { id: 'm-l30', title: 'Intégrale: relation de Chasles, linéarité et positivité', completed: false },
          { id: 'm-l31', title: 'Technique d\\'intégration par parties (IPP)', completed: false },
          { id: 'm-l32', title: 'Calcul d\\'aires planes et volumes de solides de révolution', completed: false },
        ]
      },
      {
        id: 'math-ch9',
        subjectId: 'subj-math',
        title: 'Équations Différentielles (المعادلات التفاضلية)',
        term: 2,
        order: 9,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l33', title: 'Équations du 1er ordre: y\\' + ay = 0 et y\\' + ay = b', completed: false },
          { id: 'm-l34', title: 'Équations du 2nd ordre: y\\'\\' + ay\\' + by = 0', completed: false },
          { id: 'm-l35', title: 'Équation caractéristique (Delta > 0, = 0, < 0)', completed: false },
          { id: 'm-l36', title: 'Solutions particulières avec conditions initiales', completed: false },
        ]
      },
      {
        id: 'math-ch10',
        subjectId: 'subj-math',
        title: 'Géométrie dans l\\'Espace & Probabilités (الهندسة الفضائية والاحتمالات)',
        term: 2,
        order: 10,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'm-l37', title: 'Produit scalaire dans l\\'espace, plans et sphères', completed: false },
          { id: 'm-l38', title: 'Produit vectoriel, calcul de distances et d\\'aires', completed: false },
          { id: 'm-l39', title: 'Dénombrement: permutations, arrangements et combinaisons', completed: false },
          { id: 'm-l40', title: 'Probabilités conditionnelles, indépendance et loi binomiale', completed: false },
        ]
      }
    ]
  },

  /* ========================================================================
     2. PHYSIQUE-CHIMIE (الفيزياء والكيمياء) — COEFFICIENT 7
     Moroccan 2nd Bac National Exam
     ======================================================================== */
  {
    id: 'subj-physics',
    name: 'Physique-Chimie (الفيزياء والكيمياء)',
    code: 'physics',
    coefficient: 7,
    colorVar: 'var(--subj-physics)',
    bgVar: 'var(--subj-physics-bg)',
    targetBacGrade: 18.0,
    hoursStudied: 0,
    chapters: [
      {
        id: 'phys-ch1',
        subjectId: 'subj-physics',
        title: 'Ondes Mécaniques Progressives (الموجات الميكانيكية المتوالية)',
        term: 1,
        order: 1,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l1', title: 'Ondes transversales et longitudinales, célérité et retard', completed: false },
          { id: 'p-l2', title: 'Ondes progressives sinusoïdales (période T et longueur d\\'onde lambda)', completed: false },
          { id: 'p-l3', title: 'Phénomène de diffraction des ondes mécaniques et milieux dispersifs', completed: false },
        ]
      },
      {
        id: 'phys-ch2',
        subjectId: 'subj-physics',
        title: 'Propagation d\\'une Onde Lumineuse (انتشار موجة ضوئية)',
        term: 1,
        order: 2,
        completed: false,
        exercisesTarget: 30,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l4', title: 'Diffraction de la lumière par une fente ou fil mince (theta = lambda / a)', completed: false },
          { id: 'p-l5', title: 'Dispersion de la lumière blanche par un prisme et réfraction', completed: false },
          { id: 'p-l6', title: 'Spectre visible, fréquence et célérité de la lumière dans le vide', completed: false },
        ]
      },
      {
        id: 'phys-ch3',
        subjectId: 'subj-physics',
        title: 'Décroissance Radioactive & Datation (التناقص الإشعاعي)',
        term: 1,
        order: 3,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l7', title: 'Stabilité du noyau, diagramme (N, Z) et types de radioactivité', completed: false },
          { id: 'p-l8', title: 'Lois de conservation de Soddy pour les réactions nucléaires', completed: false },
          { id: 'p-l9', title: 'Loi de décroissance N(t) = N_0 * exp(-lambda * t) et demi-vie t_{1/2}', completed: false },
          { id: 'p-l10', title: 'Activité radioactive a(t) et datation géologique/archéologique', completed: false },
        ]
      },
      {
        id: 'phys-ch4',
        subjectId: 'subj-physics',
        title: 'Noyaux, Masse et Énergie Nucléaire (النوى، الكتلة والطاقة)',
        term: 1,
        order: 4,
        completed: false,
        exercisesTarget: 30,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l11', title: 'Équivalence masse-énergie d\\'Einstein: E = m * c^2', completed: false },
          { id: 'p-l12', title: 'Défaut de masse Delta_m et énergie de liaison du noyau', completed: false },
          { id: 'p-l13', title: 'Courbe d\\'Aston et stabilité relative des nucléides', completed: false },
          { id: 'p-l14', title: 'Bilan énergétique des réactions de fission et de fusion', completed: false },
        ]
      },
      {
        id: 'phys-ch5',
        subjectId: 'subj-physics',
        title: 'Électricité: Dipôle RC (ثنائي القطب RC)',
        term: 1,
        order: 5,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l15', title: 'Condensateur, capacité C et relation charge-tension q = C * u_C', completed: false },
          { id: 'p-l16', title: 'Équation différentielle de charge et décharge d\\'un dipôle RC', completed: false },
          { id: 'p-l17', title: 'Constante de temps tau = RC et méthodes de détermination', completed: false },
          { id: 'p-l18', title: 'Énergie électrostatique emmagasinée E_e = 1/2 * C * u_C^2', completed: false },
        ]
      },
      {
        id: 'phys-ch6',
        subjectId: 'subj-physics',
        title: 'Électricité: Dipôle RL (ثنائي القطب RL)',
        term: 1,
        order: 6,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l19', title: 'Bobine, inductance L, résistance interne r et tension u_L', completed: false },
          { id: 'p-l20', title: 'Établissement et rupture du courant dans un circuit RL', completed: false },
          { id: 'p-l21', title: 'Constante de temps tau = L / R_tot et équation différentielle', completed: false },
          { id: 'p-l22', title: 'Énergie magnétique emmagasinée E_m = 1/2 * L * i^2', completed: false },
        ]
      },
      {
        id: 'phys-ch7',
        subjectId: 'subj-physics',
        title: 'Électricité: Circuit RLC Série en Oscillations Libres (دارة RLC)',
        term: 1,
        order: 7,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l23', title: 'Décharge du condensateur dans la bobine (régimes périodique, pseudo-périodique, apériodique)', completed: false },
          { id: 'p-l24', title: 'Équation différentielle en tension u_C et période propre T_0 = 2*pi*sqrt(LC)', completed: false },
          { id: 'p-l25', title: 'Étude énergétique: échange d\\'énergie E_e et E_m, amortissement par effet Joule', completed: false },
          { id: 'p-l26', title: 'Entretien des oscillations par générateur de résistance négative', completed: false },
        ]
      },
      {
        id: 'phys-ch8',
        subjectId: 'subj-physics',
        title: 'Chimie: Suivi Temporel d\\'une Réaction & Vitesse (التتبع الزمني لتفاعل كيميائي)',
        term: 1,
        order: 8,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l27', title: 'Transformations lentes et rapides, couples redox et tableau d\\'avancement', completed: false },
          { id: 'p-l28', title: 'Facteurs cinétiques: température et concentration initiale des réactifs', completed: false },
          { id: 'p-l29', title: 'Méthodes de suivi: conductimétrie, pH-métrie, pression et volume', completed: false },
          { id: 'p-l30', title: 'Vitesse volumique de réaction v = (1/V) * (dx/dt) et temps de demi-réaction t_{1/2}', completed: false },
        ]
      },
      {
        id: 'phys-ch9',
        subjectId: 'subj-physics',
        title: 'Chimie: Équilibre Chimique & Réactions Acido-Basiques (تفاعلات حمض-قاعدة)',
        term: 1,
        order: 9,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l31', title: 'Transformations limitées et taux d\\'avancement final tau = x_f / x_max', completed: false },
          { id: 'p-l32', title: 'Quotient de réaction Q_r et constante d\\'équilibre K', completed: false },
          { id: 'p-l33', title: 'Autoprotolyse de l\\'eau, produit ionique K_e, pH et calculs de concentrations', completed: false },
          { id: 'p-l34', title: 'Constante d\\'acidité K_a, pK_a, diagrammes de prédominance et dosages acido-basiques', completed: false },
        ]
      },
      {
        id: 'phys-ch10',
        subjectId: 'subj-physics',
        title: 'Mécanique: Lois de Newton & Chute Verticale (قوانين نيوتن والسقوط الرأسي)',
        term: 2,
        order: 10,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l35', title: 'Vecteur position, vitesse, accélération et repère de Frenet', completed: false },
          { id: 'p-l36', title: 'Première, deuxième (Somme F = m*a) et troisième lois de Newton', completed: false },
          { id: 'p-l37', title: 'Chute libre verticale sous la seule action du poids', completed: false },
          { id: 'p-l38', title: 'Chute verticale avec frottement fluide et vitesse limite', completed: false },
        ]
      },
      {
        id: 'phys-ch11',
        subjectId: 'subj-physics',
        title: 'Mécanique: Mouvements Plans - Projectiles & Particules (الحركات المستوية)',
        term: 2,
        order: 11,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l39', title: 'Mouvement d\\'un projectile dans un champ de pesanteur uniforme', completed: false },
          { id: 'p-l40', title: 'Équations horaires x(t), y(t) et équation de la trajectoire', completed: false },
          { id: 'p-l41', title: 'Portée horizontale et flèche du tir', completed: false },
          { id: 'p-l42', title: 'Mouvement d\\'une particule chargée dans un champ électrique uniforme', completed: false },
        ]
      },
      {
        id: 'phys-ch12',
        subjectId: 'subj-physics',
        title: 'Mécanique: Systèmes Mécaniques Oscillants & Énergie (المجموعات المتذبذبة ومظاهر الطاقة)',
        term: 2,
        order: 12,
        completed: false,
        exercisesTarget: 45,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l43', title: 'Pendule élastique horizontal: force de rappel et équation différentielle', completed: false },
          { id: 'p-l44', title: 'Période propre T_0 = 2*pi*sqrt(m/K) et solution x(t)', completed: false },
          { id: 'p-l45', title: 'Énergie cinétique E_c, énergie potentielle élastique E_pe et énergie mécanique E_m', completed: false },
          { id: 'p-l46', title: 'Conservation et non-conservation de l\\'énergie mécanique (frottements)', completed: false },
        ]
      },
      {
        id: 'phys-ch13',
        subjectId: 'subj-physics',
        title: 'Chimie: Piles Électrochimiques & Production d\\'Énergie (الأعمدة وتحصيل الطاقة)',
        term: 2,
        order: 13,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l47', title: 'Critère d\\'évolution spontanée d\\'un système chimique (comparaison Q_r,i et K)', completed: false },
          { id: 'p-l48', title: 'Constitution d\\'une pile: électrodes, demi-piles et pont salin', completed: false },
          { id: 'p-l49', title: 'Oxydation anodique, réduction cathodique et équation globale', completed: false },
          { id: 'p-l50', title: 'Quantité d\\'électricité Q = I * Delta_t = n(e-) * F et capacité de la pile', completed: false },
        ]
      },
      {
        id: 'phys-ch14',
        subjectId: 'subj-physics',
        title: 'Chimie: Estérification, Hydrolyse & Contrôle d\\'Évolution (الأسترة والحلمأة)',
        term: 2,
        order: 14,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'p-l51', title: 'Nomenclature et groupes: acides carboxyliques, alcools, esters et anhydrides', completed: false },
          { id: 'p-l52', title: 'Réaction d\\'estérification et d\\'hydrolyse: caractéristiques et constante d\\'équilibre', completed: false },
          { id: 'p-l53', title: 'Rendement de la synthèse d\\'un ester et influence de la classe de l\\'alcool', completed: false },
          { id: 'p-l54', title: 'Méthodes d\\'optimisation: réactif en excès, élimination d\\'un produit, catalyse', completed: false },
        ]
      }
    ]
  },

  /* ========================================================================
     3. SVT - SCIENCES DE LA VIE ET DE LA TERRE — COEFFICIENT 5
     Moroccan 2nd Bac National Exam
     ======================================================================== */
  {
    id: 'subj-svt',
    name: 'Sciences de la Vie et de la Terre (علوم الحياة والأرض)',
    code: 'svt',
    coefficient: 5,
    colorVar: 'var(--subj-svt)',
    bgVar: 'var(--subj-svt-bg)',
    targetBacGrade: 17.5,
    hoursStudied: 0,
    chapters: [
      {
        id: 'svt-ch1',
        subjectId: 'subj-svt',
        title: 'Consommation de la Matière Organique & Flux d\\'Énergie (استهلاك المادة العضوية وتدفق الطاقة)',
        term: 1,
        order: 1,
        completed: false,
        exercisesTarget: 30,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 's-l1', title: 'La glycolyse dans le hyaloplasme: étapes et bilan énergétique', completed: false },
          { id: 's-l2', title: 'Respiration cellulaire mitochondriale: cycle de Krebs et chaîne respiratoire', completed: false },
          { id: 's-l3', title: 'Voies anaérobies: fermentation lactique et alcoolique', completed: false },
          { id: 's-l4', title: 'Bilan énergétique comparé (36/38 ATP vs 2 ATP) et rendement métabolique', completed: false },
        ]
      },
      {
        id: 'svt-ch2',
        subjectId: 'subj-svt',
        title: 'Rôle du Muscle Strié dans la Conversion d\\'Énergie (التقلص العضلي)',
        term: 1,
        order: 2,
        completed: false,
        exercisesTarget: 30,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 's-l5', title: 'Ultrastructure du muscle: myofibrilles et sarcomères (actine & myosine)', completed: false },
          { id: 's-l6', title: 'Phénomènes mécaniques et thermiques de la secousse musculaire', completed: false },
          { id: 's-l7', title: 'Mécanisme moléculaire de la contraction: rôle des ions Ca2+ et de l\\'ATP', completed: false },
          { id: 's-l8', title: 'Voies de régénération rapide et lente de l\\'ATP musculaire', completed: false },
        ]
      },
      {
        id: 'svt-ch3',
        subjectId: 'subj-svt',
        title: 'L\\'Information Génétique & Mécanismes de son Expression (طبيعة الخبر الوراثي وآلية تعبيره)',
        term: 1,
        order: 3,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 's-l9', title: 'Localisation de l\\'information génétique et cycle cellulaire (mitose)', completed: false },
          { id: 's-l10', title: 'Structure de l\\'ADN et mécanisme de réplication semi-conservative', completed: false },
          { id: 's-l11', title: 'Transcription de l\\'ADN en ARNm et maturation', completed: false },
          { id: 's-l12', title: 'Code génétique et traduction protéique (initiation, élongation, terminaison)', completed: false },
        ]
      },
      {
        id: 'svt-ch4',
        subjectId: 'subj-svt',
        title: 'Génie Génétique & Biotechnologies (الهندسة الوراثية)',
        term: 1,
        order: 4,
        completed: false,
        exercisesTarget: 30,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 's-l13', title: 'Outils du génie génétique: enzymes de restriction, ligases et plasmides vecteurs', completed: false },
          { id: 's-l14', title: 'Étapes du clonage d\\'un gène d\\'intérêt et transgenèse', completed: false },
          { id: 's-l15', title: 'Applications médicales (insuline, hormone de croissance) et agronomiques (OGM)', completed: false },
          { id: 's-l16', title: 'Enjeux bioéthiques et perspectives de la thérapie génique', completed: false },
        ]
      },
      {
        id: 'svt-ch5',
        subjectId: 'subj-svt',
        title: 'Transmission Génétique Sexuée & Génétique Humaine (علم الوراثة البشرية)',
        term: 2,
        order: 5,
        completed: false,
        exercisesTarget: 40,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 's-l17', title: 'Méiose et brassages inter et intra-chromosomiques (crossing-over)', completed: false },
          { id: 's-l18', title: 'Lois de Mendel: monohybridisme et dihybridisme (gènes liés vs indépendants)', completed: false },
          { id: 's-l19', title: 'Génétique humaine: arbres généalogiques (pedigrees) et modes de transmission', completed: false },
          { id: 's-l20', title: 'Anomalies chromosomiques (trisomies, monosomies) et diagnostic prénatal', completed: false },
        ]
      },
      {
        id: 'svt-ch6',
        subjectId: 'subj-svt',
        title: 'Génétique des Populations & Phénomènes Géologiques (وراثة الساكنة والجيولوجيا)',
        term: 2,
        order: 6,
        completed: false,
        exercisesTarget: 35,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 's-l21', title: 'Structure génétique d\\'une population et calcul des fréquences alléliques', completed: false },
          { id: 's-l22', title: 'Loi de Hardy-Weinberg et facteurs de variation (sélection, dérive, mutations)', completed: false },
          { id: 's-l23', title: 'Chaînes de montagnes récentes (subduction, collision, obduction)', completed: false },
          { id: 's-l24', title: 'Métamorphisme, anatexie et granitoïdes dans la tectonique des plaques', completed: false },
        ]
      }
    ]
  },

  /* ========================================================================
     4. PHILOSOPHIE (الفلسفة) — COEFFICIENT 2
     Moroccan 2nd Bac National Exam (All 4 Official Modules & 8 Concepts)
     ======================================================================== */
  {
    id: 'subj-philo',
    name: 'Philosophie (الفلسفة)',
    code: 'philosophy',
    coefficient: 2,
    colorVar: 'var(--subj-philo)',
    bgVar: 'var(--subj-philo-bg)',
    targetBacGrade: 17.5,
    hoursStudied: 0,
    chapters: [
      {
        id: 'philo-ch1',
        subjectId: 'subj-philo',
        title: 'مجزوءة الوضع البشري: مفهوم الشخص ومفهوم الغير',
        term: 1,
        order: 1,
        completed: false,
        exercisesTarget: 25,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'ph-l1', title: 'الشخص والهوية: ديكارت (التفكير)، جون لوك (الذاكرة والوعي)، شوبنهاور (الإرادة)', completed: false },
          { id: 'ph-l2', title: 'الشخص بوصفه قيمة: كانط (الغاية في ذاته)، غوسدورف (البعد التضامني الاجتماعي)', completed: false },
          { id: 'ph-l3', title: 'الشخص بين الضرورة والحرية: سبينوزا (وهم الحرية)، سارتر (مشروع الحرية المطلقة)', completed: false },
          { id: 'ph-l4', title: 'وجود الغير: ديكارت (عزلة الأنا المفكر)، هيغل (جدلية السيد والعبد)، سارتر (الوسيط الضروري)', completed: false },
          { id: 'ph-l5', title: 'معرفة الغير: مالبرانش (استدلال بالمماثلة)، ميرلوبونتي (التواصل والتعاطف)', completed: false },
          { id: 'ph-l6', title: 'العلاقة مع الغير: أرسطو وكانط (الصداقة والواجب)، كوجيف وسارتر (الصراع والشيئنة)', completed: false },
        ]
      },
      {
        id: 'philo-ch2',
        subjectId: 'subj-philo',
        title: 'مجزوءة المعرفة: مفهوم النظرية والتجربة ومفهوم الحقيقة',
        term: 1,
        order: 2,
        completed: false,
        exercisesTarget: 25,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'ph-l7', title: 'التجربة والتجريب: كلود برنار (خطوات المنهج التجريبي)، رينيه طوم (التجربة الذهنية)', completed: false },
          { id: 'ph-l8', title: 'العقلانية العلمية: غاستون باشلار (العقلانية المطبقة)، أينشتاين (العقل الرياضي الخالص)', completed: false },
          { id: 'ph-l9', title: 'معايير علمية النظريات: كارل بوبر (معيار القابلية للتكذيب/التفنيد)، بيير دوهيم', completed: false },
          { id: 'ph-l10', title: 'الرأي والحقيقة: أفلاطون (الرأي ظن عائق)، باشلار (الحقيقة بناء ضد الرأي)', completed: false },
          { id: 'ph-l11', title: 'معايير الحقيقة: ديكارت واسبينوزا (البداهة والوضوح)، ويليام جيمس (المعيار البراغماتي/المنفعة)', completed: false },
          { id: 'ph-l12', title: 'الحقيقة كقيمة: كانط (قيمة أخلاقية غير مشروطة والواجب)، نيتشه (أوهام نافعة للحياة)', completed: false },
        ]
      },
      {
        id: 'philo-ch3',
        subjectId: 'subj-philo',
        title: 'مجزوءة السياسة: مفهوم الدولة ومفهوم الحق والعدالة',
        term: 2,
        order: 3,
        completed: false,
        exercisesTarget: 25,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'ph-l13', title: 'مشروعية الدولة وغاياتها: هوبز ولوك (العقد الاجتماعي والأمن)، سبينوزا (الحرية)', completed: false },
          { id: 'ph-l14', title: 'طبيعة السلطة السياسية: مكيافيلي (القوة والحيلة/الثعلب والأسد)، مونتسكيو (فصل السلط)', completed: false },
          { id: 'ph-l15', title: 'الدولة بين الحق والعنف: ماكس فيبر (احتكار العنف المشروع)، جاكلين روس (دولة الحق والقانون)', completed: false },
          { id: 'ph-l16', title: 'الحق بين الطبيعي والوضعي: هوبز (حق القوة الطبيعي)، روسو (الحق المدني التعاقدي)', completed: false },
          { id: 'ph-l17', title: 'العدالة كأساس للحق: أرسطو (توزيع عادل)، شيشرون (القانون الطبيعي الفطري)', completed: false },
          { id: 'ph-l18', title: 'العدالة بين الإنصاف والمساواة: أرسطو (الإنصاف تصحيح للقانون العام)، جون رولز (الإنصاف وتكافؤ الفرص)', completed: false },
        ]
      },
      {
        id: 'philo-ch4',
        subjectId: 'subj-philo',
        title: 'مجزوءة الأخلاق & منهجيات الامتحان الوطني',
        term: 2,
        order: 4,
        completed: false,
        exercisesTarget: 25,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'ph-l19', title: 'الواجب والإكراه: كانط (الواجب أمر أخلاقي قطعي غير مشروط)، غويو (قدرة فطرية على الفعل)', completed: false },
          { id: 'ph-l20', title: 'الوعي الأخلاقي: روسو (صوت الضمير الفطري)، نيتشه (نشأة الواجب من علاقة الدائن والمدين)', completed: false },
          { id: 'ph-l21', title: 'الحرية والحتمية: سبينوزا (الجهل بالأسباب علة التوهم)، سارتر (الإنسان محكوم عليه بأن يكون حراً)', completed: false },
          { id: 'ph-l22', title: 'منهجية تحليل ومناقشة السؤال الإشكالي المفتوح بالامتحان الوطني', completed: false },
          { id: 'ph-l23', title: 'منهجية تحليل ومناقشة القولة الفلسفية المرفقة بسؤال', completed: false },
          { id: 'ph-l24', title: 'منهجية تحليل ومناقشة النص الفلسفي (الفهم، التحليل، المناقشة، التركيب)', completed: false },
        ]
      }
    ]
  },

  /* ========================================================================
     5. ENGLISH (اللغة الإنجليزية 2 BAC) — COEFFICIENT 2
     Moroccan 2nd Bac National Exam (All 10 Official Units: Ticket & Insights)
     ======================================================================== */
  {
    id: 'subj-english',
    name: 'English (اللغة الإنجليزية 2 Bac)',
    code: 'english',
    coefficient: 2,
    colorVar: 'var(--subj-english)',
    bgVar: 'var(--subj-english-bg)',
    targetBacGrade: 19.0,
    hoursStudied: 0,
    chapters: [
      {
        id: 'en-ch1',
        subjectId: 'subj-english',
        title: 'Unit 1: Gifts of Youth (مواهب الشباب)',
        term: 1,
        order: 1,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l1', title: 'Vocabulary: Youth qualities (creativity, passion, audacity, ambition)', completed: false },
          { id: 'en-l2', title: 'Grammar: Gerund vs. Infinitive (verbs followed by -ing or to + verb)', completed: false },
          { id: 'en-l3', title: 'Functions: Expressing opinion, agreeing and disagreeing', completed: false },
          { id: 'en-l4', title: 'Writing: Descriptive paragraph of an inspiring young role model', completed: false },
        ]
      },
      {
        id: 'en-ch2',
        subjectId: 'subj-english',
        title: 'Unit 2: Humour (الفكاهة والمرح)',
        term: 1,
        order: 2,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l5', title: 'Vocabulary: Types of humor, idioms, jokes and positive psychology', completed: false },
          { id: 'en-l6', title: 'Grammar: Modals of deduction in the past (must have, might have, can\\'t have)', completed: false },
          { id: 'en-l7', title: 'Functions: Expressing lack of understanding and asking for clarification', completed: false },
          { id: 'en-l8', title: 'Writing: Narrative essay about a memorable humorous incident', completed: false },
        ]
      },
      {
        id: 'en-ch3',
        subjectId: 'subj-english',
        title: 'Unit 3: Formal, Informal & Non-Formal Education (أنماط التعليم)',
        term: 1,
        order: 3,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l9', title: 'Vocabulary: Education systems, literacy, e-learning and school dropouts', completed: false },
          { id: 'en-l10', title: 'Grammar: Past Perfect Simple vs. Past Simple (before, after, by the time)', completed: false },
          { id: 'en-l11', title: 'Functions: Asking for and giving advice (ought to, should, if I were you)', completed: false },
          { id: 'en-l12', title: 'Writing: Cause and effect essay on non-formal education in Morocco', completed: false },
        ]
      },
      {
        id: 'en-ch4',
        subjectId: 'subj-english',
        title: 'Unit 4: Sustainable Development (التنمية المستدامة)',
        term: 1,
        order: 4,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l13', title: 'Vocabulary: Renewable energy, ecological footprint and green economy', completed: false },
          { id: 'en-l14', title: 'Grammar: The Passive Voice across all tenses (Present, Past, Continuous, Modals)', completed: false },
          { id: 'en-l15', title: 'Functions: Expressing cause and effect (due to, because of, as a result)', completed: false },
          { id: 'en-l16', title: 'Writing: Expository essay on combating climate change and desertification', completed: false },
        ]
      },
      {
        id: 'en-ch5',
        subjectId: 'subj-english',
        title: 'Unit 5: Women and Power (المرأة وصنع القرار)',
        term: 1,
        order: 5,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l17', title: 'Vocabulary: Gender parity, empowerment, leadership and social advocacy', completed: false },
          { id: 'en-l18', title: 'Grammar: Phrasal Verbs (separable vs. inseparable essential Bac verbs)', completed: false },
          { id: 'en-l19', title: 'Functions: Addition and Concession (in addition to, although, despite, whereas)', completed: false },
          { id: 'en-l20', title: 'Writing: Biography of an influential Moroccan pioneer woman', completed: false },
        ]
      },
      {
        id: 'en-ch6',
        subjectId: 'subj-english',
        title: 'Unit 6: Cultural Values (القيم الثقافية والتعايش)',
        term: 2,
        order: 6,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l21', title: 'Vocabulary: Cultural heritage, tolerance, coexistence and globalization', completed: false },
          { id: 'en-l22', title: 'Grammar: Relative Pronouns & Clauses (Defining vs. Non-defining with commas)', completed: false },
          { id: 'en-l23', title: 'Functions: Defining and giving concrete examples', completed: false },
          { id: 'en-l24', title: 'Writing: Review of a Moroccan cultural festival or historical heritage site', completed: false },
        ]
      },
      {
        id: 'en-ch7',
        subjectId: 'subj-english',
        title: 'Unit 7: Citizenship (المواطنة وحقوق الإنسان)',
        term: 2,
        order: 7,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l25', title: 'Vocabulary: Civic responsibilities, human rights, NGO activism and volunteering', completed: false },
          { id: 'en-l26', title: 'Grammar: Reported Speech (statements, wh-questions, yes/no questions, orders)', completed: false },
          { id: 'en-l27', title: 'Functions: Making complaints and apologizing gracefully', completed: false },
          { id: 'en-l28', title: 'Writing: Formal letter of complaint to a municipal service director', completed: false },
        ]
      },
      {
        id: 'en-ch8',
        subjectId: 'subj-english',
        title: 'Unit 8: Brain Drain (هجرة الأدمغة والكفاءات)',
        term: 2,
        order: 8,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l29', title: 'Vocabulary: Push and pull migration factors, human capital, skilled workforce', completed: false },
          { id: 'en-l30', title: 'Grammar: Conditional Type 3 (Past Unreal: If + had + PP, would have + PP)', completed: false },
          { id: 'en-l31', title: 'Grammar: Expressing Wishes and Regrets in the present and past', completed: false },
          { id: 'en-l32', title: 'Writing: Problem-solution essay on incentives to retain Moroccan engineers', completed: false },
        ]
      },
      {
        id: 'en-ch9',
        subjectId: 'subj-english',
        title: 'Unit 9: Advances in Science & Technology (التقدم العلمي)',
        term: 2,
        order: 9,
        completed: false,
        exercisesTarget: 20,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l33', title: 'Vocabulary: Artificial intelligence, automation, cyber security and bioethics', completed: false },
          { id: 'en-l34', title: 'Grammar: Word Formation (prefixes, suffixes, changing nouns/verbs/adjectives)', completed: false },
          { id: 'en-l35', title: 'Functions: Expressing certainty, probability and expressing purpose', completed: false },
          { id: 'en-l36', title: 'Writing: Opinion essay on the impact of generative AI on student learning', completed: false },
        ]
      },
      {
        id: 'en-ch10',
        subjectId: 'subj-english',
        title: 'Unit 10: International Organizations (المنظمات الدولية)',
        term: 2,
        order: 10,
        completed: false,
        exercisesTarget: 25,
        exercisesCompleted: 0,
        revisionStatus: 'not_started',
        lessons: [
          { id: 'en-l37', title: 'Vocabulary: UN, UNICEF, WHO, Red Crescent, treaties, diplomacy and peacekeeping', completed: false },
          { id: 'en-l38', title: 'Grammar: Discourse Markers, Conjunctions and Linking Transitions', completed: false },
          { id: 'en-l39', title: 'Functions: Expressing future hopes, humanitarian goals and aspirations', completed: false },
          { id: 'en-l40', title: 'Writing: National Exam Argumentative Essay with standard formal structure', completed: false },
        ]
      }
    ]
  }
];

export const INITIAL_EXAMS: Exam[] = [];

export const INITIAL_WEAKNESSES: Weakness[] = [];

export const INITIAL_GERMAN_VOCAB: VocabCard[] = [];

export const INITIAL_GERMAN_GRAMMAR: GrammarTopic[] = [
  {
    id: 'gr-1',
    level: 'A2',
    title: 'Wechselpräpositionen (Akkusativ vs. Dativ)',
    ruleExplanation: 'Wohin? (Bewegung/Richtung) → Akkusativ. Wo? (Ort/Position) → Dativ.',
    exampleSentence: 'Ich stelle das Buch auf den Tisch (Akk.). Das Buch liegt auf dem Tisch (Dat.).',
    mastered: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gr-2',
    level: 'B1',
    title: 'Nebensätze mit Subjunktionen (weil, dass, obwohl, wenn)',
    ruleExplanation: 'In Nebensätzen mit Konjunktionen wandert das konjugierte Verb an das Satzende.',
    exampleSentence: 'Ich lerne Deutsch, weil ich eine Ausbildung in Deutschland machen möchte.',
    mastered: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gr-3',
    level: 'B1',
    title: 'Konjunktiv II der Höflichkeit & Wünsche',
    ruleExplanation: 'Verwendung von "hätte", "wäre" und "würde + Infinitiv" für höfliche Bitten in formellen E-Mails.',
    exampleSentence: 'Ich würde mich sehr über eine Einladung zu einem Vorstellungsgespräch freuen.',
    mastered: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gr-4',
    level: 'B1',
    title: 'Passiv Präsens & Passiv mit Modalverben',
    ruleExplanation: 'Vorgangspassiv: werden + Partizip II. Bei Modalverben: Modalverb konjugiert + Partizip II + werden.',
    exampleSentence: 'Der Quellcode muss vor dem Deployment gründlich getestet werden.',
    mastered: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'gr-5',
    level: 'B2',
    title: 'Nomen-Verb-Verbindungen & Partizipialattribute',
    ruleExplanation: 'Feste Wendungen wie "eine Entscheidung treffen", "zur Verfügung stehen" sowie erweiterte Partizipien für das Berufsleben.',
    exampleSentence: 'Die von unserem Team entwickelte Software steht den Kunden zur Verfügung.',
    mastered: false,
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  }
];

export const INITIAL_AUSBILDUNG_MILESTONES: AusbildungMilestone[] = [
  { id: 'ab-m1', stepNumber: 1, title: 'Deutsch A1/A2 Zertifizierung', description: 'Grundlagen der deutschen Sprache abschließen', targetDate: '2026-11-30', completed: false },
  { id: 'ab-m2', stepNumber: 2, title: 'Deutsch B1 Zertifikat (Goethe / telc)', description: 'Mittelstufe B1 mit Prädikat bestehen', targetDate: '2027-02-28', completed: false },
  { id: 'ab-m3', stepNumber: 3, title: 'Deutsch B2 Vorbereitung', description: 'Fachsprache Informatik & berufsbezogenes Deutsch', targetDate: '2027-05-30', completed: false },
  { id: 'ab-m4', stepNumber: 4, title: 'Baccalauréat 2027 mit Auszeichnung (Mention Très Bien)', description: 'Examen National mit hoher Note abschließen', targetDate: '2027-06-25', completed: false },
  { id: 'ab-m5', stepNumber: 5, title: 'Bewerbungsdossier (Tabellarischer Lebenslauf & Anschreiben)', description: 'Unterlagen nach deutschem Standard fertigstellen', targetDate: '2027-07-15', completed: false },
  { id: 'ab-m6', stepNumber: 6, title: 'Bewerbungen & Vorstellungsgespräche bei Ausbildungsbetrieben', description: 'Interviews für Fachinformatiker Anwendungsentwicklung', targetDate: '2027-08-15', completed: false },
  { id: 'ab-m7', stepNumber: 7, title: 'Ausbildungsvertrag & Visum (§16a AufenthG)', description: 'Vertragsunterschrift, Visumsantrag & Einreise nach Deutschland', targetDate: '2027-09-15', completed: false },
];

export const INITIAL_AUSBILDUNG_APPLICATIONS: AusbildungApplication[] = [];

export const INITIAL_SOFTWARE_PROJECTS: SoftwareProject[] = [];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'hab-1',
    title: 'Morning Bac Math or Physics Deep Work',
    description: 'Solve at least 2 National exam analysis or electricity exercises',
    routineTime: 'morning',
    targetDaysPerWeek: 7,
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'hab-2',
    title: 'German Wortschatz & Grammatik',
    description: 'Review 15 German flashcards + 1 grammar rule',
    routineTime: 'afternoon',
    targetDaysPerWeek: 6,
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'hab-3',
    title: 'Software Dev / Coding Practice',
    description: 'Contribute to portfolio project or algorithms practice',
    routineTime: 'evening',
    targetDaysPerWeek: 5,
    currentStreak: 0,
    longestStreak: 0,
    completedDates: [],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  }
];

export const INITIAL_GOALS: LifeGoal[] = [
  {
    id: 'goal-1',
    title: 'Mention Très Bien in Baccalauréat 2027',
    category: 'school',
    targetDate: '2027-06-30',
    progress: 0,
    completed: false,
    milestones: [
      { id: 'gm-1', title: 'Master Semestre 1 National syllabus (Math, PC, SVT)', completed: false },
      { id: 'gm-2', title: 'Achieve >= 17.5 in all Term 1 Devoirs Surveillés', completed: false },
      { id: 'gm-3', title: 'Complete all Past National Exam papers 2018-2026', completed: false },
    ],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  },
  {
    id: 'goal-2',
    title: 'Secure Fachinformatiker Ausbildung Contract in Germany',
    category: 'german',
    targetDate: '2027-09-01',
    progress: 0,
    completed: false,
    milestones: [
      { id: 'gm-4', title: 'Achieve Goethe/telc B2 Certificate', completed: false },
      { id: 'gm-5', title: 'Build 3 fullstack portfolio projects to impress German companies', completed: false },
      { id: 'gm-6', title: 'Pass technical interview in German and sign contract', completed: false }
    ],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-01T00:00:00Z'
  }
];

export const INITIAL_TASKS: Task[] = [];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [];

export const INITIAL_NOTES: Note[] = [];

export const INITIAL_FOCUS_SESSIONS: FocusSession[] = [];
`;

fs.writeFileSync(targetFile, curriculumCode, 'utf8');
console.log('Successfully generated complete authentic Moroccan 2nd Bac curriculum in initialData.ts!');
`;

fs.writeFileSync(path.resolve(__dirname, 'generate_curriculum.cjs'), curriculumCode, 'utf8');
console.log('Script written.');
