import { configDotenv } from 'dotenv';
import HomePage from './Commponents/HomePage/Home';
configDotenv();

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}
