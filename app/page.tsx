import { getAllData } from '@/lib/db'
import { Navbar } from '@/components/layout/Navbar'
import { WebcoSceneLoader } from '@/components/WebcoSceneLoader'

export const revalidate = 3600

export default async function HomePage() {
  const data = await getAllData()

  return (
    <>
      <Navbar />
      <main id="main-content">
        <WebcoSceneLoader data={data} />
      </main>
    </>
  )
}
