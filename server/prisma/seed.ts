import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.course.createMany({
    data: [
      {
        title: 'Java Essentials',
        slug: 'java-essentials',
        description: 'Aprende los fundamentos de Java paso a paso.',
      },
      {
        title: 'JavaScript Avanzado',
        slug: 'javascript-avanzado',
        description: 'Domina conceptos clave de JavaScript moderno.',
      },
      {
        title: 'Python para Desarrolladores',
        slug: 'python-para-desarrolladores',
        description: 'Construye bases sólidas en Python y automatización.',
      },
    ],
  });

  const javaCourse = await prisma.course.findUnique({ where: { slug: 'java-essentials' } });
  const jsCourse = await prisma.course.findUnique({ where: { slug: 'javascript-avanzado' } });
  const pythonCourse = await prisma.course.findUnique({ where: { slug: 'python-para-desarrolladores' } });

  if (javaCourse) {
    await prisma.lesson.createMany({
      data: [
        { title: 'Introducción a Java', content: 'Aprende la sintaxis básica de Java.', order: 1, courseId: javaCourse.id },
        { title: 'Tipos y variables', content: 'Comprende tipos primitivos y variables.', order: 2, courseId: javaCourse.id },
      ],
    });
  }

  if (jsCourse) {
    await prisma.lesson.createMany({
      data: [
        { title: 'Funciones modernas', content: 'Arrow functions y callbacks.', order: 1, courseId: jsCourse.id },
        { title: 'Asincronía', content: 'Promises, async/await y fetch.', order: 2, courseId: jsCourse.id },
      ],
    });
  }

  if (pythonCourse) {
    await prisma.lesson.createMany({
      data: [
        { title: 'Sintaxis básica', content: 'Variables, tipos y operadores.', order: 1, courseId: pythonCourse.id },
        { title: 'Funciones y módulos', content: 'Organiza tu código en Python.', order: 2, courseId: pythonCourse.id },
      ],
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
