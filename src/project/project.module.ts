import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Projects } from './dto/Projects.dto';
import { TargetGroups } from './dto/TargetGroups.dto';

@Module({
    imports: [
        AzureCosmosDbModule.forFeature([
          {
            collection: 'Projects',   // Name of the Project collection in Cosmos DB
            dto: Projects,         // DTO for Project collection
          },
          {
            collection: 'TargetGroups',  // Name of the TargetGroup collection in Cosmos DB
            dto: TargetGroups,        // DTO for TargetGroup collection
          },
        ]),
      ],
    controllers: [ProjectController],
    providers: [ProjectService]
})
export class ProjectModule {

}
