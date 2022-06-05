import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hotels')
export class Hotel {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        length: 511
    })
    name: string;


    @Column({
        length: 1023
    })
    address: string;

    @Column({
        length: 2047
    })
    img_url: string;

    @Column({
        type: 'text'
    })
    description: string;

    @Column({
        type: 'float', nullable: true
    })
    rating: number

    @Column({
        type: 'float', nullable: true
    })
    cost_from: number

}

export default Hotel
