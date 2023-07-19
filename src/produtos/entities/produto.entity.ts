import { Ingrediente } from "src/ingredientes/entities/ingrediente.entity";
import { PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";

export class Produto {

    //Gerar um id para cada produto
    @PrimaryGeneratedColumn()
    id:number

    //Adicionar um nome para um produto
    @Column()
    name:string

    //Adicionar um preço para um produto
    @Column()
    price:number

    //Adicionar uma quantidade para um produto
    @Column()
    amount:number

    //Saber a data que o produto foi adicionado
    @Column()
    createdAt:Date

    //Armazenar as associações entre os ingredientes e os produtos
    @ManyToMany(() => Ingrediente, (ingrediente) => ingrediente.produtos)
    @JoinTable()
    ingredientes: Ingrediente[];
}
