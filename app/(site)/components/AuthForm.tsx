
'use client';

import axios from 'axios'
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { BsGithub, BsGoogle, BsLinkedin } from 'react-icons/bs'

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialLogin from "./AuthSocialLogin";
import { type } from "os";
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  /* Session */
useEffect(()=>{
  if(session?.status == 'authenticated'){
    router.push('/users');
  }
}, [session?.status, router]);

  const togleVariant = useCallback( () =>{
    if(variant === 'LOGIN'){
      setVariant('REGISTER');
    }else{
      setVariant('LOGIN');
    }
  }, [variant] )
  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm<FieldValues>({
    defaultValues:{
      name:'',
      email:'',
      password:''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    if(variant === 'REGISTER'){
      //Axios
      axios.post('/api/register', data)
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
    }

    if(variant === 'LOGIN'){
      //Next Auth Sign
      signIn('credentials',{
        ...data,
        redirect: false
      })
      .then((callback) =>{
        if(callback?.error){
          toast.error('Invalid credentials');
        }
        if(callback?.ok && !callback?.error){
          toast.success('Logged in!');
        }
      })
      .finally(()=> setIsLoading(false))

    }
  }
  const socialAction = (action: string) =>{
    setIsLoading(true);

    //Next Auth Social Sign In

    signIn('action',{
      redirect: false
    })
    .then((callback) =>{
      if(callback?.error){
        toast.error('Invalid credentials');
      }
      if(callback?.ok && !callback?.error){
        toast.success('Logged in!');
      }
    })
    .finally(()=> setIsLoading(false))
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className="bg-white px-4 py-8 sm:rounded-lg sm:px-10">
        <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />
          )}
          <Input id="email" label="Email Address" type="Email" register={register} errors={errors} disabled={isLoading} />
          <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading} />
          <div>
            <Button disabled={isLoading} fullWidth type="submit"> {variant === 'LOGIN' ? 'Sign in' : 'Register'} </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500"> Or continue with </span>
              </div>
          </div>

          <div className=" mt-6 flex gap-2">
            <AuthSocialLogin icon={BsGithub} onClick={ () => socialAction('github')} />
            <AuthSocialLogin icon={BsGoogle} onClick={ () => socialAction('google')} />
            <AuthSocialLogin icon={BsLinkedin} onClick={ () => socialAction('linkedin')} />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN' ? 'New to messanger?' : 'Already have an account'}
          </div>
          <div
          onClick={togleVariant}
          className="underline cursor-pointer"
          >
            {variant === 'LOGIN' ? 'Create an account' : 'Log in'}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AuthForm;