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
        {
          title: 'Introducción a Java',
          content: 'Comprende cómo funciona un programa Java, la estructura de clases y el método main. Este enunciado te prepara para escribir tu primer programa.',
          order: 1,
          courseId: javaCourse.id,
        },
        {
          title: 'Tipos y variables',
          content: 'Aprende los tipos primitivos, cómo declarar variables y cómo imprimir valores en consola. Usa ejemplos claros de int, String y boolean.',
          order: 2,
          courseId: javaCourse.id,
        },
      ],
    });
  }

  if (jsCourse) {
    await prisma.lesson.createMany({
      data: [
        {
          title: 'Funciones modernas',
          content: 'Construye funciones modernas usando arrow syntax y aprende cómo pasar datos con callbacks. El ejercicio es crear funciones que transformen valores.',
          order: 1,
          courseId: jsCourse.id,
        },
        {
          title: 'Asincronía',
          content: 'Gestiona código asíncrono con Promises y async/await, y aprende a llamar una API simulada. El enunciado te pide escribir una función que espere una respuesta.',
          order: 2,
          courseId: jsCourse.id,
        },
      ],
    });
  }

  if (pythonCourse) {
    await prisma.lesson.createMany({
      data: [
        {
          title: 'Sintaxis básica',
          content: 'Entiende variables, operadores y estructuras simples en Python. El enunciado explica cómo escribir tu primer script.',
          order: 1,
          courseId: pythonCourse.id,
        },
        {
          title: 'Funciones y módulos',
          content: 'Organiza tu código en funciones y usa módulos para separarlo. El ejercicio propone crear funciones reutilizables.',
          order: 2,
          courseId: pythonCourse.id,
        },
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
