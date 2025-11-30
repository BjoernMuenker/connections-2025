import type { PuzzleConfig } from '~/types/PuzzleConfig';
const isDev = process.env.NODE_ENV === 'development';

export const puzzles: { [key: string]: PuzzleConfig } = {
  '1': {
    id: '1',
    unlocksAt: isDev ? new Date('2025-11-01T00:00:00').getTime() : new Date('2025-12-01T00:00:00').getTime(),
    groups: [
      { caption: 'Nicht unbedenklich', items: ['Heikel', 'Riskant', 'Delikat', 'Wacklig'] },
      { caption: 'Olympia-Disziplinen 2026', items: ['Bob', 'Golf', 'Boxen', 'Reiten'] },
      { caption: 'Bestandteile eines Schneemanns', items: ['Topf', 'Möhre', 'Schal', 'Schnee'] },
      { caption: 'Buchstaben-Homophone', items: ['Zeh', 'Tee', 'Er', 'Es'] },
    ],
  },
  '2': {
    id: '2',
    unlocksAt: isDev ? new Date('2025-11-02T00:00:00').getTime() : new Date('2025-12-02T00:00:00').getTime(),
    groups: [
      { caption: 'Hollywood-Blockbuster', items: ['Avatar', 'Titanic', 'Barbie', 'Minions'] },
      { caption: 'Typische Endungen von Straßennamen', items: ['Platz', 'Allee', 'Weg', 'Straße'] },
      { caption: 'Absperrungen', items: ['Zaun', 'Kette', 'Mauer', 'Gitter'] },
      { caption: 'Autovermieter mit einem fehlenden Buchstaben', items: ['Herz', 'Six', 'Vis', 'Mies'] },
    ],
  },
  '3': {
    id: '3',
    unlocksAt: isDev ? new Date('2025-11-03T00:00:00').getTime() : new Date('2025-12-03T00:00:00').getTime(),
    groups: [
      { caption: 'Ehemalige deutsche Längenmaße', items: ['Zoll', 'Rute', 'Elle', 'Fuß'] },
      { caption: 'Fellfarben von Pferden', items: ['Fuchs', 'Schimmel', 'Brauner', 'Rappe'] },
      { caption: 'Kegelförmige Dinge', items: ['Vulkan', 'Partyhut', 'Tipi', 'Megafon'] },
      { caption: 'Zahn___', items: ['Seide', 'Fee', 'Rad', 'Stein'] },
    ],
  },
  '4': {
    id: '4',
    unlocksAt: isDev ? new Date('2025-11-04T00:00:00').getTime() : new Date('2025-12-04T00:00:00').getTime(),
    groups: [
      { caption: 'Deutsche Zeitschriften', items: ['Freundin', 'Geo', 'Chip', 'Gala'] },
      { caption: 'Diäten', items: ['Glyx', 'Paleo', 'Dash', 'Keto'] },
      { caption: 'Nagel___', items: ['Lack', 'Neu', 'Brett', 'Hai'] },
      { caption: 'Kann "stechen"', items: ['Mücke', 'Kaktus', 'Sonne', 'Trumpf'] },
    ],
  },
  '5': {
    id: '5',
    unlocksAt: isDev ? new Date('2025-11-05T00:00:00').getTime() : new Date('2025-12-05T00:00:00').getTime(),
    groups: [
      { caption: 'Mahlzeit', items: ['Schmaus', 'Essen', 'Speise', 'Kost'] },
      { caption: 'Bestandteiles eines Schiffs', items: ['Heck', 'Kiel', 'Bug', 'Deck'] },
      { caption: 'Paarweise vorhanden', items: ['Niere', 'Ohrring', 'Ski', 'Socke'] },
      { caption: 'Städte mit einem vertauschten Buchstaben', items: ['Genau', 'Wein', 'Keil', 'Solo'] },
    ],
  },
  '6': {
    id: '6',
    unlocksAt: isDev ? new Date('2025-11-06T00:00:00').getTime() : new Date('2025-12-06T00:00:00').getTime(),
    groups: [
      { caption: 'Groß', items: ['Riesig', 'Mega', 'Gewaltig', 'Enorm'] },
      { caption: 'Antike Waffen', items: ['Katana', 'Speer', 'Schwert', 'Bogen'] },
      { caption: 'Himmelserscheinungen', items: ['Meteor', 'Komet', 'Neumond', 'Blitz'] },
      { caption: 'Stroh___', items: ['Doof', 'Mann', 'Halm', 'Blond'] },
    ],
  },
  '7': {
    id: '7',
    unlocksAt: isDev ? new Date('2025-11-07T00:00:00').getTime() : new Date('2025-12-07T00:00:00').getTime(),
    groups: [
      { caption: 'Maltechniken', items: ['Fresko', 'Aquarell', 'Airbrush', 'Öl'] },
      { caption: 'Werk', items: ['Opus', 'Arbeit', 'Kreation', 'Produkt'] },
      { caption: 'Legierungen', items: ['Bronze', 'Messing', 'Stahl', 'Weißgold'] },
      { caption: 'Abwehrmittel gegen Vampire', items: ['Knoblauch', 'Kreuz', 'Sonne', 'Pflock'] },
    ],
  },
  '8': {
    id: '8',
    unlocksAt: isDev ? new Date('2025-11-08T00:00:00').getTime() : new Date('2025-12-08T00:00:00').getTime(),
    groups: [
      { caption: 'Nobelpreis-Kategorien', items: ['Frieden', 'Literatur', 'Physik', 'Medizin'] },
      { caption: 'Kryptowährungen', items: ['Tether', 'Bitcoin', 'Ethereum', 'Ripple'] },
      { caption: 'Nominierte Jugendwörter 2025', items: ['Lowkey', 'Tuff', 'Tot', 'Rede'] },
      { caption: 'Erdzeitalter', items: ['Karbon', 'Tertiär', 'Jura', 'Kreide'] },
    ],
  },
  '9': {
    id: '9',
    unlocksAt: isDev ? new Date('2025-11-09T00:00:00').getTime() : new Date('2025-12-09T00:00:00').getTime(),
    groups: [
      { caption: 'Betrunken', items: ['Voll', 'Blau', 'Hacke', 'Dicht'] },
      { caption: 'Bestandteile eines Dreiecks', items: ['Ecke', 'Schenkel', 'Winkel', 'Seite'] },
      { caption: 'Kartoffel-Erzeugnisse', items: ['Wodka', 'Stärke', 'Stempel', 'Pommes'] },
      { caption: 'Symbole auf Telefon-Tasten', items: ['Stern', 'Raute', 'Plus', 'Hörer'] },
    ],
  },
  '10': {
    id: '10',
    unlocksAt: isDev ? new Date('2025-11-10T00:00:00').getTime() : new Date('2025-12-10T00:00:00').getTime(),
    groups: [
      { caption: 'Fortbewegungsmittel', items: ['ICE', 'TGV', 'PKW', 'SUV'] },
      { caption: 'Deutsche Privatsender', items: ['RTL', 'HSE', 'NTV', 'VOX'] },
      { caption: 'ISO-Ländercodes', items: ['DEU', 'JPN', 'ITA', 'USA'] },
      { caption: 'Auslandsgeheimdienste', items: ['SWR', 'NSA', 'MI6', 'BND'] },
    ],
  },
  '11': {
    id: '11',
    unlocksAt: isDev ? new Date('2025-11-11T00:00:00').getTime() : new Date('2025-12-11T00:00:00').getTime(),
    groups: [
      { caption: 'Hülle', items: ['Schale', 'Pelle', 'Gehäuse', 'Mantel'] },
      { caption: 'Wichtige Erfindungen', items: ['Rad', 'Buchdruck', 'Impfung', 'Auto'] },
      { caption: 'Titelgebende Opern-Protagonistinnen', items: ['Carmen', 'Aida', 'Norma', 'Tosca'] },
      { caption: '12 Stück', items: ['Monate', 'Halbtöne', 'Dutzend', 'Apostel'] },
    ],
  },
  '12': {
    id: '12',
    unlocksAt: isDev ? new Date('2025-11-12T00:00:00').getTime() : new Date('2025-12-12T00:00:00').getTime(),
    groups: [
      { caption: 'Mythologische Fabelwesen', items: ['Hydra', 'Drache', 'Sirene', 'Zyklop'] },
      { caption: 'Notizbuch-Lineaturen', items: ['Blanko', 'Kästchen', 'Linien', 'Punkte'] },
      { caption: 'Arten von Uhren', items: ['Sand', 'Sonne', 'Atom', 'Stern'] },
      { caption: 'Berühmte Skulpturen', items: ['David', 'Venus', 'Nofretete', 'Denker'] },
    ],
  },
  '13': {
    id: '13',
    unlocksAt: isDev ? new Date('2025-11-13T00:00:00').getTime() : new Date('2025-12-13T00:00:00').getTime(),
    groups: [
      { caption: 'Ausrufe des Erstaunens', items: ['Ah', 'Oh', 'Ui', 'Uh'] },
      { caption: 'Zustimmung', items: ['Ja', 'Ok', 'Jo', 'Si'] },
      { caption: 'Tonsilben', items: ['Do', 'Re', 'Mi', 'Fa'] },
      { caption: 'Temporale Präpositionen', items: ['Ab', 'In', 'Um', 'An'] },
    ],
  },
  '14': {
    id: '14',
    unlocksAt: isDev ? new Date('2025-11-14T00:00:00').getTime() : new Date('2025-12-14T00:00:00').getTime(),
    groups: [
      { caption: 'Weihnachtsbaumschmuck', items: ['Kugel', 'Stern', 'Lametta', 'Kerze'] },
      { caption: 'KI-Tools', items: ['Claude', 'Gemini', 'Copilot', 'ChatGPT'] },
      { caption: 'Todsünden', items: ['Hochmut', 'Geiz', 'Zorn', 'Neid'] },
      { caption: 'Jupiter-Monde', items: ['Io', 'Europa', 'Ganymed', 'Kallisto'] },
    ],
  },
  '15': {
    id: '15',
    unlocksAt: isDev ? new Date('2025-11-15T00:00:00').getTime() : new Date('2025-12-15T00:00:00').getTime(),
    groups: [
      { caption: 'Stille Gewässer', items: ['Teich', 'Pfütze', 'Weiher', 'Tümpel'] },
      { caption: 'Waschmaschinen-Programme', items: ['Wolle', 'Fein', 'Eco', 'Bunt'] },
      { caption: 'Diagramm-Arten', items: ['Säule', 'Linie', 'Balken', 'Kreis'] },
      { caption: 'Beläge', items: ['Moos', 'Käse', 'Plaque', 'Asphalt'] },
    ],
  },
  '16': {
    id: '16',
    unlocksAt: isDev ? new Date('2025-11-16T00:00:00').getTime() : new Date('2025-12-16T00:00:00').getTime(),
    groups: [
      { caption: 'Dips', items: ['Aioli', 'Salsa', 'Mojo', 'Hummus'] },
      { caption: 'Vorschrift', items: ['Codex', 'Gesetz', 'Erlass', 'Gebot'] },
      { caption: 'Messinstrumente', items: ['Uhr', 'Waage', 'Kompass', 'Lineal'] },
      { caption: 'Versteckte Farben', items: ['Bügelbrett', 'Gründer', 'Ablauf', 'Violetta'] },
    ],
  },
  '17': {
    id: '17',
    unlocksAt: isDev ? new Date('2025-11-17T00:00:00').getTime() : new Date('2025-12-17T00:00:00').getTime(),
    groups: [
      { caption: 'Kopfbedeckungen', items: ['Krone', 'Mütze', 'Toupet', 'Hut'] },
      { caption: 'Schachfiguren', items: ['Dame', 'Läufer', 'König', 'Turm'] },
      { caption: 'Wasser-Kanäle', items: ['Suez', 'Panama', 'Ärmel', 'Kaiser'] },
      { caption: 'Ehemalige Bundespräsidenten', items: ['Heuss', 'Scheel', 'Herzog', 'Rau'] },
    ],
  },
  '18': {
    id: '18',
    unlocksAt: isDev ? new Date('2025-11-18T00:00:00').getTime() : new Date('2025-12-18T00:00:00').getTime(),
    groups: [
      { caption: 'Gliederungselemente von Gesetzen', items: ['Paragraph', 'Artikel', 'Absatz', 'Präambel'] },
      { caption: 'Tierkreiszeichen', items: ['Schütze', 'Waage', 'Fische', 'Krebs'] },
      { caption: 'Nussarten im Studentenfutter', items: ['Hasel', 'Para', 'Cashew', 'Wal'] },
      { caption: 'Worte mit 4 aufeinander folgenden Vokalen', items: ['Queue', 'Sequoia', 'Seeaal', 'Louie'] },
    ],
  },
  '19': {
    id: '19',
    unlocksAt: isDev ? new Date('2025-11-19T00:00:00').getTime() : new Date('2025-12-19T00:00:00').getTime(),
    groups: [
      { caption: 'Zweierpotenzen', items: ['32', '64', '256', '1024'] },
      { caption: 'Palindrome', items: ['11', '33', '2002', '9119'] },
      { caption: 'Quersumme 7', items: ['25', '52', '61', '70'] },
      { caption: 'Worte, wenn um 180° gedreht', items: ['8739', '07734', '7353', '38317'] },
    ],
    font: 'DSEG',
  },
  '20': {
    id: '20',
    unlocksAt: isDev ? new Date('2025-11-20T00:00:00').getTime() : new Date('2025-12-20T00:00:00').getTime(),
    groups: [
      { caption: 'Einstieg', items: ['Intro', 'Prolog', 'Auftakt', 'Ouvertüre'] },
      { caption: 'Füllwörter', items: ['Halt', 'Also', 'Eben', 'Ja'] },
      { caption: '___Säure', items: ['Ameisen', 'Salz', 'Fluss', 'Essig'] },
      { caption: 'Dinge, die man sinnbildlich bricht', items: ['Rekord', 'Stille', 'Lanze', 'Wort'] },
    ],
  },
  '21': {
    id: '21',
    unlocksAt: isDev ? new Date('2025-11-21T00:00:00').getTime() : new Date('2025-12-21T00:00:00').getTime(),
    groups: [
      { caption: 'Die Bremer Stadtmusikanten', items: ['🫏', '🐔', '🐈', '🐶'] },
      { caption: 'Rotkäppchen', items: ['🔴', '🧢', '👧', '🐺'] },
      { caption: 'Hänsel und Gretel', items: ['👫', '🏡', '🧙‍♀️', '🔥'] },
      { caption: 'Dornröschen', items: ['👸', '🌹', '🪡', '💤'] },
    ],
  },
  '22': {
    id: '22',
    unlocksAt: isDev ? new Date('2025-11-22T00:00:00').getTime() : new Date('2025-12-22T00:00:00').getTime(),
    groups: [
      { caption: 'Naturkatastrophen', items: ['Dürre', 'Erdbeben', 'Sturm', 'Lawine'] },
      { caption: '"Notrufe"', items: ['112', 'SOS', 'Mayday', 'Hilfe!'] },
      { caption: 'Themen von Verschwörungstheorien', items: ['9/11', 'Area 51', 'Chemtrails', 'Corona'] },
      { caption: '___Geist', items: ['Zeit', 'Frei', 'Team', 'Polter'] },
    ],
  },
  '23': {
    id: '23',
    unlocksAt: isDev ? new Date('2025-11-23T00:00:00').getTime() : new Date('2025-12-23T00:00:00').getTime(),
    groups: [
      { caption: 'Währungszeichen', items: ['£', '¥', '$', '€'] },
      { caption: 'Satzzeichen', items: [':', '.', ';', '!'] },
      { caption: 'Vergleichszeichen', items: ['<', '≥', '≈', '='] },
      { caption: 'Griechische Großbuchstaben', items: ['Ψ', 'Λ', 'Γ', 'Κ'] },
    ],
  },
  '24': {
    id: '24',
    unlocksAt: isDev ? new Date('2025-11-24T00:00:00').getTime() : new Date('2025-12-24T00:00:00').getTime(),
    groups: [
      { caption: 'Weihnachtsbaumarten', items: ['Fichte', 'Tanne', 'Douglasie', 'Kiefer'] },
      { caption: 'Prost!', items: ['Wohlsein', 'Cheers', 'Skål', 'Salud'] },
      { caption: '"Stille Nacht, heilige Nacht"', items: ['Stille', 'Nacht', 'Heilige', 'Nacht'] },
      { caption: '___Kuchen', items: ['Marmor', 'Baum', 'Käse', 'Puste'] },
    ],
  },
};
