interface RolesType {
    [key: string]: string;
}

const Roles: RolesType = {
    Admin: 'admin',
    Customer: 'customer',
    None: 'none',
};

export default Roles;