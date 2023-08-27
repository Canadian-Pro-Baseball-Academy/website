import { create, StateCreator } from "zustand"

interface IToggleMobileMenu {
  isOpen: boolean
  toggle: () => void
  setIsOpen: (isOpen: boolean) => void
}

const createMobileMenuSlice: StateCreator<
  IToggleMobileMenu,
  [],
  [],
  IToggleMobileMenu
> = (set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
})

export const useMobileMenuStore = create<IToggleMobileMenu>((...a) => ({
  ...createMobileMenuSlice(...a),
}))
