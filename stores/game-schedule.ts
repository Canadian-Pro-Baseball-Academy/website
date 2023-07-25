import { create, StateCreator } from "zustand"

interface ISelectedTeam {
  team: {
    id: string
    name: string
  }
  setTeam: (team: { id: string; name: string }) => void
}

const createSelectTeamSlice: StateCreator<
  ISelectedTeam,
  [],
  [],
  ISelectedTeam
> = (set) => ({
  team: { id: "8495770", name: "" },
  setTeam: (team) => {
    set({ team: team })
  },
})

export const useGameScheduleStore = create<ISelectedTeam>((...a) => ({
  ...createSelectTeamSlice(...a),
}))
