import { promises as fs } from 'fs';
import PortfolioCard from '../components/portfolio-popup';

export default async function Portfolio() {

    const programmingPortfolioFile = await fs.readFile(process.cwd() + "/app/programming-portfolio.json", "utf8");
    const programmingPortfolio = JSON.parse(programmingPortfolioFile);

    return (
        <div className="p-6 w-full snap-y">
            <div className="mt-20 flex flex-col gap-40 snap-start mb-[20rem]">
                {[...programmingPortfolio.projects].map((project, index) => (
                    <PortfolioCard content={project} key={index} />
                ))}
            </div>
        </div>
    );
}