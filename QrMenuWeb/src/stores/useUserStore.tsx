// import { create } from 'zustand';
// import RolesEnum from '../models/enums/RolesEnum';

// interface UserState {
//     email: string;
//     token: string;
//     role: RolesEnum;
//     isAuth: boolean;
// }

// const defaultValues = {
//     email: '',
//     role: RolesEnum.None,
//     token: '',
//     isAuth: false,
// }

// const useUserStore = create<UserState>()((set) => ({
//     ...defaultValues,
//     login: (email: string, token: string, role: RolesEnum) => set({ 
//         isAuth: true,
//         email,
//         token,
//         role,
//     }),
//     logout: () => set(defaultValues),
// }));

// export default useUserStore;
