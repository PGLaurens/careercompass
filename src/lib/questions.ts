import { type QuestionSet } from './types';

export const questionSets: QuestionSet = {
    parent: [
      // Set 1: Basic Interests & Strengths
      [
        {
          id: 'child_interests',
          question: "What activities totally absorb your child, making them lose all track of time?",
          subtitle: "Think about when they're most engaged and naturally drawn to something.",
          type: 'multiselect',
          options: [
            'Building, fixing, or creating things with their hands',
            'Helping others solve problems or feel better',
            'Diving deep into a topic to learn everything about it',
            'Playing sports or being physically active',
            'Drawing, music, writing, or other creative arts',
            'Experimenting with video games or new technology',
            'Organizing events, leading groups, or taking charge',
            'Solving puzzles or working with numbers and logic',
            'Being in nature or caring for animals',
            'Cooking, crafting, or making things look great'
          ]
        },
        {
          id: 'child_strengths',
          question: "What does your child seem to be naturally good at, without even trying hard?",
          subtitle: "What skills do they pick up quickly and easily?",
          type: 'multiselect',
          options: [
            'Explaining things clearly and connecting with people',
            'Thinking logically and solving complex problems',
            'Coming up with creative and imaginative ideas',
            'Leading others and motivating a team',

            'Being super organized and paying attention to details',
            'Working with their hands and physical coordination',
            'Understanding how others are feeling (empathy)',
            'Figuring out new technology and technical skills quickly',
            'Managing their time well and getting things done',
            'Adapting to change and trying new ways of doing things'
          ]
        },
        {
          id: 'work_environment',
          question: "In what kind of environment do you see your child thriving in the future?",
          subtitle: "Consider their personality and what energizes them.",
          type: 'single',
          options: [
            'A busy, collaborative office with lots of team interaction',
            'Working outdoors or in a hands-on workshop',
            'A quiet, independent space where they can focus deeply',
            'A creative studio or a dynamic, fast-changing workplace',
            'A caring setting like a hospital, school, or non-profit',
            'A place of learning, like a university or research lab',
            'A fast-paced tech company or innovative startup',
            'Running their own business or working for themselves',
            'A job that involves travel and exploring new places',
            'A structured and predictable corporate environment'
          ]
        }
      ],
      // Set 2: Personality & Social Aspects
      [
        {
          id: 'personality_type',
          question: "If you had to pick a few words to describe your child's personality, what would they be?",
          subtitle: "Choose the traits that best describe them most of the time.",
          type: 'multiselect',
          options: [
            'Social and outgoing; gets energy from being with people',
            'Thoughtful and reserved; recharges by spending time alone',
            'Practical and down-to-earth; focuses on facts',
            'Imaginative and creative; loves exploring new ideas',
            'Makes decisions with their head (logic and analysis)',
            'Makes decisions with their heart (values and feelings)',
            'Loves having a plan and being organized',
            'Prefers to be spontaneous and keep options open',
            'Confident and willing to take risks',
            'Careful and likes to think things through before acting'
          ]
        },
        {
          id: 'family_position',
          question: "What is your child's position in the family?",
          subtitle: "This can sometimes influence personality and how they interact with others.",
          type: 'single',
          options: [
            'Oldest child (often responsible and a natural leader)',
            'Middle child (often a peacemaker and good negotiator)',
            'Youngest child (often creative and adventurous)',
            'Only child (often independent and mature)',
            'A twin or very close in age to a sibling (used to collaboration)',
            'Has much older or younger siblings (can be nurturing or adaptable)',
            'Other family dynamic'
          ]
        },
        {
          id: 'world_view',
          question: "How does your child generally approach life and challenges?",
          subtitle: "What's their typical outlook on the world?",
          type: 'single',
          options: [
            'Optimistic: "We can figure this out!"',
            'Realistic: "Let\'s look at the facts first."',
            'Idealistic: "Let\'s make things better for everyone!"',
            'Analytical: "But why does it work that way?"',
            'Empathetic: "How will this affect other people?"',
            'Independent: "I\'ll do it my own way."',
            'Traditional: "Let\'s stick to what we know works."',
            'Innovative: "Let\'s try something totally new!"'
          ]
        }
      ],
      // Set 3: Emotional Drivers & Motivations
      [
        {
          id: 'happiness_sources',
          question: "What truly makes your child light up with happiness or pride?",
          subtitle: "Think about what gives them a sense of accomplishment and joy.",
          type: 'multiselect',
          options: [
            'Finishing a difficult project or assignment',
            'Helping a friend or family member succeed',
            'Mastering a new skill or learning something cool',
            'Being recognized or praised for their hard work',
            'Connecting with people they care about',
            'Creating something unique and meaningful',
            'Solving a really tough problem or puzzle',
            'Winning or succeeding as part of a team',
            'Having the freedom to make their own choices',
            'Making a positive impact on their school or community'
          ]
        },
        {
          id: 'stress_sources',
          question: "What situations or tasks tend to stress your child out?",
          subtitle: "Knowing this helps find a supportive work environment.",
          type: 'multiselect',
          options: [
            'Too many people needing things from them at once',
            'Loud, chaotic environments with too much going on',
            'Unclear instructions or not knowing what to do',
            'Doing the same boring, repetitive tasks over and over',
            'Feeling like they are being unfairly criticized or judged',
            'Feeling rushed or having too many tight deadlines',
            'Working alone for too long with no one to talk to',
            'Strict rules that don\'t allow for any flexibility',
            'Dealing with arguments or tension between people',
            'Feeling like their work isn\'t meaningful or important'
          ]
        },
        {
          id: 'motivation_style',
          question: "What best motivates your child to put in their best effort?",
          subtitle: "What kind of rewards or environment pushes them to succeed?",
          type: 'single',
          options: [
            'Seeing progress and achieving clear goals',
            'Words of encouragement and positive feedback',
            'The chance to help people or contribute to a cause',
            'Tackling interesting challenges and learning new things',
            'Having the creative freedom to express their ideas',
            'Collaborating with a team they enjoy working with',
            'A friendly competition or the desire to be the best',
            'Future rewards like a good salary or stability',
            'Having the independence to manage their own work',
            'A job with lots of variety and new things to do'
          ]
        }
      ]
    ],
    learner: [
      // Set 1: Interests & Preferences
      [
        {
          id: 'personal_interests',
          question: "Which of these areas gets you most excited to learn more?",
          subtitle: "Don't think about jobs yet, just what you find cool and interesting.",
          type: 'multiselect',
          options: [
            'Science: How the world works, from tiny atoms to giant galaxies.',
            'Creative Arts: Making art, music, videos, or telling stories.',
            'Helping People: Making a difference in someone\'s life.',
            'Technology: Coding, building apps, or exploring the digital world.',
            'Business & Money: How companies work and how to build wealth.',
            'Sports & Fitness: Anything to do with being active and healthy.',
            'Languages & Culture: Communicating with new people and exploring the world.',
            'Math & Puzzles: Solving problems with logic and numbers.',
            'History & Society: Understanding people and how we got here.',
            'Nature & Animals: Protecting the planet or working with animals.'
          ]
        },
        {
          id: 'learning_style',
          question: "How do you learn best?",
          subtitle: "Think about a time you learned something new and it just 'clicked'.",
          type: 'multiselect',
          options: [
            'By doing it myself (hands-on projects, experiments).',
            'By talking about it (group discussions, debating ideas).',
            'By reading about it (books, articles, websites).',
            'By watching it (videos, diagrams, live demos).',
            'By myself, where I can focus without distractions.',
            'With a team, where we can share ideas and work together.',
            'With clear, step-by-step instructions to follow.',
            'By trying things and learning from my mistakes (trial and error).',
            'By seeing how it works in the real world.',
            'By switching between different types of activities.'
          ]
        },
        {
          id: 'future_vision',
          question: "Imagine your perfect work day in 10 years. What are you doing?",
          subtitle: "No wrong answers here. Just pick what sounds most fun to you.",
          type: 'single',
          options: [
            'Working with a fun team to solve a big challenge.',
            'Focusing on my own, getting detailed work done right.',
            'Teaching or helping other people learn something new.',
            'Creating something brand new that no one has seen before.',
            'Helping a customer or client solve their problem.',
            'Analyzing data and finding secret patterns, like a detective.',
            'Leading a team and making the big decisions.',
            'Traveling to new places and meeting different people.',
            'Building or fixing things with my hands.',
            'Researching a topic I love, becoming a total expert.'
          ]
        }
      ],
      // Set 2: Personality & Social Aspects
      [
        {
          id: 'personality_traits',
          question: "Which of these sound most like you?",
          subtitle: "Think about how you are with your friends and family.",
          type: 'multiselect',
          options: [
            'I get my energy from being around a lot of people.',
            'I get my energy from having some quiet time to myself.',
            'I focus on what’s real and practical right now.',
            'I love thinking about future possibilities and what could be.',
            'I make decisions using logic and what makes the most sense.',
            'I make decisions based on my feelings and how it affects others.',
            'I feel best when I have a plan and things are organized.',
            'I like to be flexible and keep my options open.',
            'I\'m not afraid to take a risk and try something bold.',
            'I like to be careful and think things through first.'
          ]
        },
        {
            id: 'family_dynamics',
            question: "What's your role in your family or friend group?",
            subtitle: "This can say a lot about your natural strengths.",
            type: 'single',
            options: [
              'The responsible one who often takes the lead.',
              'The peacemaker who helps everyone get along.',
              'The fun one who is often creative or adventurous.',
              'The independent one who is comfortable doing their own thing.',
              'The team player who is used to collaborating and sharing.',
              'The caring one who looks out for others.',
              'The adaptable one who can go with the flow.',
              'Something else!'
            ]
          },
        {
          id: 'worldview',
          question: "When you face a challenge, what's your first thought?",
          subtitle: "What's your natural outlook on life?",
          type: 'single',
          options: [
            'Optimistic: "This will be tough, but we can do it!"',
            'Realistic: "Okay, what are the facts? What can we actually do?"',
            'Idealistic: "How can we solve this in a way that’s fair for everyone?"',
            'Curious: "I need to understand *why* this is a problem first."',
            'Empathetic: "I wonder how this is making other people feel?"',
            'Independent: "I\'ve got this. I\'ll figure out my own way."',
            'Traditional: "What\'s the proven way to handle this?"',
            'Innovative: "Let\'s try a completely new approach!"'
          ]
        }
      ],
      // Set 3: Emotional Drivers & Values
      [
        {
          id: 'happiness_drivers',
          question: "What makes you feel proud of yourself?",
          subtitle: "Think about moments when you felt awesome and accomplished.",
          type: 'multiselect',
          options: [
            'Finally finishing something that was really hard.',
            'Seeing a friend succeed because I helped them.',
            'Totally nerding out and learning something new.',
            'Getting a shout-out or praise for doing great work.',
            'Just hanging out with people who get me.',
            'Making something that looks cool or that people find useful.',
            'Solving a tricky problem that stumped everyone else.',
            'Being on a team that wins or accomplishes its goal.',
            'Having the freedom to do things my own way, on my own schedule.',
            'Doing something that helps my school, community, or the world.'
          ]
        },
        {
          id: 'stress_triggers',
          question: "What kind of situations make you feel stressed or just... blah?",
          subtitle: "Knowing your stress triggers helps find a job you'll actually enjoy.",
          type: 'multiselect',
          options: [
            'Feeling like I have way too much responsibility.',
            'Being stuck in a loud, chaotic place for too long.',
            'When I don\'t know what I\'m supposed to be doing (unclear rules).',
            'Doing the same boring, repetitive thing over and over.',
            'Feeling like I\'m being judged or criticized.',
            'Being rushed and having to meet a crazy deadline.',
            'Being totally alone all day with no one to talk to.',
            'Having to follow super strict rules with no room for creativity.',
            'Being in the middle of arguments or drama.',
            'Feeling like the work I\'m doing is pointless.'
          ]
        },
        {
          id: 'core_values',
          question: "When it comes to a future job, what's most important to you?",
          subtitle: "Rank these from most important to least important.",
          type: 'ranking',
          options: [
            'Making a positive impact on the world.',
            'Earning a good salary and being financially stable.',
            'Having creative freedom to express my ideas.',
            'Having a good work-life balance (time for friends, family, hobbies).',
            'Always learning new things and growing my skills.',
            'Being recognized as one of the best in my field.',
            'Working closely with other people and building relationships.',
            'Being my own boss and having control over my work.'
          ]
        }
      ]
    ]
  };
