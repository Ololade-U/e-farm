import { Session } from "inspector/promises";
import { create } from "zustand";
import { Products } from "../hooks/usePosts";

interface Quantity {
  productId: string;
  quantity: number;
}

interface StoreQuery {
  isOpen: boolean;
  isFixed: boolean;
  session: Session | null;
  userId: string | "";
  userExist: boolean;
  userNameExist: boolean;
  main: string;
  postId: string;
  cart: string[];
  searchParam: string;
  quantity: Quantity[];
  products: Products[] | null;
  setOpen: (value: boolean) => void;
  setFixed: (value: boolean) => void;
  setSession: (value: Session | null) => void;
  setUserId: (value: string) => void;
  setUser: (value: boolean) => void;
  setUserName: (value: boolean) => void;
  setMain: (value: string) => void;
  setPostId: (value: string) => void;
  addToCart: (value: string) => void;
  removeCart: (value: string) => void;
  setProducts: (product: Products[] | null) => void;
  setSeacrhParam: (value: string) => void;
  setQuantity: (value: Quantity) => void;
}

const useStoreQuery = create<StoreQuery>((set) => ({
  isOpen: false,
  isFixed: false,
  session: null,
  userId: "",
  userExist: false,
  userNameExist: false,
  postId: "",
  main: "My Products",
  cart: [],
  products: [],
  searchParam: "",
  quantity: [],
  setQuantity: (value) =>
    set((store) => ({
      quantity: store.quantity?.some((q) => q.productId === value?.productId)
        ? store.quantity.map((prod) =>
            prod.productId === value?.productId
              ? { ...prod, quantity: value.quantity }
              : prod
          )
        : [...(store.quantity || []), value],
    })),
  setSeacrhParam: (value) =>
    set(() => ({
      searchParam: value,
    })),
  setOpen: (value) =>
    set(() => ({
      isOpen: value,
    })),
  setFixed: (value) =>
    set(() => ({
      isFixed: value,
    })),
  setSession: (value) =>
    set(() => ({
      session: value,
    })),
  setUserId: (value) =>
    set(() => ({
      userId: value,
    })),
  setUser: (value) =>
    set(() => ({
      userExist: value,
    })),
  setUserName: (value) =>
    set(() => ({
      userNameExist: value,
    })),
  setMain: (value) =>
    set(() => ({
      main: value,
    })),
  setPostId: (value) =>
    set(() => ({
      postId: value,
    })),
  addToCart: (value) =>
    set((store) => ({
      cart: [...store.cart, value],
    })),
  removeCart: (value) =>
    set((store) => ({
      cart: store.cart.filter((id) => id !== value),
    })),
  setProducts: (product) =>
    set(() => ({
      products: product,
    })),
}));

export default useStoreQuery;
