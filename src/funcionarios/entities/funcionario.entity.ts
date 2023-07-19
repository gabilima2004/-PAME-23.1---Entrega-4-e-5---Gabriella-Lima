import { Produto } from "src/produtos/entities/produto.entity"
import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from "typeorm"


@Entity({name: 'funcionarios'})
export class Funcionario {

    //Gerar um id para cada funcionário
    @PrimaryGeneratedColumn()
    id:number

    //Adicionar um username para cada funcionário
    @Column()
    username:string

    //Adicionar uma senha para cada funcionário
    @Column()
    password:string

    //Saber a data que o username foi criado
    @Column()
    createdAt:Date

    //Relacionando os funcionários com os produtos
    @ManyToMany(() => Produto)
    @JoinTable()
    produtos: Produto[];

}


