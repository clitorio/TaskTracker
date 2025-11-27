import { QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import TaskList from './Pages/TaskList'
import AppLogo from './components/app-logo'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import UserMenu from './components/user-menu'
import { useAuth } from './lib/auth-provider'
import { queryClient } from './lib/query-client'
import { Confirmer } from './components/ui/confirmer'
import { Toaster } from "@/components/ui/sonner"

function App() {
    const { user } = useAuth()

    return (
        <QueryClientProvider client={queryClient}>
            <main className='max-w-2xl mx-auto mt-12'>
                <div className='grid gap-8 w-full mx-8 my-8'>
                    <div className='grid gap-4 w-full '>
                        <div className='flex items-center justify-between mt-4'>
                            <AppLogo />

                            <UserMenu>
                                <div className='inline-flex gap-2 items-center'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>{user.name}</AvatarFallback>
                                    </Avatar> 
                                    <label className='text-sm'>{user.name}</label>
                                </div>
                            </UserMenu>
                        </div>
                    </div>
                    <div className=''>
                        <TaskList />
                    </div>
                </div>
                <Toaster position='top-center' richColors />
                <Confirmer />
            </main>
        </QueryClientProvider>
    )
}

export default App
