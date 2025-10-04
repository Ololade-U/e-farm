import { create } from "zustand";


interface StoreQuery{
    isOpen : boolean;
    setOpen : (value : boolean)=> void;
}

const useStoreQuery = create<StoreQuery>((set)=>({
    isOpen : false,
    setOpen : (value) => set(()=> ({
        isOpen : value
    })),
}))

export default useStoreQuery