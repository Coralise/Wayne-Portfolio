import { promises as fs } from 'fs';
import PortfolioCard from '../components/portfolio-popup';
import HashNavigator from '../components/hash-navigator';

// Helper to create URL-friendly IDs from titles
function toId(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function Portfolio() {

    const programmingPortfolioFile = await fs.readFile(process.cwd() + "/app/programming-portfolio.json", "utf8");
    const programmingPortfolio = JSON.parse(programmingPortfolioFile);

    // Add id to each project
    const projectsWithIds = programmingPortfolio.projects.map(project => ({
        ...project,
        id: toId(project.title)
    }));

    return (
        <div className="p-6 w-full snap-y">
            <HashNavigator />
            <div className="mt-20 flex flex-col gap-40 snap-start mb-[20rem]">
                {projectsWithIds.map((project, index) => (
                    <PortfolioCard content={project} key={index} />
                ))}
            </div>
        </div>
    );
}