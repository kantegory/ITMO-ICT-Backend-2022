import express, {Request, Response } from 'express';
import db from "../../config/database.config";
import { Client } from '../../model/User/Users';
import UserError from '../../errors/users/index';
import UserService from '../../services/User/index';
import { ValidationErrorItem } from 'sequelize/types';
db.sync().then(() => {
  console.log('connect');
});

class Controller {
  private userService: UserService

  constructor() {
      this.userService = new UserService()
  }
  me = async (request: any, response: any) => {
    response.send(request.user)
  }
  create = async(request: any, response: any) => {
    const { body } = request
    try {
      const user : Client|UserError = await this.userService.create(body)
      response.status(201).send(user)
    } catch (error: any) {
      console.log(error)
      response.status(404).send({ "error": error.message})
    }
  }
  get = async(request: any, response: any) => {
    const user = await this.userService.getById(
      Number(request.params.id)
    )
    if (!user) {
      response.status(400).send('Not found')
    }
    else
      response.status(201).send(user)
  }
  getall = async(request: any, response: any) => {
    const user = await this.userService.findAll()
    response.status(201).send(user)
  }
  update = async(request: any, response: any) => {
    const id = Number(request.params.id)
    const { body} = request
    try {
      const user = await this.userService.update(id, body)
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
    const user = await this.userService.delete(
      Number(request.params.id)
    )
    if (!user) {
      response.status(400).send('Not found')
    }
    else
      response.status(201).send("Was delete")
  }
}
export default Controller