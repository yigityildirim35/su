import type { WordInput } from '../store/words'

// Bump when words are added here so existing devices pick up the new ones (see store/words.tsx).
export const SEED_VERSION = 2

type Seed = Omit<WordInput, 'tags' | 'synonyms'> & { tags?: string[]; synonyms?: string[] }

const seed = (w: Seed): WordInput => ({ tags: [], synonyms: [], ...w })

// Word list from "İngilizce Kelime ve Zamanlar Rehberi" — meanings, IPA (UK), examples and
// movie/book lines added. Only well-documented lines are used for `media`.
export const seedWords: WordInput[] = [
  seed({
    word: 'controversial', ipa: '/ˌkɒntrəˈvɜːʃl/', pos: 'adjective', tr: 'tartışmalı', level: 'B2', tags: ['academic'],
    definition: 'Causing a lot of disagreement or strong opinions.',
    examples: ['The new law is very controversial.', 'Let’s not talk about controversial topics at dinner.'],
    synonyms: ['debatable', 'disputed'],
  }),
  seed({
    word: 'conventional', ipa: '/kənˈvenʃənl/', pos: 'adjective', tr: 'geleneksel, alışılmış', level: 'B2', tags: ['academic'],
    definition: 'Following what is traditional or usual.',
    examples: ['She prefers conventional medicine.', 'It wasn’t a conventional wedding — they got married on a beach.'],
    synonyms: ['traditional', 'usual', 'customary'],
  }),
  seed({
    word: 'intensity', ipa: '/ɪnˈtensəti/', pos: 'noun', tr: 'yoğunluk, şiddet', level: 'B2', tags: ['academic'],
    definition: 'The strength or force of something.',
    examples: ['The intensity of the light hurt my eyes.', 'He trains with great intensity.'],
    synonyms: ['strength', 'force'],
  }),
  seed({
    word: 'obvious', ipa: '/ˈɒbviəs/', pos: 'adjective', tr: 'bariz, apaçık', level: 'B1',
    definition: 'Easy to see or understand.',
    examples: ['It’s obvious that she likes you.', 'The answer seems obvious, but it isn’t.'],
    synonyms: ['clear', 'evident'],
    media: { title: 'Sherlock Holmes — The Boscombe Valley Mystery', line: 'There is nothing more deceptive than an obvious fact.', source: 'Arthur Conan Doyle, 1891' },
  }),
  seed({
    word: 'distinct', ipa: '/dɪˈstɪŋkt/', pos: 'adjective', tr: 'belirgin; ayrı, farklı', level: 'B2',
    definition: 'Clearly noticeable; clearly different from something else.',
    examples: ['There is a distinct smell of coffee in the room.', 'These are two distinct problems.'],
    synonyms: ['clear', 'separate', 'different'],
  }),
  seed({
    word: 'indistinct', ipa: '/ˌɪndɪˈstɪŋkt/', pos: 'adjective', tr: 'belirsiz, ayırt edilemeyen', level: 'B2',
    definition: 'Not clear; difficult to see, hear or remember. (Opposite of distinct.)',
    examples: ['We heard indistinct voices next door.', 'The photo is a bit indistinct.'],
    synonyms: ['unclear', 'blurry', 'vague'],
  }),
  seed({
    word: 'coefficient', ipa: '/ˌkəʊɪˈfɪʃnt/', pos: 'noun', tr: 'katsayı', level: 'B2', tags: ['math'],
    definition: 'A number that multiplies a variable — in 3x, the coefficient is 3.',
    examples: ['In 5x + 2, the coefficient of x is 5.', 'Find the coefficient of the second term.'],
  }),
  seed({
    word: 'root', ipa: '/ruːt/', pos: 'noun', tr: 'kök (bitki, matematik); bir şeyin kaynağı', level: 'B1', tags: ['math'],
    definition: 'The part of a plant under the ground; in maths, a number that multiplied by itself gives another number; the origin of something.',
    examples: ['The square root of 49 is 7.', 'Lack of sleep is the root of the problem.'],
    synonyms: ['origin', 'source'],
    media: { title: 'The Bible (King James Version)', line: 'For the love of money is the root of all evil.', source: '1 Timothy 6:10' },
  }),
  seed({
    word: 'absolute', ipa: '/ˈæbsəluːt/', pos: 'adjective', tr: 'mutlak, kesin, tam', level: 'B2', tags: ['math'],
    definition: 'Complete and total. In maths, the absolute value of a number is its distance from zero.',
    examples: ['The absolute value of −8 is 8.', 'I have absolute trust in her.'],
    synonyms: ['complete', 'total'],
    media: { title: 'Star Wars: Episode III – Revenge of the Sith (2005)', line: 'Only a Sith deals in absolutes.', source: 'Obi-Wan Kenobi' },
  }),
  seed({
    word: 'integer', ipa: '/ˈɪntɪdʒə(r)/', pos: 'noun', tr: 'tamsayı', level: 'B2', tags: ['math'],
    definition: 'A whole number, not a fraction: … −2, −1, 0, 1, 2 …',
    examples: ['−3, 0 and 12 are integers, but 2.5 is not.', 'Write your answer as an integer.'],
  }),
  seed({
    word: 'identical', ipa: '/aɪˈdentɪkl/', pos: 'adjective', tr: 'birebir aynı, özdeş', level: 'B1',
    definition: 'Exactly the same.',
    examples: ['The twins are identical.', 'Your phone is identical to mine.'],
    synonyms: ['the same', 'matching'],
  }),
  seed({
    word: 'divisible', ipa: '/dɪˈvɪzəbl/', pos: 'adjective', tr: 'bölünebilir', level: 'B2', tags: ['math'],
    definition: 'Can be divided exactly, with nothing left over.',
    examples: ['12 is divisible by 3.', 'Is 91 divisible by 7? Yes: 7 × 13 = 91.'],
  }),
  seed({
    word: 'vanish', ipa: '/ˈvænɪʃ/', pos: 'verb', tr: 'yok olmak, gözden kaybolmak', level: 'B2',
    definition: 'To disappear suddenly.',
    examples: ['The magician made the coin vanish.', 'My keys seem to have vanished!'],
    synonyms: ['disappear'],
  }),
  seed({
    word: 'digit', ipa: '/ˈdɪdʒɪt/', pos: 'noun', tr: 'rakam, basamak', level: 'B1', tags: ['math'],
    definition: 'Any of the numbers from 0 to 9.',
    examples: ['My PIN has four digits.', '1,000 is a four-digit number.'],
  }),
  seed({
    word: 'inequality', ipa: '/ˌɪnɪˈkwɒləti/', pos: 'noun', tr: 'eşitsizlik', level: 'B2', tags: ['math', 'academic'],
    definition: 'An unfair difference between groups of people; in maths, a statement like x > 3.',
    examples: ['Solve the inequality 2x − 1 < 7.', 'Income inequality is growing in many countries.'],
  }),
  seed({
    word: 'when it comes to', ipa: '/wen ɪt kʌmz tuː/', pos: 'phrase', tr: '…söz konusu olduğunda, …e gelince', level: 'B1', tags: ['phrase'],
    definition: 'Used to introduce the topic you are talking about. (“When it comes to that…” = “Bu konuya gelince…”)',
    examples: ['When it comes to cooking, my dad is the expert.', 'She’s very patient when it comes to kids.'],
  }),
  seed({
    word: 'insufficient', ipa: '/ˌɪnsəˈfɪʃnt/', pos: 'adjective', tr: 'yetersiz', level: 'B2',
    definition: 'Not enough. (Opposite of sufficient.)',
    examples: ['There is insufficient evidence to prove it.', 'The payment failed: insufficient funds.'],
    synonyms: ['not enough', 'inadequate'],
  }),
  seed({
    word: 'data', ipa: '/ˈdeɪtə/', pos: 'noun', tr: 'veri', level: 'B1', tags: ['academic'],
    definition: 'Facts or numbers collected to be studied.',
    examples: ['We need more data before we decide.', 'The app collects data about your sleep.'],
    synonyms: ['information'],
  }),
  seed({
    word: 'satisfy', ipa: '/ˈsætɪsfaɪ/', pos: 'verb', tr: 'tatmin etmek; (bir koşulu) sağlamak', level: 'B1', tags: ['math'],
    definition: 'To make someone pleased; in maths, to make an equation or condition true.',
    examples: ['Nothing satisfies him!', 'x = 2 satisfies the equation x + 3 = 5.'],
    synonyms: ['please', 'meet'],
  }),
  seed({
    word: 'terms', ipa: '/tɜːmz/', pos: 'noun', tr: 'şartlar, koşullar; (matematik) terimler', level: 'B1', tags: ['math'],
    definition: 'The conditions of an agreement; in maths, the parts of an expression separated by + or −.',
    examples: ['Read the terms and conditions before you sign.', 'The expression 3x + 5 has two terms.'],
    synonyms: ['conditions'],
  }),
  seed({
    word: 'consider', ipa: '/kənˈsɪdə(r)/', pos: 'verb', tr: 'dikkate almak, göz önünde bulundurmak, düşünmek', level: 'B1',
    definition: 'To think carefully about something.',
    examples: ['I’m considering moving to Istanbul.', 'Consider all the options before you decide.'],
    synonyms: ['think about', 'take into account'],
  }),
  seed({
    word: 'inscribed', ipa: '/ɪnˈskraɪbd/', pos: 'adjective', tr: 'yazılı, kazınmış; (geometri) içine çizilmiş', level: 'B2', tags: ['math'],
    definition: 'Written or cut into a surface; in geometry, drawn inside another shape so that they touch.',
    examples: ['The ring has her name inscribed on it.', 'Draw a circle inscribed in the square.'],
  }),
  seed({
    word: 'inscribe', ipa: '/ɪnˈskraɪb/', pos: 'verb', tr: 'kazımak, üzerine yazmak', level: 'B2',
    definition: 'To write or cut words into something.',
    examples: ['They inscribed the date on the stone.', 'He inscribed a short message in the book.'],
  }),
  seed({
    word: 'ratio', ipa: '/ˈreɪʃiəʊ/', pos: 'noun', tr: 'oran', level: 'B2', tags: ['math'],
    definition: 'The relationship between two amounts, e.g. 2:1.',
    examples: ['The ratio of boys to girls is 3 to 2.', 'Mix water and flour in a 1:2 ratio.'],
    synonyms: ['proportion'],
  }),
  seed({
    word: 'efficient', ipa: '/ɪˈfɪʃnt/', pos: 'adjective', tr: 'verimli', level: 'B1',
    definition: 'Working well without wasting time, money or energy. (Effective = işe yarayan; efficient = verimli.)',
    examples: ['This new heater is more efficient.', 'She’s very efficient — she finished in an hour.'],
    synonyms: ['productive'],
  }),
  seed({
    word: 'cost', ipa: '/kɒst/', pos: 'noun / verb', tr: 'maliyet; mal olmak', level: 'A2',
    definition: 'The amount of money needed to buy or do something.',
    examples: ['How much does it cost?', 'The cost of living keeps rising.'],
    synonyms: ['price'],
  }),
  seed({
    word: 'waste', ipa: '/weɪst/', pos: 'noun / verb', tr: 'atık; israf etmek, boşa harcamak', level: 'A2',
    definition: 'Things that are thrown away; to use something badly or not at all.',
    examples: ['Don’t waste your time.', 'Plastic waste is a huge problem.'],
    media: { title: 'UNCF ad campaign (1972)', line: 'A mind is a terrible thing to waste.', source: 'Famous US slogan' },
  }),
  seed({
    word: 'quite', ipa: '/kwaɪt/', pos: 'adverb', tr: 'oldukça, epey', level: 'A2',
    definition: 'Fairly, rather. Don’t confuse it with “quiet” (sessiz)!',
    examples: ['It’s quite cold today.', 'I’m not quite sure.'],
    synonyms: ['fairly', 'rather', 'pretty'],
  }),
  seed({
    word: 'client', ipa: '/ˈklaɪənt/', pos: 'noun', tr: 'müşteri (hizmet alan)', level: 'B1',
    definition: 'A person who pays a professional for a service. (A shop has customers; a lawyer has clients.)',
    examples: ['The lawyer is meeting a new client.', 'Our clients are happy with the service.'],
    synonyms: ['customer'],
  }),
  seed({
    word: 'through', ipa: '/θruː/', pos: 'preposition', tr: 'içinden, boyunca; aracılığıyla; başından sonuna kadar', level: 'A2',
    definition: 'From one side to the other; by means of; from the beginning to the end.',
    examples: ['We drove through the tunnel.', 'I found this job through a friend.'],
    media: { title: 'Through the Looking-Glass (1871)', line: 'Through the Looking-Glass, and What Alice Found There', source: 'Lewis Carroll — book title' },
  }),
  seed({
    word: 'doubt', ipa: '/daʊt/', pos: 'noun / verb', tr: 'şüphe; şüphe etmek', level: 'B1',
    definition: 'A feeling of not being sure. The “b” is silent!',
    examples: ['I have no doubt she’ll win.', 'I doubt it will rain today.'],
    media: { title: 'Hamlet', line: 'But never doubt I love.', source: 'William Shakespeare — Act 2, Scene 2' },
  }),
  seed({
    word: 'starving', ipa: '/ˈstɑːvɪŋ/', pos: 'adjective', tr: 'açlıktan ölmek üzere; (günlük dilde) çok acıkmış', level: 'B1',
    definition: 'Suffering because of no food; informally, very hungry.',
    examples: ['What’s for dinner? I’m starving!', 'Millions of people are starving.'],
    synonyms: ['very hungry'],
  }),
  seed({
    word: 'benefit', ipa: '/ˈbenɪfɪt/', pos: 'noun / verb', tr: 'fayda; faydalanmak', level: 'B1',
    definition: 'A good effect or advantage; to get an advantage from something.',
    examples: ['Exercise has many benefits.', 'Everyone will benefit from the new park.'],
    synonyms: ['advantage'],
  }),
  seed({
    word: 'drawback', ipa: '/ˈdrɔːbæk/', pos: 'noun', tr: 'dezavantaj, sakınca', level: 'B2',
    definition: 'A disadvantage or problem. (Opposite of benefit.)',
    examples: ['The only drawback is the price.', 'Every plan has its drawbacks.'],
    synonyms: ['disadvantage', 'downside'],
  }),
  seed({
    word: 'stuff', ipa: '/stʌf/', pos: 'noun', tr: 'şey(ler), eşya', level: 'A2',
    definition: 'Informal word for things, objects or activities.',
    examples: ['I have a lot of stuff to do.', 'Where should I put my stuff?'],
    synonyms: ['things'],
    media: { title: 'The Maltese Falcon (1941)', line: 'The stuff that dreams are made of.', source: 'Sam Spade (Humphrey Bogart)' },
  }),
  seed({
    word: 'reveal', ipa: '/rɪˈviːl/', pos: 'verb', tr: 'ortaya çıkarmak, açığa vurmak', level: 'B1',
    definition: 'To show or tell something that was secret or hidden.',
    examples: ['She finally revealed her secret.', 'The study reveals that teenagers sleep too little.'],
    synonyms: ['show', 'disclose'],
  }),
  seed({
    word: 'demand', ipa: '/dɪˈmɑːnd/', pos: 'verb / noun', tr: 'talep etmek; talep', level: 'B1',
    definition: 'To ask for something strongly; the need or desire for something.',
    examples: ['The customers demanded a refund.', 'There’s a high demand for nurses.'],
  }),
  seed({
    word: 'capabilities', ipa: '/ˌkeɪpəˈbɪlətiz/', pos: 'noun (plural)', tr: 'yetenekler, kabiliyetler', level: 'B2',
    definition: 'The abilities or power to do things.',
    examples: ['The new phone’s camera capabilities are amazing.', 'Don’t underestimate your capabilities.'],
    synonyms: ['abilities', 'skills'],
  }),
  seed({
    word: 'get', ipa: '/ɡet/', pos: 'verb', tr: 'elde etmek, almak; anlamak; (bir duruma) gelmek', level: 'A1',
    definition: 'To obtain or receive; to understand; to become.',
    examples: ['I got a new job!', 'Do you get it?', 'It’s getting dark.'],
    synonyms: ['obtain', 'receive', 'become'],
    media: { title: 'The Shawshank Redemption (1994)', line: 'Get busy living, or get busy dying.', source: 'Andy Dufresne' },
  }),
  seed({
    word: 'former', ipa: '/ˈfɔːmə(r)/', pos: 'adjective', tr: 'önceki, eski', level: 'B1',
    definition: 'Having been something in the past. “The former… the latter” = ilki… ikincisi.',
    examples: ['He’s a former teacher.', 'The former president gave a speech.'],
    synonyms: ['previous', 'ex-'],
  }),
  seed({
    word: 'such', ipa: '/sʌtʃ/', pos: 'determiner', tr: 'böyle, öyle; o kadar', level: 'A2',
    definition: 'Used to emphasise or to refer to something of that kind. Pattern: such + a/an + adjective + noun.',
    examples: ['It was such a nice day!', 'I’ve never seen such a mess.'],
    media: { title: 'The Tempest', line: 'We are such stuff as dreams are made on.', source: 'William Shakespeare — Prospero' },
  }),
  seed({
    word: 'promote', ipa: '/prəˈməʊt/', pos: 'verb', tr: 'terfi ettirmek; teşvik etmek, tanıtmak', level: 'B1',
    definition: 'To give someone a higher position at work; to encourage or advertise something.',
    examples: ['She was promoted to manager.', 'The campaign promotes healthy eating.'],
    synonyms: ['encourage', 'advertise'],
  }),
  seed({
    word: 'baccalaureate', ipa: '/ˌbækəˈlɔːriət/', pos: 'noun', tr: 'lisans derecesi; bazı ülkelerde lise bitirme diploması', level: 'B2', tags: ['academic'],
    definition: 'A bachelor’s degree; in some countries (and the IB), a final school exam/diploma.',
    examples: ['She earned her baccalaureate in biology.', 'The International Baccalaureate is a high-school programme.'],
    synonyms: ['bachelor’s degree'],
  }),
  seed({
    word: 'pioneer', ipa: '/ˌpaɪəˈnɪə(r)/', pos: 'noun / verb', tr: 'öncü; öncülük etmek', level: 'B2',
    definition: 'One of the first people to do something new.',
    examples: ['Marie Curie was a pioneer in science.', 'This company pioneered electric cars.'],
    synonyms: ['trailblazer'],
  }),
  seed({
    word: 'replacement', ipa: '/rɪˈpleɪsmənt/', pos: 'noun', tr: 'yerine gelen kişi/şey; yenisiyle değiştirme', level: 'B1',
    definition: 'A person or thing that takes the place of another.',
    examples: ['We need a replacement for the broken screen.', 'Who is her replacement at work?'],
    synonyms: ['substitute'],
  }),
  seed({
    word: 'choir', ipa: '/ˈkwaɪə(r)/', pos: 'noun', tr: 'koro', level: 'B1',
    definition: 'A group of people who sing together. Spelled “choir”, pronounced like “quire”!',
    examples: ['She sings in the school choir.', 'You’re preaching to the choir. (= Zaten ikna olmuş birini ikna etmeye çalışıyorsun.)'],
  }),
  seed({
    word: 'push', ipa: '/pʊʃ/', pos: 'verb', tr: 'itmek; zorlamak', level: 'A1',
    definition: 'To move something away from you using force.',
    examples: ['Push the door, don’t pull it.', 'Don’t push yourself too hard.'],
    synonyms: ['press', 'shove'],
  }),
  seed({
    word: 'reporter', ipa: '/rɪˈpɔːtə(r)/', pos: 'noun', tr: 'muhabir', level: 'A2',
    definition: 'A person whose job is to find and report news.',
    examples: ['The reporter asked the minister a difficult question.', 'She works as a sports reporter.'],
    synonyms: ['journalist'],
  }),
  seed({
    word: 'dodge', ipa: '/dɒdʒ/', pos: 'verb', tr: 'atlatmak, kaçınmak, yan çizmek', level: 'B2',
    definition: 'To move quickly to avoid something; to avoid a question or duty.',
    examples: ['He dodged the ball.', 'Stop dodging the question!'],
    synonyms: ['avoid', 'escape'],
    media: { title: 'Dodgeball: A True Underdog Story (2004)', line: 'If you can dodge a wrench, you can dodge a ball.', source: 'Patches O’Houlihan' },
  }),
]
