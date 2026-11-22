export type Language = 'ru' | 'kz';

export type ElementId = 'au' | 'hg' | 'tl' | 'pb';

export interface LocalizedText {
  ru: string;
  kz: string;
}

export interface LocalizedList {
  ru: string[];
  kz: string[];
}

export interface ElementTheme {
  id: ElementId;
  bgCanvas: string;
  surfaceTint: string;
  accentHex: string;
  secondaryHex: string;
  accentTextClass: string;
  accentBorderClass: string;
  accentBgClass: string;
  accentHoverBgClass: string;
  glowRgba: string;
  nucleusProtonHex: number;
  nucleusNeutronHex: number;
  electronHex: number;
  ringHex: number;
}

export interface ChemicalReaction {
  id: string;
  title: LocalizedText;
  equation: string;
  reactants: LocalizedText;
  products: LocalizedText;
  conditions: LocalizedText;
  reactionType: LocalizedText;
  explanation: LocalizedText;
  visualColorFrom: string;
  visualColorTo: string;
}

export interface ApplicationDomain {
  domain: 'medicine' | 'industry' | 'electronics' | 'technology' | 'research' | 'everyday';
  title: LocalizedText;
  description: LocalizedText;
}

export interface TimelineMilestone {
  year: string;
  title: LocalizedText;
  scientist: LocalizedText;
  description: LocalizedText;
}

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: LocalizedList;
  correctIndex: number;
  explanation: LocalizedText;
}

export interface SpecialTopic {
  title: LocalizedText;
  content: LocalizedText;
}

export interface ScientificSource {
  title: string;
  publisher: string;
  url: string;
}

export interface ElementData {
  id: ElementId;
  symbol: string;
  atomicNumber: number;
  atomicMass: string;
  atomicMassNumeric: number;
  period: number;
  group: string;
  groupNumeric: number;
  block: string;
  names: {
    ru: string;
    kz: string;
    en: string;
    latin: string;
  };
  tagline: LocalizedText;
  elementType: LocalizedText;
  heroImage: string;
  heroImageCaption: LocalizedText;
  mineralImage: string;
  mineralImageCaption: LocalizedText;
  applicationImage: string;
  applicationImageCaption: LocalizedText;
  theme: ElementTheme;

  // 1. General Info
  general: {
    discoveryHistory: LocalizedText;
    discoverer: LocalizedText;
    discoveryYear: string;
    nameOrigin: LocalizedText;
  };

  // 2. Atomic Structure
  atomicStructure: {
    isotopeName: string;
    protons: number;
    neutrons: number;
    electrons: number;
    nuclearCharge: string;
    electronConfiguration: string;
    shells: number[];
    energyLevels: number;
    valenceShellElectrons: number;
    atomicRadiusPm: number;
    electronegativityPauling: number;
  };

  // 3. Physical Properties
  physical: {
    stateAtSTP: LocalizedText;
    color: LocalizedText;
    densityGcm3: number;
    densityDisplay: LocalizedText;
    meltingPointC: number;
    meltingPointDisplay: string;
    boilingPointC: number;
    boilingPointDisplay: string;
    hardnessMohs: string;
    electricalConductivity: LocalizedText;
    thermalConductivity: LocalizedText;
    crystalStructure: LocalizedText;
    specialFeatures: LocalizedText;
  };

  // 4. Chemical Properties
  chemical: {
    oxidationStates: string;
    reactivity: LocalizedText;
    withOxygen: LocalizedText;
    withWater: LocalizedText;
    withAcids: LocalizedText;
    withOtherElements: LocalizedText;
    characteristicCompounds: LocalizedList;
  };

  // 5. Reactions
  reactions: ChemicalReaction[];

  // 6. Natural Occurrence
  nature: {
    minerals: LocalizedList;
    ores: LocalizedText;
    naturalSources: LocalizedText;
    abundance: LocalizedText;
    industrialExtraction: LocalizedText;
  };

  // 7. Applications
  applications: ApplicationDomain[];

  // 8. Human & Environmental Impact
  impact: {
    toxicityLevel: LocalizedText;
    biologicalEffect: LocalizedText;
    ecologicalConsequences: LocalizedText;
    pollutionSources: LocalizedText;
    safetyMeasures: LocalizedText;
  };

  // 9. History Timeline
  timeline: TimelineMilestone[];

  // Special Element-Specific Deep-Dive Topics
  specialTopics: SpecialTopic[];

  // 10. Interesting Facts (8-10)
  facts: LocalizedList;

  // 11. Mini-Test (8-10)
  quiz: QuizQuestion[];

  // Scientific Sources
  sources: ScientificSource[];
}

export interface LearningProgressState {
  visitedElements: ElementId[];
  quizScores: Partial<Record<ElementId, { score: number; total: number }>>;
  challengeBestScore: number;
}
