import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateProdutoDto {
    
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    price:number;
    
    @IsNotEmpty()
    @IsNumber()
    amount:number;

    @ArrayNotEmpty()
    @IsString({ each: true })
    ingredients: string[];
}
    