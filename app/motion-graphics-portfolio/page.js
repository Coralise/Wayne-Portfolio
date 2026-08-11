import { promises as fs } from 'fs';
import { FaBehance } from 'react-icons/fa';
import HashNavigator from '../components/hash-navigator';

// Helper to create URL-friendly IDs from category names
function toId(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function MorePortfolios() {
    return (
        <>
            <span className='text-xl font-bold'>More of my past work here<span className='text-highlight'>.</span></span>
            <div className='mt-4 flex gap-2'>
                <a href="https://www.behance.net/alphazed1" target="_blank" className="flex w-fit p-2 bg-neutral-400 rounded-lg transition-all duration-500 hover:bg-transparent text-background hover:text-[#053eff] shadow-[transparent_0px_0px_5px_4px] hover:shadow-[#053eff_0px_0px_5px_4px]">
                    <FaBehance className="size-4" />
                </a>
            </div>
        </>
    );
}

export default async function Portfolio() {

    const motionGraphicsPortfolioFile = await fs.readFile(process.cwd() + "/app/motion-graphics-portfolio.json", "utf8");
    const motionGraphicsPortfolio = JSON.parse(motionGraphicsPortfolioFile);


    return (
        <div className="p-6 w-full snap-y flex gap-8 max-md:flex-col">
            <div className="w-1/4 flex items-center flex-col relative max-md:hidden">
                <div className="p-4 w-fit sticky top-[50vh] -translate-y-1/2 rounded-xl backdrop-blur-sm bg-white/5 border-[1px] border-white/5">
                    <MorePortfolios />
                </div>
            </div>
            <div className="mt-16 items-center flex-col relative hidden max-md:flex backdrop-blur-sm bg-white/5 border-[1px] border-white/5">
                <div className="p-4 w-fit rounded-xl backdrop-blur-sm">
                    <MorePortfolios />
                </div>
            </div>
            <HashNavigator />
            <div className="mt-20 flex flex-col gap-20 flex-1">
                {Object.entries(motionGraphicsPortfolio).map(([category, categoryData]) => {
                    const normalized = typeof categoryData === 'object' && categoryData !== null && !Array.isArray(categoryData)
                        ? categoryData
                        : { Description: '', Playlist: Array.isArray(categoryData) ? categoryData : [] };

                    const playlistItems = Array.isArray(normalized.Playlist) ? normalized.Playlist : [];
                    if (playlistItems.length === 0) return null;

                    const playlist = playlistItems.join(",");
                    const firstVideo = playlistItems[0];
                    const playlistUrl = `https://www.youtube.com/embed/${firstVideo}?playlist=${playlist}&autoplay=1&mute=1&loop=1`;

                    return (
                        <div key={category} id={toId(category)} className="w-full flex flex-col items-center gap-4 scroll-mt-24">
                            <h2 className="text-2xl font-bold bg-gradient-to-tl from-highlight to-purple-600 bg-clip-text text-transparent">{category}</h2>
                            {normalized.Description ? (
                                <p className="max-w-2xl text-center text-sm text-foreground-2nd">{normalized.Description}</p>
                            ) : null}
                            <iframe
                                className='lg:w-2/3 max-lg:w-full aspect-video border-0'
                                src={playlistUrl}
                                title={`${category} Playlist`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    );
                })}
                <div className='mb-20' />
            </div>
            <div className="items-center flex-col relative hidden max-md:flex">
                <div className="p-4 w-fit rounded-xl backdrop-blur-sm bg-white/5 border-[1px] border-white/5">
                    <MorePortfolios />
                </div>
            </div>
        </div>
    );
}