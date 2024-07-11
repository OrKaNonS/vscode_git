import {useState} from 'react'

export default function GetData() {

    const [data, SetData] = useState('');
    
    const addid = () => {
        const options = [];
        for(let i = 1 ; i <= 200 ; i++) {
            options.push(<option key={i} value={i}>id:{i}</option>);
        }
        return options;
    };

    function idChange(e) {
        const value = e.target.value;
        if(value)  {
            gaindata(value);
        } else {
            gaindata('');
        }
    }

    function gaindata(id) {
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(response => response.json())
        .then(result => SetData(JSON.stringify(result)))
    }


    
    return(
        <>
            <p>
                <span id='data'>{data}</span>
            </p>
            <p>
                <select onChange={idChange}>                    
                    <option value=''>--전체--</option>
                    {addid()}
                </select>                
            </p>
        </>
    )


}


