import React, { useEffect,useState } from 'react';
import Masonry from 'react-masonry-css'
import '../App.css'
export default function RatingSummary({data}) {
    const [topReviews,setTopReviews] = useState([]);
    function getBackgroundColor(rating) {
        if(rating >= 4) return '#81c784';
        if(rating >= 3) return '#ffcf87';
        else return '#e57373';
    }
    useEffect(()=> {
        // console.log(data);
        let reviewList = [];
        for(let i = 0;i<data.length;i++){
            let obj = data[i];
            if(!obj.hasOwnProperty('review') || !obj.review.hasOwnProperty('reviews')) continue;
            // console.log(obj);
            
            let temp = obj.review.reviews;

            temp.map(r => {r['placeName']=obj.name});
            reviewList.push(...temp);
        }
        console.log(reviewList);
        setTopReviews(reviewList);
    },[data])
    return (
        <div className="RatingSummaryContainer">
            <Masonry
                breakpointCols={{
                    default: 3,
                    750: 2,
                    500: 1,
                }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {
                    topReviews.map((review,idx) => {
                        return <div key={`topreview${idx}`} className="ReviewTileContainer" style={{
                            backgroundColor: getBackgroundColor(review.rating)
                        }}>
                            <div className="ReviewTileContent" >
                                {review.text}
                            </div>
                            <div className="ReviewTileFooter" >
                                {review.placeName} - {review.rating} stars - ({review.relative_time_description})
                            </div>
                        </div>
                    })
                }
            </Masonry>
        </div>
    );

}
