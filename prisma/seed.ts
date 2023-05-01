import { PrismaClient } from '@prisma/client';

// const { hash } = require('bcrypt')
const prisma = new PrismaClient()

async function main() {
    console.log(await prisma.user.findFirst())

    const todos = await prisma.todo.createMany({
        data: [
            { title: 'Dummy task 1', description: 'Dummy task 1', authorId: 'clh3ktyz800009y65djse8p3w' },
            { title: 'Dummy task 2', description: 'Dummy task 2', authorId: 'clh3ktyz800009y65djse8p3w' },
            { title: 'Dummy task 3', description: 'Dummy task 3', authorId: 'clh3ktyz800009y65djse8p3w' },
            { title: 'Dummy task 4', description: 'Dummy task 4', authorId: 'clh3ktyz800009y65djse8p3w' },
            { title: 'Dummy task 5', description: 'Dummy task 5', authorId: 'clh3ktyz800009y65djse8p3w' },
        ]
    })

    console.log(todos)




    //   const password = await hash('test', 12)
    //   const user = await prisma.user.upsert({
    //     where: { email: 'test@test.com' },
    //     update: {},
    //     create: {
    //       email: 'test@test.com',
    //       name: 'Test User',
    //       password
    //     }
    //   })
    //   console.log({ user })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })