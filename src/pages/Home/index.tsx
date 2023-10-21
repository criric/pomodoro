import { HandPalm, Play } from "phosphor-react";
import { 
    HomeContainer, 
    StartCountdownButton, 
    StopCountdownButton, 
} from "./styles";
import { useContext} from "react";
import { Countdown } from "./components/Countdown";
import { NewCycleForm } from "./components/NewCycleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from 'zod'
import { CyclesContext } from "../../contexts/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
  })

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>

export function Home(){
    const {activeCycle, createNewCicle, interruptCurrentCycle} = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues:{
        task: '',
        minutesAmount: 0,
    }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCicle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitButtonDisabled = !task

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {activeCycle ? (
                <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                    <HandPalm size={24}/>
                    Interromper
                </StopCountdownButton>
                ): 
                <StartCountdownButton type="submit" disabled={isSubmitButtonDisabled} >
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
                }
            </form>
        </HomeContainer>
    )
}