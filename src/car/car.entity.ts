import { CosmosPartitionKey } from "@nestjs/azure-database";

@CosmosPartitionKey('make')
export class Car {
    id:string;
    make:string;
    model:string;
}