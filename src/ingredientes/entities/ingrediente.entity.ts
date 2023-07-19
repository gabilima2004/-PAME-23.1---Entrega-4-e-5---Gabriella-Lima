import { Produto } from "src/produtos/entities/produto.entity"
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm"

export class Ingrediente {
    
    //Gerar um id para cada ingrediente
    @PrimaryGeneratedColumn()
    id:number

    //Adicionar um nome para um ingrediente
    @Column()
    name:string

    //Adicionar a quantidade de um ingrediente
    @Column()
    amount:number

    //Adicionar se um ingrediente precisa ser encomendado ou não
    @Column()
    encomendado:boolean

    //Adicionar o status de um ingrediente
    @Column()
    status:string

    //Saber a data que o produto foi adicionado
    @Column()
    createdAt:Date

    //Armazenar as associações entre os ingredientes e os produtos
    @ManyToMany(() => Produto)
    @JoinTable()
    produtos: Produto[];

}
