interface AddProductRequest {
    title: string;
    categoryId: string;
    price: number;
    content: string;
    imageFile?: File | null ;
}

export default AddProductRequest;