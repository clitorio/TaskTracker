import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button'
import { EllipsisVerticalIcon } from 'lucide-react'
import { Clock3Icon } from 'lucide-react'
import { confirm } from "@/components/ui/confirmer";
import { toast } from "sonner";
import { useMutation } from '@tanstack/react-query'
import { deleteTask, updateTask } from '@/api/taskService'
import { queryClient } from '@/lib/query-client'
import StatusBadge from '@/components/ui/status-badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Spinner from '@/components/spinner'
import InputError from '@/components/input-error'
import { useEffect } from 'react'

export default function TaskItem({item}) {
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState([]);
    const [editForm, setEditForm] = useState({
        title: item.title,
        description: item.description,
        due_date: item.due_date,
        status: item.status
    });

    const deleteMutation = useMutation({
        mutationFn: () => deleteTask(item.id),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            toast.success("Task has been deleted.");
        },
    });

    const updateMutation = useMutation({
        mutationFn: (payload) => updateTask(item.id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            setIsEditing(false);
            toast.success("Task has been updated.");
        },
        onError: (error) => {
            console.log("Error:", error.response?.data);
            setErrors(error.response.data.errors);
        }
    })

    const handleOnUpdate = (e) => {
        e.preventDefault();
        updateMutation.mutate(editForm);
    }

    const handleOnCancel = () => {
        setIsEditing(false);
    }

    useEffect(() => {
        setEditForm({
            title: item.title,
            description: item.description,
            due_date: item.due_date,
            status: item.status,
        });
    }, [item]);

    return (
        <Card className={'shadow-none'}>
            {!isEditing &&
                <CardContent className={'flex gap-4 items-center'}>

                    <div className='flex-1 space-y-4'>
                        <div className=' space-y-2'>
                            <div className='flex justify-between'>
                                <div className='font-medium text-lg'>
                                    {item.title} 
                                </div>
                                <StatusBadge status={item.status} />
                                    
                                
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-sm text-slate-600'>
                                    {item.description}
                                </div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" aria-label="Open menu" size="icon-sm">
                                        <EllipsisVerticalIcon />
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40" align="end">
                                    <DropdownMenuGroup>
                                        
                                        <DropdownMenuItem onSelect={() => setIsEditing(true)}>
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onSelect={() => {
                                            confirm({
                                            title: "Are you sure?",
                                            description:
                                                "This action cannot be undone. This will permanently delete this task.",
                                            }).then(
                                            (confirmed) => confirmed && deleteMutation.mutate(),
                                            );
                                        }}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                                
                            <div className='text-xs text-slate-500 inline-flex gap-1 items-center'>
                                <Clock3Icon size={'12'} />
                                {item.created_humanize}
                            </div>
                            {item.due_date_display &&
                                <div className='text-xs text-slate-500 inline-flex gap-1 items-center font-semibold'>
                                    Due On: {item.due_date_display}
                                </div>
                            }
                        </div>
                    </div>
                </CardContent>
            }

            {isEditing &&
                <>
                    <CardContent>
                        <div className='flex-1 space-y-4'>
                            
                                <div className='flex justify-between gap-4'>
                                    <form className='flex w-full gap-2' onSubmit={handleOnUpdate}>
                                        <FieldGroup>
                                            <FieldSet>
                                                <FieldLegend>Edit Task</FieldLegend>
                                                <FieldDescription>
                                                    Fill out the information.
                                                </FieldDescription>
                                                <FieldGroup>
                                                    <Field>
                                                        <FieldLabel htmlFor="title">
                                                            Title
                                                        </FieldLabel>
                                                        <Input id="title" name="title" placeholder="Required"
                                                            value={editForm.title}
                                                            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                                            disabled={updateMutation.isPending}
                                                        />
                                                        {errors.title && <InputError message={errors.title} />}
                                                    </Field>

                                                    <Field>
                                                        <FieldLabel htmlFor="description">
                                                            Description
                                                        </FieldLabel>
                                                        <Textarea id="description" name="description" placeholder="Required"
                                                            value={editForm.description}
                                                            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                                                            disabled={updateMutation.isPending}
                                                        />
                                                        {errors.description && <InputError message={errors.description} />}
                                                    </Field>

                                                    <Field className={'w-48'}>
                                                        <FieldLabel htmlFor="due_date">
                                                            Due Date
                                                        </FieldLabel>
                                                        <Input type='date' id="due_date" name="due_date" placeholder="Required Rabbit"
                                                            value={editForm.due_date}
                                                            onChange={(e) => setEditForm({...editForm, due_date: e.target.value})}
                                                            disabled={updateMutation.isPending}
                                                        />
                                                        {errors.due_date && <InputError message={errors.due_date} />}
                                                    </Field>

                                                    <Field orientation=''>
                                                        <FieldLabel>Task Status</FieldLabel>
                                                        <RadioGroup value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                                                            <div className="flex items-center gap-3">
                                                                <RadioGroupItem value="pending" id="r1" />
                                                                <Label htmlFor="r1">Pending</Label>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <RadioGroupItem value="in_progress" id="r2" />
                                                                <Label htmlFor="r2">In Progress</Label>
                                                            </div>
                                                            <div className="flex items-center gap-3">
                                                                <RadioGroupItem value="completed" id="r3" />
                                                                <Label htmlFor="r3">Completed</Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </Field>

                                                    <Field orientation="horizontal">
                                                        <Button type="submit" disabled={updateMutation.isPending}>
                                                            {updateMutation.isPending && <Spinner />}
                                                            Submit
                                                        </Button>
                                                        <Button variant="outline" type="button" disabled={updateMutation.isPending}
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
                        </div>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </>
            }

        </Card>
    )
}
