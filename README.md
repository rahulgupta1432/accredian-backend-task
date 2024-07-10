# accredian-backend-task
Backend task for Accredian
first cd to prisma and enter this command for generating tables
npx prisma migrate dev --name init
<!-- this command for the particular tables -->
npx prisma migrate
<!-- this command for all tables -->

<!-- here is project flow -->
accredian-backend-task/
│
├── prisma/
│   ├── migrations/
│   │   ├── ...
│   │
│   ├── schema.prisma
│
├── src/
│   ├── controllers/
│   │   ├── referralController.js
│   │
│   ├── routes/
│   │   ├── referralRoutes.js
│   │
│   ├── utils/
│   │   ├── email.js
│   │
│   ├── index.js
│
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── README.md
└── ...


here is go with database url
DATABASE_URL=mysql://username:password@host:port/database_name
