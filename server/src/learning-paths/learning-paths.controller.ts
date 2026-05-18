import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';
import { CreateLearningPathDto } from './dto/create-learning-path.dto';

@Controller('learning-paths')
export class LearningPathsController {
  constructor(private readonly service: LearningPathsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Post()
  create(@Body() dto: CreateLearningPathDto) {
    return this.service.create(dto);
  }

  @Put(':slug/courses/:courseId')
  addCourse(@Param('slug') slug: string, @Param('courseId') courseId: string, @Body() body: { order?: number }) {
    return this.service.addCourse(slug, Number(courseId), body?.order);
  }
}
