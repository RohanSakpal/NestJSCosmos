import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/azure-database';
import { Container } from '@azure/cosmos';
import { Projects } from './dto/projects.dto';
import { TargetGroups } from './dto/TargetGroups.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Projects) private readonly projectContainer: Container,
    @InjectModel(TargetGroups) private readonly targetGroupContainer: Container,
  ) {}

  async createProject(projectDto: Projects, targetGroups: TargetGroups[], files: Express.Multer.File[]): Promise<any> {
    try {
      const projectResponse = await this.projectContainer.items.create(projectDto);
  
      // Iterate through target groups and files to save them
      for (let i = 0; i < targetGroups.length; i++) {
        const tg = targetGroups[i];
        const file = files[i];
  
        tg.AudioName = file.originalname;  // Use the uploaded file name
        tg.filePath = `path/to/uploaded/files/${file.originalname}`;  // Path where the file is saved
  
        // Save the target group to Cosmos DB
        await this.targetGroupContainer.items.create(tg);
      }
  
      return { message: 'Project and target groups saved successfully' };
    } catch (error) {
      console.error('Failed to create project:', error);
      throw new Error('Failed to create project');
    }
  }
  
}
