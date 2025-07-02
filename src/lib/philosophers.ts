export interface Philosopher {
  id: string
  name: string
  period: string
  summary: string
  keyIdeas: string[]
  quote: string
}

export const philosophers: Philosopher[] = [
  {
    id: 'plato',
    name: 'Plato',
    period: '428-348 v.Chr.',
    summary: 'Plato zag de mens als een ziel gevangen in een lichaam. Voor hem bestond de werkelijke wereld uit eeuwige ideeën.',
    keyIdeas: ['Ideëenleer', 'Ziel-lichaam dualisme', 'Kennis van het goede'],
    quote: 'Het ononderzochte leven is niet waard geleefd te worden'
  },
  {
    id: 'aristoteles',
    name: 'Aristoteles',
    period: '384-322 v.Chr.',
    summary: 'Aristoteles zag de mens als een rationeel dier dat van nature een sociaal wezen is. Geluk is het hoogste doel.',
    keyIdeas: ['Rationeel dier', 'Sociaal wezen', 'Eudaimonia', 'Gouden middenweg'],
    quote: 'De mens is van nature een politiek dier'
  },
  {
    id: 'descartes',
    name: 'René Descartes',
    period: '1596-1650',
    summary: 'Descartes is beroemd om "Ik denk, dus ik ben". Hij zag de mens als een denkend wezen.',
    keyIdeas: ['Cogito ergo sum', 'Methodische twijfel', 'Dualisme'],
    quote: 'Ik denk, dus ik ben'
  },
  {
    id: 'kant',
    name: 'Immanuel Kant',
    period: '1724-1804',
    summary: 'Kant zag de mens als een rationeel wezen met waardigheid. Mensen mogen nooit alleen als middel worden gebruikt.',
    keyIdeas: ['Categorische imperatief', 'Autonomie', 'Menselijke waardigheid'],
    quote: 'Handel zo dat je de mensheid altijd als doel, nooit alleen als middel behandelt'
  },
  {
    id: 'nietzsche',
    name: 'Friedrich Nietzsche',
    period: '1844-1900',
    summary: 'Nietzsche verklaarde dat "God dood is" en zag de mens als een wezen dat zichzelf moet creëren.',
    keyIdeas: ['Übermensch', 'Wil tot macht', 'God is dood', 'Zelfcreatie'],
    quote: 'Word wie je bent'
  },
  {
    id: 'sartre',
    name: 'Jean-Paul Sartre',
    period: '1905-1980',
    summary: 'Sartre geloofde dat "de existentie voorafgaat aan de essentie". De mens moet zichzelf creëren door keuzes.',
    keyIdeas: ['Existentie vooraf aan essentie', 'Absolute vrijheid', 'Verantwoordelijkheid'],
    quote: 'De mens is veroordeeld tot vrijheid'
  }
]