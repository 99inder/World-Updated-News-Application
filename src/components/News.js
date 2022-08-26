import React, { useEffect, useState } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);


    const updateNews = async () => {

        props.setProgress(20);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${page}`;
        
        props.setProgress(50);

        let data = await fetch(url);
        let parsedData = await data.json();

        props.setProgress(70);

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);

        if (loading === true){
            setLoading(false);
        }
        props.setProgress(100);
    }

    const updateTitle = () => { document.title = `${capitalizeFirstWord(props.category)}- ${props.title}` }

    useEffect(() => {

        updateNews();
        updateTitle();
        // eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&apiKey=${props.apiKey}&page=${page + 1}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();

        setArticles(articles.concat(parsedData.articles))
    }

    const capitalizeFirstWord = (word) => { return word.charAt(0).toUpperCase() + word.slice(1); }

    return (

        //   <div className="d-flex justify-content-around flex-wrap" style={{justifyContent: 'center'}}>
        <>
            <h1 className="text-center" style={{ marginTop: '90px' }}>{props.title}- Top {capitalizeFirstWord(props.category)} Headlines</h1>
            {loading && <Loading />}


            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading />}
            >
                <div className="container">
                    <div className="container row" >

                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>

        </>


    )
}

export default News

News.defaultProps = {
    title: "Title",
    country: "in",
    category: "general,",
    pageSize: 6,
}

News.propTypes = {
    title: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    apiKey: PropTypes.string
}