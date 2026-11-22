import type { Language } from '../types/chemistry';

export interface UIStrings {
  brandTitle: string;
  navHome: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroExploreAtomNote: string;
  heroAtomSwitcherLabel: string;
  scannerTitle: string;
  scannerSubtitle: string;
  scannerHoverHint: string;
  exploreElementBtn: string;
  periodLabel: string;
  groupLabel: string;
  atomicNumberLabel: string;
  atomicMassLabel: string;
  factOfDayTitle: string;
  nextFactBtn: string;
  progressTitle: string;
  progressStudied: string;
  progressQuizzes: string;
  progressChallengeBest: string;
  progressResetBtn: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  authorLabel: string;
  authorValue: string;
  qrGalleryTitle: string;
  qrGallerySubtitle: string;
  qrDownloadBtn: string;
  qrOpenPageBtn: string;
  qrDirectUrlLabel: string;
  compareTitle: string;
  compareSubtitle: string;
  compareLeftLabel: string;
  compareRightLabel: string;
  challengeTitle: string;
  challengeSubtitle: string;
  challengeStartBtn: string;
  challengeNextBtn: string;
  challengeRestartBtn: string;
  challengeScoreLabel: string;
  // Element Passport Section Headings
  backToAllBtn: string;
  passportLabel: string;
  sec1Title: string;
  sec2Title: string;
  sec3Title: string;
  sec4Title: string;
  sec5Title: string;
  sec6Title: string;
  sec7Title: string;
  sec8Title: string;
  sec9Title: string;
  sec10Title: string;
  sec11Title: string;
  specialTopicsTitle: string;
  sourcesTitle: string;
  // Field Labels
  nameRuLabel: string;
  nameKzLabel: string;
  nameEnLabel: string;
  nameLatinLabel: string;
  symbolLabel: string;
  elementTypeLabel: string;
  discovererLabel: string;
  discoveryHistoryLabel: string;
  nameOriginLabel: string;
  isotopeLabel: string;
  protonsLabel: string;
  neutronsLabel: string;
  electronsLabel: string;
  nuclearChargeLabel: string;
  electronConfigLabel: string;
  shellsDistributionLabel: string;
  energyLevelsLabel: string;
  valenceElectronsLabel: string;
  atomicRadiusLabel: string;
  electronegativityLabel: string;
  stateStpLabel: string;
  colorLabel: string;
  densityLabel: string;
  meltingPointLabel: string;
  boilingPointLabel: string;
  hardnessLabel: string;
  electricalCondLabel: string;
  thermalCondLabel: string;
  crystalStructureLabel: string;
  specialFeaturesLabel: string;
  oxidationStatesLabel: string;
  reactivityLabel: string;
  withOxygenLabel: string;
  withWaterLabel: string;
  withAcidsLabel: string;
  withOthersLabel: string;
  compoundsLabel: string;
  mineralsLabel: string;
  oresLabel: string;
  naturalSourcesLabel: string;
  abundanceLabel: string;
  extractionLabel: string;
  toxicityLabel: string;
  biologicalEffectLabel: string;
  ecologicalLabel: string;
  pollutionLabel: string;
  safetyLabel: string;
  // 3D Atom Explorer Controls
  atom3dTitle: string;
  atom3dHint: string;
  atom3dExplodeLabel: string;
  atom3dSpeedLabel: string;
  atom3dPauseBtn: string;
  atom3dPlayBtn: string;
  atom3dResetBtn: string;
  atom3dHideControls: string;
  atom3dShowControls: string;
  atom3dAllShells: string;
  atom3dShellPrefix: string;
  // Reaction Lab
  reactionLabTitle: string;
  reactionSimulateBtn: string;
  reactionResetBtn: string;
  reactionReactants: string;
  reactionConditions: string;
  reactionProducts: string;
  reactionType: string;
  reactionExplanation: string;
  // Quiz
  quizQuestionProgress: string;
  quizNextQuestion: string;
  quizFinish: string;
  quizCorrect: string;
  quizIncorrect: string;
  quizResultTitle: string;
  quizRetryBtn: string;
  // Footer
  footerRights: string;
  footerElementsTitle: string;
}

export const UI_STRINGS: Record<Language, UIStrings> = {
  ru: {
    brandTitle: 'Химическая вселенная',
    navHome: 'Главная',
    heroTitle: 'ХИМИЧЕСКАЯ ВСЕЛЕННАЯ',
    heroSubtitle: 'Исследуй атомы. Открой свойства. Познай мир химии',
    heroCta: 'Начать исследование',
    heroExploreAtomNote: 'Интерактивная 3D-модель атома · Вращайте мышью или касанием',
    heroAtomSwitcherLabel: 'Просмотр атома в 3D:',
    scannerTitle: 'Галерея элементов и сканер',
    scannerSubtitle: 'Наведите курсор на карточку элемента для мгновенного спектрального и атомного анализа',
    scannerHoverHint: 'Наведите на элемент для сканирования или нажмите «Изучить элемент»',
    exploreElementBtn: 'Изучить элемент',
    periodLabel: 'Период',
    groupLabel: 'Группа',
    atomicNumberLabel: 'Атомный номер',
    atomicMassLabel: 'Атомная масса',
    factOfDayTitle: 'Интересный факт дня',
    nextFactBtn: 'Следующий факт',
    progressTitle: 'Прогресс изучения',
    progressStudied: 'Изучено элементов',
    progressQuizzes: 'Пройдено мини-тестов',
    progressChallengeBest: 'Рекорд в испытании',
    progressResetBtn: 'Сбросить прогресс',
    aboutTitle: 'О проекте',
    aboutText1:
      '«Химическая вселенная» — это интерактивный научный музей нового поколения, созданный для глубокого и наглядного изучения четырёх соседних тяжёлых элементов 6-го периода: Золота (Au, №79), Ртути (Hg, №80), Таллия (Tl, №81) и Свинца (Pb, №82).',
    aboutText2:
      'Каждый цифровой паспорт объединяет точную квантово-атомную 3D-визуализацию, проверенные термодинамические и химические уравнения, минералогию, историю научных открытий и интерактивные тесты на двух языках.',
    authorLabel: 'Автор проекта',
    authorValue: 'Абаева Айдана, КД-25-01',
    qrGalleryTitle: 'QR-паспорта для быстрого перехода',
    qrGallerySubtitle: 'Отсканируйте камерой телефона или скачайте готовый QR-код для лабораторного стенда',
    qrDownloadBtn: 'Скачать QR-код',
    qrOpenPageBtn: 'Открыть паспорт',
    qrDirectUrlLabel: 'Прямая ссылка:',
    compareTitle: 'Сравнение элементов',
    compareSubtitle: 'Выберите два элемента для сопоставления физических, атомных и химических параметров',
    compareLeftLabel: 'Элемент А',
    compareRightLabel: 'Элемент Б',
    challengeTitle: 'Periodic Table Challenge',
    challengeSubtitle: 'Проверьте интуицию химика: определите элемент по атомным и физическим подсказкам',
    challengeStartBtn: 'Начать испытание',
    challengeNextBtn: 'Следующий вопрос',
    challengeRestartBtn: 'Пройти заново',
    challengeScoreLabel: 'Счёт',
    backToAllBtn: 'На главную',
    passportLabel: 'Цифровой научный паспорт элемента',
    sec1Title: '01. Общая информация',
    sec2Title: '02. Строение атома и 3D Atom Explorer',
    sec3Title: '03. Физические свойства',
    sec4Title: '04. Химические свойства',
    sec5Title: '05. Химические реакции и Reaction Lab',
    sec6Title: '06. Нахождение в природе',
    sec7Title: '07. Применение в науке и жизни',
    sec8Title: '08. Влияние на человека и природу',
    sec9Title: '09. История элемента',
    sec10Title: '10. Интересные факты',
    sec11Title: '11. Мини-тест',
    specialTopicsTitle: 'Углублённые научные темы',
    sourcesTitle: 'Использованные научные источники',
    nameRuLabel: 'Название (рус.)',
    nameKzLabel: 'Название (каз.)',
    nameEnLabel: 'Название (англ.)',
    nameLatinLabel: 'Латинское название',
    symbolLabel: 'Химический символ',
    elementTypeLabel: 'Классификация',
    discovererLabel: 'Первооткрыватель',
    discoveryHistoryLabel: 'История открытия',
    nameOriginLabel: 'Происхождение названия',
    isotopeLabel: 'Опорный изотоп',
    protonsLabel: 'Протоны (p⁺)',
    neutronsLabel: 'Нейтроны (n⁰)',
    electronsLabel: 'Электроны (e⁻)',
    nuclearChargeLabel: 'Заряд ядра',
    electronConfigLabel: 'Электронная конфигурация',
    shellsDistributionLabel: 'Распределение по оболочкам',
    energyLevelsLabel: 'Энергетические уровни',
    valenceElectronsLabel: 'Электроны внешнего уровня',
    atomicRadiusLabel: 'Атомный радиус',
    electronegativityLabel: 'Электроотрицательность (Полинг)',
    stateStpLabel: 'Агрегатное состояние (н.у.)',
    colorLabel: 'Цвет и блеск',
    densityLabel: 'Плотность',
    meltingPointLabel: 'Температура плавления',
    boilingPointLabel: 'Температура кипения',
    hardnessLabel: 'Твёрдость по Моосу',
    electricalCondLabel: 'Электропроводность',
    thermalCondLabel: 'Теплопроводность',
    crystalStructureLabel: 'Кристаллическая решётка',
    specialFeaturesLabel: 'Характерные особенности',
    oxidationStatesLabel: 'Степени окисления',
    reactivityLabel: 'Химическая активность',
    withOxygenLabel: 'Взаимодействие с кислородом',
    withWaterLabel: 'Взаимодействие с водой',
    withAcidsLabel: 'Взаимодействие с кислотами',
    withOthersLabel: 'Взаимодействие с другими элементами',
    compoundsLabel: 'Характерные соединения',
    mineralsLabel: 'Основные минералы',
    oresLabel: 'Руды',
    naturalSourcesLabel: 'Природные источники',
    abundanceLabel: 'Распространённость в земной коре',
    extractionLabel: 'Промышленное получение',
    toxicityLabel: 'Токсичность',
    biologicalEffectLabel: 'Воздействие на организм',
    ecologicalLabel: 'Экологические последствия',
    pollutionLabel: 'Источники загрязнения',
    safetyLabel: 'Профилактика и безопасность',
    atom3dTitle: 'Интерактивный 3D-атом',
    atom3dHint: 'Перетаскивайте для вращения · Колёсико для масштаба',
    atom3dExplodeLabel: 'Разнос оболочек',
    atom3dSpeedLabel: 'Скорость орбит',
    atom3dPauseBtn: 'Пауза',
    atom3dPlayBtn: 'Запуск',
    atom3dResetBtn: 'Сброс камеры',
    atom3dHideControls: 'Скрыть панель',
    atom3dShowControls: 'Показать панель',
    atom3dAllShells: 'Все оболочки',
    atom3dShellPrefix: 'Уровень',
    reactionLabTitle: 'Визуальная лаборатория реакций',
    reactionSimulateBtn: 'Запустить реакцию',
    reactionResetBtn: 'Сбросить',
    reactionReactants: 'Реагенты',
    reactionConditions: 'Условия',
    reactionProducts: 'Продукты',
    reactionType: 'Тип реакции',
    reactionExplanation: 'Механизм и объяснение',
    quizQuestionProgress: 'Вопрос',
    quizNextQuestion: 'Следующий вопрос',
    quizFinish: 'Показать результат',
    quizCorrect: 'Верно!',
    quizIncorrect: 'Неверно',
    quizResultTitle: 'Итоги тестирования',
    quizRetryBtn: 'Пройти тест снова',
    footerRights: 'Интерактивная научная энциклопедия · Двуязычное издание (KZ / RU)',
    footerElementsTitle: 'Цифровые паспорта элементов',
  },
  kz: {
    brandTitle: 'Химиялық ғалам',
    navHome: 'Басты бет',
    heroTitle: 'ХИМИЯЛЫҚ ҒАЛАМ',
    heroSubtitle: 'Атомдарды зертте. Қасиеттерді аш. Химия әлемін таны',
    heroCta: 'Зерттеуді бастау',
    heroExploreAtomNote: 'Атомның интерактивті 3D-моделі · Тінтуірмен немесе саусақпен айналдырыңыз',
    heroAtomSwitcherLabel: '3D атомды таңдау:',
    scannerTitle: 'Элементтер галереясы және сканер',
    scannerSubtitle: 'Лездік спектрлік және атомдық талдауды көру үшін элемент карточкасына меңзерді апарыңыз',
    scannerHoverHint: 'Сканерлеу үшін элементке меңзерді апарыңыз немесе «Элементті зерттеу» түймесін басыңыз',
    exploreElementBtn: 'Элементті зерттеу',
    periodLabel: 'Период',
    groupLabel: 'Топ',
    atomicNumberLabel: 'Атомдық нөмір',
    atomicMassLabel: 'Атомдық масса',
    factOfDayTitle: 'Күннің қызықты дерегі',
    nextFactBtn: 'Келесі дерек',
    progressTitle: 'Оқу үлгерімі',
    progressStudied: 'Зерттелген элементтер',
    progressQuizzes: 'Тапсырылған мини-тесттер',
    progressChallengeBest: 'Сынақтағы рекорд',
    progressResetBtn: 'Үлгерімді тазалау',
    aboutTitle: 'Жоба туралы',
    aboutText1:
      '«Химиялық ғалам» — 6-периодтың көршілес төрт ауыр элементін: Алтын (Au, №79), Сынап (Hg, №80), Таллий (Tl, №81) және Қорғасынды (Pb, №82) терең әрі көрнекі зерттеуге арналған жаңа буынды интерактивті ғылыми мұражай.',
    aboutText2:
      'Әрбір цифрлық төлқұжат дәл кванттық-атомдық 3D-визуализацияны, ғылыми расталған химиялық теңдеулерді, минералогияны, ашылу тарихын және екі тілдегі интерактивті тесттерді біріктіреді.',
    authorLabel: 'Жоба авторы',
    authorValue: 'Абаева Айдана, КД-25-01',
    qrGalleryTitle: 'Жылдам өтуге арналған QR-төлқұжаттар',
    qrGallerySubtitle: 'Телефон камерасымен сканерлеңіз немесе зертханалық стендке арналған дайын QR-кодты жүктеп алыңыз',
    qrDownloadBtn: 'QR-кодты жүктеп алу',
    qrOpenPageBtn: 'Төлқұжатты ашу',
    qrDirectUrlLabel: 'Тікелей сілтеме:',
    compareTitle: 'Элементтерді салыстыру',
    compareSubtitle: 'Физикалық, атомдық және химиялық көрсеткіштерді салыстыру үшін екі элементті таңдаңыз',
    compareLeftLabel: 'А элементі',
    compareRightLabel: 'Б элементі',
    challengeTitle: 'Periodic Table Challenge',
    challengeSubtitle: 'Химик интуициясын тексеріңіз: атомдық және физикалық белгілері бойынша элементті табыңыз',
    challengeStartBtn: 'Сынақты бастау',
    challengeNextBtn: 'Келесі сұрақ',
    challengeRestartBtn: 'Қайта бастау',
    challengeScoreLabel: 'Ұпай',
    backToAllBtn: 'Басты бетке',
    passportLabel: 'Элементтің цифрлық ғылыми төлқұжаты',
    sec1Title: '01. Жалпы ақпарат',
    sec2Title: '02. Атом құрылысы және 3D Atom Explorer',
    sec3Title: '03. Физикалық қасиеттері',
    sec4Title: '04. Химиялық қасиеттері',
    sec5Title: '05. Химиялық реакциялар және Reaction Lab',
    sec6Title: '06. Табиғатта таралуы',
    sec7Title: '07. Ғылым мен өмірде қолданылуы',
    sec8Title: '08. Адамға және табиғатқа әсері',
    sec9Title: '09. Элемент тарихы',
    sec10Title: '10. Қызықты деректер',
    sec11Title: '11. Мини-тест',
    specialTopicsTitle: 'Тереңдетілген ғылыми тақырыптар',
    sourcesTitle: 'Пайдаланылған ғылыми дереккөздер',
    nameRuLabel: 'Орысша атауы',
    nameKzLabel: 'Қазақша атауы',
    nameEnLabel: 'Ағылшынша атауы',
    nameLatinLabel: 'Латынша атауы',
    symbolLabel: 'Химиялық таңбасы',
    elementTypeLabel: 'Элемент типі',
    discovererLabel: 'Ашқан ғалым',
    discoveryHistoryLabel: 'Ашылу тарихы',
    nameOriginLabel: 'Атауының шығу тегі',
    isotopeLabel: 'Негізгі изотоп',
    protonsLabel: 'Протондар (p⁺)',
    neutronsLabel: 'Нейтрондар (n⁰)',
    electronsLabel: 'Электрондар (e⁻)',
    nuclearChargeLabel: 'Ядро заряды',
    electronConfigLabel: 'Электрондық конфигурация',
    shellsDistributionLabel: 'Қабаттар бойынша таралуы',
    energyLevelsLabel: 'Энергетикалық деңгейлер',
    valenceElectronsLabel: 'Сыртқы деңгей электрондары',
    atomicRadiusLabel: 'Атомдық радиус',
    electronegativityLabel: 'Электртерістілік (Полинг)',
    stateStpLabel: 'Агрегаттық күйі (қ.ж.)',
    colorLabel: 'Түсі және жылтыры',
    densityLabel: 'Тығыздығы',
    meltingPointLabel: 'Балқу температурасы',
    boilingPointLabel: 'Қайнау температурасы',
    hardnessLabel: 'Моос бойынша қаттылығы',
    electricalCondLabel: 'Электрөткізгіштігі',
    thermalCondLabel: 'Жылуөткізгіштігі',
    crystalStructureLabel: 'Кристалдық торы',
    specialFeaturesLabel: 'Ерекше қасиеттері',
    oxidationStatesLabel: 'Тотығу дәрежелері',
    reactivityLabel: 'Химиялық белсенділігі',
    withOxygenLabel: 'Оттекпен әрекеттесуі',
    withWaterLabel: 'Сумен әрекеттесуі',
    withAcidsLabel: 'Қышқылдармен әрекеттесуі',
    withOthersLabel: 'Басқа элементтермен әрекеттесуі',
    compoundsLabel: 'Негізгі қосылыстары',
    mineralsLabel: 'Негізгі минералдары',
    oresLabel: 'Кендері',
    naturalSourcesLabel: 'Табиғи көздері',
    abundanceLabel: 'Жер қыртысында таралуы',
    extractionLabel: 'Өнеркәсіптік алу жолдары',
    toxicityLabel: 'Уыттылығы',
    biologicalEffectLabel: 'Ағзаға әсері',
    ecologicalLabel: 'Экологиялық салдары',
    pollutionLabel: 'Ластану көздері',
    safetyLabel: 'Алдын алу және қауіпсіздік шаралары',
    atom3dTitle: 'Интерактивті 3D-атом',
    atom3dHint: 'Айналдыру үшін сүйреңіз · Масштабтау үшін дөңгелекті бұраңыз',
    atom3dExplodeLabel: 'Қабаттарды ажырату',
    atom3dSpeedLabel: 'Орбита жылдамдығы',
    atom3dPauseBtn: 'Кідірту',
    atom3dPlayBtn: 'Іске қосу',
    atom3dResetBtn: 'Камераны бастапқы күйге келтіру',
    atom3dHideControls: 'Панельді жасыру',
    atom3dShowControls: 'Панельді көрсету',
    atom3dAllShells: 'Барлық қабаттар',
    atom3dShellPrefix: 'Деңгей',
    reactionLabTitle: 'Визуалды реакциялар зертханасы',
    reactionSimulateBtn: 'Реакцияны іске қосу',
    reactionResetBtn: 'Қалпына келтіру',
    reactionReactants: 'Бастапқы заттар',
    reactionConditions: 'Шарттары',
    reactionProducts: 'Өнімдер',
    reactionType: 'Реакция типі',
    reactionExplanation: 'Механизмі мен түсіндірмесі',
    quizQuestionProgress: 'Сұрақ',
    quizNextQuestion: 'Келесі сұрақ',
    quizFinish: 'Нәтижені көрсету',
    quizCorrect: 'Дұрыс!',
    quizIncorrect: 'Қате',
    quizResultTitle: 'Тест нәтижесі',
    quizRetryBtn: 'Тестті қайта тапсыру',
    footerRights: 'Интерактивті ғылыми энциклопедия · Екі тілді басылым (KZ / RU)',
    footerElementsTitle: 'Элементтердің цифрлық төлқұжаттары',
  },
};
