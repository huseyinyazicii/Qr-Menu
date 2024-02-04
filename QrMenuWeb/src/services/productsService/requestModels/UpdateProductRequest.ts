interface UpdateProductRequest {
    id: string;
    title: string;
    price: number;
    content: string;
    imageFile?: File | null ;
}

export default UpdateProductRequest;