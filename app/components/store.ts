import { Session } from "inspector/promises";
import { create } from "zustand";


interface StoreQuery{
    isOpen : boolean;
    isFixed : boolean;
    session : Session | null;
    userId : string | '';
    setOpen : (value : boolean)=> void;
    setFixed : (value : boolean) => void;
    setSession : (value : Session | null)=> void
    setUserId : (value : string) => void
}

const useStoreQuery = create<StoreQuery>((set)=>({
    isOpen : false,
    isFixed : false,
    session : null,
    userId : '',
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
    }))
}))

export default useStoreQuery