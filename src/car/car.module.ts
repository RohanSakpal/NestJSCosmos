import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { Module } from '@nestjs/common';
import { Car } from './car.entity';
import { CarController } from './car.controller';

@Module({
    imports: [
        AzureCosmosDbModule.forFeature([{
            collection: 'Car',
            dto:Car
        }])
    ],
    controllers: [CarController]
})
export class CarModule {}
