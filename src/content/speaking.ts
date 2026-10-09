import type { Level } from '../store/settings'

export interface SpeakingTopic {
  topic: string
  tr: string
  questions: string[]
  phrases: string[]
}

// Starter set — will grow to ~60 topics per level.
export const speakingTopics: Record<Level, SpeakingTopic[]> = {
  A1: [
    { topic: 'Describe your room', tr: 'Odanı anlat', questions: ['What is in your room?', 'What color are the walls?', 'What is your favorite thing in your room?', 'Where do you study?'], phrases: ['There is a…', 'There are two…', 'My favorite… is…', 'It’s next to the…', 'I really like…'] },
    { topic: 'Your morning routine', tr: 'Sabah rutinin', questions: ['What time do you wake up?', 'What do you eat for breakfast?', 'How do you go to school or work?', 'Do you drink tea or coffee?'], phrases: ['I usually…', 'First, I…', 'Then I…', 'After that…', 'I never…'] },
    { topic: 'Your best friend', tr: 'En iyi arkadaşın', questions: ['What is their name?', 'What do they look like?', 'What do you do together?', 'Why do you like them?'], phrases: ['My best friend is…', 'She/He has…', 'We often…', 'She/He is very…', 'I like her/him because…'] },
    { topic: 'Your favorite food', tr: 'En sevdiğin yemek', questions: ['What is your favorite food?', 'Who makes it?', 'When do you eat it?', 'Can you cook?'], phrases: ['My favorite food is…', 'It’s made with…', 'It tastes…', 'I can / can’t…', 'I eat it when…'] },
    { topic: 'Your weekend', tr: 'Hafta sonun', questions: ['What do you do on Saturdays?', 'Do you sleep late?', 'Who do you meet?', 'What do you do on Sunday evenings?'], phrases: ['On Saturdays I…', 'Sometimes I…', 'I like to…', 'I don’t like…', 'In the evening…'] },
  ],
  A2: [
    { topic: 'Your last holiday', tr: 'Son tatilin', questions: ['Where did you go?', 'Who did you go with?', 'What did you do there?', 'What was the best moment?'], phrases: ['Last summer I went to…', 'We stayed at…', 'The best part was…', 'It was really…', 'I’d love to go back because…'] },
    { topic: 'A movie you like', tr: 'Sevdiğin bir film', questions: ['What is it about?', 'Who is in it?', 'Why do you like it?', 'Who would you recommend it to?'], phrases: ['It’s about…', 'The main character is…', 'My favorite scene is when…', 'It made me feel…', 'You should watch it if…'] },
    { topic: 'Your city', tr: 'Şehrin', questions: ['What is your city famous for?', 'Where should a tourist go?', 'What is good and bad about living there?', 'Is it better than a village?'], phrases: ['It’s famous for…', 'You should definitely visit…', 'The best thing about it is…', 'One problem is…', 'It’s bigger/quieter than…'] },
    { topic: 'Plans for next year', tr: 'Gelecek yıl planların', questions: ['What are you going to do next year?', 'Do you want to learn a new skill?', 'Where are you going to travel?', 'What will be difficult?'], phrases: ['I’m going to…', 'I’d like to…', 'I hope I can…', 'Maybe I will…', 'It might be hard to…'] },
    { topic: 'Your childhood', tr: 'Çocukluğun', questions: ['Where did you grow up?', 'What games did you play?', 'Who was your best friend?', 'What were you afraid of?'], phrases: ['When I was a child…', 'I used to…', 'I remember…', 'I was scared of…', 'Back then…'] },
  ],
  B1: [
    { topic: 'Is it better to live alone or with others?', tr: 'Yalnız mı yaşamak daha iyi, başkalarıyla mı?', questions: ['What are the advantages of living alone?', 'What is difficult about flatmates?', 'What would you choose and why?', 'Does it depend on age?'], phrases: ['On the one hand…', 'On the other hand…', 'Personally, I think…', 'It depends on…', 'That’s why I’d rather…'] },
    { topic: 'A skill you want to learn', tr: 'Öğrenmek istediğin bir beceri', questions: ['Why does this skill interest you?', 'How would you learn it?', 'How long do you think it would take?', 'How could it change your life?'], phrases: ['I’ve always wanted to…', 'I’d start by…', 'It would probably take…', 'If I could…, I would…', 'The hardest part would be…'] },
    { topic: 'Social media: good or bad?', tr: 'Sosyal medya: iyi mi kötü mü?', questions: ['How much time do you spend on it?', 'What do you like about it?', 'How can it be harmful?', 'Have you ever taken a break from it?'], phrases: ['To be honest…', 'The main advantage is…', 'The downside is…', 'I’ve noticed that…', 'In my experience…'] },
    { topic: 'A difficult decision you made', tr: 'Verdiğin zor bir karar', questions: ['What was the decision?', 'What were your options?', 'Who helped you?', 'Would you make the same choice again?'], phrases: ['I had to decide whether…', 'I was torn between…', 'In the end, I…', 'Looking back…', 'If I had known…'] },
    { topic: 'Your dream job', tr: 'Hayalindeki iş', questions: ['What would you do every day?', 'Why does it attract you?', 'What skills does it need?', 'What is the first step to get there?'], phrases: ['My dream job would be…', 'I’d be responsible for…', 'What attracts me is…', 'You need to be…', 'The first step would be…'] },
  ],
  B2: [
    { topic: 'Should university be free for everyone?', tr: 'Üniversite herkes için ücretsiz mi olmalı?', questions: ['Who should pay for education?', 'What are the risks of free university?', 'How does it work in other countries?', 'What would be a fair system?'], phrases: ['I’d argue that…', 'A strong argument against this is…', 'It’s worth considering…', 'Having said that…', 'All things considered…'] },
    { topic: 'Is social media making us lonelier?', tr: 'Sosyal medya bizi daha mı yalnız yapıyor?', questions: ['Can online friendships be real?', 'Why do people compare themselves online?', 'What has changed since you were a child?', 'What could reduce loneliness?'], phrases: ['There’s a growing concern that…', 'It could be argued that…', 'Paradoxically…', 'What strikes me is…', 'At the end of the day…'] },
    { topic: 'Would you rather be rich or famous?', tr: 'Zengin mi olmak isterdin, ünlü mü?', questions: ['What are the hidden costs of fame?', 'Does money buy happiness?', 'Who is a good example of each?', 'Would your answer change in 10 years?'], phrases: ['If I had to choose…', 'Not only… but also…', 'It goes without saying that…', 'I wouldn’t want to…', 'The way I see it…'] },
    { topic: 'Will AI change how we learn languages?', tr: 'Yapay zeka dil öğrenmeyi değiştirecek mi?', questions: ['How do you use technology to learn?', 'Can a machine replace a teacher?', 'What will still need humans?', 'Is it still worth learning languages?'], phrases: ['It’s likely that…', 'By 2035, we’ll probably have…', 'Nothing can replace…', 'One thing I’m sure of is…', 'In the long run…'] },
    { topic: 'A rule you would change in your country', tr: 'Ülkende değiştireceğin bir kural', questions: ['What is the rule?', 'Why do you think it exists?', 'Who would benefit from the change?', 'What could go wrong?'], phrases: ['If it were up to me…', 'The reason behind it is probably…', 'This would mean that…', 'Critics might say…', 'I’d still go ahead because…'] },
  ],
}
