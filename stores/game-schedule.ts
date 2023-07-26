import { create, StateCreator } from "zustand"

interface ISelectedTeam {
  team: {
    id: string
    name: string
    webCalendar?: string
  }
  setTeam: (team: { id: string; name: string; webCalendar?: string }) => void
}

const createSelectTeamSlice: StateCreator<
  ISelectedTeam,
  [],
  [],
  ISelectedTeam
> = (set) => ({
  team: { id: "", name: "", webCalendar: "" },
  setTeam: (team) => {
    set({ team: team })
  },
})

export const useGameScheduleStore = create<ISelectedTeam>((...a) => ({
  ...createSelectTeamSlice(...a),
}))
