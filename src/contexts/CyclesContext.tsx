import { ReactNode, createContext, useState, useReducer } from "react";

interface CreateCycleData{
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType{
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCicle: (data:CreateCycleData) => void
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps{
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps){
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any)=>{
    console.log(state);
    console.log(action);

    if(action.type === 'ADD_NEW_CYCLE'){
      return [...state, action.payload.newCycle]
    }
    return state
  }, [])



  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished(){
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })
  }

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function createNewCicle(data:CreateCycleData){
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date()
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      }
    })
    // setCycles(state => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle(){
    dispatch({
      type: 'INTERRUP_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })
    // setCycles(state => state.map(cycle => {
    //   if(cycle.id === activeCycleId){
    //     return {...cycle, interruptedDate: new Date()}
    //   } else {
    //     return cycle
    //   }
    // }))

    setActiveCycleId(null)
  }
  return (
    <CyclesContext.Provider 
    value={{
      cycles,
      activeCycle, 
      activeCycleId, 
      markCurrentCycleAsFinished, 
      amountSecondsPassed, 
      setSecondsPassed,
      createNewCicle,
      interruptCurrentCycle
    }}>
      {children}
    </CyclesContext.Provider>
  )
}