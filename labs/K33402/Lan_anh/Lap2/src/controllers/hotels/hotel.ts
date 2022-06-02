import express, {Request, Response } from 'express';
import db from "../../config/database.config";
import { Hotel } from '../../model/Hotel/Hotel';
import UserError from '../../errors/users/index';
import HotelService from '../../services/Hotels/hotel';
import { ValidationErrorItem } from 'sequelize/types';
db.sync().then(() => {
  console.log('connect');
});

class HotelController {
  private hotelService: HotelService

  constructor() {
      this.hotelService = new HotelService()
  }
  create = async(request: any, response: any) => {
    const { body } = request
    try {
      const user : Hotel|UserError = await this.hotelService.create(body)
      response.status(201).send(user)
    } catch (error: any) {
      console.log(error)
      response.status(404).send({ "error": error.message})
    }
  }
  getbyname = async(request: any, response: any) => {
    const user = await this.hotelService.getbyname(String(request.params.Name))
    if (!user) {
      response.status(400).send('Not found')
    }
    else
      response.status(201).send(user)
  }
  getall = async(request: any, response: any) => {
    const user = await this.hotelService.findAll()
    response.status(201).send(user)
  }
  update = async(request: any, response: any) => {
    const id = Number(request.params.id)
    const { body} = request
    try {
      const user = await this.hotelService.update(id, body)
      if (user)
        response.status(201).send(user)
      else
        response.status(400).send('Not found')
    } catch (error: any) {
      console.log(error)
      response.status(404).send({ "error": error.message})
    }
  }
  delete = async(request: any, response: any) => {
    const user = await this.hotelService.delete(
      Number(request.params.id)
    )
    if (!user) {
      response.status(400).send('Not found')
    }
    else
      response.status(201).send("Was delete")
  }
}
export default HotelController