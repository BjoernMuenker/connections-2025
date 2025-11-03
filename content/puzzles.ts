import type { PuzzleConfig } from '~/types/PuzzleConfig';

export const puzzles: { [key: string]: PuzzleConfig } = {
  '1': {
    id: '1',
    groups: [
      { caption: 'Funktionen in Mail-Programmen', items: ['Senden', 'Antworten', 'Löschen', 'Öffnen'] },
      { caption: 'Regionale Brötchen-Bezeichnungen', items: ['Weckle', 'Semmel', 'Schrippe', 'Rundstück'] },
      { caption: '"Auf Rädern"', items: ['Laster', 'Essen', 'Zug', 'Fahrrad'] },
      { caption: 'Deutsche Komponisten', items: ['Bach', 'Strauss', 'Zimmer', 'Bruch'] },
    ],
  },
  '2': {
    id: '2',
    groups: [
      { caption: 'Kaffee-Zubereitungen', items: ['Pharisäer', 'Einspänner', 'Lungo', 'Affogato'] },
      { caption: 'Bodenbeläge', items: ['Laminat', 'Kork', 'Teppich', 'Beton'] },
      { caption: 'Kreisförmig', items: ['Ring', 'Bullauge', 'Knopf', 'Rad'] },
      { caption: '___Bar', items: ['Wunder', 'Dank', 'Bar', 'Mach'] },
    ],
  },
  '3': {
    id: '3',
    groups: [
      { caption: 'Bowling-Begriffe', items: ['Split', 'Strike', 'Pin', 'Frame'] },
      { caption: 'Geld', items: ['Steine', 'Moos', 'Zaster', 'Bims'] },
      { caption: 'Dinge, die man "aufmachen" kann', items: ['Fenster', 'Brief', 'Fass', 'Mund'] },
      { caption: '___Fisch', items: ['Doktor', 'Clown', 'Blind', 'Stock'] },
    ],
  },
  '4': {
    id: '4',
    groups: [
      { caption: 'Himmelsrichtungen-Merkspruch', items: ['Nie', 'Ohne', 'Seife', 'Waschen'] },
      { caption: 'Duftkonzentrationen', items: ['Fraîche', 'Cologne', 'Toilette', 'Parfum'] },
      { caption: 'IKEA-Produkte mit kuriosen Namen', items: ['Viren', 'Kagge', 'Slut', 'Gutvik'] },
      { caption: 'Zigarren-Formate', items: ['Corona', 'Churchill', 'Magnum', 'Toro'] },
    ],
  },
  '5': {
    id: '5',
    groups: [
      { caption: 'Kölner Stadtbezirke', items: ['Kalk', 'Porz', 'Ehrenfeld', 'Nippes'] },
      { caption: 'Trinkgefäße', items: ['Horn', 'Tasse', 'Glas', 'Kelch'] },
      { caption: 'Monopoly-Felder', items: ['Wasserwerk', 'Südbahnhof', 'Gefängnis', 'Start'] },
      { caption: 'Brücken in Köln', items: ['Süd', 'Zoo', 'Deutzer', 'Hohenzollern'] },
    ],
  },
  '6': {
    id: '6',
    groups: [
      { caption: 'Gottesdienst-Bestandteile', items: ['Gesang', 'Predigt', 'Gebet', 'Abendmahl'] },
      { caption: 'Sitzplätze im Theater', items: ['Rang', 'Parkett', 'Loge', 'Balkon'] },
      { caption: 'Tanzfiguren', items: ['Promenade', 'Aida', 'Karussell', 'Brezel'] },
      { caption: 'Grünen-Abgeordnete', items: ['Fester', 'Dröge', 'Lang', 'Kopf'] },
    ],
  },
  '7': {
    id: '7',
    groups: [
      { caption: 'E-Roller-Anbieter', items: ['Tier', 'Volt', 'Bolt', 'Lime'] },
      { caption: 'Marken der Volkswagen AG', items: ['Audi', 'Seat', 'Bentley', 'Porsche'] },
      { caption: 'Amazonas-Tiere', items: ['Jaguar', 'Kaiman', 'Tukan', 'Boa'] },
      { caption: 'Symbole auf MacBook-Funktionstasten', items: ['Lupe', 'Sonne', 'Lautsprecher', 'Mond'] },
    ],
  },
  '8': {
    id: '8',
    groups: [
      { caption: 'Discounter', items: ['Netto', 'Penny', 'Aldi', 'Lidl'] },
      { caption: '___sexuell', items: ['Pan', 'Andro', 'Bi', 'Metro'] },
      { caption: 'Gefahrenzeichen im Straßenverkehr', items: ['Ufer', 'Stau', 'Reiter', 'Kinder'] },
      { caption: 'Typische Rechtschreibfehler', items: ['Jakett', 'Billiard', 'Gallerie', 'Entgeld'] },
    ],
  },
  '9': {
    id: '9',
    groups: [
      { caption: 'Zwischenraum', items: ['Ritze', 'Spalt', 'Fuge', 'Schlitz'] },
      { caption: 'ABBA-Songs', items: ['Fernando', 'Chiquitita', 'Tiger', 'SOS'] },
      { caption: 'Bereiche der Slack-App', items: ['Home', 'Leute', 'Aktivität', 'Später'] },
      { caption: 'Tinten___', items: ['Herz', 'Killer', 'Fisch', 'Fleck'] },
    ],
  },
  '10': {
    id: '10',
    groups: [
      { caption: 'Unternehmen', items: ['SAP', 'BMW', 'IBM', 'DHL'] },
      { caption: 'Bild-Dateiformate', items: ['JPG', 'GIF', 'PNG', 'BMP'] },
      { caption: 'Chat-Slang', items: ['IMO', 'AFK', 'LOL', 'BRB'] },
      { caption: 'Deutsche Parteien', items: ['ÖDP', 'SSW', 'BSW', 'PDF'] },
    ],
  },
  '11': {
    id: '11',
    groups: [
      { caption: 'Vierecke', items: ['Raute', 'Trapez', 'Quadrat', 'Rechteck'] },
      { caption: 'Währungen', items: ['Rand', 'Pfund', 'Real', 'Krone'] },
      { caption: '___Wort', items: ['Ja', 'Vor', 'Code', 'Fach'] },
      { caption: '"False Friends"', items: ['Beamer', 'Chef', 'Billion', 'Kind'] },
    ],
  },
  '12': {
    id: '12',
    groups: [
      { caption: 'Nominierte Jugendwörter 2024', items: ['Schere', 'Yurr', 'Talahon', 'Aura'] },
      { caption: 'Cola-Marken', items: ['Nuka', 'Fritz', 'Afri', 'Pepsi'] },
      { caption: 'Marktphasen an der Börse', items: ['Bulle', 'Bär', 'Korrektur', 'Crash'] },
      { caption: 'Anagramme', items: ['Reisen', 'Sirene', 'Riesen', 'Serien'] },
    ],
  },
  '13': {
    id: '13',
    groups: [
      { caption: 'Näh-Utensilien', items: ['Nadel', 'Garn', 'Lineal', 'Stoff'] },
      { caption: 'Tools in Grafikprogrammen', items: ['Auswahl', 'Pipette', 'Text', 'Pinsel'] },
      { caption: 'Content-Tags für "Struggly"-Tasks', items: ['Addition', 'Volume', 'Money', 'Dice'] },
      { caption: 'Wörter, die sich auf Zahlen reimen', items: ['Brei', 'Stier', 'Pacht', 'Moin'] },
    ],
  },
  '14': {
    id: '14',
    groups: [
      { caption: 'Milch-Arten', items: ['Hafer', 'Kuh', 'Mandel', 'Soja'] },
      { caption: 'Frisuren', items: ['Bob', 'Pixie', 'Afro', 'Mohawk'] },
      { caption: 'Akronyme', items: ['Elster', 'Laser', 'Nato', 'Erasmus'] },
      { caption: 'Tier-Protagonisten bei Pixar', items: ['Ameise', 'Fisch', 'Ratte', 'Dino'] },
    ],
  },
  '15': {
    id: '15',
    groups: [
      { caption: 'Spielkarten', items: ['Bube', 'Dame', 'König', 'Ass'] },
      { caption: 'Halloween-Kostüme', items: ['Hexe', 'Geist', 'Zombie', 'Vampir'] },
      { caption: 'Sternbilder', items: ['Adler', 'Zentaur', 'Zwillinge', 'Einhorn'] },
      { caption: 'Nomen, die auch Imperative sind', items: ['Streich', 'Fluch', 'Lauf', 'Spiel'] },
    ],
  },
  '16': {
    id: '16',
    groups: [
      { caption: 'Brauntöne', items: ['Umbra', 'Ocker', 'Beige', 'Cognac'] },
      { caption: 'Kleine Menge', items: ['Prise', 'Idee', 'Spur', 'My'] },
      { caption: 'Berühmte Gemälde ohne Artikel', items: ['Nachtwache', 'Kuss', 'Traum', 'Schrei'] },
      { caption: 'Bücher___', items: ['Ei', 'Wurm', 'Regal', 'Skorpion'] },
    ],
  },
  '17': {
    id: '17',
    groups: [
      { caption: 'Denkwerk-Standorte', items: ['Köln', 'Berlin', 'Hamburg', 'München'] },
      { caption: 'US-Bundesstaaten', items: ['Kalifornien', 'Hawaii', 'Alaska', 'Florida'] },
      { caption: 'Gruppe A bei Fußball-EM 2024', items: ['Schottland', 'Ungarn', 'Schweiz', 'Deutschland'] },
      { caption: 'Namen von Apple-Betriebssystemen', items: ['Mojave', 'Yosemite', 'Sonoma', 'Sequoia'] },
    ],
  },
  '18': {
    id: '18',
    groups: [
      { caption: 'Griechische Buchstaben', items: ['Zeta', 'Kappa', 'Delta', 'Omnikron'] },
      { caption: 'Bier-Arten', items: ['Lager', 'Export', 'Keller', 'Alt'] },
      { caption: 'Bestandteile einer Musiknote', items: ['Kopf', 'Hals', 'Fähnchen', 'Balken'] },
      { caption: 'Palindrome', items: ['Ebbe', 'Rentner', 'Level', 'Gag'] },
    ],
  },
  '19': {
    id: '19',
    groups: [
      { caption: 'Kölner Postleitzahlen', items: ['50667', '50823', '51101', '51149'] },
      { caption: 'Deutschland gewinnt Fußball-WM', items: ['1954', '1974', '1990', '2014'] },
      { caption: 'Stufen bei "Wer wird Millionär?"', items: ['50', '2000', '32000', '125000'] },
      { caption: 'Primzahlen', items: ['5', '47', '137', '461'] },
    ],
  },
  '20': {
    id: '20',
    groups: [
      { caption: 'Cocktails', items: ['Manhattan', 'Daiquiri', 'Martini', 'Negroni'] },
      { caption: 'US-Präsidenten am Mt. Rushmore', items: ['Washington', 'Jefferson', 'Roosevelt', 'Lincoln'] },
      { caption: 'Politiker nach denen Flughäfen bennant sind', items: ['Kennedy', 'De Gaulle', 'Adenauer', 'Berlusconi'] },
      { caption: 'Musicals', items: ['Hamilton', 'Aladin', 'Tina', 'Chicago'] },
    ],
  },
  '21': {
    id: '21',
    groups: [
      { caption: 'Harry Potter', items: ['⚡️', '🪄', '🧹', '🤓'] },
      { caption: 'Jurassic Park', items: ['🧬', '🐐', '🦖', '🚽'] },
      { caption: 'Oben', items: ['👴🏻', '🏠', '🎈', '☁️'] },
      { caption: 'Titanic', items: ['💍', '🚢', '🧊', '🥶'] },
    ],
  },
  '22': {
    id: '22',
    groups: [
      { caption: 'Schnell', items: ['Fix', 'Zügig', 'Rasch', 'Flink'] },
      { caption: 'Flaschengrößen für Wein', items: ['Piccolo', 'Magnum', 'Goliath', 'Demi'] },
      { caption: 'Frauen in "Mambo No.5"', items: ['Sandra', 'Jessica', 'Rita', 'Mary'] }, // eher raus
      { caption: '___Mann', items: ['Ross', 'Blau', 'Böhmer', 'Ehe'] },
    ],
  },
  '23': {
    id: '23',
    groups: [
      { caption: 'Geschossbezeichnungen', items: ['UG', 'EG', 'OG', 'DG'] },
      { caption: 'DIN Papier-Formate', items: ['A4', 'B2', 'C3', 'D1'] },
      { caption: 'Symbole chemischer Elemente', items: ['AU', 'FE', 'CU', 'ZN'] },
      { caption: 'Römische Zahlen', items: ['XL', 'VC', 'DD', 'MD'] },
    ],
  },
  '24': {
    id: '24',
    groups: [
      { caption: 'Stimmlagen', items: ['Sopran', 'Tenor', 'Bariton', 'Alt'] },
      { caption: '"Weihnachten"', items: ['Vánoce', 'Natal', 'Kerstmis', 'Jul'] },
      { caption: 'Gänge bei "Dinner for One"', items: ['Suppe', 'Fisch', 'Huhn', 'Früchte'] },
      { caption: '___Licht', items: ['Knick', 'Rot', 'Flut', 'Tee'] },
    ],
  },
};
