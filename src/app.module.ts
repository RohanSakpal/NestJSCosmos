import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { CarModule } from './car/car.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [AzureCosmosDbModule.forRoot({
    dbName: 'marico-gpt',
    endpoint:'',
    key:''
  }), CarModule,ProjectModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
