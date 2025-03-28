import { IsString, IsEmail, IsOptional, IsInt, Min, IsArray, MinLength, ValidateNested, IsNotEmpty } from 'class-validator';

export class Example {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    age: number;

    @IsOptional()
    @IsString()
    address?: string;
}

export class ExampleRequest {
    @IsArray()
    @ValidateNested({ each: true })
    examples: Example[]
}