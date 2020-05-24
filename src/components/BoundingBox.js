import React from 'react';

import './BoundingBox.css'

class BoundingBox extends React.Component {

    render(){
        const bboxStyle = {
            strokeWidth:4,
            fillOpacity:0.4,
            fill: "green",
            opacity:0.9
        };
        console.log(this.props.bboxList);
        const bboxList = this.props.bboxList.map(bbox => {
            return (
                <svg key = {bbox} width="2000" height="2000" className="BboxSVG">
                    <rect

                          x={bbox[0]}
                          y={bbox[1]}
                          width={bbox[2] - bbox[0]}
                          height={bbox[3] - bbox[1]}
                          style={bboxStyle}
                    />
                </svg>

            )
        });



        return (
            <div>
                {bboxList}
            </div>

        )
    }
}

export default BoundingBox;