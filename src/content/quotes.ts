export interface Quote {
  text: string
  author: string
  tr: string
}

// Only quotes with a well-documented source — no misattributed "internet quotes".
export const quotes: Quote[] = [
  { text: 'The limits of my language mean the limits of my world.', author: 'Ludwig Wittgenstein', tr: 'Dilimin sınırları, dünyamın sınırları demektir.' },
  { text: 'The unexamined life is not worth living.', author: 'Socrates (Plato, Apology)', tr: 'Sorgulanmamış bir hayat yaşamaya değmez.' },
  { text: 'I think, therefore I am.', author: 'René Descartes', tr: 'Düşünüyorum, öyleyse varım.' },
  { text: 'Life can only be understood backwards; but it must be lived forwards.', author: 'Søren Kierkegaard', tr: 'Hayat ancak geriye bakarak anlaşılır ama ileriye doğru yaşanmalıdır.' },
  { text: 'He who has a why to live can bear almost any how.', author: 'Friedrich Nietzsche', tr: 'Yaşamak için bir nedeni olan, hemen her nasıla katlanabilir.' },
  { text: 'Imagination is more important than knowledge.', author: 'Albert Einstein', tr: 'Hayal gücü bilgiden daha önemlidir.' },
  { text: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien', tr: 'Dolaşan herkes kaybolmuş değildir.' },
  { text: '“Hope” is the thing with feathers.', author: 'Emily Dickinson', tr: '“Umut” tüyleri olan bir şeydir.' },
  { text: 'To be, or not to be: that is the question.', author: 'William Shakespeare, Hamlet', tr: 'Olmak ya da olmamak, işte bütün mesele bu.' },
  { text: 'The only thing we have to fear is fear itself.', author: 'Franklin D. Roosevelt', tr: 'Korkmamız gereken tek şey korkunun kendisidir.' },
  { text: 'One cannot think well, love well, sleep well, if one has not dined well.', author: 'Virginia Woolf', tr: 'İnsan iyi yemek yemediyse ne iyi düşünebilir, ne iyi sevebilir, ne de iyi uyuyabilir.' },
  { text: 'It does not do to dwell on dreams and forget to live.', author: 'J.K. Rowling, Harry Potter', tr: 'Hayallere dalıp yaşamayı unutmak olmaz.' },
  { text: 'You could not step twice into the same river.', author: 'Heraclitus', tr: 'Aynı nehre iki kez giremezsin.' },
  { text: 'Peace at home, peace in the world.', author: 'Mustafa Kemal Atatürk', tr: 'Yurtta sulh, cihanda sulh.' },
]
