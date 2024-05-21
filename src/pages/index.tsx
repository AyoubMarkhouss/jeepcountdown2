import AnimatedTimer from "@/components/Animatedtimer";
import Footer from "@/components/Footer";
import Formulaire from "@/components/Formcount";
import Header from "@/components/Header";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Jeep Avenger - Inscription" />
        <link rel="icon" href="/logo-jeep-black.png" />
        <title>Jeep Avenger - Inscription</title>
        <meta property="og:image" content="/logo-jeep-black.png" />
      </Head>
      <main>
        <Header />
        <AnimatedTimer />
        <Formulaire />
        <Footer />
      </main>
    </>
  );
}
