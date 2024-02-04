interface ListUsersResponse {
    id: string;
    name: string;
    userName: string;
    email: string;
    createdDate: Date,
    isActive: boolean;
    role: string;
}

export default ListUsersResponse;