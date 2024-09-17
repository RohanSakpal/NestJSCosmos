import { Container } from '@azure/cosmos';
import { InjectModel } from '@nestjs/azure-database';
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { Car } from './car.entity';
import { ICarDto } from './car.dto';

@Controller('car')
export class CarController {
    constructor(@InjectModel(Car) private readonly carContainer:Container) {}

    @Get('all')
    async getCars() {
        var sqlQuery = "select * from c";

        var cosmosResults = await this.carContainer.items.query<Car>(sqlQuery)
        .fetchAll();

        var result = cosmosResults.resources.map<ICarDto>((value) => {
            return {
                id: value.id,
                make: value.make,
                model: value.model
            }
        });
        return result;
    }

    @Post('create')
    async create(@Body() payload: ICarDto) {
        var newCar = new Car();
        newCar.id = '2';
        newCar.make = payload.make;
        newCar.model = payload.model;

        var { resource } = await this.carContainer.items.create(newCar);
        return {
            id: resource.id,
            make: resource.make,
            model: resource.model,
        };

    }

    @Put('update')
    async update(@Body() payload: ICarDto) {
        var CarUpdate = new Car();
        CarUpdate.id = payload.id;
        CarUpdate.make = payload.make;
        CarUpdate.model = payload.model;

        var { resource } = await this.carContainer.items.upsert(CarUpdate);
        return {
            id: resource.id,
            make: resource.make,
            model: resource.model,
        };
    }

    @Delete('remove')
    async remove(@Query('id') id:string, @Query('partitionkey') partitionkey:string) {
        await this.carContainer.item(id,partitionkey).delete();
        return 'Deleted!'
    }
}
