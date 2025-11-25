import { useEffect, useState, type ChangeEvent, type ChangeEventHandler } from "react";
import { Book } from "./Book";


export interface Book {
  title: string;
  author: string;
  year: number;
  rating: number;
  tags: string[];
}

enum bookProperties  {
	TITLE = "title",
	AUTHOR = "author",
	YEAR = "year",
	RATING = "rating"
}


type Books = Book[];





export function Librairie(){
	const [books, setBooks] = useState<Books>([]);
	const [search, setSearch] = useState<string>("");
	const [sort, setSort] = useState<bookProperties>(bookProperties.TITLE);

	useEffect(() => {
		fetch("./books.json").then(data => data.json()).then((data) => {setBooks(data)});
	},[])

	const handleSort = (event : ChangeEvent<HTMLSelectElement>) =>  {
		if (event.target.value) setSort(event.target.value as bookProperties);
	}

	const handleSearch = (event : ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	}

	const handleSubmit = (event : ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
	}

	const filteredBooks = books
  .sort((a, b) => {
    if ([bookProperties.TITLE, bookProperties.AUTHOR].includes(sort)) {
      return (a[sort] as string).toLowerCase().localeCompare((b[sort] as string).toLowerCase());
    }
    return (a[sort] as number) - (b[sort] as number);
  })
  .filter(book =>
    book.author.toLowerCase().includes(search.toLowerCase()) ||
    book.title.toLowerCase().includes(search.toLowerCase())
  );

	return (
		<section id="app" className="app">
     		 <h2>Book Explorer</h2>
      		<form id="search-form" className="toolbar" role="search" onSubmit={handleSubmit}>
				<div id="div_search">
					<label htmlFor="search">Rechercher</label>
					<br/>
					<input type="text" id="search" name="search" onChange={handleSearch} />
					<br/>
				</div>
					<div id="div_sort">
					<label htmlFor="sort">Trier par</label>
					<br/>
					<select name="sort" onChange={handleSort} defaultValue={bookProperties.TITLE} id="sort">
						<option value={bookProperties.TITLE}>Titre</option>
						<option value={bookProperties.AUTHOR}>Auteur</option>
						<option value={bookProperties.YEAR}>Année</option>
						<option value={bookProperties.RATING}>Note</option>
					</select>
        		</div>
      		</form>
      		<div id="results" className="cards" aria-live="polite" aria-busy="false">
				{filteredBooks.length == 0 ? "Aucun result." : 
				filteredBooks.map((value, key) => {
					return (
						<Book {...value} key={key}/>
					)
				})}
				
			</div>
    	</section>
	)
}


