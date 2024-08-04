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
        <div className='absolute z-1 top-1/2 -translate-y-1/2 max-w-5xl flex flex-col p-10' style={{ textShadow: 'black 1px 1px' }}>
          <h2 className='text-4xl mb-5'>Working out redefined</h2>
          <div className='flex gap-4'>
            <Link href='/login'>
              <Button variant='default' className='uppercase'>Start Logging</Button>
            </Link>
            <Link href='/exercises'>
              <Button variant='secondary' className='uppercase'>Exercise Database</Button>
            </Link>
          </div>
        </div>
      </div >
    </>
  );
}
