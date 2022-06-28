import {Table, Column, Model, AllowNull, ForeignKey, BelongsTo, DefaultScope, Scopes} from "sequelize-typescript";
import Hotel from "./Hotel";


@DefaultScope(() => ({
    attributes: ['id', 'name', 'capacity', 'price']
}))
@Scopes(() => ({
    full: {
        attributes: ['id', 'name', 'capacity', 'price'],
        include: [{
            model: Hotel,
            attributes: ['id', 'name', 'city', 'stars']
        }],
        nest: true
    }
}))
@Table
class Room extends Model {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    capacity: number;

    @AllowNull(false)
    @Column
    price: number;

    @ForeignKey(() => Hotel)
    hotelId: number;

    @BelongsTo(() => Hotel)
    hotel: Hotel;
}

export default Room;
