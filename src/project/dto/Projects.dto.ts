import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('ProjId')
export class Projects {
    ProjId: number;
    ProjName: string;
    UserId: string;
    TGIds: string[];
  }