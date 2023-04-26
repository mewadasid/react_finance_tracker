export default function Selectcombo({ name, id, option, onchange }) {
    return (
        <select name={name} id={id} onChange={onchange}>
            {option.map((item, index) => {

                return <option value={item.value} key={index} >{item.value}</option>
            })
            }
        </select>
    )
}