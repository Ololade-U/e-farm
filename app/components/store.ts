import { Session } from "inspector/promises";
import { create } from "zustand";


interface StoreQuery{
    isOpen : boolean;
    isFixed : boolean;
    session : Session | null;
    setOpen : (value : boolean)=> void;
    setFixed : (value : boolean) => void;
    setSession : (value : Session | null)=> void
}

const useStoreQuery = create<StoreQuery>((set)=>({
    isOpen : false,
    isFixed : false,
    session : null,
    setOpen : (value) => set(()=> ({
        isOpen : value
    })),
    setFixed : (value)=> set(()=> ({
        isFixed : value
    })),
    setSession : (value) => set(()=> ({
        session : value
    }))
}))

export default useStoreQuery