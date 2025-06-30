import { type QuestionSet } from './types';

export const questionSets: QuestionSet = {
    parent: [
      // Set 1: Basic Interests & Strengths
      [
        {
          id: 'child_interests',
          question: "What activities make your child lose track of time?",
          subtitle: "Think about when they're most engaged and naturally drawn to something",
          type: 'multiselect',
          options: [
            'Building, fixing, or creating things with their hands',
            'Helping others solve problems or feel better',
            'Reading, researching, or learning new topics',
            'Playing sports or being physically active',
            'Drawing, music, writing, or other creative arts',
            'Playing video games or using technology',
            'Organizing events, leading groups, or taking charge',
            'Working with numbers, patterns, or logical puzzles',
            'Being in nature or working with animals',
            'Cooking, crafting, or making things beautiful'
          ]
        },
        {
          id: 'child_strengths',
          question: "What are your child's natural strengths?",
          subtitle: "What do they seem to excel at without much struggle?",
          type: 'multiselect',
          options: [
            'Communicating clearly and connecting with others',
            'Thinking logically and solving complex problems',
            'Coming up with creative and original solutions',
            'Leading others and motivating people',
            'Paying attention to details and being thorough',
            'Physical coordination and hands-on skills',
            'Understanding emotions and showing empathy',
            'Learning technology and technical skills quickly',
            'Staying organized and managing time well',
            'Adapting to change and trying new approaches'
          ]
        },
        {
          id: 'work_environment',
          question: "What type of work environment would suit your child best?",
          subtitle: "Consider their personality and what energizes them",
          type: 'single',
          options: [
            'Collaborative office with regular team interaction',
            'Outdoors or hands-on workshop environment',
            'Quiet, independent workspace (office or home)',
            'Creative studio or dynamic, flexible space',
            'Healthcare, service, or helping-focused setting',
            'Educational institutions or training environments',
            'Fast-paced technology or startup companies',
            'Entrepreneurial or self-directed ventures',
            'Travel-based or location-flexible work',
            'Traditional corporate or structured organization'
          ]
        }
      ],
      // Set 2: Personality & Social Aspects
      [
        {
          id: 'personality_type',
          question: "How would you describe your child's personality?",
          subtitle: "Choose the traits that best describe them most of the time",
          type: 'multiselect',
          options: [
            'Outgoing and energized by being around people',
            'Thoughtful and prefers smaller groups or alone time',
            'Practical and focused on real, concrete details',
            'Imaginative and interested in possibilities and ideas',
            'Makes decisions based on logic and objective analysis',
            'Makes decisions based on values and how it affects people',
            'Likes structure, plans, and having things decided',
            'Prefers flexibility and keeping options open',
            'Confident and comfortable taking risks',
            'Cautious and prefers to think things through first'
          ]
        },
        {
          id: 'family_position',
          question: "What is your child's position in the family?",
          subtitle: "This can influence personality traits and career preferences",
          type: 'single',
          options: [
            'Oldest child - tends to be responsible and leadership-oriented',
            'Middle child - often diplomatic and good at negotiating',
            'Youngest child - frequently creative and willing to take risks',
            'Only child - typically independent and comfortable with adults',
            'Twin or close in age - used to sharing and collaborating',
            'Significantly older than siblings - often protective and nurturing',
            'Significantly younger than siblings - may be more adaptable',
            'Raised primarily with one parent - often mature and self-reliant'
          ]
        },
        {
          id: 'world_view',
          question: "How does your child seem to view the world?",
          subtitle: "What's their general outlook and approach to life?",
          type: 'single',
          options: [
            'Optimistic - sees opportunities and believes things will work out',
            'Realistic - focuses on practical facts and what actually happens',
            'Idealistic - wants to make the world better and believes in possibilities',
            'Analytical - questions things and wants to understand how they work',
            'Empathetic - notices how others feel and wants everyone to be happy',
            'Independent - believes in doing things their own way',
            'Traditional - values established ways and proven methods',
            'Innovative - excited by new ideas and different approaches'
          ]
        }
      ],
      // Set 3: Emotional Drivers & Motivations
      [
        {
          id: 'happiness_sources',
          question: "What makes your child genuinely happy and excited?",
          subtitle: "Think about what brings them joy and energy",
          type: 'multiselect',
          options: [
            'Accomplishing something difficult they worked hard on',
            'Helping someone else succeed or feel better',
            'Learning something new and interesting',
            'Being recognized or praised for their efforts',
            'Spending quality time with people they care about',
            'Creating something beautiful or meaningful',
            'Overcoming a challenge or solving a tough problem',
            'Being part of a team that works well together',
            'Having freedom to do things their own way',
            'Making a positive difference in their community'
          ]
        },
        {
          id: 'stress_sources',
          question: "What tends to make your child feel stressed or unhappy?",
          subtitle: "Understanding this helps us find the right work environment",
          type: 'multiselect',
          options: [
            'Having too many people depending on them at once',
            'Being forced to work in a very social, loud environment',
            'Dealing with unclear instructions or expectations',
            'Having to do repetitive, boring tasks for long periods',
            'Facing criticism or judgment from others',
            'Being rushed or having too many tight deadlines',
            'Working alone without any team interaction',
            'Having to follow very strict rules without flexibility',
            'Dealing with conflict or tension between people',
            'Feeling like their work doesn\'t matter or make a difference'
          ]
        },
        {
          id: 'motivation_style',
          question: "What motivates your child to do their best work?",
          subtitle: "What kind of environment and incentives work best for them?",
          type: 'single',
          options: [
            'Clear goals and the satisfaction of achieving them',
            'Positive feedback and recognition from others',
            'The opportunity to help others or make a difference',
            'Intellectual challenges and learning opportunities',
            'Creative freedom and the chance to express themselves',
            'Working with others toward a common goal',
            'Competition and the chance to be the best',
            'Financial rewards and security for their efforts',
            'Independence and control over their own work',
            'Variety and the chance to try new things regularly'
          ]
        }
      ]
    ],
    learner: [
      // Set 1: Interests & Preferences
      [
        {
          id: 'personal_interests',
          question: "What subjects or activities genuinely excite you?",
          subtitle: "Don't worry about what others expect - what draws YOU in?",
          type: 'multiselect',
          options: [
            'Science - understanding how things work and discovering new things',
            'Creative arts - expressing yourself through art, music, writing, or design',
            'Helping people - making a difference in others\' lives',
            'Technology - working with computers, apps, and digital innovation',
            'Business - understanding how organizations work and creating value',
            'Sports and fitness - physical activities and health',
            'Languages - communicating across cultures and understanding people',
            'Mathematics - solving problems and working with numbers and patterns',
            'History and social studies - understanding societies and cultures',
            'Environment and nature - protecting our planet and working outdoors'
          ]
        },
        {
          id: 'learning_style',
          question: "How do you learn and work best?",
          subtitle: "Think about when you feel most confident and engaged",
          type: 'multiselect',
          options: [
            'Working with my hands and doing practical activities',
            'Discussing ideas and learning from other people',
            'Reading and researching topics that interest me',
            'Using visual aids like diagrams, charts, and videos',
            'Working independently at my own pace',
            'Being part of a team or group project',
            'Having clear step-by-step instructions to follow',
            'Figuring things out through trial and error',
            'Learning from real-world examples and experiences',
            'Having variety and changing between different activities'
          ]
        },
        {
          id: 'future_vision',
          question: "When you imagine your ideal day at work, what are you doing?",
          subtitle: "There's no wrong answer - trust your instincts about what sounds appealing",
          type: 'single',
          options: [
            'Collaborating with a team on exciting, challenging projects',
            'Working independently on detailed tasks that require focus',
            'Teaching, mentoring, or helping others learn and grow',
            'Creating something new, innovative, or artistic',
            'Helping people solve their problems or improve their lives',
            'Analyzing information and finding patterns or solutions',
            'Leading a team and making important decisions',
            'Traveling to different places and meeting new people',
            'Working with my hands to build or fix things',
            'Researching and discovering new knowledge or information'
          ]
        }
      ],
      // Set 2: Personality & Social Aspects
      [
        {
          id: 'personality_traits',
          question: "Which of these describes you best?",
          subtitle: "Choose the traits that feel most like the real you",
          type: 'multiselect',
          options: [
            'I get energy from being around people and socializing',
            'I prefer quieter environments and smaller groups',
            'I focus on practical details and real, concrete information',
            'I love exploring ideas, possibilities, and big-picture thinking',
            'I make decisions based on logic and objective analysis',
            'I make decisions based on my values and how they affect people',
            'I like having plans, structure, and knowing what to expect',
            'I prefer to stay flexible and keep my options open',
            'I\'m comfortable taking risks and trying new things',
            'I prefer to think things through carefully before acting'
          ]
        },
        {
          id: 'family_dynamics',
          question: "What's your position in your family?",
          subtitle: "This can shape how you work with others and approach challenges",
          type: 'single',
          options: [
            'I\'m the oldest - I often take responsibility and lead',
            'I\'m in the middle - I\'m good at seeing different perspectives',
            'I\'m the youngest - I\'m often creative and willing to take risks',
            'I\'m an only child - I\'m independent and comfortable with adults',
            'I\'m a twin or very close in age - I\'m used to sharing and teamwork',
            'I\'m much older than my siblings - I often take care of others',
            'I\'m much younger than my siblings - I\'m adaptable and learn quickly',
            'I was raised differently - I\'m self-reliant and mature for my age'
          ]
        },
        {
          id: 'worldview',
          question: "How do you generally see the world?",
          subtitle: "What's your natural outlook on life and the future?",
          type: 'single',
          options: [
            'I\'m optimistic - I believe good things will happen and problems can be solved',
            'I\'m realistic - I focus on facts and what actually happens in the world',
            'I\'m idealistic - I believe we can make the world better and fairer',
            'I\'m curious - I want to understand how everything works',
            'I\'m empathetic - I care deeply about how others feel and what they need',
            'I\'m independent - I believe in making my own path and decisions',
            'I\'m traditional - I value proven methods and established ways',
            'I\'m innovative - I\'m excited by new ideas and different approaches'
          ]
        }
      ],
      // Set 3: Emotional Drivers & Values
      [
        {
          id: 'happiness_drivers',
          question: "What makes you feel genuinely happy and fulfilled?",
          subtitle: "Think about moments when you feel most satisfied and proud",
          type: 'multiselect',
          options: [
            'Accomplishing something difficult that I worked hard for',
            'Helping someone else succeed or feel better about themselves',
            'Learning something fascinating that I didn\'t know before',
            'Getting recognition or praise for something I did well',
            'Spending time with people I care about and who care about me',
            'Creating something beautiful, useful, or meaningful',
            'Solving a challenging problem or overcoming an obstacle',
            'Being part of a team that works really well together',
            'Having the freedom to do things my own way',
            'Making a positive difference in my community or the world'
          ]
        },
        {
          id: 'stress_triggers',
          question: "What makes you feel stressed, anxious, or unhappy?",
          subtitle: "Understanding this helps us find environments where you'll thrive",
          type: 'multiselect',
          options: [
            'Having too much responsibility or pressure on me',
            'Being in very loud, chaotic, or social environments',
            'Not knowing what\'s expected of me or having unclear directions',
            'Doing boring, repetitive tasks for long periods',
            'Being criticized or judged harshly by others',
            'Having too many deadlines or feeling constantly rushed',
            'Working completely alone without any interaction',
            'Having to follow very strict rules with no flexibility',
            'Being around conflict or tension between people',
            'Feeling like what I\'m doing doesn\'t matter or help anyone'
          ]
        },
        {
          id: 'core_values',
          question: "What matters most to you in life and work?",
          subtitle: "Your values will guide you to the right career path",
          type: 'ranking',
          options: [
            'Making a positive impact on society and helping others',
            'Having financial security and stability for my future',
            'Having creative freedom and being able to express myself',
            'Maintaining a good balance between work and personal life',
            'Continuously learning new things and growing as a person',
            'Getting recognition and achievement for my efforts',
            'Working directly with people and building relationships',
            'Having independence and control over my own decisions'
          ]
        }
      ]
    ]
  };
