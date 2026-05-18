import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';

@Injectable()
export class LearningPathsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.learningPath.findMany({ include: { pathCourses: { include: { course: true } } } });
  }

  async findBySlug(slug: string) {
    const path = await this.prisma.learningPath.findUnique({ where: { slug }, include: { pathCourses: { include: { course: true } } } });
    if (!path) throw new NotFoundException(`LearningPath not found: ${slug}`);
    return path;
  }

  async create(data: CreateLearningPathDto) {
    return this.prisma.learningPath.create({ data });
  }

  async addCourse(slug: string, courseId: number, order?: number) {
    const path = await this.prisma.learningPath.findUnique({ where: { slug }, include: { pathCourses: true } });
    if (!path) throw new NotFoundException(`LearningPath not found: ${slug}`);

    const nextOrder = order ?? (path.pathCourses.length + 1);

    return this.prisma.pathCourse.create({ data: { learningPathId: path.id, courseId, order: nextOrder } });
  }
}
