import { authService } from "./authService";
import { measurementsService } from "./measurementsServices";
import { productCategoriesServices } from "./productCategoriesServices";
import { productsService } from "./productsServices";
import { requestsServices } from "./requestsServices";
import { structuralSubDivisionCategoriesServices } from "./structuralSubDivisionCategoriesServices";
import { usersService } from "./usersServices";

// todo исправить any
export const services: any[] = [
	authService,
	usersService,
	structuralSubDivisionCategoriesServices,
	productCategoriesServices,
	productsService,
	measurementsService,
	requestsServices,
];
