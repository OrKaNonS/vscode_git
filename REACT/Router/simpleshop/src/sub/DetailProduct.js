import {useParams} from 'react-router-dom';
import NotFound from './NotFound.js'
import ListProduct from './ListProduct'


export default function DetailProduct() {
    const params = useParams();
    const pid = params.pid;
    switch (pid) {
        case 0:
            ListProduct

    }
    return(
        <div>
            <h3>제품 상세 {pid}</h3>
            <p>
                <button id='BackList' value='목록'> 
            </p>
        </div>
    ); else {
        return(
        <NotFound />
        );
    }
}