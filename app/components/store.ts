import { create } from "zustand";


interface StoreQuery{
    isOpen : boolean;
    isFixed : boolean;
    setOpen : (value : boolean)=> void;
    setFixed : (value : boolean) => void
}

const useStoreQuery = create<StoreQuery>((set)=>({
    isOpen : false,
    isFixed : false,
    setOpen : (value) => set(()=> ({
        isOpen : value
    })),
    setFixed : (value)=> set(()=> ({
        isFixed : value
    }))
}))

export default useStoreQuery