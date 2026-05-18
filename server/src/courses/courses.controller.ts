import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses() {
    return this.coursesService.findAll();
  }

  @Get(':slug')
  async getCourse(@Param('slug') slug: string) {
    return this.coursesService.findBySlug(slug);
  }
}
