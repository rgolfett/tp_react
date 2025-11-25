import './Box.css'

export function Box({name} : {name : string}){
	return (
		<div className='box'>
			{name}
		</div>
	)	
}