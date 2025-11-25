import type {Book} from "./Librairie"

export function Book({title, author, year, rating, tags} : Book){
	return (
		 <article className="card">
          <h2 className="card__title">{title}</h2>
          <div className="card__meta">
            <span className="div_author">{author}</span> —
            <span className="div_year">{year}</span> • ⭐ 
            
            <span className="div_rating"><br/>{rating}</span>
          </div>
          <br/>
          <span className="div_tags">{tags}</span>
        </article>
	);
}