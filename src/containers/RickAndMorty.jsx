import React from 'react';
import { loadingMessages } from '../../fixtures/loadingMessages';
import Character from '../components/characters/Character';
import getCharacters from '../services/rickAndMorty';

const RickAndMorty = () => {
    const [page, setPage] = React.useState(1);
    const [lastPage, setLastPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [characters, setCharacters] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const infoAndResults = await getCharacters(page);
            setTimeout(function () {
                setCharacters(infoAndResults.results);
                setLastPage(infoAndResults.info.pages);
                setLoading(false);
            }, 2000);
        })();
    }, [page]);

    return (
        <>
            {loading && <>
                <p>Loading...</p>
                <h1>
                    {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
                </h1>
            </>}
            {!loading && <>
                <div id="controls">
                    {page > 1 &&
                        <button onClick={() => setPage(page - 1)}>
                            Previous Page
                        </button>}
                    <p>{page}</p>
                    {page < lastPage &&
                        <button onClick={() => setPage(page + 1)}>
                            Next Page
                        </button>}
                </div>
                <div id="character-list">
                    <Character characters={characters} />
                </div>
            </>}

        </>
    );
};

export default RickAndMorty;