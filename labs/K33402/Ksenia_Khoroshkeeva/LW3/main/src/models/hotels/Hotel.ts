import {Table, Column, Model, AllowNull, HasMany, DefaultScope, Scopes} from "sequelize-typescript";
import Room from "./Room";

@DefaultScope(() => ({
    attributes: ['id', 'name', 'city', 'stars']
}))
@Scopes(() => ({
    full: {
        attributes: ['id', 'name', 'city', 'stars'],
        include: [{
            model: Room,
            attributes: ['id', 'name', 'capacity', 'price']
        }],
        nest: true
    }
}))
@Table
class Hotel extends Model {
    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    city: string;

    @AllowNull(false)
    @Column
    stars: number;

    @HasMany(() => Room)
    rooms: Room[];
}

export default Hotel;
