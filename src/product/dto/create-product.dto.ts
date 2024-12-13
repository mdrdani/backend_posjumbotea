import { Category } from "@prisma/client";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @Min(0)
    stock: number;

    @IsEnum(Category, { message: "category must be one of FOOD, DRINK, or SNACK" })
    category: Category;

    @IsString()
    @IsOptional()
    image: string;

    @IsBoolean()
    is_best_seller: boolean;
}
