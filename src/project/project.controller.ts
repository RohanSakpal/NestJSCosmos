import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Projects } from './dto/Projects.dto';
import { TargetGroups } from './dto/TargetGroups.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('create')
    @UseInterceptors(FilesInterceptor('files'))
    async createProject(
      @Body() body: any,    // Changed this line to ensure it's properly received
      @UploadedFiles() files: Express.Multer.File[],
    ) {
      const projectDto: Projects = JSON.parse(body.project);  // Parse project JSON string
      const targetGroups: TargetGroups[] = JSON.parse(body.targetGroups);
      return await this.projectService.createProject(projectDto, targetGroups, files);
    }
}
