import { IsNotEmpty, IsString, IsNumber } from "class-validator";

//Controle de estoque dos ingredientes para fazer os sorvetes
export class CreateIngredienteDto {

    @IsNotEmpty()
    @IsString()
    name:string;
    
    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @IsNotEmpty()
    encomendado: boolean; 

    @IsNotEmpty()
    @IsString()
    status: string; 

}
