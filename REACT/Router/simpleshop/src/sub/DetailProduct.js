import { useParams, useNavigate } from 'react-router-dom';
import NotFound from './NotFound';
import { productList } from './ListProduct';

export default function DetailProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("Product ID:", id); // 추가된 로그
    const product = productList.find(p => p.state.pno === parseInt(id, 10)); // id를 정수로 변환하여 비교
    console.log("Product Found:", product); // 추가된 로그

    if (!product) {
        return <NotFound />;
    }

    return (
        <div id='detailProduct'>
            <h2>{product.state.ptitle}</h2>
            <p>가격 : {product.state.pprice}원</p>
            <p>상세설명 : {product.state.pcontent}</p>
            <img src={product.state.pimg} alt={product.state.ptitle} />
            <button onClick={() => navigate('/')}>목록</button>
        </div>
    );
}
