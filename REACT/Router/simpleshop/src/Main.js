import './css/Main.css'
import Header from './sub/Header';
import ListProduct from './sub/ListProduct';
import Footer from './sub/Footer';

export default function ReactLayout() {
    const titleText = 'SimpleShop V0.1'
    const menu = 'ListProduct';
    const footerText = 'Copyright (c) 2024 All right reserved OrKaNonS';
    return (
        <div id = 'wrapper'>
            <Header titleText={titleText} />
            <ListProduct menu={menu} />
            <Footer footerText={footerText} />
        </div>
    );
}