import MemeGenerator from "./components/MemeGenerator";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-200">
      <h1>Generador de memes de Milei by fox</h1>
      <MemeGenerator />
    </div>
  )
}
