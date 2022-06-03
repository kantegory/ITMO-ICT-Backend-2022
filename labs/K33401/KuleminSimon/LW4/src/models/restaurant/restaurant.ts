import {Optional, Model, DataTypes} from "sequelize";
import {sequelize} from "../index";

interface RestaurantAttributes {
  name: string;
  address: string;
  cuisine: string;
  average_bill: number;
  rating: number;
  info: string;
}

interface RestaurantCreationAttributes
    extends Optional<RestaurantAttributes, 'info'> {}

interface RestaurantInstance extends Model<RestaurantAttributes, RestaurantCreationAttributes>, RestaurantAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Restaurant = sequelize.define<RestaurantInstance>(
    'Restaurant',
    {
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      cuisine: {
        type: DataTypes.STRING,
      },
      average_bill: {
        type: DataTypes.NUMBER,
      },
      rating: {
        type: DataTypes.NUMBER,
      },
      info: {
        type: DataTypes.STRING,
      }
    }
)

export default Restaurant