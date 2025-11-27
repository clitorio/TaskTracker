import { getUser, signin } from '@/api/auth'
import AppLogo from '@/components/app-logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { useAuth } from '@/lib/auth-provider'
import { LockIcon } from 'lucide-react'
import { MailIcon } from 'lucide-react'
import React from 'react'
import { useState } from 'react'

export default function Login() {

    //const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

     const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        try {
            await signin(formData.email, formData.password);
            window.location.href = "/";
        } catch {
            alert("Login failed!");
        }
        
    };


    return (
        <div className='h-screen mx-auto flex justify-center items-center'>
            <Card className={' max-w-3xl px-8 pt-12'}>
                <CardContent className={'space-y-8'}>

                    <AppLogo />

                    <form className='grid gap-4' onSubmit={handleSubmit}>
                        <InputGroup>
                            <InputGroupInput type="email" name="email" placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <InputGroupAddon>
                                <MailIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <InputGroup>
                            <InputGroupInput type="password" name="password" placeholder="" 
                                value={formData.password}
                                onChange={handleChange} 
                                required
                                />
                            <InputGroupAddon>
                                <LockIcon />
                            </InputGroupAddon>
                        </InputGroup>

                        <Button type='submit'>Sign-in</Button>
                    </form>

                    <Button variant={'link'}>Register</Button>

                </CardContent>
            </Card>
        </div>
    )
}
