import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        title: "Title Here",
        country: "in",
        category: "general,",
        pageSize: 6,
    }

    static propTypes = {
        title: PropTypes.string,
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
        apiKey: PropTypes.string
    }

    constructor() {
        super();

        this.state = {
            articles: [],
            page: 1,
            totalResults: 0,
            loading: false
        }
    }

    async componentDidMount() {

        this.setState({ loading: true });

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    async updateNews(updatedPage) {

        this.setState({ loading: true });

        this.setState({ page: updatedPage })
        console.log(this.state.page);

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.props.pageSize}&apiKey=${this.props.apiKey}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            loading: false
        })
    }


    render() {

        const handlePreviousClick = async () => {

            this.updateNews(this.state.page - 1);
        }


        const handleNextClick = async () => {

            this.setState({ loading: true });

            // Can remove the if statement below since we have added the Disable condition to the next button
            if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

                this.updateNews(this.state.page + 1);

            }
        }


        return (

            //   <div className="d-flex justify-content-around flex-wrap" style={{justifyContent: 'center'}}>
            <div className="container" >
                <h1 className="text-center">{this.props.title}</h1>
                {this.state.loading && <Loading />
                }

                < div className="row" >

                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} publishedAt={element.publishedAt} />
                        </div>
                    })}

                </div>
                <div className="d-flex justify-content-evenly">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={handlePreviousClick}>&larr;Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next&rarr;</button>
                </div>

            </div >


        )
    }
}

export default News