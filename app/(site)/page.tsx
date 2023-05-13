
import Image from "next/image"
import AuthForm from "./components/AuthForm"
export default function Home() {
    return (
      <div
      className="
      min-h-full
      flex
      flex-col
      justify-center
      py-12
      sm:px-6
      lg-px-8
      bg-gray-100
      "
      >
        <div className='sm:mx-auto sm:w-full sm:max-w-full'>
            <Image alt='Logo' className='mx-auto w-auto' width='48' height='48' src='/images/logo.png' />
            <h2 className="mt-6 text-3xl tracking-tight font-bold text-center text-gray-900"> Sign in to your account </h2>
            <AuthForm />
        </div>
      </div>
    )
  }
  