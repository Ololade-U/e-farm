import { Session } from "inspector/promises";
import { create } from "zustand";


interface StoreQuery{
    isOpen : boolean;
    isFixed : boolean;
    session : Session | null;
    userId : string | '';
    userExist : boolean;
    userNameExist : boolean;
    main : string;
    postId : string;
    setOpen : (value : boolean)=> void;
    setFixed : (value : boolean) => void;
    setSession : (value : Session | null)=> void
    setUserId : (value : string) => void
    setUser : (value : boolean) => void
    setUserName  : (value : boolean) => void
    setMain : (value : string) => void
    setPostId : (value : string) => void
}

const useStoreQuery = create<StoreQuery>((set)=>({
    isOpen : false,
    isFixed : false,
    session : null,
    userId : '',
    userExist : false,
    userNameExist : false,
    postId : '',
    main : 'My Products',
    setOpen : (value) => set(()=> ({
        isOpen : value
    })),
    setFixed : (value)=> set(()=> ({
        isFixed : value
    })),
    setSession : (value) => set(()=> ({
        session : value
    })),
    setUserId : (value) => set(()=> ({
        userId : value
    })),
    setUser : (value) => set(() => ({
        userExist : value
    })),
    setUserName : (value) => set(()=> ({
        userNameExist : value
    })),
    setMain : (value) => set(()=>({
        main : value
    })),
    setPostId : (value) => set(()=> ({
        postId : value
    }))
}))

export default useStoreQuery