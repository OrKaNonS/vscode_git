import { NavLink } from 'react-router-dom';
import Product from './Product';

const productList = [];

export default function ListProduct() {
    if (productList.length === 0) {
    const products = [
        ['1', '사과', '내가 왕이 될 사과앙(상)인가?', '/img/apple.png', 22000],
        ['2', '배', '내 배는 음악을 들을 수 있다구!', '/img/pear.png', 22000],
        ['3', '딸기', '보노보노가 딸기 보노?', '/img/strawberry.png', 22000],
        ['4', '수박', '한번 잡 수박', '/img/watermelon.png', 22000],
        ['5', '메론', '메로옹~ 열받으면 손 넣어봐', '/img/melon.png', 22000],
        ['6', '바나나', '귀여우면 미니언즈에 바나나?', '/img/banana.png', 22000],
        ['7', '키위', '큰키위 작은키위. ', '/img/kiwi.png', 22000],
        ['8', '복숭아', '날 찾을 수 있겠나?', '/img/peach.png', 22000]
    ];

    products.forEach(product => registProduct(product));

    }

    return (
        <div id='listProduct'>
            <ul>
                {productList.map((product, idx) => (
                    <li className='productLi' data-index={idx} key={idx}>
                        <NavLink to={`/product/${product.state.pno}`}>
                            <img src={product.state.pimg} alt={product.state.ptitle} /><br />
                            {product.state.ptitle}<br />
                            {product.state.pprice}원<br />
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function registProduct(productArr) {
    const productObj = new Product();
    productObj.state.pno = parseInt(productArr[0], 10); // pno를 정수로 변환하여 저장
    productObj.state.ptitle = productArr[1];
    productObj.state.pcontent = productArr[2];
    productObj.state.pimg = productArr[3];
    productObj.state.pprice = productArr[4];
    productList.push(productObj);
    console.log("Product registered:", productObj.state); // 추가된 로그
}

export { productList };
