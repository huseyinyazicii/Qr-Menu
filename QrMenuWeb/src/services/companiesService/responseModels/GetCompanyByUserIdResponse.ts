interface GetCompanyByUserIdResponse {
    id: string;
    userId: string;
    name: string;
    isPay: boolean;
    dismissalDate: Date;
}

export default GetCompanyByUserIdResponse;
