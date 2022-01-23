export default function sortByBayesAvg(data) {
    const m = data.map(e => e.rating).reduce((p,c)=> p+c) / data.length;
    const c = data.map(e => e.user_ratings_total).sort()[data.length/4];
    data.map(e => {
        e['bayes_avg'] = (e.rating * e.user_ratings_total + c * m) / (e.user_ratings_total + c);
    });
    data.sort((a,b) => (a.bayes_avg < b.bayes_avg)? 1 : -1);
    return data;
}