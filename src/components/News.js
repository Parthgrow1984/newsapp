import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }
    // eslint-disable-next-line react/no-typos
    static PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("I am a constructor from News");
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0

        }



        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
    }

    async updatePage() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dde026a5d4d142879cd503d9fc50b29b&page=${this.state.page}&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState
            ({
                page: this.state.page,
                articles: parsedData.articles,
                loading: false
            });

    }

    async componentDidMount() {
        // console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=dde026a5d4d142879cd503d9fc50b29b&page=${this.state.page}`;
        // this.setState({loading:true});
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles, totalResults: parsedData.totalResults,
        //     loading: false
        // });

        this.updatePage();

    }

    handlePrevClick = async () => {
        console.log("Previous");



        this.setState({ page: this.state.page - 1 });
        this.updatePage();



    }

    handleNextClick = async () => {
        console.log(this.state.page);
        // if((this.state.page + 1) > Math.ceil(this.parsedData.totalResults/20) )
        // {

        // }
        // else
        // {

        this.setState({ page: this.state.page + 1 });
        this.updatePage();




    }

    render() {

        console.log("render");
        return (
            <>






                <div className="container my-3">

                    <h1 className='text-center' > NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
                    {this.state.loading && <Spinner/>}

                    {/* <InfiniteScroll
                            dataLength={this.state.items.length}
                            next={this.fetchMoreData}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                    > */}

                    <div className="row ">
                        
                            {!this.state.loading && this.state.articles.map((element) => {

                                return (
                                    <>

                                        <div className="col-md-4 ">
                                            <NewsItem key={element.url} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                        </div>





                                    </>




                                )

                            })};

                    </div>
                    {/* </InfiniteScroll> */}

                    <div className='container d-flex justify-content-between'>
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous </button>
                        <button type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr; </button>
                    </div>
                </div>











            </>
        )
    }
}
