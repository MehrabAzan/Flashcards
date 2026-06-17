import attackerIcon from '../assets/attacker.svg'
import defenderIcon from '../assets/defender.svg'
import mapIcon from '../assets/map.svg'

const categoryImages = {
  Attacker: attackerIcon,
  Defender: defenderIcon,
  Map: mapIcon,
}

export const deckInfo = {
  title: 'Rainbow Six Siege Operator Quiz',
  description: 'Test your knowledge of operators, gadgets, and tactics.',
}

export const cards = [
  {
    question: 'Which operator uses the EMP Grenade?',
    answer: 'Thatcher',
    category: 'Attacker',
    image: categoryImages.Attacker,
  },
  {
    question: 'What gadget does Mira deploy?',
    answer: 'Black Mirror',
    category: 'Defender',
    image: categoryImages.Defender,
  },
  {
    question: 'Which operator has the Breaching Round launcher?',
    answer: 'Ash',
    category: 'Attacker',
    image: categoryImages.Attacker,
  },
  {
    question: 'What is the name of Jäger\'s unique gadget?',
    answer: 'Active Defense System (ADS)',
    category: 'Defender',
    image: categoryImages.Defender,
  },
  {
    question: 'On the map Bank, what is the main objective room called?',
    answer: 'Vault',
    category: 'Map',
    image: categoryImages.Map,
  },
  {
    question: 'On Oregon, which area is commonly called "Tower"?',
    answer: 'Attic',
    category: 'Map',
    image: categoryImages.Map,
  },
  {
    question: 'Which operators counter Mira\'s Black Mirror?',
    answer: 'Twitch or Hibana',
    category: 'Attacker',
    image: categoryImages.Attacker,
  },
  {
    question: 'Which organization does Thermite belong to?',
    answer: 'FBI SWAT',
    category: 'Attacker',
    image: categoryImages.Attacker,
  },
  {
    question: 'What gadget does Valkyrie place around the map?',
    answer: 'Black Eye cameras',
    category: 'Defender',
    image: categoryImages.Defender,
  },
  {
    question: 'Which defender operator is from the GIGN?',
    answer: 'Doc or Rook',
    category: 'Defender',
    image: categoryImages.Defender,
  },
]
