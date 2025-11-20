import type { PuzzleConfig } from '~/types/PuzzleConfig';

export const puzzles: { [key: string]: PuzzleConfig } = {
  '1': {
    id: '1',
    unlocksAt: new Date('2025-11-01T00:00:00').getTime(),
    groups: [
      { caption: 'Kopfbedeckungen', items: ['Krone', 'Mütze', 'Toupet', 'Hut'] },
      { caption: 'Schachfiguren', items: ['Dame', 'Läufer', 'König', 'Springer'] },
      { caption: 'Bekannte Kanäle', items: ['Suez', 'Panama', 'Ärmel', 'Kaiser'] },
      { caption: 'Ehemalige Bundespräsidenten', items: ['Heuss', 'Scheel', 'Herzog', 'Rau'] },
    ],
  },
  '2': {
    id: '2',
    unlocksAt: new Date('2025-11-02T00:00:00').getTime(),
    groups: [
      { caption: 'Nicht unbedenklich', items: ['Heikel', 'Riskant', 'Delikat', 'Wacklig'] },
      { caption: 'Olympia-Disziplinen 2026', items: ['Bob', 'Golf', 'Boxen', 'Wasserball'] },
      { caption: 'Buchstaben-Homophone', items: ['Zeh', 'Tee', 'Er', 'Es'] },
      { caption: 'Buch-Bestandteile', items: ['Rücken', 'Deckel', 'Vorsatz', 'Blatt'] },
    ],
  },
  '3': {
    id: '3',
    unlocksAt: new Date('2025-11-03T00:00:00').getTime(),
    groups: [
      { caption: 'Betrunken', items: ['Voll', 'Blau', 'Hacke', 'Dicht'] },
      { caption: 'Kartoffel-Erzeugnisse', items: ['Vodka', 'Stärke', 'Stempel', 'Pommes'] },
      { caption: 'Berühmte Theorien', items: ['String', 'Relativität', 'Evolution', 'Multiversum'] },
      { caption: 'Typische Symbole auf Festnetztelefonen', items: ['Sternchen', 'Raute', 'Glocke', 'Hörer'] },
    ],
  },
  '4': {
    id: '4',
    unlocksAt: new Date('2025-11-04T00:00:00').getTime(),
    groups: [
      { caption: 'Mahlzeit', items: ['Schmaus', 'Essen', 'Speise', 'Kost'] },
      { caption: 'Deutsche Millionenstädte', items: ['Köln', 'Hamburg', 'München', 'Berlin'] },
      { caption: 'Bestandteiles eines Schiffs', items: ['Heck', 'Kiel', 'Bug', 'Deck'] },
      { caption: '"4x4"', items: ['Allradantrieb', 'Ritter Sport Tafel', 'Dieses Spielfeld', 'Sechszehn'] },
    ],
  },
  '5': {
    id: '5',
    unlocksAt: new Date('2025-11-05T00:00:00').getTime(),
    groups: [
      { caption: 'Folien', items: ['Alu', 'Maler', 'Klarsicht', 'Luftpolster'] },
      { caption: 'Nagel___', items: ['Lack', 'Neu', 'Brett', 'Schere'] },
      { caption: 'Paarweise vorhanden', items: ['Niere', 'Ohrring', 'Ski', 'Socke'] },
      { caption: 'Kann "stechen"', items: ['Mücke', 'Kaktus', 'Sonne', 'Trumpf'] },
    ],
  },
  '6': {
    id: '6',
    unlocksAt: new Date('2025-11-06T00:00:00').getTime(),
    groups: [
      { caption: 'Groß', items: ['Riesig', 'Mega', 'Gewaltig', 'Enorm'] },
      { caption: 'Antike Waffen', items: ['Katana', 'Speer', 'Schwert', 'Morgenstern'] },
      { caption: 'Himmelserscheinungen', items: ['Meteor', 'Komet', 'Neumond', 'Polarlicht'] },
      { caption: 'Stroh___', items: ['Doof', 'Mann', 'Halm', 'Blond'] },
    ],
  },
  '7': {
    id: '7',
    unlocksAt: new Date('2025-11-07T00:00:00').getTime(),
    groups: [
      { caption: 'Maltechniken', items: ['Fresko', 'Aquarell', 'Airbrush', 'Öl'] },
      { caption: 'Legierungen', items: ['Bronze', 'Messing', 'Stahl', 'Weißgold'] },
      { caption: 'Abwehrmittel gegen Vampire', items: ['Knoblauch', 'Kreuz', 'Sonne', 'Pflock'] },
      { caption: '___Säure', items: ['Ameisen', 'Salz', 'Fluss', 'Essig'] },
    ],
  },
  '8': {
    id: '8',
    unlocksAt: new Date('2025-11-08T00:00:00').getTime(),
    groups: [
      { caption: 'Nobelpreis-Disziplinen', items: ['Frieden', 'Literatur', 'Physik', 'Medizin'] },
      { caption: 'Kryptowährungen', items: ['Tether', 'Bitcoin', 'Ethereum', 'Ripple'] },
      { caption: 'Nominierte Jugendwörter 2025', items: ['Lowkey', 'Goonen', 'Tot', 'Rede'] },
      { caption: 'Jupiter-Monde', items: ['Ganymed', 'Callisto', 'Europa', 'Kallisto'] },
    ],
  },
  '9': {
    id: '9',
    unlocksAt: new Date('2025-11-09T00:00:00').getTime(),
    groups: [
      { caption: 'Ehemalige deutsche Längenmaße', items: ['Zoll', 'Rute', 'Elle', 'Fuß'] },
      { caption: 'Fellfarben von Pferden', items: ['Fuchs', 'Schimmel', 'Brauner', 'Rappe'] },
      { caption: 'Kegelförmige Dinge', items: ['Vulkan', 'Partyhut', 'Tipi', 'Megafon'] },
      { caption: 'Zahn___', items: ['Seide', 'Fee', 'Rad', 'Stein'] },
    ],
  },
  '10': {
    id: '10',
    unlocksAt: new Date('2025-11-10T00:00:00').getTime(),
    groups: [
      { caption: 'Häufige Themen von Verschwörungstheorien', items: ['9/11', 'Mondlandung', 'Erdkrümmung', 'Corona'] },
      { caption: 'Mythologische Fabelwesen', items: ['Hydra', 'Drache', 'Sirene', 'Zyklop'] },
      { caption: 'Deutsche Magazine', items: ['Spiegel', 'Stern', 'Focus', 'Gala'] },
      { caption: 'Beläge', items: ['Moos', 'Zahn', 'Teppich', 'Asphalt'] },
    ],
  },
  '11': {
    id: '11',
    unlocksAt: new Date('2025-11-11T00:00:00').getTime(),
    groups: [
      { caption: 'Wichtige Erfindungen', items: ['Rad', 'Buchdruck', 'Impfung', 'Elektrizität'] },
      { caption: 'Hülle', items: ['Schale', 'Panzer', 'Gehäuse', 'Mantel'] },
      { caption: 'Arten von Uhren', items: ['Sand', 'Sonne', 'Atom', 'Stopp'] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '12': {
    id: '12',
    unlocksAt: new Date('2025-11-12T00:00:00').getTime(),
    groups: [
      { caption: 'Leuchtet im Dunkeln', items: ['Mond', 'Laterne', 'Phosphor', 'Glühwürmchen'] },
      { caption: '', items: ['', '', '', ''] },
      { caption: 'Messinstrumente', items: ['Uhr', 'Waage', 'Kompass', 'Lineal'] },
      { caption: 'Opern-Protagonistinnen', items: ['Carmen', 'Aida', 'Violetta', 'Isolde'] },
    ],
  },
  '13': {
    id: '13',
    unlocksAt: new Date('2025-11-13T00:00:00').getTime(),
    groups: [
      { caption: 'Saucen', items: ['Béchamel', 'Soja', 'Cocktail', 'Tabasco'] },
      { caption: 'Vorschrift', items: ['Codex', 'Gesetz', 'Erlass', 'Gebot'] },
      { caption: 'Ohne Anfang und Ende', items: ['Gerade', 'Kreis', 'Ewigkeit', 'Schleife'] },
      { caption: 'Violett', items: ['Milkakuh', 'Veilchen', 'Aubergine', 'Amethyst'] },
    ],
  },
  '14': {
    id: '14',
    unlocksAt: new Date('2025-11-14T00:00:00').getTime(),
    groups: [
      { caption: 'Weihnachtsbaumschmuck', items: ['Kugel', 'Stern', 'Lametta', 'Kerze'] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '15': {
    id: '15',
    unlocksAt: new Date('2025-11-15T00:00:00').getTime(),
    groups: [
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: 'Berühmte Skulpturen', items: ['David', 'Venus', 'Nofretete', 'Denker'] },
    ],
  },
  '16': {
    id: '16',
    unlocksAt: new Date('2025-11-16T00:00:00').getTime(),
    groups: [
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '17': {
    id: '17',
    unlocksAt: new Date('2025-11-17T00:00:00').getTime(),
    groups: [
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '18': {
    id: '18',
    unlocksAt: new Date('2025-11-18T00:00:00').getTime(),
    groups: [
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '19': {
    id: '19',
    unlocksAt: new Date('2025-11-19T00:00:00').getTime(),
    groups: [
      { caption: 'Notruf-Nummern', items: ['911', '112', '110', '117'] },
      { caption: 'Deutsche Autobahnnummern', items: ['7', '23', '', ''] }, // viel zu viele...
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '20': {
    id: '20',
    unlocksAt: new Date('2025-11-20T00:00:00').getTime(),
    groups: [
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
  '21': {
    id: '21',
    unlocksAt: new Date('2025-10-21T00:00:00').getTime(),
    groups: [
      { caption: 'Die Bremer Stadtmusikanten', items: ['🫏', '🐔', '🐈', '🐶'] },
      { caption: 'Rotkäppchen', items: ['🔴', '👧', '👵', '🐺'] },
      { caption: 'Hänsel und Gretel', items: ['👫', '🌳', '🧙‍♀️', '🔥'] },
      { caption: 'Dornröschen', items: ['👸', '🌹', '🪡', '💤'] },
    ],
  },
  '22': {
    id: '22',
    unlocksAt: new Date('2025-11-22T00:00:00').getTime(),
    groups: [
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '___Jahr', items: ['Vor', 'Bau', 'Früh', 'Neu'] }, // Fest? // gefährlich, weil SEHR viele Optionen
    ],
  },
  '23': {
    id: '23',
    unlocksAt: new Date('2025-10-23T00:00:00').getTime(),
    groups: [
      { caption: 'Währungszeichen', items: ['£', '¥', '$', '€'] },
      { caption: 'Satzzeichen', items: [':', '.', ';', '!'] },
      { caption: 'Vergleichszeichen', items: ['<', '≥', '≈', '='] },
      { caption: 'Griechische Großbuchstaben', items: ['Ψ', 'Λ', 'Γ', 'Κ'] },
    ],
  },
  '24': {
    id: '24',
    unlocksAt: new Date('2025-11-24T00:00:00').getTime(),
    groups: [
      { caption: 'Prost!', items: ['Wohlsein', 'Cheers', 'Skal', 'Cin cin'] },
      { caption: 'Typische Weihnachtsbaumarten', items: ['Fichte', 'Tanne', 'Douglasie', 'Kiefer'] },
      { caption: '', items: ['', '', '', ''] },
      { caption: '', items: ['', '', '', ''] },
    ],
  },
};
