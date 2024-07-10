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


  app.get("/",(req,res)=>{
    return res.json({
      status:'success',
      code:200,
      message:"Welcome to Referral API"
    })
  })

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
