import MemeGenerator from "./components/MemeGenerator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-200">
      <div className="mt-0 mb-0 text-center">
        <h1 className="text-2xl font-bold">Generador de memes de Milei by fox</h1>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <MemeGenerator />
      </div>
    </div>
  )
}
