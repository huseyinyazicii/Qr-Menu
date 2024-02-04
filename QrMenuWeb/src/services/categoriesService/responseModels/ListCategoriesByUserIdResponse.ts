import ProductModel from "../../../models/ProductModel";

interface ListCategoriesByUserIdResponse {
    id: string;
    name: string;
    imagePath?: string;
    isActive: boolean;
    products: ProductModel[];
}

export default ListCategoriesByUserIdResponse;
