import { Button } from "@/components/ui/button";

export default function SignInButton({callback}: {callback: () => void}) {
    return (
      <div className='flex items-center justify-center w-full h-[90dvh]'>
        <Button variant='outline' className='self-center' onClick={callback}>Login with google</Button>
    </div>
    )
} 