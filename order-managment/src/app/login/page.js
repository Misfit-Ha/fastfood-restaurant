import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <LoginForm />
      </div>
    </div>
  )
}
