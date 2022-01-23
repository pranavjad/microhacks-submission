import React from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import '../App.css'

export default function PictureSummary({data}) {

    return (
    
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                style={{
                    margin: '20px'
                }}
            >
                <Masonry gutter="10px">
                    {
                    data.map((obj,idx) => {
                        if(obj.hasOwnProperty('photoUrl')){
                            return <div key={`photo${idx}`} className="ImageTileContainer">
                                <img  src={obj.photoUrl} style={{width:'100%',display:'block',}}/>
                                <div className="ImageTileCaption">
                                    {obj.name}
                                </div>
                            </div>
                        }
                    })
                    }
                </Masonry>
            </ResponsiveMasonry>
        
    )
}
