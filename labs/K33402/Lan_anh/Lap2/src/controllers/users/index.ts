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
}
export default Controller