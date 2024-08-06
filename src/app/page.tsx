import { auth } from '@/auth'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth()
  const backgroundStyles = {
    backgroundImage: 'url(/stock-2.jpg)',
    backgroundSize: 'cover'
  }
  if (session?.user) {
    redirect('/log')
  }
  return (
    <>
      <div className='relative w-full h-full min-h-[720px]' style={backgroundStyles}>
        <div className='bg-black/80 absolute top-0 left-0 right-0 h-full' />
        <div className='absolute z-1 top-1/2 -translate-y-1/2 max-w-5xl flex flex-col p-10'>
          <h2 className='text-4xl mb-5' style={{ textShadow: 'black 1px 1px' }}>Working out redefined</h2>
          <div className='flex gap-4'>
            <Button asChild variant='default'>
              <Link href='/login' className='uppercase'>
                Start Logging
              </Link>
            </Button>
            <Button asChild variant='secondary'>
              <Link href='/exercises' className='uppercase'>
                Exercise Database
              </Link>
            </Button>
          </div>
        </div>
      </div >
    </>
  );
}
