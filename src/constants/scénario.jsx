export const scenarios = {
    initial: {
      question: (
        <div>
          <h1>Bonjour 👋</h1>
          <p>Bienvenue sur le chatbot de Brain-ia Academy.</p>
          <p>
            Je suis ici pour t'aider avec toutes tes questions concernant
            l'université 😌.
          </p>
          <p>Pour commencer, pourrais-tu me dire qui tu es ?</p>
        </div>
      ),
      options: [
        { label: "Étudiant 📚", next: "student" },
        { label: "Salarié en activité 💼", next: "job_seeker" },
        { label: "Demandeur d'emploi 🔎", next: "job_seeker" },
        { label: "Une entreprise 🏢", next: "company" },
        { label: "Un parent 👨‍👩‍👧‍👦", next: "parent" },
      ],
      botResponse: "Ok 🙂",
    },
  
    // Student Scenario
    student: {
      question:
        "Super ! Nos nouveaux élèves peuvent étudier sur 3 campus. Dis-moi lequel t’intéresse en priorité ?",
      options: [
        { label: "Paris", next: "choose_course" },
        { label: "Lyon", next: "choose_course" },
        { label: "Marseille", next: "choose_course" },
      ],
      botResponse: "D'accord 🙂",
    },
    choose_course: {
      question:
        "Clique sur le domaine de formation qui t’intéresse chez Lead-ia Academy",
      options: [
        { label: "COMMERCE & MARKETING", next: "course_details" },
        { label: "COMMUNICATION", next: "course_details" },
        { label: "INFORMATIQUE", next: "course_details" },
      ],
      botResponse: "Un excellent choix pour ta carrière 🎓",
    },
    course_details: {
      question:
        "Génial ! OK, on va sur ça 😀 ! Quel type de diplôme souhaites-tu obtenir ?",
      options: [
        { label: "Licence", next: "duration" },
        { label: "Master", next: "duration" },
        { label: "Certificat", next: "duration" },
      ],
      botResponse: "Excellent choix 😊",
    },
    duration: {
      question: "Combien de temps es-tu prêt à consacrer à tes études ?",
      options: [
        { label: "Temps plein", next: "financial_aid" },
        { label: "Temps partiel", next: "financial_aid" },
      ],
      botResponse: "Parfait, je note cela !",
    },
    financial_aid: {
      question:
        "As-tu besoin d'informations sur les bourses ou l'aide financière ?",
      options: [
        { label: "Oui, je veux en savoir plus", next: "scholarships" },
        { label: "Non, merci", next: "request_name" },
      ],
      botResponse: "Je comprends. Parlons des options disponibles 🎓",
    },
    scholarships: {
      question: "Voici quelques options de bourses disponibles :",
      options: [
        { label: "Bourse d'excellence", next: "request_name" },
        { label: "Bourse pour étudiants étrangers", next: "request_name" },
        {
          label: "Bourse basée sur les besoins financiers",
          next: "request_name",
        },
      ],
      botResponse: "Ces options sont excellentes pour alléger les frais 💰",
    },
  
    // Job Seeker Scenario
    job_seeker: {
      question:
        "Bienvenue ! Cherchez-vous des programmes pour développer vos compétences ou explorer de nouvelles carrières ?",
      options: [
        { label: "Développer mes compétences", next: "choose_program" },
        { label: "Explorer de nouvelles carrières", next: "choose_program" },
      ],
      botResponse: "Excellent ! Nous avons plusieurs options pour vous 😊",
    },
    choose_program: {
      question: "Quel domaine de formation vous intéresse le plus ?",
      options: [
        { label: "Informatique", next: "job_course_details" },
        { label: "Management", next: "job_course_details" },
        { label: "Communication", next: "job_course_details" },
      ],
      botResponse: "Un choix judicieux pour faire évoluer votre carrière 📈",
    },
    job_course_details: {
      question: "Parfait ! Quel est votre niveau actuel dans ce domaine ?",
      options: [
        { label: "Débutant", next: "job_support" },
        { label: "Intermédiaire", next: "job_support" },
        { label: "Avancé", next: "job_support" },
      ],
      botResponse: "C'est toujours le bon moment pour progresser 💪",
    },
    job_support: {
      question:
        "Besoin d'assistance pour trouver des stages ou opportunités d'emploi ?",
      options: [
        {
          label: "Oui, je veux des informations sur les stages",
          next: "request_namel",
        },
        { label: "Non, merci", next: "rrequest_name" },
      ],
      botResponse: "Les stages peuvent offrir une expérience précieuse 📚",
    },
  
    // Company Scenario
    company: {
      question:
        "Bonjour ! Êtes-vous intéressé par la formation pour vos employés ou la collaboration sur des projets de recherche ?",
      options: [
        { label: "Formation pour employés", next: "employee_training" },
        { label: "Collaboration sur projets", next: "research_projects" },
      ],
      botResponse: "Nous avons d'excellentes options pour les entreprises ! 🤝",
    },
    employee_training: {
      question:
        "Quel domaine de formation souhaitez-vous offrir à vos employés ?",
      options: [
        { label: "Informatique", next: "training_details" },
        { label: "Gestion de projet", next: "training_details" },
        { label: "Communication", next: "training_details" },
      ],
      botResponse:
        "C'est une excellente initiative pour le développement de votre équipe !",
    },
    training_details: {
      question: "Souhaitez-vous des formations en ligne ou en présentiel ?",
      options: [
        { label: "En ligne", next: "training_format" },
        { label: "En présentiel", next: "training_format" },
      ],
      botResponse:
        "Les deux options sont très efficaces pour un apprentissage réussi !",
    },
    training_format: {
      question:
        "Avez-vous des préférences concernant la durée des formations ?",
      options: [
        { label: "Courtes (1-3 mois)", next: "request_email" },
        { label: "Longues (plus de 3 mois)", next: "request_email" },
      ],
      botResponse: "Une bonne durée peut vraiment maximiser l'apprentissage !",
    },
    research_projects: {
      question:
        "Quels types de projets de recherche souhaitez-vous explorer avec nous ?",
      options: [
        { label: "Technologie", next: "project_details" },
        { label: "Sciences sociales", next: "project_details" },
        { label: "Santé", next: "project_details" },
      ],
      botResponse:
        "Nous avons hâte de collaborer sur ces projets passionnants !",
    },
    project_details: {
      question: "Quel est le principal objectif de votre projet de recherche ?",
      options: [
        { label: "Développement de produits", next: "request_name" },
        { label: "Analyse de données", next: "request_name" },
        { label: "Recherche appliquée", next: "request_name" },
      ],
      botResponse:
        "C'est formidable de voir des entreprises investies dans la recherche !",
    },
    // Parent Scenario
    parent: {
      question:
        "Bonjour ! Souhaitez-vous obtenir des informations pour aider votre enfant à choisir une filière ou en savoir plus sur la vie étudiante ?",
      options: [
        { label: "Aider à choisir une filière", next: "program_interest" },
        { label: "Vie étudiante", next: "student_life" },
      ],
      botResponse:
        "C'est formidable que vous soyez impliqué dans l'éducation de votre enfant ! 👩‍👧",
    },
    program_interest: {
      question: "Quels domaines vous intéressent pour votre enfant ?",
      options: [
        { label: "Sciences", next: "program_details" },
        { label: "Commerce", next: "program_details" },
        { label: "Littérature", next: "program_details" },
        { label: "Arts", next: "program_details" },
        { label: "Ingénierie", next: "program_details" },
      ],
      botResponse:
        "Ces choix offrent de belles opportunités pour l'avenir de votre enfant !",
    },
    program_details: {
      question: "Quel type de diplôme cherchez-vous pour votre enfant ?",
      options: [
        { label: "Licence", next: "support_services" },
        { label: "Master", next: "support_services" },
        { label: "Certificat", next: "support_services" },
        { label: "DUT", next: "support_services" },
      ],
      botResponse:
        "C'est un bon investissement dans l'avenir de votre enfant !",
    },
    support_services: {
      question:
        "Aimeriez-vous en savoir plus sur les bourses disponibles pour aider au financement des études ?",
      options: [
        { label: "Oui, ça m'intéresse", next: "scholarships" },
        { label: "Non, merci", next: "request_name" },
      ],
      botResponse:
        "Les bourses peuvent faire une grande différence financièrement !",
    },
    scholarships: {
      question: "Voici quelques types de bourses disponibles :",
      options: [
        { label: "Bourse d'excellence", next: "excellence_details" },
        {
          label: "Bourse pour étudiants étrangers",
          next: "foreign_students_details",
        },
        {
          label: "Bourse basée sur les besoins financiers",
          next: "need_based_details",
        },
        { label: "Bourse de recherche", next: "research_grant_details" },
        { label: "Bourse sportive", next: "athletic_scholarship_details" },
        {
          label: "Bourse d'études professionnelles",
          next: "professional_studies_details",
        },
      ],
      botResponse:
        "Ces options peuvent vraiment aider à alléger les frais ! 💰",
    },
    excellence_details: {
      question:
        "Les bourses d'excellence sont attribuées en fonction des performances académiques. Souhaitez-vous des détails sur les critères d'éligibilité ?",
      options: [
        { label: "Oui, je veux en savoir plus", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "C'est un excellent moyen de récompenser le travail acharné !",
    },
    foreign_students_details: {
      question:
        "Les bourses pour étudiants étrangers aident à couvrir les frais de scolarité pour les étudiants internationaux. Avez-vous besoin d'informations spécifiques sur le processus de demande ?",
      options: [
        { label: "Oui, je suis intéressé", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "C'est une opportunité incroyable pour les étudiants internationaux !",
    },
    need_based_details: {
      question:
        "Les bourses basées sur les besoins financiers aident les étudiants dont les familles ont des difficultés économiques. Souhaitez-vous des conseils sur comment postuler ?",
      options: [
        { label: "Oui, donnez-moi des conseils", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "Cela peut vraiment aider à rendre l'éducation accessible !",
    },
    research_grant_details: {
      question:
        "Les bourses de recherche soutiennent les étudiants qui souhaitent mener des projets de recherche. Souhaitez-vous en savoir plus sur les domaines couverts ?",
      options: [
        { label: "Oui, j'aimerais en savoir plus", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "C'est une belle manière de contribuer à l'innovation !",
    },
    athletic_scholarship_details: {
      question:
        "Les bourses sportives récompensent les étudiants-athlètes pour leurs performances. Souhaitez-vous connaître les sports couverts ?",
      options: [
        { label: "Oui, je veux plus d'infos", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse:
        "Le sport peut ouvrir des portes étonnantes pour les étudiants !",
    },
    professional_studies_details: {
      question:
        "Les bourses d'études professionnelles aident les étudiants dans des domaines spécifiques comme l'art, la musique ou le théâtre. Êtes-vous intéressé par ces programmes ?",
      options: [
        { label: "Oui, donnez-moi plus d'infos", next: "request_name" },
        { label: "Non, merci", next: "scholarships" },
      ],
      botResponse: "C'est une excellente voie pour les étudiants passionnés !",
    },
    request_name: {
      question: "Peux-tu me donner ton prénom, s’il te plaît ?",
      botResponse: (name) => `Merci, ${name} ! D'accord, continuons !`,
      inputType: "name",
      next: "request_email",
    },
    request_email: {
      question: (name) => `S'il te plaît ${name}, entre ton email ci-dessous.`,
      botResponse: "Merci pour l'information 📧",
      inputType: "email",
      next: "request_phone",
      invalidResponse: ["Ton email n'est pas valide."],
    },
    request_phone: {
      question: (name) =>
        `S'il te plaît, ${name} entre ton numéro de téléphone ci-dessous.`,
      botResponse: "Parfait",
      inputType: "phone",
      next: "final_response",
    },
  
    final_response: {
        question: "Merci pour l'information ! Nous vous contacterons bientôt.",
      options: [],
      next: "new_question",
    //   botResponse:
    //     "Merci d'avoir pris le temps de discuter avec moi, À bientôt ! 😊",
    },
    new_question: {
        question: "Vous avez une autre question ?",
        options: [
            { label: "Oui", next: "initial" },
            { label: "Non", next: "Goodbye" },
    ],
    Goodbye: {
        question: "Merci d'avoir discuté avec moi, À bientôt ! 😊",
        options: [],
        
    }
    }
  }
  