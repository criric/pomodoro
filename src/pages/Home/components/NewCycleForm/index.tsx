import { useFormContext } from "react-hook-form";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function NewCycleForm(){
  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext()


  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput 
        placeholder="Dê um nome para o seu projeto" 
        list="task-suggestions" 
        id="task"
        disabled={!!activeCycle} 
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1"/>
        <option value="Banana"/>
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput 
        type="number" 
        step={5} 
        min={5} 
        max={60} 
        id="minutesAmount" 
        placeholder="00"
        disabled={!!activeCycle} 
        {...register("minutesAmount", {valueAsNumber: true})}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}