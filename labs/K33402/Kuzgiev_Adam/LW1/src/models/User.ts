import { Table, Column, Model } from 'sequelize-typescript'

@Table
export default class User extends Model {
  @Column
  nickname: string

  @Column
  password: string

  @Column
  email: string
}