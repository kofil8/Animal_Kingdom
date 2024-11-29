import { configDotenv } from 'dotenv';
import HomePage from './Commponents/HomePage/Home';
configDotenv();

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <HomePage />
        </main>
    );
}
