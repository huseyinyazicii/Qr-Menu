const Paths = {
    base: '/',
    all: '*',
    login: '/login',
    restaurant: '/restaurant/:id',
    unauthorized: '/unauthorized',
    error: '/error',
    admin: {
        all: '/admin/*',
        base: '/admin',
        home: '/home',
        users: '/users',
    },
    customer: {
        all: '/customer/*',
        base: '/customer',
        home: '/home',
        categories: '/categories',
        products: '/products',
        preview: '/preview',
    },
};

export default Paths;