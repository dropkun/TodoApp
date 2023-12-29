import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import { ObjectId } from 'bson'
import cors from 'cors'

const app = express()
const port = 3001
const prisma = new PrismaClient();
var corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post(`/task`, async (req, res) => {
  const { title } = req.body
  var currentDate = new Date()
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1;
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var date = year +"/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
  var result = await prisma.tasks.create({
    data: {
      title,
      date,
      isCompleted: false,
    }
  })
  console.log(result);
  res.json(result)
})

app.get('/tasks', async(req, res) => {
  const tasks = await prisma.tasks.findMany()
  console.log(tasks)
  res.json(tasks)
})

app.put('/task/:id', async (req, res) => {
  const { id } = req.params
  const { isCompleted } = req.body;
  const task = await prisma.tasks.update({
    where: { id },
    data: {
      isCompleted
    }
  });
  res.json(task);
})

app.delete('/task/:id', async (req, res) => {
  const { id } = req.params
  const task = await prisma.tasks.delete({
    where: {
      id,
    },
  })
  res.json(task)
})