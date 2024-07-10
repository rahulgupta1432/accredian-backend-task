const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const referralRoutes = require('./routes/referralRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api",referralRoutes);


async function main() {
  await prisma.$connect();
  console.log('Connected to database');
}

main()
  .catch((e) => {
      throw e;
  })
  .finally(async () => {
      await prisma.$disconnect();
  });


  app.get("/", (req, res) => {
    const message = {
          status: "success",
          code: 200,
          message: "Welcome To Accredian Referral Backend",
          data: prisma.$isConnected ? "Connected to MySQL" : "Not connected to MySQL"
    };

    const htmlResponse = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Accredian API</title>
      </head>
      <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333333;">Welcome to Referral Backend👋</h1>
          <b>${message.data}</b>
          <p style="color: #666666;">This is the first Landing Page to <b>Referral Backend Project!</b></p>
        </div>
      </body>
      </html>
    `;

    res.send(htmlResponse);
});

  // async function hell(){
    
  //   const referral = await prisma.referral.create({
  //     data: {
  //       referee: 'rahul', // Replace with dynamic value: refereeName
  //       referrer: 'rahul', // Replace with dynamic value: referrerName
  //     },
  //   });
  //   console.log("inside",referral)
  // }
  // hell();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports=app;