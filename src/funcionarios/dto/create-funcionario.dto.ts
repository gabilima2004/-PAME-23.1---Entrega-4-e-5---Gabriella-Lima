import { IsNotEmpty, IsString, Min,  } from "class-validator";

export class CreateFuncionarioDto {

    //Criar um username, 'obrigando' o usuário a digitar algo
    @IsNotEmpty()
    @IsString()
    username:string;

    //Criar uma senha com no mínimo 8 caracteres
    @IsString()
    @Min(8)
    password:string;
}
