import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class RoutesDto {
    [country: string]: { [destination: string]: number }
}

export class ShortestPathDto {
    @IsNotEmpty()
    @IsObject()
    graph: RoutesDto

    @IsNotEmpty()
    @IsString()
    startCountry: string

    @IsNotEmpty()
    @IsString()
    endCountry: string
}