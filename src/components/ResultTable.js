import React from 'react';
import '../App.css'
export default function ResultTable({data}) {
  return (
      <div className="ResultTableContainer">
          <table className="ResultTable">
              <thead>
                <tr>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Rating Count</th>
                    <th>Price Level</th>
                    {/* <th>Bayes avg</th> */}
                </tr>
              </thead>
              <tbody>
              {data.map((obj,idx) => {
                    return (
                        <tr key={`${obj.name}li${idx}`}>
                            <td>{obj.name}</td>
                            <td>{obj.rating}</td>
                            <td>{obj.user_ratings_total}</td>
                            <td>{obj.price_level?obj.price_level:'-'}</td>
                            {/* <td>{obj.bayes_avg}</td> */}
                        </tr>
                    )
                })}
              </tbody>
            </table>
      </div>
  );
}
