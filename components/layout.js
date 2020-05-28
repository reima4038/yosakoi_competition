import Head from 'next/head'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>みんなでよさこい審査員（仮）</title>
      </Head>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}