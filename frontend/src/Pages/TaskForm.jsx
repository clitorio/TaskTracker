import { createTask } from '@/api/taskService';
import InputError from '@/components/input-error';
import Spinner from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { queryClient } from '@/lib/query-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function TaskForm() {
    const [errors, setErrors] = useState([]);
    const [addTaskState, setAddTaskState] = useState(false);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        due_date: ''
    });

    const {mutate, isPending} = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            setNewTask([]);
            setAddTaskState(false);
            toast.success('New task has been created.')
        },
        onError: (error) => {
            console.log("Error:", error.response?.data);
            setErrors(error.response.data.errors);
        }
    })

    const handleOnCancel = () => {
        setErrors([]);
        setNewTask([]);
        setAddTaskState(false);
    }

    const handleAddTask = async (e) => {
        e.preventDefault();
        mutate(newTask);
    }

    return (
        <>
            
            { !addTaskState ? 
                <Button variant={'outline'} onClick={(e) => setAddTaskState(true)}>Add Task</Button> :

                <Card className={'shadow-lg shadow-sky-200 border-sky-200 mb-8'}>
                    <CardContent>

                        <div className='flex justify-between gap-4'>
                            <form className='flex w-full gap-2' onSubmit={handleAddTask}>
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>New Task</FieldLegend>
                                        <FieldDescription>
                                            Fill out the information to add a new task.
                                        </FieldDescription>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor="title">
                                                    Title
                                                </FieldLabel>
                                                <Input id="title" name="title" placeholder="Required"
                                                    value={newTask.title}
                                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                                    disabled={isPending}
                                                />
                                                {errors.title && <InputError message={errors.title} />}
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="description">
                                                    Description
                                                </FieldLabel>
                                                <Textarea id="description" name="description" placeholder="Required"
                                                    value={newTask.description}
                                                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                                    disabled={isPending}
                                                />
                                                {errors.description && <InputError message={errors.description} />}
                                            </Field>

                                            <Field className={'w-48'}>
                                                <FieldLabel htmlFor="due_date">
                                                    Due Date
                                                </FieldLabel>
                                                <Input type='date' id="due_date" name="due_date" placeholder="Required Rabbit"
                                                    value={newTask.due_date}
                                                    onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
                                                    disabled={isPending}
                                                />
                                                {errors.due_date && <InputError message={errors.due_date} />}
                                            </Field>

                                            <Field orientation="horizontal">
                                                <Button type="submit" disabled={isPending}>
                                                    {isPending && <Spinner />}
                                                    Submit
                                                </Button>
                                                <Button variant="outline" type="button" disabled={isPending}
                                                    onClick={handleOnCancel}
                                                >
                                                    Cancel
                                                </Button>
                                            </Field>
                                        </FieldGroup>
                                    </FieldSet>
                                </FieldGroup>

                            </form>
                            
                        </div>
                    </CardContent>
                </Card>
            }
        </>
    )
}
