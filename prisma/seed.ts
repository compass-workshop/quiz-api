import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for Users
  const existingUsersCount = await prisma.user.count();
  console.log('existingUsersCount', existingUsersCount);
  if (existingUsersCount === 0) {
    const users = [
      {
        firstname: 'Praveen',
        lastname: 'Kumar',
        email: 'praveen.kumar@mailsac.com',
      },
      {
        firstname: 'Sarthak',
        lastname: 'Jain',
        email: 'sarthak.jain@mailsac.com',
      },
      {
        firstname: 'Nirmal',
        lastname: 'Kumar',
        email: 'nirmal.kumar@mailsac.com',
      },
      {
        firstname: 'Ashmeet',
        lastname: 'Kaur',
        email: 'ashmeet.kaur@mailsac.com',
      },
      {
        firstname: 'Manoj',
        lastname: 'Saini',
        email: 'manoj.saini@mailsac.com',
      },
      {
        firstname: 'Susanto',
        lastname: 'Mandal',
        email: 'susanto.mandal@mailsac.com',
      },
      {
        firstname: 'Rohan',
        lastname: 'Goel',
        email: 'rohan.goel@mailsac.com',
      },
      {
        firstname: 'Gopal',
        lastname: 'Gupta',
        email: 'gopal.gupta@mailsac.com',
      },
      {
        firstname: 'Rohit',
        lastname: 'Kumar',
        email: 'rohit.kumar@mailsac.com',
      },
      // Add more user data here...
    ];

    const seededUsers = await prisma.user.createMany({
      data: users,
    });

    console.log('seededUsers', seededUsers);
  }

  // Seed data for Questions and tests only if its not already seeded
  const existingQuestionsCount = await prisma.question.count();
  console.log('existingQuestionsCount', existingQuestionsCount);
  if (existingQuestionsCount === 0) {
    const questionsToSeed = [
      {
        text: 'What is the capital of Italy?',
        type: 'Multiple Choice',
        options: ['Paris', 'Rome', 'Berlin', 'Madrid'],
        maxScore: 1,
        answer: 'Rome',
      },
      {
        text: 'Which gas do plants absorb from the atmosphere?',
        type: 'Multiple Choice',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        maxScore: 1,
        answer: 'Carbon Dioxide',
      },
      {
        text: 'What is the largest mammal in the world?',
        type: 'Multiple Choice',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Lion'],
        maxScore: 1,
        answer: 'Blue Whale',
      },
      {
        text: 'Which planet is known as the Red Planet?',
        type: 'Multiple Choice',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        maxScore: 1,
        answer: 'Mars',
      },
      {
        text: 'Who wrote the play "Romeo and Juliet"?',
        type: 'Multiple Choice',
        options: [
          'Charles Dickens',
          'William Shakespeare',
          'Jane Austen',
          'Mark Twain',
        ],
        maxScore: 1,
        answer: 'William Shakespeare',
      },
      {
        text: 'Which element has the chemical symbol "H"?',
        type: 'Multiple Choice',
        options: ['Hydrogen', 'Helium', 'Carbon', 'Oxygen'],
        maxScore: 1,
        answer: 'Hydrogen',
      },
      {
        text: 'What is the largest desert in the world?',
        type: 'Multiple Choice',
        options: [
          'Sahara Desert',
          'Gobi Desert',
          'Antarctica',
          'Arabian Desert',
        ],
        maxScore: 1,
        answer: 'Antarctica',
      },
      {
        text: 'Which country is known as the Land of the Rising Sun?',
        type: 'Multiple Choice',
        options: ['China', 'India', 'Japan', 'South Korea'],
        maxScore: 1,
        answer: 'Japan',
      },
      {
        text: 'What is the chemical symbol for gold?',
        type: 'Multiple Choice',
        options: ['Au', 'Ag', 'Fe', 'Cu'],
        maxScore: 1,
        answer: 'Au',
      },
      {
        text: 'Which planet is known as the Evening Star?',
        type: 'Multiple Choice',
        options: ['Mars', 'Venus', 'Mercury', 'Jupiter'],
        maxScore: 1,
        answer: 'Venus',
      },
      {
        text: 'What is the largest organ in the human body?',
        type: 'Multiple Choice',
        options: ['Liver', 'Brain', 'Skin', 'Heart'],
        maxScore: 1,
        answer: 'Skin',
      },
      {
        text: 'Which gas is most abundant in the Earth atmosphere?',
        type: 'Multiple Choice',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
        maxScore: 1,
        answer: 'Nitrogen',
      },
      {
        text: 'Who is the author of "To Kill a Mockingbird"?',
        type: 'Multiple Choice',
        options: ['Fitzgerald', 'Harper Lee', 'J.K. Rowling', 'George Orwell'],
        maxScore: 1,
        answer: 'Harper Lee',
      },
      {
        text: 'Which planet is known as the "Red Planet"?',
        type: 'Multiple Choice',
        options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        maxScore: 1,
        answer: 'Mars',
      },
      {
        text: 'What is the chemical symbol for silver?',
        type: 'Multiple Choice',
        options: ['Si', 'Ag', 'Fe', 'Au'],
        maxScore: 1,
        answer: 'Ag',
      },
      {
        text: 'Which continent is the largest by land area?',
        type: 'Multiple Choice',
        options: ['Africa', 'Asia', 'North America', 'Australia'],
        maxScore: 1,
        answer: 'Asia',
      },
      {
        text: 'Who is often called the "Father of Modern Physics"?',
        type: 'Multiple Choice',
        options: [
          'Isaac Newton',
          'Albert Einstein',
          'Galileo Galilei',
          'Nikola Tesla',
        ],
        maxScore: 1,
        answer: 'Albert Einstein',
      },
      {
        text: 'Which gas is responsible for the green color of leaves?',
        type: 'Multiple Choice',
        options: ['Oxygen', 'Carbon Dioxide', 'Chlorine', 'Methane'],
        maxScore: 1,
        answer: 'Chlorine',
      },
      {
        text: 'What is the chemical symbol for water?',
        type: 'Multiple Choice',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        maxScore: 1,
        answer: 'H2O',
      },
      {
        text: 'Which country is known as the "Land of the Midnight Sun"?',
        type: 'Multiple Choice',
        options: ['Norway', 'Canada', 'Sweden', 'Alaska'],
        maxScore: 1,
        answer: 'Norway',
      },
    ];

    const seededQuestions = await Promise.all(
      questionsToSeed.map((question) =>
        prisma.question.create({ data: question }),
      ),
    );

    console.log('seededQuestions', seededQuestions);

    const testsToSeed = [];
    const questionsPerTest = 5;

    for (let i = 1; i <= 4; i++) {
      testsToSeed.push({
        name: `Quiz ${i}`,
        questions: {
          connect: seededQuestions.slice(i, i + questionsPerTest).map((q) => {
            return { id: q.id };
          }),
        },
      });
    }

    const seededTests = await Promise.all(
      testsToSeed.map((test) => prisma.test.create({ data: test })),
    );

    console.log('seededTests', seededTests);
  }
}

main()
  .then(async () => {
    console.log('seeding completed!!!');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
