import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { SearchIcon } from 'lucide-react';
import { getTasks } from '@/api/taskService';
import TaskForm from './TaskForm';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import TaskItem from './components/task-item';

export default function TaskList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const [search, setSearch] = useState("");

    const filteredTasks = data?.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );
    
    return (
        <>
            <div className="flex flex-col gap-6 ">
                
                <div className='grid gap-12'>
                    
                        
                    
                        <>
                            <InputGroup className={'flex-1 bg-slate-100 rounded-xl py-6 '}>
                                <InputGroupInput placeholder="Search..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <InputGroupAddon>
                                    <SearchIcon />
                                </InputGroupAddon>
                            </InputGroup>

                        
                            <div className='grid gap-4'>    
                                <div className='flex justify-between items-center'>
                                    <label className='font-semibold text-slate-600'>My Tasks</label>

                                    
                                </div>

                                {isLoading && 'Loading...'}

                                {filteredTasks &&
                                    <>
                                        {/* <div className='flex justify-between gap-8'>
                                            
                                            <div>
                                                <Pagination>
                                                    <PaginationContent>
                                                        <PaginationItem>
                                                        <PaginationPrevious href="#" />
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                        <PaginationLink href="#">1</PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                        <PaginationLink href="#">2</PaginationLink>
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                        <PaginationEllipsis />
                                                        </PaginationItem>
                                                        <PaginationItem>
                                                        <PaginationNext href="#" />
                                                        </PaginationItem>
                                                    </PaginationContent>
                                                </Pagination>
                                            </div>
                                        </div> */}
                                        <div>
                                            <TaskForm />
                                        </div>
                                        {filteredTasks.map((task, index) => (
                                            <TaskItem item={task} key={index} />
                                        ))}

                                    </>
                                }
                            </div>
                        </>
                    
                </div>
            </div>
        </>
    )
}
