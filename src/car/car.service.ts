import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CarDto } from './car.dto';
// import {CARS} from './cars.mock';
import { ICar } from './interfaces/car.interface';
const carProjection = {
    __v:false,
    _id:false
}
@Injectable()
export class CarService {
    constructor(@InjectModel('Car')  private carModel:Model<ICar>){

    }
    // private cars = CARS;
    public async getCars():Promise<CarDto[]>{
        const cars = await this.carModel.find({},carProjection).exec()
        if(!cars){
            throw new HttpException("No cars found.",404)
        }
        return cars
        // return this.cars;
    }
    public async postCar(MyNewCar:CarDto){
        // if(!newCar){
        //     throw new HttpException("Please provide some content.",500)
        // }
        const car = await new this.carModel(MyNewCar);
        if(!car){
            throw new HttpException("Not able to add.",500)

        }
        return car.save();
    }

    public async getCarById(id:number):Promise<CarDto>{
        const cars = await this.carModel.findOne({id},carProjection).exec()
        if(!cars){
            throw new HttpException("No cars found.",404)
        }
        return cars
        // const carId = Number(id)
        // return new Promise((resolve)=>{

        //     const car = this.cars.find((cars)=> cars.id === carId)
        //     if(!car){
        //         throw new HttpException("No cars found with this id.",404)
        //     }
        //     return resolve(car);
        // })
    }

    public async deleteCarById(id:number):Promise<any>{
        const cars = await this.carModel.deleteOne({id}).exec()
        if(cars.deletedCount === 0){
            throw new HttpException("No cars found.",404)
        }
        return cars
        // const carId = Number(id)
        // return new Promise((resolve)=>{

        //     const findCar = this.cars.find((cars)=> cars.id === carId)
        //     const findCarIndex = this.cars.findIndex((cars)=> cars.id === carId)

        //     if(!findCar){
        //         throw new HttpException("No car found with this id.",404)
        //     }else{
        //         this.cars.splice(findCarIndex,1)
                
        //         return resolve(this.cars);
        //     }
        // })
    }

    public async putCarById(id:number,propertyName:string,propertyValue:string):Promise<CarDto>{
        const cars = await this.carModel.findOneAndUpdate({id},{[propertyName]:propertyValue}).exec()
        if(!cars){
            throw new HttpException("No cars found.",404)
        }
        return cars
        // const carId = Number(id)
        // return new Promise((resolve)=>{

        //     const findCar = this.cars.find((cars)=> cars.id === carId)
        //     const findCarIndex = this.cars.findIndex((cars)=> cars.id === carId)
        //     if(!findCar){
        //         throw new HttpException("No car found with this id.",404)
    
        //     }else{
        //         this.cars[findCarIndex][propertyName] = propertyValue
        //         return resolve(this.cars);
        //     }
        // })
        
    }
}
