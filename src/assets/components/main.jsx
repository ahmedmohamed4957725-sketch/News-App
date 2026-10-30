import '../css/Main.css'
import NewsCard from './NewsCard'
import { useState } from 'react'
import { useEffect } from 'react'
import Navigation from './Navigation'




function Main () {


// Currents news API
const [newsList, setNewsList] = useState([]);
const [category, setCategory] = useState('');
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const key = "smicNIO2oDMTv2dQburWfibYTsbhBrcuHb1YDNQrDpSRpDUa";
const endpoint="https://api.currentsapi.services/v2/latest-news?"

const getNews=async(options)=>{

    console.log(isLoading);
  fetch(
    `${endpoint}language=${options.language}&page_size=${options.page_size}&category=${options.category}&page=${options.page}`,
    {
      headers: { Authorization: `Bearer ${key}` },
    },
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.news);
        console.log(data.news);
            setNewsList(data.news);
        setIsLoading(false);

    });


}


// getNews();
console.log(newsList);

console.log(isLoading);

//useEffect()


const handleCategory=(category)=>{
    console.log(category);
    setCategory(category);
}

useEffect(()=>{

    let options={
        language:'ar',
        page_size:20,
        category: category,
        page:1,
        type: 2
    }
    //handle all states


    getNews(options);
}, [category]);



const handleFavorite=(id)=>{
    console.log(id);
}







    return (
      <main id="mn">
        <Navigation onCategoryChange={handleCategory} />

        <section>
          <h2 dir="ltr">{category ? category : "Latest News"}</h2>

          <ul className="news-list">
            {isLoading && <h3>Loading...</h3>}
            {newsList.length === 0 && <h3>No news found</h3>}
            {newsList.map((newsItem) => (
              <NewsCard
                {...newsItem}
                key={newsItem.id}
                onFavorite={handleFavorite}
              />
            ))}
          </ul>
        </section>
      </main>
    );
}
export default Main
