import { Module } from '@nestjs/common';

import { CarModule } from './car/car.module';
import {MongooseModule} from '@nestjs/mongoose'
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.yvxzt.mongodb.net/Car?retryWrites=true&w=majority'),
    CarModule]
  
})
export class AppModule {}
